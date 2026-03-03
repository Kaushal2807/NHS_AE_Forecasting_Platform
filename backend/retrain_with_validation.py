"""
Script to retrain models with validation enabled
"""
import logging
from app.model_trainer import get_model_trainer
from app.data_loader import get_data_loader

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

if __name__ == "__main__":
    logger.info("Starting model retraining with validation...")
    
    # Load data
    data_loader = get_data_loader()
    logger.info(f"Data loaded: {len(data_loader.aggregated_data)} records")
    
    # Retrain all models with validation
    model_trainer = get_model_trainer()
    model_trainer.train_all_models(force_retrain=True, validate=True)
    
    logger.info("✅ Model retraining complete!")
    
    # Print accuracy metrics
    logger.info("\n" + "="*60)
    logger.info("ACCURACY METRICS SUMMARY")
    logger.info("="*60)
    
    from app.config import FORECAST_METRICS
    for metric_name, metric_info in FORECAST_METRICS.items():
        model_key = metric_info['model_key']
        accuracy = model_trainer.get_accuracy_metrics(model_key)
        
        if accuracy:
            logger.info(f"\n{metric_name}:")
            logger.info(f"  MAE:   {accuracy.get('mae', 'N/A'):.2f}")
            logger.info(f"  RMSE:  {accuracy.get('rmse', 'N/A'):.2f}")
            logger.info(f"  MAPE:  {accuracy.get('mape', 'N/A'):.2f}%")
            logger.info(f"  R²:    {accuracy.get('r2', 'N/A'):.4f}")
            logger.info(f"  MBE:   {accuracy.get('mbe', 'N/A'):.2f}")
            logger.info(f"  NRMSE: {accuracy.get('nrmse', 'N/A'):.2f}%")
