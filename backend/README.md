# NHS A&E Forecasting Backend

**Machine Learning API for 36-Month NHS A&E Operational Forecasting**

This backend service provides AI-powered forecasting for NHS Accident & Emergency department metrics using XGBoost gradient boosting models with recursive multi-step prediction.

---

## 🚀 Quick Deploy to Render (Recommended)

**Docker deployment is ready!** Follow these steps:

1. **Push to GitHub:**
   ```bash
   git add .
   git commit -m "Deploy backend"
   git push origin production
   ```

2. **Deploy to Render:**
   - Sign up at [render.com](https://render.com)
   - Create **New Web Service** → Connect GitHub repo
   - Set **Root Directory:** `backend`
   - Set **Runtime:** Docker (auto-detected)
   - Click **Create Web Service**
   - ⏳ Wait 5-10 minutes for deployment
   - ✅ Get your URL: `https://your-service.onrender.com`

3. **Connect Frontend:**
   - Update `VITE_API_BASE_URL` in Vercel with your Render URL
   - Redeploy frontend

📚 **Detailed guide:** See [DEPLOYMENT.md](DEPLOYMENT.md)

---

## 🏗️ Architecture

**Tech Stack:**
- **Framework:** FastAPI (async, high-performance)
- **ML Model:** XGBoost (gradient boosting regressor)
- **Data Processing:** Pandas, NumPy
- **Deployment:** Uvicorn ASGI server

**Forecasting Approach:**
- **Type:** Panel/Multivariate Time Series
- **Aggregation:** National-level monthly totals across ~213 organizations
- **Method:** Recursive multi-step prediction with engineered features
- **Horizon:** Up to 60 months (default: 36 months = 3 years)

---

## 📊 Forecasted Metrics

The API can forecast three key metrics:

1. **Type1_Admissions** - Type 1 A&E Emergency Admissions (Major departments, consultant-led 24/7)
2. **Total_Admissions** - Total Emergency Admissions (sum of all types)
3. **Wait_12hrs** - Patients Waiting 12+ Hours (quality indicator)

---

## 🚀 Quick Start

### Prerequisites

- Python 3.9+ (recommended: 3.10 or 3.11)
- pip or conda for package management

### Installation

```bash
# Navigate to backend directory
cd backend

# Create virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt
```

### Running the API

```bash
# From the backend directory
python run.py
```

The API will:
1. Load and aggregate the cleaned.csv dataset
2. Train XGBoost models for each metric (if not already trained)
3. Start the server on `http://localhost:5000`

**First Run:** Model training takes ~30-60 seconds. Subsequent runs load pre-trained models instantly.

---

## 📡 API Endpoints

### Base URL
```
http://localhost:5000
```

### Interactive Documentation
- **Swagger UI:** http://localhost:5000/docs
- **ReDoc:** http://localhost:5000/redoc

---

### `GET /health`

Check API health and model status.

**Response:**
```json
{
  "status": "healthy",
  "timestamp": "2026-03-02T10:30:00",
  "models_loaded": {
    "type1": true,
    "total": true,
    "wait": true
  },
  "data_loaded": true
}
```

---

### `GET /metrics`

Get dashboard KPI metrics for frontend landing page.

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
    "value": "20,004",
    "change": "Monthly data points",
    "icon": "Storage"
  },
  "latestAttendance": {
    "label": "Latest Month Type 1 Admissions",
    "value": "85.2K",
    "change": "+3.2% MoM",
    "icon": "People"
  },
  "growthRate": {
    "label": "Average Annual Growth Rate",
    "value": "4.7%",
    "change": "Year-over-year",
    "icon": "TrendingUp"
  },
  "forecastYear1": {
    "label": "Forecasted Year 1 Type 1 Admissions",
    "value": "1.05M",
    "change": "Projected 36-month",
    "icon": "Visibility"
  }
}
```

---

### `POST /predict`

Generate forecasts for specified metrics.

**Request Body:**
```json
{
  "metrics": ["Type1_Admissions", "Total_Admissions", "Wait_12hrs"],
  "forecast_horizon": 36
}
```

**Parameters:**
- `metrics` (array, required): List of metrics to forecast
  - Available: `"Type1_Admissions"`, `"Total_Admissions"`, `"Wait_12hrs"`
- `forecast_horizon` (integer, optional): Number of months to forecast
  - Default: 36
  - Min: 1, Max: 60

**Response:**
```json
{
  "forecast_generated_at": "2026-03-02T10:30:00",
  "horizon_months": 36,
  "historical_data": {
    "months": ["2018-04", "2018-05", ..., "2026-01"],
    "Type1_Admissions": [85000, 87000, ..., 92000],
    "Total_Admissions": [120000, 122000, ..., 128000],
    "Wait_12hrs": [1200, 1250, ..., 1400]
  },
  "forecast": {
    "months": ["2026-02", "2026-03", ..., "2029-01"],
    "Type1_Admissions": [93000, 94000, ..., 105000],
    "Total_Admissions": [129000, 130000, ..., 145000],
    "Wait_12hrs": [1420, 1440, ..., 1600]
  },
  "yearly_aggregates": {
    "Type1_Admissions": {
      "year_1": 1050000,
      "year_2": 1080000,
      "year_3": 1110000
    },
    "Total_Admissions": {
      "year_1": 1450000,
      "year_2": 1490000,
      "year_3": 1530000
    },
    "Wait_12hrs": {
      "year_1": 17000,
      "year_2": 17500,
      "year_3": 18000
    }
  }
}
```

---

### `GET /available-metrics`

Get list of all available metrics with descriptions.

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

## 🧠 Machine Learning Model Details

### Feature Engineering

For each metric, the model uses:

**Lag Features:**
- Past 1, 2, 3, 6, and 12 months values

**Rolling Statistics:**
- 3-month, 6-month, 12-month moving averages and standard deviations

**Trend Features:**
- Year-over-year change (12-month difference)

**Seasonality Features:**
- Month number (1-12)
- Quarter (1-4)
- Sine/cosine encoding of month (cyclical)

**Time Index:**
- Months since start (0, 1, 2, ...)

### Model Hyperparameters

```python
XGBoost Parameters:
- n_estimators: 200
- max_depth: 5
- learning_rate: 0.1
- subsample: 0.8
- colsample_bytree: 0.8
- objective: 'reg:squarederror'
```

### Training Process

1. **Data Aggregation:** Monthly data aggregated to national totals (~94 months from April 2018 to January 2026)
2. **Feature Creation:** Engineered features generated for each metric
3. **Model Training:** One XGBoost model per metric trained on all available data
4. **Model Saving:** Trained models saved to `/backend/models/` as `.pkl` files

### Recursive Forecasting

For multi-step ahead predictions:
1. Start with latest historical values
2. For each future month:
   - Construct features using past data + predictions so far
   - Predict next month
   - Append prediction to series
   - Update lags and rolling windows
3. Repeat for specified horizon (up to 60 months)

---

## 📁 Project Structure

```
backend/
├── app/
│   ├── __init__.py           # Package initialization
│   ├── config.py             # Configuration and constants
│   ├── data_loader.py        # CSV loading and aggregation
│   ├── feature_engineering.py # Feature creation logic
│   ├── model_trainer.py      # XGBoost training
│   ├── predictor.py          # Recursive forecasting
│   ├── schemas.py            # Pydantic request/response models
│   └── main.py               # FastAPI application
├── models/                   # Trained models (auto-generated)
│   ├── type1_model.pkl
│   ├── total_model.pkl
│   └── wait_model.pkl
├── cleaned.csv               # NHS A&E dataset
├── requirements.txt          # Python dependencies
├── run.py                    # Entry point script
├── .gitignore               # Git ignore rules
└── README.md                # This file
```

---

## 🧪 Testing the API

### Using cURL

**Health Check:**
```bash
curl http://localhost:5000/health
```

**Get Metrics:**
```bash
curl http://localhost:5000/metrics
```

**Generate Forecast:**
```bash
curl -X POST http://localhost:5000/predict \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": ["Type1_Admissions", "Total_Admissions"],
    "forecast_horizon": 36
  }'
