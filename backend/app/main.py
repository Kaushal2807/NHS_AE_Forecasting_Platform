"""
FastAPI application for NHS A&E Forecasting Platform
"""
from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime
import logging
import numpy as np

from .config import (
    API_TITLE, API_DESCRIPTION, API_VERSION, CORS_ORIGINS, 
    MODEL_FILES, FORECAST_METRICS
)
from .schemas import (
    PredictRequest, PredictResponse, MetricsResponse, 
    HealthResponse, MetricInfo, YearlyAggregate,
    ModelAccuracyMetrics, ModelAccuracyResponse, AllModelsAccuracyResponse
)
from .data_loader import get_data_loader
from .model_trainer import get_model_trainer
from .predictor import get_predictor
from .model_evaluation import get_model_evaluator

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

# Create FastAPI app
app = FastAPI(
    title=API_TITLE,
    description=API_DESCRIPTION,
    version=API_VERSION,
    docs_url="/docs",
    redoc_url="/redoc",
)

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


@app.on_event("startup")
async def startup_event():
    """Initialize data and models on startup"""
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", flush=True)
    print("✅🎯 LATEST IMAGE LOADED - NO-DROP FORECASTING ACTIVE 🎯✅", flush=True)
    print(">>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>", flush=True)
    logger.info("Starting NHS A&E Forecasting API...")
    
    try:
        # Load data
        logger.info("Loading and aggregating data...")
        data_loader = get_data_loader()
        df = data_loader.aggregated_data
        logger.info(f"Data loaded: {len(df)} monthly records from {df['Month'].min()} to {df['Month'].max()}")
        
        # Train or load models
        logger.info("Loading/training models...")
        model_trainer = get_model_trainer()
        
        # Try to load existing models, train if not found
        for model_key in MODEL_FILES.keys():
            if MODEL_FILES[model_key].exists():
                logger.info(f"Loading existing {model_key} model...")
                model_trainer.load_model(model_key)
            else:
                logger.info(f"Model {model_key} not found. Training now...")
                model_trainer.train_all_models(force_retrain=False)
                break  # train_all_models trains all at once
        
        logger.info("✅ API startup complete - ready to serve requests")
        
    except Exception as e:
        logger.error(f"❌ Startup failed: {e}")
        raise


@app.get("/", tags=["Root"])
async def root():
    """Root endpoint with API information"""
    return {
        "message": "NHS A&E Forecasting API",
        "version": API_VERSION,
        "docs": "/docs",
        "health": "/health",
        "endpoints": {
            "GET /health": "Check API health status",
            "GET /metrics": "Get dashboard KPI metrics",
            "POST /predict": "Generate forecasts",
            "GET /model-accuracy": "Get accuracy metrics for all models",
            "GET /model-accuracy/{metric_name}": "Get accuracy for specific model",
        }
    }


@app.get("/health", response_model=HealthResponse, tags=["Health"])
async def health_check():
    """
    Health check endpoint
    
    Returns API status and model availability
    """
    try:
        data_loader = get_data_loader()
        model_trainer = get_model_trainer()
        
        # Check which models are loaded
        models_status = {}
        for model_key in MODEL_FILES.keys():
            try:
                model_trainer.get_model(model_key)
                models_status[model_key] = True
            except Exception:
                models_status[model_key] = False
        
        return HealthResponse(
            status="healthy",
            timestamp=datetime.now().isoformat(),
            models_loaded=models_status,
            data_loaded=data_loader.aggregated_data is not None,
        )
    
    except Exception as e:
        logger.error(f"Health check failed: {e}")
        raise HTTPException(status_code=503, detail=f"Service unhealthy: {str(e)}")


