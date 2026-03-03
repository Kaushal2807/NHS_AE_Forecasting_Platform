# Deployment Guide

## Backend Deployment (Render) ✅ COMPLETE

Your backend is already deployed at: **https://nhs-backend-api.onrender.com**

### Backend Status
- FastAPI service running on Render
- Docker container deployed
- All 6 ML models loaded and ready
- CORS configured for frontend access

---

## Frontend Deployment (Vercel)

### Prerequisites
1. Vercel account (sign up at https://vercel.com)
2. GitHub repository connected
3. Backend URL: `https://nhs-backend-api.onrender.com`

### Step 1: Install Vercel CLI (Optional)
```bash
npm install -g vercel
```

### Step 2: Deploy via GitHub (Recommended)

1. **Push your code to GitHub** (if not already done):
   ```bash
   git push origin production
   ```

2. **Go to Vercel Dashboard**:
   - Visit https://vercel.com/dashboard
   - Click "Add New Project"
   - Import your GitHub repository

3. **Configure Project Settings**:
   - **Framework Preset**: Vite
   - **Root Directory**: `./` (or leave empty)
   - **Build Command**: `cd frontend && npm install && npm run build`
   - **Output Directory**: `frontend/dist`
   - **Install Command**: `npm install` (or leave default)

4. **Add Environment Variables**:
   Click "Environment Variables" and add:
   ```
   VITE_API_BASE_URL = https://nhs-backend-api.onrender.com
   VITE_APP_NAME = NHS A&E Forecasting Platform
   ```
   
   Apply to: **Production**, **Preview**, and **Development**

5. **Deploy**:
   - Click "Deploy"
   - Wait 2-3 minutes for build to complete
   - Your app will be live at: `https://your-project-name.vercel.app`

### Step 3: Configure Custom Domain (Optional)
1. Go to Project Settings → Domains
2. Add your custom domain
3. Update DNS records as instructed by Vercel

---

## Alternative: Deploy via Vercel CLI

```bash
# Login to Vercel
vercel login

# Deploy from project root
vercel

# Follow prompts:
# - Set up and deploy? Yes
# - Which scope? [Your account]
# - Link to existing project? No
# - Project name? nhs-forecasting-platform
# - Directory? ./frontend
# - Override settings? Yes
# - Build Command? npm run build
# - Output Directory? dist
# - Development Command? npm run dev

# Set environment variables
vercel env add VITE_API_BASE_URL production
# Enter: https://nhs-backend-api.onrender.com

# Deploy to production
vercel --prod
```

---

## Post-Deployment Checklist

### Frontend
- [ ] Site loads successfully
- [ ] Landing page displays correctly
- [ ] Metrics dashboard shows data from backend
- [ ] Prediction page loads
- [ ] Can select metrics and generate forecasts
- [ ] Yearly projections display correctly
- [ ] Model accuracy shows percentages

### Backend Integration
- [ ] API calls go to production backend (not localhost)
- [ ] Health check works: `https://nhs-backend-api.onrender.com/health`
- [ ] Metrics endpoint works: `https://nhs-backend-api.onrender.com/metrics`
- [ ] Prediction endpoint works
- [ ] Model accuracy endpoint works
- [ ] CORS allows requests from Vercel domain

### Testing
```bash
# Test backend health
curl https://nhs-backend-api.onrender.com/health

# Test metrics
curl https://nhs-backend-api.onrender.com/metrics

# Test prediction
curl -X POST https://nhs-backend-api.onrender.com/predict \
  -H "Content-Type: application/json" \
  -d '{"metrics": ["Type1_Admissions"], "forecast_horizon": 36}'
```

---

## Troubleshooting

### Build Fails on Vercel
1. Check Build Command is correct: `cd frontend && npm install && npm run build`
2. Ensure `frontend/dist` exists after build
3. Check Node.js version (should be 18.x or later)

### API Calls Fail
1. Verify environment variable: `VITE_API_BASE_URL` is set correctly
2. Check browser console for CORS errors
3. Ensure backend is running: visit `https://nhs-backend-api.onrender.com/health`

### White Screen After Deploy
1. Check browser console for errors
2. Verify build output directory: `frontend/dist`
3. Check vercel.json rewrites configuration

### Environment Variables Not Working
1. Ensure variable name starts with `VITE_`
2. Redeploy after adding variables
3. Check they're applied to Production environment

---

## Environment Files

### For Production (Vercel)
Use Vercel Environment Variables dashboard - no `.env` file needed

### For Local Development
```bash
# frontend/.env.local
VITE_API_BASE_URL=http://localhost:5000
VITE_APP_NAME=NHS A&E Forecasting Platform
```

---

## URLs

- **Frontend (Vercel)**: https://your-project.vercel.app
- **Backend (Render)**: https://nhs-backend-api.onrender.com
- **Backend Docs**: https://nhs-backend-api.onrender.com/docs
- **Backend Health**: https://nhs-backend-api.onrender.com/health

---

## Performance Optimization

### Already Implemented
- ✅ Production backend with fast response times
- ✅ Efficient XGBoost models
- ✅ Docker containerization
- ✅ CORS optimization
- ✅ Vite build optimization

### Future Improvements
- Add Redis caching for predictions
- Implement CDN for static assets
- Add service worker for offline support
- Optimize images with next-gen formats

---

## Monitoring

### Backend (Render)
- Check logs: Render Dashboard → Your Service → Logs
- Monitor health: https://nhs-backend-api.onrender.com/health

### Frontend (Vercel)
- Check deployments: Vercel Dashboard → Projects → Deployments
- Monitor analytics: Vercel Dashboard → Analytics
- Check logs: Deployment → Logs tab

---

## Support

For issues:
1. Check Vercel deployment logs
2. Check Render backend logs
3. Test API endpoints directly
4. Verify environment variables
5. Check browser console for frontend errors

Happy Deploying! 🚀
