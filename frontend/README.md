# NHS A&E Forecasting Platform - Frontend

React.js frontend application for the NHS A&E Forecasting Platform.

---

## 🚀 Quick Start

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

---

## 📁 Project Structure

```
src/
├── components/
│   ├── layout/              # Header, Footer, Layout
│   ├── landing/             # Landing page sections
│   ├── common/              # Reusable components
│   └── prediction/          # Prediction page components
├── pages/                   # Page components
│   ├── LandingPage.jsx
│   ├── PredictionPage.jsx
│   └── NotFoundPage.jsx
├── styles/                  # Theme and colors
│   ├── theme.js
│   └── colors.js
├── utils/                   # Utilities and config
│   ├── api.js               # API configuration (single source of truth)
│   └── constants.js         # Static content
├── assets/                  # Images and data
│   ├── images/
│   └── data/
├── App.jsx                  # Main app with routing
├── main.jsx                 # Entry point
└── index.css                # Global styles with Tailwind
```

---

## 🎨 Theme & Styling

### Color Palette

**Primary - Medical Blue**
- Main: `#1976D2`
- Used for: Primary buttons, headers, key elements

**Secondary - Soft Teal**
- Main: `#00897B`
- Used for: Secondary actions, highlights

**Success - Health Green**
- Main: `#4CAF50`
- Used for: Success states, positive indicators

### Responsive Breakpoints

```javascript
xs: 0px      // Mobile
sm: 600px    // Large mobile / Small tablet
md: 900px    // Tablet
lg: 1200px   // Desktop
xl: 1536px   // Large desktop
```

### Typography Scale

- **h1:** 2.5rem (mobile: 2rem)
- **h2:** 2rem (mobile: 1.75rem)
- **h3:** 1.75rem (mobile: 1.5rem)
- **h4:** 1.5rem (mobile: 1.25rem)
- **h5:** 1.25rem (mobile: 1.1rem)
- **h6:** 1rem
- **body1:** 1rem
- **body2:** 0.875rem

---

## 🔌 API Integration

### Configuration

All API calls are managed through `src/utils/api.js`. The backend URL is configured via environment variable:

```bash
VITE_API_BASE_URL=http://localhost:5000
```

### Updating Backend URL

**Local Development:**
1. Copy `.env.example` to `.env.development`
2. Update `VITE_API_BASE_URL`
3. Restart dev server

**Production (Vercel):**
1. Go to Vercel Dashboard → Settings → Environment Variables
2. Update `VITE_API_BASE_URL`
3. Redeploy

### API Functions

```javascript
import { api } from '@/utils/api';

// Health check
const { success, data, error } = await api.getHealth();

// Fetch metrics
const { success, data, error } = await api.getMetrics();

// Make prediction
const { success, data, error } = await api.predict(payload);
```

---

## 🧩 Component Usage

### SectionTitle

```jsx
import SectionTitle from '@/components/common/SectionTitle';

<SectionTitle 
  title="Section Title"
  subtitle="Optional subtitle"
  align="center"  // or "left"
  mb={6}          // margin bottom
/>
```

### MetricCard

```jsx
import MetricCard from '@/components/common/MetricCard';

<MetricCard
  label="Total Hospitals"
  value="127"
  change="+5 this year"
  icon="LocalHospital"
  gradient={false}
/>
```

### FeatureCard

```jsx
import FeatureCard from '@/components/common/FeatureCard';

<FeatureCard
  title="Feature Title"
  description="Feature description"
  icon="CheckCircle"
/>
```

---

## 🎯 Landing Page Sections

All landing page sections are in `src/components/landing/`:

1. `HeroSection.jsx` - Hero banner with CTAs
2. `DatasetOverview.jsx` - Dataset information
3. `ProblemStatement.jsx` - Challenges and solutions
4. `PredictionCapabilities.jsx` - Forecast capabilities
5. `ModelExplanation.jsx` - ML model explanation
6. `KeyMetrics.jsx` - KPI dashboard (API-connected)
7. `Features.jsx` - Platform features
8. `Architecture.jsx` - System architecture
9. `IntendedUsers.jsx` - Target users
10. `Differentiation.jsx` - Unique value props
11. `CTASection.jsx` - Final call to action

---

## 🛠️ Development Tips

### Path Aliases

Use `@` for clean imports:

```javascript
import Layout from '@/components/layout/Layout';
import { HERO } from '@/utils/constants';
import theme from '@/styles/theme';
```

### MUI Icons

Import icons dynamically:

```javascript
import * as Icons from '@mui/icons-material';
const IconComponent = Icons['CheckCircle'];
```

### Content Updates

All static text content is in `src/utils/constants.js`. Update there instead of editing components directly.

---

## 📦 Dependencies

### Core
- `react` - UI library
- `react-dom` - React DOM renderer
- `react-router-dom` - Routing

### UI & Styling
- `@mui/material` - Material-UI components
- `@mui/icons-material` - Material icons
- `@emotion/react`, `@emotion/styled` - MUI styling engine
- `tailwindcss` - Utility-first CSS

### Utilities
- `axios` - HTTP client
- `recharts` - Charting library

---

## 🐛 Troubleshooting

### Build Errors

```bash
# Clear node_modules and reinstall
rm -rf node_modules package-lock.json
npm install
```

### HMR Not Working

```bash
# Restart dev server
npm run dev
```

### Path Alias Issues

Ensure `jsconfig.json` is present in project root.

---

## 🚀 Production Build

```bash
# Build for production
npm run build

# Output directory: dist/
# Optimized, minified, ready for deployment
```

### Build Optimization

- Code splitting by route
- Vendor chunks (React, MUI, Router separate)
- Tree-shaking enabled
- Minification and compression

---

## ✅ Best Practices

1. **Responsive Design:** Test at all breakpoints (320px, 768px, 1024px, 1440px)
2. **Accessibility:** Maintain ARIA labels, alt text, keyboard navigation
3. **Performance:** Lazy load images, optimize imports
4. **Code Quality:** Follow component naming conventions, use path aliases
5. **Git Commits:** Use conventional commits (`feat:`, `fix:`, `docs:`)

---

## 📝 License

Portfolio/demonstration project.

---

**For backend integration instructions, see main README.md**
