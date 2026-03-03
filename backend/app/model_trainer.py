"""
XGBoost model training for time series forecasting
"""
import xgboost as xgb
import joblib
import logging
from pathlib import Path
from typing import Dict

from .config import XGBOOST_PARAMS, MODEL_FILES, FORECAST_METRICS
from .data_loader import get_data_loader
from .feature_engineering import get_feature_engineer
from .model_evaluation import get_model_evaluator

logger = logging.getLogger(__name__)


class ModelTrainer:
    """Train and manage XGBoost models for each forecast metric"""
    
    def __init__(self):
        self.models: Dict[str, xgb.XGBRegressor] = {}
        self.feature_columns: Dict[str, list] = {}
        self.accuracy_metrics: Dict[str, dict] = {}  # Store accuracy metrics per model
    
    def train_all_models(self, force_retrain: bool = False, validate: bool = True) -> None:
        """
        Train models for all forecast metrics
        
        Args:
            force_retrain: If True, retrain even if model files exist
            validate: If True, perform validation and calculate accuracy metrics
        """
        data_loader = get_data_loader()
        feature_engineer = get_feature_engineer()
        evaluator = get_model_evaluator()
        
        # Get aggregated data
        df = data_loader.aggregated_data
        
        if df is None:
            raise ValueError("No data loaded. Ensure DataLoader has loaded data.")
        
        for metric_name, metric_info in FORECAST_METRICS.items():
            model_key = metric_info['model_key']
            model_file = MODEL_FILES[model_key]
            
            # Check if model already exists and skip if not forcing retrain
            if model_file.exists() and not force_retrain:
                logger.info(f"Model for {metric_name} already exists at {model_file}")
                self.load_model(model_key)
                continue
            
            logger.info(f"Training model for {metric_name}...")
            
            # Create features
            X, y = feature_engineer.create_features(df, metric_name)
            
            # Train XGBoost model
            model = xgb.XGBRegressor(**XGBOOST_PARAMS)
            model.fit(X, y)
            
            # Store model and feature columns
            self.models[model_key] = model
            self.feature_columns[model_key] = X.columns.tolist()
            
            # Perform validation if requested
            accuracy_metrics = {}
            if validate and len(df) > 24:  # Need enough data for validation
                logger.info(f"Validating model for {metric_name}...")
                try:
                    test_size = min(12, len(df) // 4)  # Use 12 months or 25% for testing
                    val_metrics, _, _ = evaluator.time_series_split_validate(
                        df, metric_name, feature_engineer, model, test_size=test_size
                    )
                    accuracy_metrics = val_metrics
                    self.accuracy_metrics[model_key] = val_metrics
                    
                    # Log formatted metrics
                    formatted = evaluator.format_metrics_for_display(val_metrics)
                    logger.info("Validation Results:")
                    for metric_name_display, value in formatted.items():
                        logger.info(f"  {metric_name_display}: {value}")
                    
                except Exception as e:
                    logger.warning(f"Validation failed for {metric_name}: {e}")
            
            # Save model with accuracy metrics
            joblib.dump({
                'model': model,
                'feature_columns': self.feature_columns[model_key],
                'metric_name': metric_name,
                'accuracy_metrics': accuracy_metrics,
            }, model_file)
            
            logger.info(f"Model for {metric_name} trained and saved to {model_file}")
            logger.info(f"Training samples: {len(X)}, Features: {len(X.columns)}")
            
            # Log feature importances (top 10)
            feature_importance = model.feature_importances_
            top_features_idx = feature_importance.argsort()[-10:][::-1]
            logger.info("Top 10 important features:")
            for idx in top_features_idx:
                logger.info(f"  {X.columns[idx]}: {feature_importance[idx]:.4f}")
    
    def load_model(self, model_key: str) -> xgb.XGBRegressor:
        """
        Load a trained model from disk
        
        Args:
            model_key: Key from MODEL_FILES (e.g., 'type1', 'total', 'wait')
        
        Returns:
            Loaded XGBoost model
        """
        model_file = MODEL_FILES[model_key]
        
        if not model_file.exists():
            raise FileNotFoundError(f"Model file not found: {model_file}")
        
        # Load saved data
        saved_data = joblib.load(model_file)
        model = saved_data['model']
        feature_columns = saved_data['feature_columns']
        accuracy_metrics = saved_data.get('accuracy_metrics', {})
        
        # Store in instance
        self.models[model_key] = model
        self.feature_columns[model_key] = feature_columns
        if accuracy_metrics:
            self.accuracy_metrics[model_key] = accuracy_metrics
        
        logger.info(f"Loaded model from {model_file}")
        
        return model
    
    def load_all_models(self) -> None:
        """Load all trained models from disk"""
        for model_key in MODEL_FILES.keys():
            try:
                self.load_model(model_key)
            except FileNotFoundError:
                logger.warning(f"Model file for {model_key} not found. Will need to train.")
    
    def get_model(self, model_key: str) -> xgb.XGBRegressor:
        """
        Get a trained model
        
        Args:
            model_key: Key from MODEL_FILES
        
        Returns:
            XGBoost model
        """
        if model_key not in self.models:
            # Try to load from disk
            self.load_model(model_key)
        
        return self.models[model_key]
    
    def get_feature_columns(self, model_key: str) -> list:
        """
        Get feature column names for a model
        
        Args:
            model_key: Key from MODEL_FILES
        
        Returns:
            List of feature column names
        """
        if model_key not in self.feature_columns:
            # Try to load from disk
            self.load_model(model_key)
        
        return self.feature_columns[model_key]
    
    def get_accuracy_metrics(self, model_key: str) -> dict:
        """
        Get accuracy metrics for a model
        
        Args:
            model_key: Key from MODEL_FILES
        
        Returns:
            Dictionary of accuracy metrics
        """
        if model_key not in self.accuracy_metrics:
            # Try to load from disk
            self.load_model(model_key)
        
        return self.accuracy_metrics.get(model_key, {})


# Singleton instance
_model_trainer_instance = None


def get_model_trainer() -> ModelTrainer:
    """Get or create singleton ModelTrainer instance"""
    global _model_trainer_instance
    if _model_trainer_instance is None:
        _model_trainer_instance = ModelTrainer()
    return _model_trainer_instance
