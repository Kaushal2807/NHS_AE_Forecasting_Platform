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
        
        logger.info(f"Starting recursive forecast for {metric_name} ({horizon} months)")
        
        # List to store predictions
        predictions = []
        forecast_dates = []
        
        # Get the last known date
        last_date = df['Month'].max()
        
        # Recursive forecasting loop
        for step in range(horizon):
            # Create features for next prediction
            features = self.feature_engineer.create_prediction_features(
                df, metric_name, predictions
            )
            
            # Predict next month
            pred = model.predict(features)[0]
            
            # Ensure non-negative predictions
            pred = max(0, pred)
            
            predictions.append(pred)
            
            # Calculate next month date
            next_date = last_date + pd.DateOffset(months=step + 1)
            forecast_dates.append(next_date)
            
            # Add prediction to dataframe for next iteration
            new_row = {
                'Month': next_date,
                metric_name: pred,
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
