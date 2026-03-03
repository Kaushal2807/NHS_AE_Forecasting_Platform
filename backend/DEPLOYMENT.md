# Backend Deployment Guide

Complete guide for deploying the NHS A&E Forecasting Backend to Render using Docker.

---

## 🐳 Docker Deployment to Render

### Prerequisites

1. **GitHub Account** - Your code must be in a GitHub repository
2. **Render Account** - Sign up at [render.com](https://render.com) (free tier available)
3. **Docker** - Install Docker Desktop for local testing (optional)

---

## 📋 Step-by-Step Deployment

### Step 1: Prepare Your Repository

Ensure your repository has these files in the `backend/` folder:
- ✅ `Dockerfile`
- ✅ `requirements.txt`
- ✅ `cleaned.csv` (your data file)
- ✅ `app/` folder with all Python modules
- ✅ `run.py`

### Step 2: Push to GitHub

```bash
# Add all files
git add .

# Commit changes
git commit -m "Add Docker support for backend deployment"

# Push to your repository
git push origin production  # or main
```

---

### Step 3: Deploy to Render

#### 3.1 Create New Web Service

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **"New +"** → **"Web Service"**
3. Connect your GitHub repository
4. Select your NHS A&E Forecasting repository

#### 3.2 Configure Service

Fill in the following settings:

**Basic Settings:**
- **Name:** `nhs-ae-forecasting-api` (or your preferred name)
- **Region:** Choose closest to your users (e.g., Frankfurt, Oregon)
- **Branch:** `production` (or `main`)
- **Root Directory:** `backend`

**Build Settings:**
- **Runtime:** `Docker`
- Render will automatically detect your `Dockerfile`

**Instance Type:**
- **Free** (for testing) - ⚠️ Spins down after 15 min inactivity
- **Starter ($7/month)** - Recommended for production (always on)
- **Standard** - For high traffic

**Environment Variables:**
- No environment variables needed for basic setup
- (Optional) Add `LOG_LEVEL=INFO` if you want detailed logs

#### 3.3 Advanced Settings (Optional)

**Health Check Path:** `/health`
- Render will ping this endpoint to verify service is running

**Auto-Deploy:** Enable
- Automatically redeploys when you push to GitHub

#### 3.4 Deploy

1. Click **"Create Web Service"**
2. ⏳ Render will build your Docker image (5-10 minutes first time)
3. ✅ Once deployed, you'll get a URL like:
   ```
   https://nhs-ae-forecasting-api.onrender.com
   ```

---

### Step 4: Verify Deployment

Test your deployed API:

```bash
# Replace with your Render URL
RENDER_URL="https://nhs-ae-forecasting-api.onrender.com"

# Health check
curl $RENDER_URL/health

# Get metrics
curl $RENDER_URL/metrics

# Test prediction
curl -X POST $RENDER_URL/predict \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": ["Type1_Admissions"],
    "forecast_horizon": 36
  }'
```

**Expected Response:** JSON data with forecasts

---

### Step 5: Connect Frontend to Backend

#### 5.1 Update Frontend Environment Variable

**For Local Development (`frontend/.env.local`):**
```bash
VITE_API_BASE_URL=https://nhs-ae-forecasting-api.onrender.com
```

**For Vercel Deployment:**
1. Go to **Vercel Dashboard** → Your Project → **Settings** → **Environment Variables**
2. Add/Update:
   - **Key:** `VITE_API_BASE_URL`
   - **Value:** `https://nhs-ae-forecasting-api.onrender.com` (your Render URL)
   - **Environment:** Production, Preview, Development (select all)
3. Click **Save**
4. **Redeploy** your frontend:
   - Go to **Deployments** tab
   - Click **"..." menu** on latest deployment → **Redeploy**

#### 5.2 Test Integration

1. Visit your frontend URL (e.g., `https://your-app.vercel.app`)
2. Check the **Key Metrics** section on landing page - should show real data
3. Navigate to **Prediction Page** (when implemented) - should connect to backend

---

## 🧪 Local Docker Testing (Before Deploying)

Test your Docker setup locally before deploying:

### Using Docker Compose

```bash
# Navigate to backend directory
cd backend

# Build and start container
docker-compose up --build

# API will be available at http://localhost:5000
```

### Using Docker CLI

```bash
# Build image
docker build -t nhs-forecasting-api .

# Run container
docker run -p 5000:5000 \
  --name nhs-api \
  nhs-forecasting-api

# Test
curl http://localhost:5000/health
```

### Stop Containers

```bash
# Docker Compose
docker-compose down

# Docker CLI
docker stop nhs-api
docker rm nhs-api
```

---

## ⚙️ Render Configuration Options

### Environment Variables

Add these in Render dashboard if needed:

| Variable | Purpose | Default |
|----------|---------|---------|
| `PORT` | Server port | 5000 |
| `LOG_LEVEL` | Logging verbosity | INFO |
| `CORS_ORIGINS` | Allowed origins | * (all) |

### Scaling

**Free Tier Limitations:**
- ⏰ Spins down after 15 minutes of inactivity
- 🐌 Cold start: 30-60 seconds on first request after sleep
- 💾 512 MB RAM
- 🔄 Shares CPU

**Starter+ Advantages:**
- ✅ Always running (no cold starts)
- ⚡ Faster response times
- 💪 Dedicated resources

---

## 🔄 Continuous Deployment

Once configured, updates are automatic:

```bash
# Make code changes
nano app/main.py

# Commit and push
git add .
git commit -m "Update API endpoints"
git push origin production

# Render automatically rebuilds and deploys (5-10 minutes)
```

---

## 📊 Monitoring

### Render Dashboard

1. **Logs:** Real-time logs in Render dashboard
   - Click your service → **Logs** tab
   - See startup logs, requests, errors

2. **Metrics:** CPU, memory, bandwidth usage
   - Click your service → **Metrics** tab

3. **Events:** Deployment history
   - Click your service → **Events** tab

### Health Checks

Render pings `/health` endpoint every 30 seconds:
- ✅ Green: Service healthy
- 🔴 Red: Service down → Render auto-restarts

---

## 🐛 Troubleshooting

### Issue: Build Fails

**Error:** `Could not find requirements.txt`
- ✅ **Fix:** Ensure Root Directory is set to `backend` in Render settings

**Error:** `Package X not found`
- ✅ **Fix:** Add package to `requirements.txt` and redeploy

### Issue: Service Unhealthy

**Error:** Health check failing
- ✅ **Check logs** in Render dashboard
- ✅ Verify `/health` endpoint works locally
- ✅ Ensure `cleaned.csv` is included in Docker image

### Issue: Cold Starts (Free Tier)

**Problem:** First request after inactivity takes 30-60 seconds
- ✅ **Solution:** Upgrade to Starter plan ($7/month) for always-on service
- ⚡ **Workaround:** Use a cron job to ping API every 10 minutes (keeps it awake)

### Issue: Out of Memory

**Error:** Container killed (OOM)
- ✅ **Fix:** Upgrade instance type (more RAM)
- ✅ **Optimize:** Reduce model size or use lazy loading

### Issue: Frontend Can't Reach Backend

**Error:** CORS or network errors
- ✅ Verify `VITE_API_BASE_URL` is set correctly in Vercel
- ✅ Check CORS settings in `app/main.py` (should allow all origins: `["*"]`)
- ✅ Test backend directly with `curl` to isolate issue

---

## 🔐 Security Best Practices

### 1. Restrict CORS (Production)

Update `backend/app/config.py`:
```python
# Development
CORS_ORIGINS = ["*"]

# Production (replace with your frontend URL)
CORS_ORIGINS = [
    "https://your-app.vercel.app",
    "https://www.your-domain.com"
]
```

### 2. Add API Key Authentication (Optional)

For production, consider adding API key middleware:
```python
# In app/main.py
from fastapi import Header, HTTPException

async def verify_api_key(x_api_key: str = Header(...)):
    if x_api_key != os.getenv("API_KEY"):
        raise HTTPException(status_code=401, detail="Invalid API Key")
```

### 3. Rate Limiting (Optional)

Install slowapi:
```bash
pip install slowapi
```

Add to `app/main.py`:
```python
from slowapi import Limiter
from slowapi.util import get_remote_address

limiter = Limiter(key_func=get_remote_address)
app.state.limiter = limiter
```

---

## 💰 Cost Estimate

**Render Pricing:**
- **Free Tier:** $0/month (with limitations)
- **Starter:** $7/month (recommended for production)
- **Standard:** $25/month (high traffic)

**Recommendation:** Start with **Starter plan** for always-on, reliable service.

---

## 📚 Additional Resources

- **Render Docs:** https://render.com/docs
- **Docker Docs:** https://docs.docker.com/
- **FastAPI Deployment:** https://fastapi.tiangolo.com/deployment/

---

## ✅ Deployment Checklist

Before going to production:

- [ ] Backend deployed to Render successfully
- [ ] Health check endpoint working (`/health` returns 200)
- [ ] Test all API endpoints with real requests
- [ ] Frontend environment variable updated with backend URL
- [ ] Frontend redeployed with new backend URL
- [ ] Test end-to-end: frontend → backend integration
- [ ] Check CORS settings (allow your frontend domain)
- [ ] Monitor logs for any errors
- [ ] Consider upgrading to Starter plan (remove cold starts)
- [ ] Set up custom domain (optional)

---

**🎉 Your API is now live and ready to serve forecasts!**

Backend URL: `https://nhs-ae-forecasting-api.onrender.com`

Frontend integration: Update `VITE_API_BASE_URL` in Vercel and redeploy.

---

**Need Help?**
- Check Render logs for errors
- Review this guide's troubleshooting section
- Open an issue on GitHub

**Built with ❤️ using FastAPI, XGBoost, and Docker**