@app.get("/metrics", response_model=MetricsResponse, tags=["Metrics"])
async def get_metrics():
    """
    Get dashboard KPI metrics
    
    Returns key statistics for the landing page dashboard
    """
    try:
        data_loader = get_data_loader()
        predictor = get_predictor()
        
        # Get latest month data
        latest = data_loader.get_latest_month_data()
        
        # Get growth rate
        yoy_growth = data_loader.get_yoy_growth_rate()
        
        # Get total records
        total_records = data_loader.get_total_records_count()
        
        # Format values
        latest_value = format_large_number(latest['type1_admissions'])
        mom_change = f"{latest['mom_change']:+.1f}% MoM"
        
        # Calculate approximate organizations per month
        num_months = len(data_loader.aggregated_data)
        orgs_per_month = total_records // num_months if num_months > 0 else 0
        
        return MetricsResponse(
            hospitals=MetricInfo(
                label="Hospitals Covered",
                value=str(orgs_per_month),
                change="Per month (aggregated)",
                icon="LocalHospital"
            ),
            records=MetricInfo(
                label="Historical Records",
                value=f"{total_records:,}",
                change="Monthly data points",
                icon="Storage"
            ),
            latestAttendance=MetricInfo(
                label="Latest Month Type 1 Admissions",
                value=latest_value,
                change=mom_change,
                icon="People"
            ),
            growthRate=MetricInfo(
                label="Average Annual Growth Rate",
                value=f"{yoy_growth:.1f}%",
                change="Year-over-year",
                icon="TrendingUp"
            )
        )
    
    except Exception as e:
        logger.error(f"Error generating metrics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to generate metrics: {str(e)}")


