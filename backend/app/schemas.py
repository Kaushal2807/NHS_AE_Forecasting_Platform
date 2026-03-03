"""
Pydantic schemas for API request/response validation
"""
from pydantic import BaseModel, Field, validator
from typing import List, Dict, Optional
from datetime import datetime

from .config import FORECAST_METRICS, MIN_FORECAST_HORIZON, MAX_FORECAST_HORIZON


class PredictRequest(BaseModel):
    """Request schema for /predict endpoint"""
    
    metrics: List[str] = Field(
        ...,
        description="List of metrics to forecast",
        example=["Type1_Admissions", "Total_Admissions"]
    )
    
    forecast_horizon: int = Field(
        default=36,
        ge=MIN_FORECAST_HORIZON,
        le=MAX_FORECAST_HORIZON,
        description=f"Number of months to forecast (between {MIN_FORECAST_HORIZON} and {MAX_FORECAST_HORIZON})"
    )
    
    @validator('metrics')
    def validate_metrics(cls, v):
        """Validate that all requested metrics are valid"""
        invalid_metrics = [m for m in v if m not in FORECAST_METRICS]
        if invalid_metrics:
            raise ValueError(
                f"Invalid metrics: {invalid_metrics}. "
                f"Available metrics: {list(FORECAST_METRICS.keys())}"
            )
        if not v:
            raise ValueError("At least one metric must be specified")
        return v
    
    class Config:
        schema_extra = {
            "example": {
                "metrics": ["Type1_Admissions", "Total_Admissions", "Wait_12hrs"],
                "forecast_horizon": 36
            }
        }


class HistoricalData(BaseModel):
    """Historical data structure"""
    
    months: List[str] = Field(..., description="List of month strings (YYYY-MM format)")
    Type1_Admissions: Optional[List[int]] = Field(None, description="Historical Type 1 admissions")
    Total_Admissions: Optional[List[int]] = Field(None, description="Historical total admissions")
    Wait_12hrs: Optional[List[int]] = Field(None, description="Historical 12+ hour waits")
    
    class Config:
        extra = 'allow'  # Allow additional fields for other metrics


class ForecastData(BaseModel):
    """Forecast data structure"""
    
    months: List[str] = Field(..., description="List of forecast month strings (YYYY-MM format)")
    Type1_Admissions: Optional[List[int]] = Field(None, description="Forecasted Type 1 admissions")
    Total_Admissions: Optional[List[int]] = Field(None, description="Forecasted total admissions")
    Wait_12hrs: Optional[List[int]] = Field(None, description="Forecasted 12+ hour waits")
    
    class Config:
        extra = 'allow'  # Allow additional fields for other metrics


class YearlyAggregate(BaseModel):
    """Yearly aggregate values for a metric"""
    
    year_1: Optional[int] = Field(None, description="Sum for year 1 (months 1-12)")
    year_2: Optional[int] = Field(None, description="Sum for year 2 (months 13-24)")
    year_3: Optional[int] = Field(None, description="Sum for year 3 (months 25-36)")
    year_4: Optional[int] = Field(None, description="Sum for year 4 (months 37-48)")
    year_5: Optional[int] = Field(None, description="Sum for year 5 (months 49-60)")
    partial_year_6: Optional[int] = Field(None, description="Partial sum for year 6 (if applicable)")


class PredictResponse(BaseModel):
    """Response schema for /predict endpoint"""
    
    forecast_generated_at: str = Field(..., description="Timestamp when forecast was generated")
    horizon_months: int = Field(..., description="Forecast horizon in months")
    historical_data: HistoricalData = Field(..., description="Historical data")
    forecast: ForecastData = Field(..., description="Forecast data")
    yearly_aggregates: Dict[str, YearlyAggregate] = Field(..., description="Yearly aggregates by metric")
    
    class Config:
        schema_extra = {
            "example": {
                "forecast_generated_at": "2026-03-02T10:30:00",
                "horizon_months": 36,
                "historical_data": {
                    "months": ["2018-04", "2018-05", "..."],
                    "Type1_Admissions": [85000, 87000],
                    "Total_Admissions": [120000, 122000]
                },
                "forecast": {
                    "months": ["2026-02", "2026-03", "..."],
                    "Type1_Admissions": [88000, 89000],
                    "Total_Admissions": [123000, 124000]
                },
                "yearly_aggregates": {
                    "Type1_Admissions": {
                        "year_1": 1050000,
                        "year_2": 1080000,
                        "year_3": 1110000
                    }
                }
            }
        }


class MetricInfo(BaseModel):
    """Single metric information for /metrics endpoint"""
    
    label: str = Field(..., description="Display label")
    value: str = Field(..., description="Formatted value")
    change: str = Field(..., description="Change indicator or context")
    icon: str = Field(..., description="Icon name (Material-UI icon)")


