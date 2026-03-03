# 🚀 Quick Start Guide - NHS A&E Forecasting Platform

Complete deployment guide for both frontend and backend.

---

## 📋 Overview

This platform consists of:
- **Frontend:** React + Vite (deployed on Vercel)
- **Backend:** FastAPI + XGBoost (deployed on Render with Docker)

---

## 🎯 Deployment Steps

### Step 1: Deploy Backend to Render ⚙️

1. **Push code to GitHub:**
   ```bash
   cd /home/kaushal/Desktop/NHS_A&E_Forecasting_Platform
   git add .
   git commit -m "Complete backend implementation with Docker"
   git push origin production
   ```

2. **Create Render Service:**
   - Go to https://render.com and sign up/login
   - Click **"New +"** → **"Web Service"**
   - Connect your GitHub repository
   - Select the NHS A&E Forecasting repository

3. **Configure Service:**
   ```
   Name:           nhs-ae-forecasting-api
   Region:         Frankfurt (or nearest)
   Branch:         production
   Root Directory: backend
   Runtime:        Docker (auto-detected)
   Instance Type:  Starter ($7/month) or Free
   ```

4. **Deploy:**
   - Click **"Create Web Service"**
   - Wait 5-10 minutes for build
   - ✅ Copy your backend URL: `https://nhs-ae-forecasting-api.onrender.com`

### Step 2: Update Frontend Environment Variable 🔗

1. **Go to Vercel:**
   - Open https://vercel.com/dashboard
   - Select your NHS A&E project
   - Go to **Settings** → **Environment Variables**

2. **Update/Add Variable:**
   ```
   Key:   VITE_API_BASE_URL
   Value: https://nhs-ae-forecasting-api.onrender.com
   Env:   Production, Preview, Development (all)
   ```

3. **Redeploy:**
   - Go to **Deployments** tab
   - Click latest deployment → **"..."** menu → **"Redeploy"**

### Step 3: Test Integration 🧪

1. **Open your frontend:** `https://your-app.vercel.app`
2. **Check Key Metrics section** - should load real data from backend
3. **Open browser console** - verify no API errors
4. **Test endpoints directly:**
   ```bash
   curl https://nhs-ae-forecasting-api.onrender.com/health
   curl https://nhs-ae-forecasting-api.onrender.com/metrics
   ```

---

## 🖥️ Local Development

### Backend Setup

```bash
# Navigate to backend
cd backend

# Create virtual environment
python3 -m venv venv
source venv/bin/activate  # Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Run server
python run.py

# API available at: http://localhost:5000
# Docs: http://localhost:5000/docs
```

### Frontend Setup

```bash
# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Create .env.local (if not exists)
cp .env.example .env.local

# Update .env.local
echo "VITE_API_BASE_URL=http://localhost:5000" > .env.local

# Run development server
npm run dev

# Frontend available at: http://localhost:5173
```

### Test Local Integration

1. Start backend: `cd backend && python run.py`
2. Start frontend: `cd frontend && npm run dev`
3. Open http://localhost:5173
4. Check Key Metrics section for real data

---

## 🐳 Docker Testing (Optional)

Test Docker setup locally before deploying:

```bash
cd backend

# Build and run
docker-compose up --build

# Test
curl http://localhost:5000/health

# Stop
docker-compose down
```

---

## 📊 Backend API Endpoints

Once deployed, your backend provides:

| Endpoint | Method | Description |
|----------|--------|-------------|
| `/health` | GET | Health check and model status |
| `/metrics` | GET | Dashboard KPI metrics |
| `/predict` | POST | Generate forecasts (1-60 months) |
| `/available-metrics` | GET | List available metrics |
| `/docs` | GET | Interactive API documentation |

**Example Request:**
```bash
curl -X POST https://your-backend-url.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{
    "metrics": ["Type1_Admissions", "Total_Admissions"],
    "forecast_horizon": 36
  }'
```

---

## 🎨 Frontend URLs

- **Production:** `https://your-app.vercel.app`
- **Local Dev:** `http://localhost:5173`
- **API Docs:** `https://your-backend-url.onrender.com/docs`

---

## ✅ Deployment Checklist

### Backend
- [ ] Code pushed to GitHub
- [ ] Render service created
- [ ] Docker build successful
- [ ] Health check passing (`/health` returns 200)
- [ ] Backend URL copied

### Frontend
- [ ] `VITE_API_BASE_URL` updated in Vercel
- [ ] Frontend redeployed
- [ ] Key Metrics section shows real data
- [ ] No CORS errors in browser console

### Testing
- [ ] Test `/health` endpoint
- [ ] Test `/metrics` endpoint
- [ ] Test `/predict` endpoint
- [ ] Verify frontend loads backend data
- [ ] Check all pages load without errors

