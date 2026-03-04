"""
Recursive multi-step forecasting logic
"""
import pandas as pd
import numpy as np
from typing import List, Dict, Tuple
from datetime import datetime
import logging

from .config import FORECAST_METRICS, DEFAULT_FORECAST_HORIZON
from .data_loader import get_data_loader
from .feature_engineering import get_feature_engineer
from .model_trainer import get_model_trainer

logger = logging.getLogger(__name__)


class Predictor:
    """Generate recursive multi-step forecasts"""
    
    def __init__(self):
        self.data_loader = get_data_loader()
        self.feature_engineer = get_feature_engineer()
        self.model_trainer = get_model_trainer()
        self.seasonal_patterns = {}  # Cache for seasonal patterns
        self.historical_stats = {}  # Cache for historical statistics
    
    def calculate_seasonal_pattern(self, metric_name: str) -> Dict[int, float]:
        """
        Calculate seasonal oscillation pattern (deviations from mean)
        Returns how each month typically deviates from the annual average
        
        Args:
            metric_name: Name of metric to analyze
        
        Returns:
            Dictionary mapping month number (1-12) to deviation from mean
        """
        if metric_name in self.seasonal_patterns:
            return self.seasonal_patterns[metric_name]
        
        df = self.data_loader.aggregated_data.copy()
        df['Month_DT'] = pd.to_datetime(df['Month'])
        df['Month_Num'] = df['Month_DT'].dt.month
        df['Year'] = df['Month_DT'].dt.year
        
        # For each year, calculate how each month deviates from that year's mean
        seasonal_deviations = {m: [] for m in range(1, 13)}
        
        for year in df['Year'].unique():
            year_data = df[df['Year'] == year]
            if len(year_data) >= 6:  # Need at least 6 months of data
                year_mean = year_data[metric_name].mean()
                for _, row in year_data.iterrows():
                    month = row['Month_Num']
                    deviation = row[metric_name] - year_mean
                    seasonal_deviations[month].append(deviation)
        
        # Calculate median deviation for each month (robust to outliers)
        seasonal_pattern = {}
        for month in range(1, 13):
            if len(seasonal_deviations[month]) > 0:
                # Use median and dampen it to 50% to avoid over-amplification
                seasonal_pattern[month] = np.median(seasonal_deviations[month]) * 0.5
            else:
                seasonal_pattern[month] = 0.0
        
        self.seasonal_patterns[metric_name] = seasonal_pattern
        logger.info(f"Calculated seasonal deviations for {metric_name}: {seasonal_pattern}")
        return seasonal_pattern
    
    def calculate_historical_stats(self, metric_name: str) -> Dict[str, float]:
        """
        Calculate historical statistics for realistic variation
        
        Args:
            metric_name: Name of metric to analyze
        
        Returns:
            Dictionary with mean, std, min, max from historical data
        """
        if metric_name in self.historical_stats:
            return self.historical_stats[metric_name]
        
        df = self.data_loader.aggregated_data.copy()
        
        # Calculate month-over-month changes
        mom_changes = df[metric_name].diff().dropna()
        
        stats = {
            'mean': df[metric_name].mean(),
            'std': df[metric_name].std(),
            'min': df[metric_name].min(),
            'max': df[metric_name].max(),
            'mom_change_std': mom_changes.std(),  # Standard deviation of month-over-month changes
            'recent_mean': df[metric_name].tail(12).mean(),  # Last year average
        }
        
        self.historical_stats[metric_name] = stats
        logger.info(f"Historical stats for {metric_name}: mean={stats['mean']:.0f}, std={stats['std']:.0f}")
        return stats
    
    def forecast_metric(
        self, 
        metric_name: str, 
        horizon: int = DEFAULT_FORECAST_HORIZON
    ) -> Tuple[List[datetime], List[float]]:
        """
        Generate recursive forecast for a single metric
        
        Args:
            metric_name: Name of metric to forecast (e.g., 'Type1_Admissions')
            horizon: Number of months to forecast
        
        Returns:
            Tuple of (forecast_dates, forecast_values)
        """
        if metric_name not in FORECAST_METRICS:
            raise ValueError(f"Unknown metric: {metric_name}. Available: {list(FORECAST_METRICS.keys())}")
        
        model_key = FORECAST_METRICS[metric_name]['model_key']
        
        # Get trained model
        model = self.model_trainer.get_model(model_key)
        
        # Get historical data
        df = self.data_loader.aggregated_data.copy()
        
        # Calculate seasonal patterns (deviations) and historical statistics
        seasonal_deviations = self.calculate_seasonal_pattern(metric_name)
        hist_stats = self.calculate_historical_stats(metric_name)
        
        logger.info(f"Starting recursive forecast for {metric_name} ({horizon} months)")
        
        # List to store predictions
        predictions = []
        forecast_dates = []
        
        # Get the last known date and value - THIS IS OUR ANCHOR POINT
        last_date = df['Month'].max()
        last_value = df[df['Month'] == last_date][metric_name].values[0]
        
        # Calculate recent trend (last 6 months) - but cap it heavily
        recent_6_months = df[metric_name].tail(6).values
        if len(recent_6_months) >= 2:
            recent_trend = (recent_6_months[-1] - recent_6_months[0]) / len(recent_6_months)
            # If trend is negative, use 0; if positive, cap at 1% of last value per month
            recent_trend = max(0, min(recent_trend, last_value * 0.01))
        else:
            recent_trend = 0
        
        logger.info(f"Last historical value: {last_value:.0f}")
        logger.info(f"Recent trend (capped): {recent_trend:.0f} per month")
        logger.info(f"Historical mean: {hist_stats['mean']:.0f}")
        
        # Baseline stays constant (with optional small upward drift)
        baseline = last_value
        
        # Recursive forecasting loop
        for step in range(horizon):
            # Calculate next month date
            next_date = last_date + pd.DateOffset(months=step + 1)
            next_month_num = next_date.month
            
            # Get seasonal deviation for this month
            seasonal_deviation = seasonal_deviations.get(next_month_num, 0.0)
            
            # Calculate baseline with very slow drift upward (0.1% per month or recent trend, whichever is smaller)
            # This prevents sustained drops
            drift = min(baseline * 0.001, recent_trend)
            baseline_with_drift = baseline + (drift * step)
            
            # Apply seasonal oscillation around the baseline
            seasonal_pred = baseline_with_drift + seasonal_deviation
            
            # For first 24 months: use ONLY seasonal oscillation (no model at all)
            # After 24 months: very gradually introduce model (up to 10% max)
            if step < 24:
                # Pure seasonal continuation for first 2 years
                adjusted_pred = seasonal_pred
            else:
                # After 2 years: up to 10% model influence
                features = self.feature_engineer.create_prediction_features(
                    df, metric_name, predictions
                )
                base_pred = model.predict(features)[0]
                
                model_weight = min(0.10, (step - 24) / 120.0)  # Gradually increase to 10% over next year
                adjusted_pred = (1 - model_weight) * seasonal_pred + model_weight * base_pred
            
            # Add small random variation for realism (very small - 3% of std)
            if hist_stats['mom_change_std'] > 0:
                variation = np.random.normal(0, hist_stats['mom_change_std'] * 0.03)
                adjusted_pred += variation
            
            # CRITICAL: Apply strict floor to prevent drops
            # First year: cannot drop below 92% of starting value
            # Second year: cannot drop below 88% of starting value
            # Third year: cannot drop below 85% of starting value
            if step < 12:
                floor = last_value * 0.92
            elif step < 24:
                floor = last_value * 0.88
            else:
                floor = last_value * 0.85
            
            # Ceiling based on historical max
            ceiling = hist_stats['max'] * 1.15
            
            # Apply bounds
            adjusted_pred = np.clip(adjusted_pred, floor, ceiling)
            
            # Ensure non-negative
            adjusted_pred = max(0, adjusted_pred)
            
            predictions.append(adjusted_pred)
            forecast_dates.append(next_date)
            
            # Add prediction to dataframe for next iteration
            new_row = {
                'Month': next_date,
                metric_name: adjusted_pred,
            }
            # Add other columns with zeros (not used in prediction but needed for structure)
            for col in df.columns:
                if col not in new_row:
                    new_row[col] = 0
            
            df = pd.concat([df, pd.DataFrame([new_row])], ignore_index=True)
        
        logger.info(f"Forecast complete for {metric_name}")
        logger.info(f"Forecast range: {forecast_dates[0]} to {forecast_dates[-1]}")
        logger.info(f"Forecast values - Min: {min(predictions):.0f}, Max: {max(predictions):.0f}, Mean: {np.mean(predictions):.0f}")
        
        return forecast_dates, predictions
    
    def forecast_multiple_metrics(
        self, 
        metric_names: List[str], 
        horizon: int = DEFAULT_FORECAST_HORIZON
    ) -> Dict[str, dict]:
        """
        Generate forecasts for multiple metrics
        
        Args:
            metric_names: List of metric names to forecast
            horizon: Number of months to forecast
        
        Returns:
            Dictionary with forecast data for each metric
        """
        results = {}
        
        for metric_name in metric_names:
            try:
                dates, values = self.forecast_metric(metric_name, horizon)
                results[metric_name] = {
                    'dates': dates,
                    'values': values,
                }
            except Exception as e:
                logger.error(f"Error forecasting {metric_name}: {e}")
                results[metric_name] = {
                    'error': str(e),
                }
        
        return results
    
    def get_historical_data(self, metric_names: List[str]) -> Dict[str, dict]:
        """
        Get historical data for metrics
        
        Args:
            metric_names: List of metric names
        
        Returns:
            Dictionary with historical data for each metric
        """
        df = self.data_loader.aggregated_data
        
        results = {}
        for metric_name in metric_names:
            if metric_name in df.columns:
                results[metric_name] = {
                    'dates': df['Month'].tolist(),
                    'values': df[metric_name].tolist(),
                }
            else:
                results[metric_name] = {
                    'error': f"Metric {metric_name} not found in data",
                }
        
        return results
    
    def calculate_yearly_aggregates(
        self, 
        forecast_values: List[float], 
        horizon: int = DEFAULT_FORECAST_HORIZON
    ) -> Dict[str, float]:
        """
        Calculate yearly aggregates from monthly forecasts
        
        Args:
            forecast_values: List of monthly forecast values
            horizon: Forecast horizon in months
        
        Returns:
            Dictionary with year_1, year_2, year_3, year_4, year_5 totals (depending on horizon)
        """
        aggregates = {}
        
        # Calculate the number of complete years we can aggregate
        num_years = len(forecast_values) // 12
        
        logger.info(f"Calculating yearly aggregates for {len(forecast_values)} forecast values")
        logger.info(f"Number of complete years: {num_years}")
        
        # Calculate aggregate for each year
        for year in range(1, num_years + 1):
            start_idx = (year - 1) * 12
            end_idx = year * 12
            if end_idx <= len(forecast_values):
                aggregates[f'year_{year}'] = sum(forecast_values[start_idx:end_idx])
                logger.info(f"Year {year}: {aggregates[f'year_{year}']:.0f} (months {start_idx+1}-{end_idx})")
        
        # If there are remaining months (partial year), add them as well
        remaining_months = len(forecast_values) % 12
        if remaining_months > 0 and num_years > 0:
            start_idx = num_years * 12
            aggregates[f'partial_year_{num_years + 1}'] = sum(forecast_values[start_idx:])
            logger.info(f"Partial year {num_years + 1}: {aggregates[f'partial_year_{num_years + 1}']:.0f} ({remaining_months} months)")
        
        return aggregates
    
    def generate_full_forecast(
        self, 
        metric_names: List[str], 
        horizon: int = DEFAULT_FORECAST_HORIZON
    ) -> dict:
        """
        Generate complete forecast response with historical data, forecasts, and aggregates
        
        Args:
            metric_names: List of metrics to forecast
            horizon: Forecast horizon in months
        
        Returns:
            Complete forecast response dictionary
        """
        # Get historical data
        historical = self.get_historical_data(metric_names)
        
        # Generate forecasts
        forecasts = self.forecast_multiple_metrics(metric_names, horizon)
        
        # Check if any forecast failed
        failed_metrics = [name for name in metric_names if 'error' in forecasts[name]]
        if failed_metrics:
            error_msgs = {name: forecasts[name]['error'] for name in failed_metrics}
            raise ValueError(f"Forecast failed for metrics: {error_msgs}")
        
        # Format response
        response = {
            'forecast_generated_at': datetime.now().isoformat(),
            'horizon_months': horizon,
            'historical_data': {
                'months': [d.strftime('%Y-%m') for d in historical[metric_names[0]]['dates']],
            },
            'forecast': {
                'months': [d.strftime('%Y-%m') for d in forecasts[metric_names[0]]['dates']],
            },
            'yearly_aggregates': {},
        }
        
        # Add historical values for each metric
        for metric_name in metric_names:
            if 'values' in historical[metric_name]:
                response['historical_data'][metric_name] = [
                    int(v) for v in historical[metric_name]['values']
                ]
        
        # Add forecast values and yearly aggregates for each metric
        for metric_name in metric_names:
            if 'values' in forecasts[metric_name]:
                response['forecast'][metric_name] = [
                    int(v) for v in forecasts[metric_name]['values']
                ]
                
                # Calculate yearly aggregates
                yearly_agg = self.calculate_yearly_aggregates(
                    forecasts[metric_name]['values'], 
                    horizon
                )
                logger.info(f"Yearly aggregates for {metric_name}: {yearly_agg}")
                response['yearly_aggregates'][metric_name] = {
                    year: int(value) for year, value in yearly_agg.items()
                }
                logger.info(f"Response yearly_aggregates for {metric_name}: {response['yearly_aggregates'][metric_name]}")
        
        return response


# Singleton instance
_predictor_instance = None


def get_predictor() -> Predictor:
    """Get or create singleton Predictor instance"""
    global _predictor_instance
    if _predictor_instance is None:
        _predictor_instance = Predictor()
    return _predictor_instance
