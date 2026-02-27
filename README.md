# NHS A&E Forecasting Platform

**AI-Powered 36-Month Predictive Analytics for Emergency Department Operations**

This platform implements a multivariate panel time-series forecasting engine for NHS A&E operational metrics using gradient boosting models and recursive multi-step prediction, deployed with a minimal production API architecture.

---

## 📋 Project Overview

A comprehensive machine learning system that forecasts:
- Total A&E Attendance
- Attendance by Department Type
- Attendances Over 4 Hours
- Emergency Admissions
- 36-Month future projections with year-wise aggregated forecasts

---

## 🏗️ Repository Structure

```
NHS_A&E_Forecasting_Platform/
├── frontend/          # React.js frontend application
├── backend/           # Machine Learning API (coming soon)
├── vercel.json        # Vercel deployment configuration
└── README.md          # This file
```

**Note:** All development code is in the `production` branch. The `main` branch is reserved for future use.

---

## 🚀 Quick Start

### Prerequisites
- Node.js v18+ and npm (install via [nvm](https://github.com/nvm-sh/nvm))
- Git

### Setup

```bash
# Clone the repository
git clone <your-repo-url>
cd NHS_A&E_Forecasting_Platform

# Switch to production branch
git checkout production

# Navigate to frontend
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:5173`

---

## 🎨 Tech Stack

### Frontend
- **Framework:** React 18 with Vite
- **UI Library:** Material-UI (MUI) v6
- **Styling:** Tailwind CSS v3
- **Routing:** React Router v6
- **Charts:** Recharts
- **HTTP Client:** Axios

### Backend (Coming Soon)
- **Framework:** Flask or FastAPI
- **ML Model:** XGBoost-based panel forecasting
- **Deployment:** Cloud-hosted API

---

## 📦 Available Scripts

### Frontend

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build locally
npm run lint         # Run ESLint
```

---

## 🌐 Deployment

This project is configured for deployment on **Vercel** from the `production` branch.

### Deploy via Vercel Dashboard

1. Go to [vercel.com](https://vercel.com)
2. Import your GitHub repository
3. Configure settings:
   - **Framework Preset:** Vite
   - **Build Command:** `cd frontend && npm install && npm run build`
   - **Output Directory:** `frontend/dist`
   - **Production Branch:** `production`
4. Add environment variables:
   - `VITE_API_BASE_URL` → Your backend URL (placeholder for now)
5. Deploy

Every push to the `production` branch will automatically deploy.

---

## 🔧 Backend Integration

When the backend is ready:

1. Deploy backend to your hosting service (e.g., Railway, Render, AWS)
2. Copy the backend URL
3. Go to **Vercel Dashboard** → **Your Project** → **Settings** → **Environment Variables**
4. Update `VITE_API_BASE_URL` with your backend URL
5. **Redeploy** the frontend

**No code changes needed!** All API calls are centralized in `frontend/src/utils/api.js`.

### Expected Backend Endpoints

```
GET  /health      → Server health status
GET  /metrics     → Dashboard KPI metrics
POST /predict     → Forecasting predictions
```

---

## 📱 Responsive Design

The platform is fully responsive and optimized for:
- **Mobile:** 320px - 599px
- **Tablet:** 600px - 899px
- **Desktop:** 900px - 1199px
- **Large Desktop:** 1200px+

Minimum touch target size: 44px for mobile accessibility.

---

## 🎯 Landing Page Sections

1. **Hero Section** - Introduction and primary CTAs
2. **Dataset Overview** - NHS A&E data explanation
3. **Problem Statement** - Challenges and solutions
4. **Prediction Capabilities** - What the system forecasts
5. **Model Explanation** - How forecasting works
6. **Key Metrics** - Live platform statistics
7. **Features** - Platform capabilities
8. **System Architecture** - Technical overview
9. **Intended Users** - Target audience
10. **Differentiation** - Unique value propositions
11. **Final CTA** - Call to action

---

## 🛠️ Development Workflow

### Branch Strategy

- **`main`** - Empty placeholder branch (reserved for future)
- **`production`** - Active development and deployment branch

### Making Changes

```bash
# Ensure you're on production branch
git checkout production

# Make your changes
# ...

# Commit and push
git add .
git commit -m "feat: your feature description"
git push origin production

# Vercel will automatically deploy
```

---

## 📄 License

This is a portfolio/demonstration project.

---

## 👤 Author

**Kaushal**
- GitHub: [@Kaushal2807](https://github.com/Kaushal2807)

---

## 📧 Contact

For questions or collaboration, please open an issue on GitHub.

---

**Built with ❤️ using React, Material-UI, and Machine Learning**