---

## 🐛 Troubleshooting

### "Backend not responding"
- ✅ Check Render logs for errors
- ✅ Verify health check is passing
- ✅ Test backend URL directly with curl

### "CORS errors in frontend"
- ✅ Verify `VITE_API_BASE_URL` is correct in Vercel
- ✅ Check CORS settings in `backend/app/config.py`
- ✅ Ensure backend allows frontend origin

### "Cold starts (Free tier)"
- ⚠️ Render Free tier sleeps after 15 min inactivity
- ⏰ First request takes 30-60 seconds
- 💡 Solution: Upgrade to Starter ($7/month) for always-on

### "Frontend shows old data"
- ✅ Hard refresh: Ctrl+Shift+R (Chrome) or Cmd+Shift+R (Mac)
- ✅ Clear browser cache
- ✅ Check Vercel deployment used latest code

---

## 💰 Cost Breakdown

### Recommended Setup (Production)

| Service | Plan | Cost | Purpose |
|---------|------|------|---------|
| **Vercel** | Hobby | $0 | Frontend hosting |
| **Render** | Starter | $7/month | Backend API (always-on) |
| **GitHub** | Free | $0 | Code repository |
| **Total** | | **$7/month** | |

### Budget Setup (Testing)

| Service | Plan | Cost | Notes |
|---------|------|------|-------|
| **Vercel** | Hobby | $0 | Frontend hosting |
| **Render** | Free | $0 | Sleeps after 15 min |
| **Total** | | **$0** | Cold starts |

---

## 📚 Documentation

- **Backend README:** [`backend/README.md`](backend/README.md)
- **Deployment Guide:** [`backend/DEPLOYMENT.md`](backend/DEPLOYMENT.md)
- **Main README:** [`README.md`](README.md)

---

## 🎓 Architecture

```
┌─────────────────────────────────────────────────┐
│                    User Browser                  │
│           https://your-app.vercel.app            │
└───────────────────┬─────────────────────────────┘
                    │
                    │ HTTPS Requests
                    │
┌───────────────────▼─────────────────────────────┐
│              Vercel (Frontend)                   │
│         React + Vite + Material-UI               │
│                                                  │
│  - Landing Page                                  │
│  - Prediction Page                               │
│  - Charts & Visualizations                       │
└───────────────────┬─────────────────────────────┘
                    │
                    │ API Calls
                    │ VITE_API_BASE_URL
                    │
┌───────────────────▼─────────────────────────────┐
│           Render (Backend - Docker)              │
│    https://nhs-ae-forecasting-api.onrender.com  │
│                                                  │
│  FastAPI + XGBoost + Pandas                      │
│  - /health                                       │
│  - /metrics                                      │
│  - /predict                                      │
│                                                  │
│  Machine Learning Models:                        │
│  - Type1_Admissions.pkl                          │
│  - Total_Admissions.pkl                          │
│  - Wait_12hrs.pkl                                │
│                                                  │
│  Data: cleaned.csv (20K+ records)                │
└──────────────────────────────────────────────────┘
```

---

## 🔄 Update Workflow

When you make changes:

```bash
# 1. Make changes
nano backend/app/main.py

# 2. Commit and push
git add .
git commit -m "Update API logic"
git push origin production

# 3. Automatic deployment
# - Render: Auto-deploys backend (5-10 min)
# - Vercel: Auto-deploys frontend (2-3 min)

# 4. Verify
# - Check Render logs
# - Test frontend
```

---

## ✨ Next Steps

After successful deployment:

1. **Test thoroughly** - Try all features
2. **Monitor logs** - Check for errors
3. **Optimize performance** - Profile API response times
4. **Add features:**
   - Prediction interface in frontend
   - Multiple organization support
   - Confidence intervals
   - CSV export
   - Historical comparison charts

5. **Consider enhancements:**
   - Custom domain
   - API authentication
   - Rate limiting
   - Caching layer (Redis)
   - Database for storing predictions

---

## 🆘 Need Help?

1. **Check logs:**
   - Render: Dashboard → Your Service → Logs
   - Vercel: Dashboard → Your Project → Deployments → View Function Logs

2. **Test endpoints:**
   - Use Swagger UI: `https://your-backend.onrender.com/docs`
   - Use curl or Postman

3. **Review documentation:**
   - Backend: `backend/README.md`
   - Deployment: `backend/DEPLOYMENT.md`

---

**🎉 Congratulations! Your NHS A&E Forecasting Platform is now live!**

🌐 Frontend: https://your-app.vercel.app
🔧 Backend: https://nhs-ae-forecasting-api.onrender.com
📚 API Docs: https://nhs-ae-forecasting-api.onrender.com/docs

---

**Built with ❤️ using React, FastAPI, XGBoost, and Docker**
