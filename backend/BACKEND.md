# NHS A&E Forecasting Platform - Backend Architecture

## 📋 Table of Contents
- [Overview](#overview)
- [Architecture](#architecture)
- [Technology Stack](#technology-stack)
- [Data Flow](#data-flow)
- [Core Components](#core-components)
- [API Endpoints](#api-endpoints)
- [Machine Learning Pipeline](#machine-learning-pipeline)
- [Model Performance](#model-performance)
- [Deployment](#deployment)

---

## Overview

The NHS A&E Forecasting Platform backend is a FastAPI-based REST API that provides machine learning-powered time series forecasting for NHS Accident & Emergency department metrics. It uses XGBoost regression models to predict future admissions and wait times across 6 different metrics.

### Key Features
- ✅ 6 forecasting models (Type1, Type2, Other A&E, Other Emergency, Total Admissions, Wait Times)
- ✅ Recursive 36-month forecasting with configurable horizon (1-60 months)
- ✅ Real-time model accuracy metrics (MAE, RMSE, MAPE, R²)
- ✅ Automated feature engineering (lags, rolling statistics, seasonality)
- ✅ National-level data aggregation from 20,000+ records
- ✅ RESTful API with auto-generated OpenAPI documentation
- ✅ Docker support for containerized deployment

---

## Architecture

```
┌─────────────────────────────────────────────────────────────┐
│                     NHS A&E Backend API                      │
├─────────────────────────────────────────────────────────────┤
│                                                               │
│  ┌──────────────┐      ┌──────────────┐                     │
│  │   FastAPI    │◄────►│   Uvicorn    │                     │
│  │  Application │      │  ASGI Server │                     │
│  └──────┬───────┘      └──────────────┘                     │
│         │                                                     │
│         ├───► Data Loader (CSV → Pandas DataFrame)          │
│         │       └─► National-level aggregation              │
│         │                                                     │
│         ├───► Feature Engineer                               │
│         │       ├─► Lag features (1,2,3,6,12 months)        │
│         │       ├─► Rolling statistics (3,6,12 windows)     │
│         │       └─► Seasonality encoding (sin/cos)          │
│         │                                                     │
│         ├───► Model Trainer (XGBoost)                        │
│         │       ├─► Train 6 regression models               │
│         │       ├─► Time series validation                  │
│         │       └─► Save models with accuracy metrics       │
│         │                                                     │
│         ├───► Predictor                                      │
│         │       ├─► Load trained models                     │
│         │       ├─► Recursive multi-step forecasting        │
│         │       └─► Generate yearly aggregates              │
│         │                                                     │
│         └───► Model Evaluator                                │
│                 ├─► Calculate accuracy metrics              │
│                 ├─► Format for display                      │
│                 └─► Provide interpretations                 │
│                                                               │
└─────────────────────────────────────────────────────────────┘
```

### Directory Structure

```
backend/
├── app/
│   ├── __init__.py              # Package initialization
│   ├── main.py                  # FastAPI application & endpoints
│   ├── config.py                # Configuration & constants
│   ├── schemas.py               # Pydantic request/response models
│   ├── data_loader.py           # CSV loading & aggregation
│   ├── feature_engineering.py  # Feature generation
│   ├── model_trainer.py         # XGBoost training logic
│   ├── predictor.py             # Recursive forecasting
│   └── model_evaluation.py      # Accuracy metrics calculation
├── models/                       # Trained model files (.pkl)
│   ├── type1_model.pkl
│   ├── type2_model.pkl
│   ├── other_model.pkl
│   ├── other_emergency_model.pkl
│   ├── total_model.pkl
│   └── wait_model.pkl
├── cleaned.csv                   # 20,003 rows of NHS A&E data
├── requirements.txt              # Python dependencies
├── run.py                        # Server entry point
├── Dockerfile                    # Docker image definition
├── docker-compose.yml            # Local Docker setup
└── retrain_with_validation.py   # Model retraining script
```

---

## Technology Stack

| Component | Technology | Version | Purpose |
|-----------|-----------|---------|---------|
| **Web Framework** | FastAPI | 0.109.0 | High-performance async API |
| **ASGI Server** | Uvicorn | 0.27.0 | Production server |
| **ML Framework** | XGBoost | 2.0.3 | Gradient boosting models |
| **Data Processing** | Pandas | 2.2.0 | Time series manipulation |
| **Numerical Computing** | NumPy | 1.26.3 | Array operations |
| **Model Validation** | scikit-learn | 1.4.0 | Accuracy metrics |
| **Serialization** | Joblib | 1.3.2 | Model persistence |
| **Validation** | Pydantic | 2.5.3 | Request/response schemas |
| **Runtime** | Python | 3.12.3 | Core language |
| **Containerization** | Docker | Latest | Deployment packaging |

---

## Data Flow

### 1. Data Loading & Aggregation

```python
cleaned.csv (20,003 rows)
    │
    ├─► Organization-level monthly data (2018-04 to 2026-01)
    │
    └─► Aggregate to national level
        │
        └─► 94 monthly records
            ├─► Type1_Admissions
            ├─► Type2_Admissions
            ├─► Other_Admissions
            ├─► Other_Emergency
            ├─► Total_Admissions (derived)
            └─► Wait_12hrs
```

### 2. Feature Engineering

```python
Raw monthly data
    │
    ├─► Time features (month, quarter, year, sin/cos encoding)
    ├─► Lag features (t-1, t-2, t-3, t-6, t-12)
    ├─► Rolling statistics (mean & std for windows 3, 6, 12)
    └─► Year-over-year change (t - t-12)
        │
        └─► 23 features per metric
```

### 3. Model Training

```python
Features (23) + Target → XGBoost Model
    │
    ├─► Train on 70 samples (after lag removal)
    ├─► Validate on last 12 months
    └─► Save model + accuracy metrics
```

### 4. Forecasting

```python
Latest historical data
    │
    ├─► Generate features for month t+1
    ├─► Predict using trained model
    ├─► Append prediction to history
    │
    └─► Repeat for horizon months (recursive)
        │
        └─► Return forecasted values
```

---

## Core Components

### 1. Data Loader (`data_loader.py`)

**Purpose:** Load and aggregate NHS A&E data from CSV to national-level monthly totals.

**Key Functions:**
```python
load_and_aggregate() → DataFrame
    - Loads cleaned.csv (20,003 rows)
    - Groups by Month, sums all metrics
    - Creates Total_Admissions column
    - Returns 94 monthly records

get_latest_month_data() → dict
    - Returns most recent month's values
    - Calculates month-over-month change

get_yoy_growth_rate() → float
    - Computes average year-over-year growth
    - Uses Type1_Admissions as reference

get_total_records_count() → int
    - Returns total row count from CSV
```

**Output Schema:**
```python
{
    "Month": datetime,
    "Type1_Admissions": int,
    "Type2_Admissions": int,
    "Other_Admissions": int,
    "Other_Emergency": int,
    "Wait_12hrs": int,
    "Total_Admissions": int  # Derived: sum of all admission types
}
```

---

### 2. Feature Engineer (`feature_engineering.py`)

**Purpose:** Transform raw time series into ML-ready features with lags, rolling statistics, and seasonality encoding.

**Configuration:**
```python
LAGS = [1, 2, 3, 6, 12]          # 5 lag features
ROLLING_WINDOWS = [3, 6, 12]     # 6 rolling statistics (mean + std)
```

**Generated Features (23 per metric):**

| Category | Features | Count |
|----------|----------|-------|
| **Other Metrics** | All other 5 metrics as predictors | 5 |
| **Time Features** | time_index, month_num, quarter, year, month_sin, month_cos | 6 |
| **Lag Features** | target_lag_1, target_lag_2, target_lag_3, target_lag_6, target_lag_12 | 5 |
| **Rolling Mean** | target_rolling_mean_3, target_rolling_mean_6, target_rolling_mean_12 | 3 |
| **Rolling Std** | target_rolling_std_3, target_rolling_std_6, target_rolling_std_12 | 3 |
| **YoY Change** | target_yoy_change (t - t-12) | 1 |
| **Total** | | **23** |

**Key Methods:**
```python
create_features(df, target_col) → (X, y)
    - Input: Historical dataframe + target column
    - Output: Feature matrix X (23 cols) + target y
    - Drops first 12 rows due to lag/rolling requirements

create_prediction_features(df, target_col, predictions) → X_next
    - Input: Historical data + existing predictions
    - Output: Single row of 23 features for next month
    - Used in recursive forecasting loop
```

---

### 3. Model Trainer (`model_trainer.py`)

**Purpose:** Train and persist XGBoost models for each metric with validation.

**XGBoost Hyperparameters:**
```python
XGBOOST_PARAMS = {
    "n_estimators": 200,        # Number of boosting rounds
    "max_depth": 5,             # Tree depth
    "learning_rate": 0.1,       # Step size
    "objective": "reg:squarederror",
    "random_state": 42
}
```

**Training Process:**
```python
1. Load aggregated data (94 months)
2. For each metric:
    a. Generate 23 features from historical data
    b. Train XGBoost on full dataset (82 samples after lag removal)
    c. Validate on last 12 months (time series split)
    d. Calculate accuracy metrics (MAE, RMSE, MAPE, R²)
    e. Save model + feature_columns + accuracy_metrics to .pkl
3. Log feature importances (top 10)
```

**Model Persistence:**
```python
joblib.dump({
    'model': xgb_model,
    'feature_columns': list of 23 column names,
    'metric_name': str,
    'accuracy_metrics': {
        'mae': float,
        'rmse': float,
        'mape': float,
        'r2': float,
        'mbe': float,
        'nrmse': float,
        'sample_size': int
    }
}, 'models/{model_key}_model.pkl')
```

---

### 4. Predictor (`predictor.py`)

**Purpose:** Generate multi-step recursive forecasts using trained models.

**Recursive Forecasting Algorithm:**
```python
def forecast_metric(target_col, horizon):
    predictions = []
    current_data = historical_data.copy()
    
    for step in range(horizon):
        # 1. Generate features for next month
        features = create_prediction_features(
            current_data, 
            target_col, 
            predictions
        )
        
        # 2. Predict next value
        pred = model.predict(features)[0]
        pred = max(0, pred)  # Ensure non-negative
        predictions.append(pred)
        
        # 3. Append prediction to historical data
        next_month = current_data['Month'].max() + 1 month
        new_row = {
            'Month': next_month,
            target_col: pred,
            # Other metrics: use latest known values
        }
        current_data = pd.concat([current_data, new_row])
    
    return predictions
```

**Output Enhancement:**
```python
generate_full_forecast(metric_names, horizon) → dict
    - Historical data (all 94 months)
    - Forecasted data (horizon months)
    - Yearly aggregates:
        ├─► Year 1 total (months 1-12)
        ├─► Year 2 total (months 13-24)
        └─► Year 3 total (months 25-36)
```

---

### 5. Model Evaluator (`model_evaluation.py`)

**Purpose:** Calculate and interpret model accuracy metrics.

**Metrics Calculated:**

| Metric | Formula | Interpretation |
|--------|---------|----------------|
| **MAE** | mean(\|y_true - y_pred\|) | Average absolute error |
| **RMSE** | sqrt(mean((y_true - y_pred)²)) | Penalizes large errors |
| **MAPE** | mean(\|y_true - y_pred\| / y_true) × 100 | Percentage error |
| **R²** | 1 - SS_res / SS_tot | Variance explained (0-1) |
| **MBE** | mean(y_pred - y_true) | Bias direction |
| **NRMSE** | RMSE / mean(y_true) × 100 | Normalized RMSE |

**Validation Method:**
```python
time_series_split_validate(df, target, test_size=12):
    1. Split: Train on first 82 months, test on last 12
    2. Retrain model on training data only
    3. Generate features for test set using actual historical data
    4. Predict test set values
    5. Calculate all metrics
    6. Return metrics + predictions + actuals
```

**Interpretation Logic:**
```python
R² Score:
    > 0.9: "Excellent model fit"
    > 0.7: "Good model fit"
    > 0.5: "Moderate model fit"
    else:  "Poor model fit"

MAPE:
    < 5%:  "Highly accurate forecasts"
    < 10%: "Good forecast accuracy"
    < 20%: "Acceptable forecast accuracy"
    else:  "Forecast accuracy needs improvement"

MBE:
    > 0: "Model tends to over-predict"
    < 0: "Model tends to under-predict"
    else: "Model is unbiased"
```

---

## API Endpoints

### Base URL
```
Local: http://localhost:5000
Production: https://your-render-url.onrender.com
```

### 1. Root Endpoint
```http
GET /
```

**Response:**
```json
{
  "message": "NHS A&E Forecasting API",
  "version": "1.0.0",
  "docs": "/docs",
  "health": "/health",
  "endpoints": {
    "GET /health": "Check API health status",
    "GET /metrics": "Get dashboard KPI metrics",
    "POST /predict": "Generate forecasts",
    "GET /model-accuracy": "Get accuracy metrics for all models",
    "GET /model-accuracy/{metric_name}": "Get accuracy for specific model"
  }
}
```

---

### 2. Health Check
```http
GET /health
```

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-02T22:30:45.123456",
  "models_loaded": {
    "type1": true,
    "type2": true,
    "other": true,
    "other_emergency": true,
    "total": true,
    "wait": true
  },
  "data_loaded": true
}
```

---

### 3. Dashboard Metrics
```http
GET /metrics
```

**Response:**
```json
{
  "hospitals": {
    "label": "Hospitals Covered",
    "value": "213",
    "change": "Per month (aggregated)",
    "icon": "LocalHospital"
  },
  "records": {
    "label": "Historical Records",
    "value": "20,003",
    "change": "Monthly data points",
    "icon": "Storage"
  },
  "latestAttendance": {
    "label": "Latest Month Type 1 Admissions",
    "value": "395.2K",
    "change": "+2.3% MoM",
    "icon": "People"
  },
  "growthRate": {
    "label": "Average Annual Growth Rate",
    "value": "3.5%",
    "change": "Year-over-year",
    "icon": "TrendingUp"
  },
  "forecastYear1": {
    "label": "Forecasted Year 1 Type 1 Admissions",
    "value": "4.7M",
    "change": "Projected 36-month",
    "icon": "Visibility"
  }
}
```

---

### 4. Generate Forecast
```http
POST /predict
Content-Type: application/json
```

**Request Body:**
```json
{
  "metrics": [
    "Type1_Admissions",
    "Type2_Admissions",
    "Other_Admissions",
    "Other_Emergency",
    "Total_Admissions",
    "Wait_12hrs"
  ],
  "forecast_horizon": 36
}
```

**Parameters:**
- `metrics` (required): Array of metric names to forecast
  - Available: `Type1_Admissions`, `Type2_Admissions`, `Other_Admissions`, `Other_Emergency`, `Total_Admissions`, `Wait_12hrs`
- `forecast_horizon` (optional): Number of months (1-60, default: 36)

**Response:**
```json
{
  "forecast_generated_at": "2026-03-02T22:35:12.456789",
  "horizon_months": 36,
  "historical_data": {
    "months": ["2018-04", "2018-05", ..., "2026-01"],
    "Type1_Admissions": {
      "values": [382140, 385220, ..., 395180]
    },
    "Type2_Admissions": {
      "values": [1200, 1180, ..., 1350]
    }
  },
  "forecast": {
    "dates": ["2026-02", "2026-03", ..., "2029-01"],
    "Type1_Admissions": {
      "values": [397000, 398500, ..., 410000]
    },
    "Type2_Admissions": {
      "values": [1360, 1370, ..., 1450]
    }
  },
  "yearly_aggregates": {
    "Type1_Admissions": {
      "year_1": 4752000,
      "year_2": 4850000,
      "year_3": 4925000
    },
    "Type2_Admissions": {
      "year_1": 16440,
      "year_2": 16680,
      "year_3": 16920
    }
  }
}
```

---

### 5. Model Accuracy (All Models)
```http
GET /model-accuracy
```

**Response:**
```json
{
  "models": {
    "Type1_Admissions": {
      "metric_name": "Type1_Admissions",
      "accuracy_metrics": {
        "mae": 5152.55,
        "rmse": 5841.25,
        "mape": 1.30,
        "r2": 0.7604,
        "mbe": 2641.29,
        "nrmse": 1.48,
        "sample_size": 12
      },
      "interpretation": {
        "r2": "Good model fit",
        "mape": "Highly accurate forecasts",
        "mbe": "Model tends to over-predict"
      },
      "formatted_metrics": {
        "Mean Absolute Error (MAE)": "5,153",
        "Root Mean Squared Error (RMSE)": "5,841",
        "Mean Absolute Percentage Error (MAPE)": "1.30%",
        "R² Score": "0.7604",
        "Mean Bias Error (MBE)": "2,641",
        "Normalized RMSE (%)": "1.48%",
        "Sample Size": "12"
      }
    },
    "Type2_Admissions": { ... },
    "Other_Admissions": { ... },
    "Other_Emergency": { ... },
    "Total_Admissions": { ... },
    "Wait_12hrs": { ... }
  }
}
```

---

### 6. Model Accuracy (Specific Model)
```http
GET /model-accuracy/{metric_name}
```

**Example:**
```http
GET /model-accuracy/Type1_Admissions
```

**Response:** Same as single model object in `/model-accuracy` response.

---

### 7. Available Metrics
```http
GET /available-metrics
```

**Response:**
```json
{
  "metrics": [
    {
      "name": "Type1_Admissions",
      "label": "Type 1 Emergency Admissions",
      "description": "Major A&E departments (consultant-led 24/7)"
    },
    {
      "name": "Type2_Admissions",
      "label": "Type 2 Emergency Admissions",
      "description": "Single specialty A&E services (e.g., eye, dental)"
    },
    {
      "name": "Other_Admissions",
      "label": "Other A&E Department Admissions",
      "description": "Other A&E departments not classified as Type 1 or 2"
    },
    {
      "name": "Other_Emergency",
      "label": "Other Emergency Admissions",
      "description": "Emergency admissions not via A&E departments"
    },
    {
      "name": "Total_Admissions",
      "label": "Total Emergency Admissions",
      "description": "Sum of all admission types"
    },
    {
      "name": "Wait_12hrs",
      "label": "Patients Waiting 12+ Hours",
      "description": "Quality indicator - patients waiting over 12 hours"
    }
  ]
}
```

---

## Machine Learning Pipeline

### 1. Data Preprocessing
```python
Raw CSV (20,003 rows)
    ↓
Group by Month, sum metrics
    ↓
National-level data (94 months: 2018-04 to 2026-01)
    ↓
Feature engineering (23 features)
    ↓
Training data (82 samples after lag removal)
```

### 2. Model Training
```python
For each of 6 metrics:
    1. Split data: 70 months train, 12 months test
    2. Train XGBoost(n_estimators=200, max_depth=5)
    3. Validate on test set
    4. Calculate MAE, RMSE, MAPE, R², MBE, NRMSE
    5. Save model + metrics to disk
```

### 3. Prediction Process
```python
Input: metric_name, forecast_horizon
    ↓
Load trained model for metric
    ↓
Initialize: predictions = []
    ↓
For each month in horizon:
    1. Create features from history + predictions
    2. Predict next month value
    3. Append to predictions list
    4. Update historical data
    ↓
Return: forecasted values + yearly aggregates
```

---

## Model Performance

### Performance Summary (12-month validation set)

| Metric | MAE | RMSE | MAPE | R² | Status |
|--------|-----|------|------|----|----|
| **Type1_Admissions** | 5,153 | 5,841 | 1.30% | 0.76 | ✅ Good |
| **Type2_Admissions** | 46 | 52 | 3.41% | 0.27 | ⚠️ Moderate |
| **Other_Admissions** | 398 | 451 | 8.25% | 0.08 | ⚠️ Moderate |
| **Other_Emergency** | 3,489 | 5,323 | 2.64% | -0.07 | ⚠️ Needs Improvement |
| **Total_Admissions** | 1,713 | 2,313 | 0.33% | 0.98 | ✅ Excellent |
| **Wait_12hrs** | 4,153 | 5,529 | 8.57% | 0.65 | ✅ Moderate |

### Key Insights

**Best Performing Model:**
- **Total_Admissions**: R² = 0.98, MAPE = 0.33%
- Extremely accurate due to strong correlation with other metrics

**Good Performance:**
- **Type1_Admissions**: R² = 0.76, MAPE = 1.30%
- Main metric with large sample size and clear trends

**Areas for Improvement:**
- **Other_Emergency**: Negative R², indicating high variance
- **Other_Admissions**: Low R² of 0.08
- **Recommendation**: Collect more historical data or add external features

---

## Deployment

### Local Development
```bash
# Install dependencies
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt

# Run server
python run.py
# Server starts at http://localhost:5000
```

### Docker Deployment
```bash
# Build image
docker build -t nhs-forecasting-backend .

# Run container
docker run -p 5000:5000 nhs-forecasting-backend
```

### Docker Compose
```bash
cd backend
docker-compose up
```

### Render Deployment

1. **Prerequisites:**
   - GitHub repository connected to Render
   - `backend/` as root directory

2. **Configuration:**
   ```yaml
   # render.yaml
   services:
     - type: web
       name: nhs-forecasting-api
       env: python
       buildCommand: pip install -r requirements.txt
       startCommand: python run.py
       envVars:
         - key: PORT
           value: 5000
   ```

3. **Environment Variables:**
   - `PORT`: 5000 (default)
   - `PYTHON_VERSION`: 3.12.3

4. **Health Check:**
   - Endpoint: `/health`
   - Expected: 200 OK with JSON response

---

## Performance Considerations

### Optimization Strategies

1. **Model Loading:**
   - Models loaded once on startup (singleton pattern)
   - Cached in memory for fast prediction

2. **Data Processing:**
   - Pandas vectorized operations
   - NumPy for numerical computations

3. **API Response Time:**
   - Health check: < 50ms
   - Metrics: < 200ms
   - Prediction (36 months): < 2s
   - Model accuracy: < 100ms

4. **Memory Usage:**
   - Models: ~850KB total (6 models)
   - Data: ~1MB (94 monthly records)
   - Total RAM: < 512MB required

### Scalability

- **Horizontal Scaling:** Stateless API, can deploy multiple instances
- **Caching:** Consider Redis for frequently accessed forecasts
- **Database:** Current CSV solution suitable for < 100K records
- **Future:** Migrate to PostgreSQL/TimescaleDB for larger datasets

---

## Error Handling

### Common Errors

| Error | Status | Cause | Solution |
|-------|--------|-------|----------|
| Invalid metric name | 400 | Metric not in FORECAST_METRICS | Check `/available-metrics` |
| Horizon out of range | 400 | forecast_horizon < 1 or > 60 | Set between 1-60 |
| Model not found | 404 | Model file missing | Run `retrain_with_validation.py` |
| Validation metrics unavailable | 404 | Old model without accuracy | Retrain with validation enabled |
| Data loading failed | 500 | CSV file missing/corrupted | Verify `cleaned.csv` exists |
| Prediction failed | 500 | Feature mismatch | Retrain all models |

---

## Future Enhancements

### Planned Features
- [ ] Prophet model integration for comparison
- [ ] Confidence intervals for predictions
- [ ] External features (holidays, weather, COVID data)
- [ ] Multi-region forecasting (breakdown by Trust)
- [ ] Automated retraining pipeline (weekly/monthly)
- [ ] Model A/B testing framework
- [ ] Real-time data ingestion from NHS APIs
- [ ] Advanced visualizations (Plotly charts in API)

### Infrastructure
- [ ] PostgreSQL database for historical data
- [ ] Redis caching for forecast results
- [ ] Celery for background model training
- [ ] Prometheus + Grafana monitoring
- [ ] CI/CD pipeline (GitHub Actions)
- [ ] Load testing with Locust

---

## API Documentation

Interactive API documentation available at:
- **Swagger UI:** `http://localhost:5000/docs`
- **ReDoc:** `http://localhost:5000/redoc`

---

## Contact & Support

For issues, questions, or contributions:
- **GitHub:** [Your Repository URL]
- **Email:** [Your Email]
- **Documentation:** This file

---

**Last Updated:** March 2, 2026  
**Version:** 1.0.0  
**Author:** NHS A&E Forecasting Team