class MetricsResponse(BaseModel):
    """Response schema for /metrics endpoint"""
    
    hospitals: MetricInfo = Field(..., description="Number of hospitals covered")
    records: MetricInfo = Field(..., description="Total historical records")
    latestAttendance: MetricInfo = Field(..., description="Latest month attendance")
    growthRate: MetricInfo = Field(..., description="Average growth rate")
    
    class Config:
        schema_extra = {
            "example": {
                "hospitals": {
                    "label": "Hospitals Covered",
                    "value": "213",
                    "change": "Per month",
                    "icon": "LocalHospital"
                },
                "records": {
                    "label": "Historical Records",
                    "value": "20,004",
                    "change": "Monthly data points",
                    "icon": "Storage"
                },
                "latestAttendance": {
                    "label": "Latest Month Total Attendance",
                    "value": "85.2K",
                    "change": "+3.2% MoM",
                    "icon": "People"
                },
                "growthRate": {
                    "label": "Average Annual Growth Rate",
                    "value": "4.7%",
                    "change": "Year-over-year",
                    "icon": "TrendingUp"
                }
            }
        }


class HealthResponse(BaseModel):
    """Response schema for /health endpoint"""
    
    status: str = Field(..., description="Health status")
    timestamp: str = Field(..., description="Current timestamp")
    models_loaded: Dict[str, bool] = Field(..., description="Status of loaded models")
    data_loaded: bool = Field(..., description="Whether data is loaded")
    
    class Config:
        schema_extra = {
            "example": {
                "status": "healthy",
                "timestamp": "2026-03-02T10:30:00",
                "models_loaded": {
                    "type1": True,
                    "total": True,
                    "wait": True
                },
                "data_loaded": True
            }
        }


class ErrorResponse(BaseModel):
    """Error response schema"""
    
    detail: str = Field(..., description="Error message")
    
    class Config:
        schema_extra = {
            "example": {
                "detail": "Invalid metric name provided"
            }
        }


class ModelAccuracyMetrics(BaseModel):
    """Model accuracy metrics schema"""
    
    mae: float = Field(..., description="Mean Absolute Error")
    rmse: float = Field(..., description="Root Mean Squared Error")
    mape: float = Field(..., description="Mean Absolute Percentage Error (%)")
    r2: float = Field(..., description="R² Score (coefficient of determination)")
    mbe: float = Field(..., description="Mean Bias Error (systematic over/under prediction)")
    nrmse: float = Field(..., description="Normalized RMSE (%)")
    accuracy_percentage: Optional[float] = Field(None, description="Model Accuracy Percentage (100 - MAPE)")
    sample_size: int = Field(..., description="Number of data points used for validation")
    
    class Config:
        schema_extra = {
            "example": {
                "mae": 1250.5,
                "rmse": 1850.3,
                "mape": 15.2,
                "r2": 0.85,
                "mbe": -125.3,
                "nrmse": 8.5,
                "accuracy_percentage": 84.8,
                "sample_size": 12
            }
        }


class ModelAccuracyResponse(BaseModel):
    """Response schema for model accuracy endpoint"""
    
    metric_name: str = Field(..., description="Name of the forecasted metric")
    accuracy_metrics: ModelAccuracyMetrics = Field(..., description="Accuracy metrics")
    interpretation: Dict[str, str] = Field(..., description="Human-readable interpretations")
    formatted_metrics: Dict[str, str] = Field(..., description="Formatted metrics for display")
    
    class Config:
        schema_extra = {
            "example": {
                "metric_name": "Type1_Admissions",
                "accuracy_metrics": {
                    "mae": 1250.5,
                    "rmse": 1850.3,
                    "mape": 15.2,
                    "r2": 0.85,
                    "mbe": -125.3,
                    "nrmse": 8.5,
                    "sample_size": 12
                },
                "interpretation": {
                    "r2": "Good model fit",
                    "mape": "Good forecast accuracy",
                    "mbe": "Minimal systematic bias"
                },
                "formatted_metrics": {
                    "Mean Absolute Error (MAE)": "1,251",
                    "Root Mean Squared Error (RMSE)": "1,850",
                    "Mean Absolute Percentage Error (MAPE)": "15.20%",
                    "R² Score": "0.8500"
                }
            }
        }


class AllModelsAccuracyResponse(BaseModel):
    """Response schema for all models accuracy"""
    
    models: Dict[str, ModelAccuracyResponse] = Field(..., description="Accuracy for each model")
    
    class Config:
        schema_extra = {
            "example": {
                "models": {
                    "Type1_Admissions": {
                        "metric_name": "Type1_Admissions",
                        "accuracy_metrics": {
                            "mae": 1250.5,
                            "rmse": 1850.3,
                            "mape": 15.2,
                            "r2": 0.85
                        }
                    }
                }
            }
        }