@app.post("/predict", response_model=PredictResponse, tags=["Forecasting"])
async def predict(request: PredictRequest):
    """
    Generate forecasts for specified metrics
    
    - **metrics**: List of metric names to forecast
    - **forecast_horizon**: Number of months to forecast (1-60)
    
    Returns historical data, forecasts, and yearly aggregates
    """
    try:
        logger.info(f"Prediction request: {request.metrics}, horizon={request.forecast_horizon}")
        
        predictor = get_predictor()
        
        # Generate full forecast
        result = predictor.generate_full_forecast(
            metric_names=request.metrics,
            horizon=request.forecast_horizon
        )
        
        # Convert yearly_aggregates to proper schema format
        yearly_agg_formatted = {}
        for metric, agg_data in result['yearly_aggregates'].items():
            yearly_agg_formatted[metric] = YearlyAggregate(**agg_data)
        
        response = PredictResponse(
            forecast_generated_at=result['forecast_generated_at'],
            horizon_months=result['horizon_months'],
            historical_data=result['historical_data'],
            forecast=result['forecast'],
            yearly_aggregates=yearly_agg_formatted,
        )
        
        logger.info(f"Prediction completed successfully for {request.metrics}")
        
        return response
    
    except ValueError as e:
        logger.error(f"Validation error: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    
    except Exception as e:
        logger.error(f"Prediction error: {e}")
        raise HTTPException(status_code=500, detail=f"Prediction failed: {str(e)}")


@app.get("/available-metrics", tags=["Metrics"])
async def get_available_metrics():
    """
    Get list of available metrics that can be forecasted
    
    Returns metric names, labels, and descriptions
    """
    return {
        "metrics": [
            {
                "name": name,
                "label": info['label'],
                "description": info['description'],
            }
            for name, info in FORECAST_METRICS.items()
        ]
    }


@app.get("/model-accuracy/{metric_name}", response_model=ModelAccuracyResponse, tags=["Model Performance"])
async def get_model_accuracy(metric_name: str):
    """
    Get accuracy metrics for a specific forecasting model
    
    - **metric_name**: Name of the metric (e.g., Type1_Admissions, Total_Admissions, Wait_12hrs)
    
    Returns validation metrics calculated during model training including:
    - MAE (Mean Absolute Error)
    - RMSE (Root Mean Squared Error)
    - MAPE (Mean Absolute Percentage Error)
    - R² Score
    - And interpretations of the metrics
    """
    try:
        if metric_name not in FORECAST_METRICS:
            raise HTTPException(
                status_code=404, 
                detail=f"Metric '{metric_name}' not found. Available metrics: {list(FORECAST_METRICS.keys())}"
            )
        
        model_trainer = get_model_trainer()
        evaluator = get_model_evaluator()
        
        model_key = FORECAST_METRICS[metric_name]['model_key']
        
        # Get accuracy metrics
        accuracy_metrics = model_trainer.get_accuracy_metrics(model_key)
        
        if not accuracy_metrics:
            raise HTTPException(
                status_code=404,
                detail=f"Accuracy metrics not available for {metric_name}. Model may need retraining with validation enabled."
            )
        
        # Calculate accuracy_percentage if not present (for backward compatibility)
        if 'accuracy_percentage' not in accuracy_metrics:
            mape = accuracy_metrics.get('mape', 0)
            accuracy_metrics['accuracy_percentage'] = 100 - mape if not np.isnan(mape) else None
        
        # Format metrics and get interpretations
        formatted_metrics = evaluator.format_metrics_for_display(accuracy_metrics)
        interpretations = evaluator.interpret_metrics(accuracy_metrics)
        
        return ModelAccuracyResponse(
            metric_name=metric_name,
            accuracy_metrics=ModelAccuracyMetrics(**accuracy_metrics),
            interpretation=interpretations,
            formatted_metrics=formatted_metrics,
        )
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving accuracy metrics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve accuracy metrics: {str(e)}")


@app.get("/model-accuracy", response_model=AllModelsAccuracyResponse, tags=["Model Performance"])
async def get_all_models_accuracy():
    """
    Get accuracy metrics for all forecasting models
    
    Returns validation metrics for all trained models including:
    - Type1_Admissions model accuracy
    - Total_Admissions model accuracy
    - Wait_12hrs model accuracy
    """
    try:
        model_trainer = get_model_trainer()
        evaluator = get_model_evaluator()
        
        results = {}
        
        for metric_name, metric_info in FORECAST_METRICS.items():
            model_key = metric_info['model_key']
            
            try:
                # Get accuracy metrics
                accuracy_metrics = model_trainer.get_accuracy_metrics(model_key)
                
                if accuracy_metrics:
                    # Calculate accuracy_percentage if not present (for backward compatibility)
                    if 'accuracy_percentage' not in accuracy_metrics:
                        mape = accuracy_metrics.get('mape', 0)
                        accuracy_metrics['accuracy_percentage'] = 100 - mape if not np.isnan(mape) else None
                    
                    # Format metrics and get interpretations
                    formatted_metrics = evaluator.format_metrics_for_display(accuracy_metrics)
                    interpretations = evaluator.interpret_metrics(accuracy_metrics)
                    
                    results[metric_name] = ModelAccuracyResponse(
                        metric_name=metric_name,
                        accuracy_metrics=ModelAccuracyMetrics(**accuracy_metrics),
                        interpretation=interpretations,
                        formatted_metrics=formatted_metrics,
                    )
            except Exception as e:
                logger.warning(f"Could not retrieve accuracy for {metric_name}: {e}")
        
        if not results:
            raise HTTPException(
                status_code=404,
                detail="No accuracy metrics available. Models may need retraining with validation enabled."
            )
        
        return AllModelsAccuracyResponse(models=results)
    
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error retrieving all accuracy metrics: {e}")
        raise HTTPException(status_code=500, detail=f"Failed to retrieve accuracy metrics: {str(e)}")


def format_large_number(num: int) -> str:
    """
    Format large numbers with K/M suffixes
    
    Args:
        num: Number to format
    
    Returns:
        Formatted string (e.g., "1.2M", "85.3K")
    """
    if num >= 1_000_000:
        return f"{num / 1_000_000:.1f}M"
    elif num >= 1_000:
        return f"{num / 1_000:.1f}K"
    else:
        return str(num)


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=5000)
