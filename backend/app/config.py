"""
Configuration settings for NHS A&E Forecasting Backend
"""
import os
from pathlib import Path

# Base directory
BASE_DIR = Path(__file__).resolve().parent.parent
DATA_DIR = BASE_DIR
MODELS_DIR = BASE_DIR / "models"

# Ensure models directory exists
MODELS_DIR.mkdir(exist_ok=True)

# Data file
DATA_FILE = DATA_DIR / "cleaned.csv"

# Model filenames
MODEL_FILES = {
    "type1": MODELS_DIR / "type1_model.pkl",    "type2": MODELS_DIR / "type2_model.pkl",
    "other": MODELS_DIR / "other_model.pkl",
    "other_emergency": MODELS_DIR / "other_emergency_model.pkl",    "total": MODELS_DIR / "total_model.pkl",
    "wait": MODELS_DIR / "wait_model.pkl",
}

# Column name mappings
COLUMN_MAPPING = {
    "Patients who have waited 12+ hrs from DTA to admission": "Wait_12hrs",
    "Emergency admissions via A&E - Type 1": "Type1_Admissions",
    "Emergency admissions via A&E - Type 2": "Type2_Admissions",
    "Emergency admissions via A&E - Other A&E department": "Other_Admissions",
    "Other emergency admissions": "Other_Emergency",
}

# Metrics to forecast
FORECAST_METRICS = {
    "Type1_Admissions": {
        "label": "Type 1 Emergency Admissions",
        "description": "Major A&E departments (consultant-led 24/7)",
        "model_key": "type1",
    },
    "Type2_Admissions": {
        "label": "Type 2 Emergency Admissions",
        "description": "Single specialty A&E services (e.g., eye, dental)",
        "model_key": "type2",
    },
    "Other_Admissions": {
        "label": "Other A&E Department Admissions",
        "description": "Other A&E departments not classified as Type 1 or 2",
        "model_key": "other",
    },
    "Other_Emergency": {
        "label": "Other Emergency Admissions",
        "description": "Emergency admissions not via A&E departments",
        "model_key": "other_emergency",
    },
    "Total_Admissions": {
        "label": "Total Emergency Admissions",
        "description": "Sum of all admission types",
        "model_key": "total",
    },
    "Wait_12hrs": {
        "label": "Patients Waiting 12+ Hours",
        "description": "Quality indicator - patients waiting over 12 hours",
        "model_key": "wait",
    },
}

# Feature engineering settings
LAGS = [1, 2, 3, 6, 12]  # Lag features
ROLLING_WINDOWS = [3, 6, 12]  # Rolling window sizes for moving averages

# XGBoost hyperparameters
XGBOOST_PARAMS = {
    "n_estimators": 200,
    "max_depth": 5,
    "learning_rate": 0.1,
    "subsample": 0.8,
    "colsample_bytree": 0.8,
    "objective": "reg:squarederror",
    "random_state": 42,
    "n_jobs": -1,
}

# API settings
API_TITLE = "NHS A&E Forecasting API"
API_DESCRIPTION = "ML-powered 36-month forecasting for NHS A&E operational metrics"
API_VERSION = "1.0.0"
CORS_ORIGINS = ["*"]  # Allow all origins (restrict in production)

# Forecasting settings
DEFAULT_FORECAST_HORIZON = 36  # months
MAX_FORECAST_HORIZON = 60  # maximum allowed
MIN_FORECAST_HORIZON = 1  # minimum allowed
