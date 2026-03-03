"""
Model evaluation and accuracy metrics for time series forecasting
"""
import numpy as np
import pandas as pd
from typing import Dict, Tuple, List
import logging
from sklearn.metrics import mean_absolute_error, mean_squared_error, r2_score

logger = logging.getLogger(__name__)


class ModelEvaluator:
    """Evaluate forecasting model performance"""
    
    @staticmethod
    def calculate_metrics(y_true: np.ndarray, y_pred: np.ndarray) -> Dict[str, float]:
        """
        Calculate comprehensive accuracy metrics
        
        Args:
            y_true: Actual values
            y_pred: Predicted values
        
        Returns:
            Dictionary with metric names and values
        """
        # Ensure arrays are 1D
        y_true = np.array(y_true).flatten()
        y_pred = np.array(y_pred).flatten()
        
        # Remove any NaN or infinite values
        mask = np.isfinite(y_true) & np.isfinite(y_pred)
        y_true = y_true[mask]
        y_pred = y_pred[mask]
        
        if len(y_true) == 0:
            logger.warning("No valid data points for evaluation")
            return {
                "mae": float('nan'),
                "rmse": float('nan'),
                "mape": float('nan'),
                "r2": float('nan'),
            }
        
        # Mean Absolute Error
        mae = mean_absolute_error(y_true, y_pred)
        
        # Root Mean Squared Error
        mse = mean_squared_error(y_true, y_pred)
        rmse = np.sqrt(mse)
        
        # Mean Absolute Percentage Error
        # Avoid division by zero
        mape_mask = y_true != 0
        if mape_mask.sum() > 0:
            mape = np.mean(np.abs((y_true[mape_mask] - y_pred[mape_mask]) / y_true[mape_mask])) * 100
        else:
            mape = float('nan')
        
        # R² Score (coefficient of determination)
        r2 = r2_score(y_true, y_pred)
        
        # Additional metrics
        # Mean Bias Error (systematic over/under prediction)
        mbe = np.mean(y_pred - y_true)
        
        # Normalized RMSE (percentage of mean)
        nrmse = (rmse / np.mean(y_true)) * 100 if np.mean(y_true) != 0 else float('nan')
        
        # Accuracy percentage (100 - MAPE)
        accuracy_percentage = 100 - mape if not np.isnan(mape) else float('nan')
        
        return {
            "mae": float(mae),
            "rmse": float(rmse),
            "mape": float(mape),
            "r2": float(r2),
            "mbe": float(mbe),
            "nrmse": float(nrmse),
            "accuracy_percentage": float(accuracy_percentage),
            "sample_size": int(len(y_true)),
        }
    
    @staticmethod
    def time_series_split_validate(
        df: pd.DataFrame, 
        target_col: str,
        feature_engineer,
        model,
        test_size: int = 12
    ) -> Tuple[Dict[str, float], np.ndarray, np.ndarray]:
        """
        Perform time series validation with train/test split
        
        Args:
            df: Time series dataframe
            target_col: Target column name
            feature_engineer: FeatureEngineer instance
            model: Trained model
            test_size: Number of months to use for testing
        
        Returns:
            Tuple of (metrics_dict, y_test, y_pred)
        """
        # Use last 'test_size' months for testing
        train_df = df.iloc[:-test_size].copy()
        test_df = df.iloc[-test_size:].copy()
        
        logger.info(f"Train size: {len(train_df)}, Test size: {len(test_df)}")
        
        # Create features for training
        X_train, y_train = feature_engineer.create_features(train_df, target_col)
        
        # Retrain model on training data only
        model.fit(X_train, y_train)
        
        # Create features for test data using actual historical values
        # This simulates the model's performance when all historical data is available
        X_test, y_test = feature_engineer.create_features(df, target_col)
        
        # Get only the test portion
        X_test = X_test.iloc[-test_size:]
        y_test = y_test.iloc[-test_size:]
        
        # Make predictions on test set
        y_pred = model.predict(X_test)
        y_pred = np.maximum(0, y_pred)  # Ensure non-negative
        
        # Convert to numpy arrays
        y_test = y_test.values
        y_pred = np.array(y_pred)
        
        # Calculate metrics
        metrics = ModelEvaluator.calculate_metrics(y_test, y_pred)
        
        logger.info(f"Validation metrics for {target_col}:")
        logger.info(f"  MAE: {metrics['mae']:.2f}")
        logger.info(f"  RMSE: {metrics['rmse']:.2f}")
        logger.info(f"  MAPE: {metrics['mape']:.2f}%")
        logger.info(f"  R²: {metrics['r2']:.4f}")
        
        return metrics, y_test, y_pred
    
    @staticmethod
    def format_metrics_for_display(metrics: Dict[str, float]) -> Dict[str, str]:
        """
        Format metrics for user-friendly display
        
        Args:
            metrics: Dictionary of metric values
        
        Returns:
            Dictionary with formatted strings
        """
        return {
            "Mean Absolute Error (MAE)": f"{metrics['mae']:,.0f}",
            "Root Mean Squared Error (RMSE)": f"{metrics['rmse']:,.0f}",
            "Mean Absolute Percentage Error (MAPE)": f"{metrics['mape']:.2f}%",
            "R² Score": f"{metrics['r2']:.4f}",
            "Mean Bias Error (MBE)": f"{metrics['mbe']:,.0f}",
            "Normalized RMSE (%)": f"{metrics['nrmse']:.2f}%",
            "Sample Size": f"{metrics['sample_size']}",
        }
    
    @staticmethod
    def interpret_metrics(metrics: Dict[str, float]) -> Dict[str, str]:
        """
        Provide interpretation of metrics
        
        Args:
            metrics: Dictionary of metric values
        
        Returns:
            Dictionary with interpretations
        """
        interpretations = {}
        
        # R² interpretation
        r2 = metrics.get('r2', 0)
        if r2 >= 0.9:
            interpretations['r2'] = "Excellent model fit"
        elif r2 >= 0.7:
            interpretations['r2'] = "Good model fit"
        elif r2 >= 0.5:
            interpretations['r2'] = "Moderate model fit"
        else:
            interpretations['r2'] = "Poor model fit - consider model improvements"
        
        # MAPE interpretation
        mape = metrics.get('mape', 0)
        if mape < 10:
            interpretations['mape'] = "Highly accurate forecasts"
        elif mape < 20:
            interpretations['mape'] = "Good forecast accuracy"
        elif mape < 30:
            interpretations['mape'] = "Reasonable forecast accuracy"
        else:
            interpretations['mape'] = "Forecast accuracy needs improvement"
        
        # MBE interpretation (bias)
        mbe = metrics.get('mbe', 0)
        if abs(mbe) < metrics.get('mae', 1) * 0.1:
            interpretations['mbe'] = "Minimal systematic bias"
        elif mbe > 0:
            interpretations['mbe'] = "Model tends to over-predict"
        else:
            interpretations['mbe'] = "Model tends to under-predict"
        
        return interpretations


# Singleton instance
_model_evaluator_instance = None


def get_model_evaluator() -> ModelEvaluator:
    """Get or create singleton ModelEvaluator instance"""
    global _model_evaluator_instance
    if _model_evaluator_instance is None:
        _model_evaluator_instance = ModelEvaluator()
    return _model_evaluator_instance