```

### Using Python

```python
import requests

# Generate forecast
response = requests.post(
    'http://localhost:5000/predict',
    json={
        'metrics': ['Type1_Admissions'],
        'forecast_horizon': 36
    }
)

forecast = response.json()
print(f"Year 1 forecast: {forecast['yearly_aggregates']['Type1_Admissions']['year_1']:,}")
```

---

## 🔧 Configuration

Edit `app/config.py` to customize:

- **LAGS:** Lag features to create (default: [1, 2, 3, 6, 12])
- **ROLLING_WINDOWS:** Rolling window sizes (default: [3, 6, 12])
- **XGBOOST_PARAMS:** Model hyperparameters
- **MAX_FORECAST_HORIZON:** Maximum allowed forecast months (default: 60)
- **CORS_ORIGINS:** Allowed frontend origins (default: ["*"])

---

## 🚢 Deployment

### Railway / Render / AWS

1. Push backend code to GitHub
2. Create new web service
3. Set build command:
   ```bash
   pip install -r requirements.txt
   ```
4. Set start command:
   ```bash
   python run.py
   ```
5. Expose port: 5000

### Docker (Optional)

Create `Dockerfile`:
```dockerfile
FROM python:3.10-slim

WORKDIR /app

COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

COPY . .

EXPOSE 5000

CMD ["python", "run.py"]
```

Build and run:
```bash
docker build -t nhs-forecasting-api .
docker run -p 5000:5000 nhs-forecasting-api
```

---

## 📊 Data Source

**File:** `cleaned.csv`

**Structure:**
- 20,004 monthly records (unlabeled organizations)
- Date range: April 2018 - January 2026 (~94 months)
- ~213 organizations per month (aggregated to national totals)

**Columns:**
- Patients who have waited 12+ hrs from DTA to admission
- Emergency admissions via A&E - Type 1
- Emergency admissions via A&E - Type 2
- Emergency admissions via A&E - Other A&E department
- Other emergency admissions
- Month (M/D/YYYY format)

---

## 🐛 Troubleshooting

**Issue:** "Model file not found"
- **Solution:** Delete `models/` folder and restart API to retrain models

**Issue:** "Data loading failed"
- **Solution:** Ensure `cleaned.csv` exists in backend directory with correct format

**Issue:** "Port 5000 already in use"
- **Solution:** Change port in `run.py` or kill process using port 5000

**Issue:** Slow predictions
- **Solution:** Pre-train models by running API once, then use cached models

---

## 📝 Logs

Logs are printed to console with:
- Data loading progress
- Model training status
- Feature engineering details
- Prediction requests
- Error messages

---

## 🤝 Integration with Frontend

**Environment Variable:**

In `frontend/.env`:
```
VITE_API_BASE_URL=http://localhost:5000
```

**Production:**
```
VITE_API_BASE_URL=https://your-backend-url.com
```

No code changes needed - API calls are centralized in `frontend/src/utils/api.js`.

---

## 📄 License

This is a portfolio/demonstration project.

---

## 👤 Author

**Kaushal**
- GitHub: [@Kaushal2807](https://github.com/Kaushal2807)

---

**Built with ❤️ using FastAPI, XGBoost, and Python**
