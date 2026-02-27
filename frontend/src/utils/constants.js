// Landing Page Content Constants

export const HERO = {
  title: "AI-Powered NHS A&E Forecasting Platform",
  subtitle: "36-Month Predictive Analytics for Emergency Department Operations Across UK Hospitals",
  description: "A machine learning system that forecasts A&E attendance, emergency admissions, and 4-hour performance metrics using panel time-series modeling.",
  primaryCTA: "Start Prediction",
  secondaryCTA: "View Forecast Engine",
  tagline: "Data-driven planning for healthcare operations.",
};

export const DATASET = {
  title: "About the NHS A&E Dataset",
  description: "This platform uses publicly available NHS monthly A&E data that includes attendance, waiting time performance, and emergency admission statistics for multiple organisations across the United Kingdom.",
  dataIncludes: [
    "Organisation Code (Hospital Identifier)",
    "Parent Organisation",
    "Monthly Reporting Period",
    "A&E Attendances (Type 1, Type 2, Other Departments)",
    "Attendances Over 4 Hours",
    "Emergency Admissions",
  ],
  dataCharacteristics: [
    "Multi-hospital panel dataset",
    "Monthly time-series structure",
    "Multiple operational targets",
    "Long historical coverage",
  ],
  purpose: "Enable predictive modeling for operational planning.",
};

export const PROBLEM = {
  title: "Why Forecasting A&E Metrics Matters",
  challenges: [
    "Increasing patient demand",
    "4-hour waiting time pressure",
    "Seasonal surges",
    "Resource planning uncertainty",
    "Capacity allocation inefficiencies",
  ],
  traditional: "Traditional reporting is reactive.",
  enables: [
    "Proactive capacity planning",
    "Long-term trend analysis",
    "Early detection of growth patterns",
    "Strategic operational forecasting",
  ],
};

export const PREDICTIONS = {
  title: "Forecasting Capabilities",
  description: "The system forecasts:",
  capabilities: [
    {
      title: "Total A&E Attendance",
      description: "Comprehensive attendance predictions",
      icon: "People",
    },
    {
      title: "Attendance by Department Type",
      description: "Type 1, Type 2, and Other departments",
      icon: "Category",
    },
    {
      title: "Attendances Over 4 Hours",
      description: "Waiting time performance forecasts",
      icon: "AccessTime",
    },
    {
      title: "Emergency Admissions",
      description: "Admission volume predictions",
      icon: "LocalHospital",
    },
    {
      title: "36-Month Future Projections",
      description: "Up to 3 years ahead",
      icon: "TrendingUp",
    },
    {
      title: "Year-wise Aggregated Forecast",
      description: "Year 1, Year 2, Year 3 summaries",
      icon: "CalendarToday",
    },
  ],
  forecastRange: "Up to 36 months (3 years) ahead.",
  predictionType: "Recursive multi-step time-series forecasting.",
};

export const MODEL = {
  title: "Forecasting Engine Overview",
  approach: {
    title: "Model Approach",
    items: [
      "Global Panel Forecasting",
      "Lag Feature Engineering",
      "Rolling Trend Calculation",
      "Monthly Seasonality Encoding",
      "Gradient Boosting Model (XGBoost)",
    ],
  },
  whyGlobal: {
    title: "Why Global Model?",
    items: [
      "Learns patterns across multiple hospitals",
      "Improves generalization",
      "Reduces overfitting per organisation",
      "Scalable for national-level forecasting",
    ],
  },
  method: {
    title: "Forecasting Method",
    description: "Recursive multi-step prediction: Each predicted month becomes input for the next forecast step.",
  },
};

export const FEATURES = {
  title: "Platform Capabilities",
  features: [
    {
      title: "Organisation-level forecasting",
      description: "Hospital-specific predictions",
      icon: "Business",
    },
    {
      title: "Multi-metric selection",
      description: "Choose from multiple KPIs",
      icon: "ShowChart",
    },
    {
      title: "Adjustable forecast horizon",
      description: "1–36 months ahead",
      icon: "DateRange",
    },
    {
      title: "Year-wise summary projections",
      description: "Aggregated annual views",
      icon: "Timeline",
    },
    {
      title: "Real-time model prediction API",
      description: "Instant forecasting results",
      icon: "Api",
    },
    {
      title: "Backend health monitoring",
      description: "System status tracking",
      icon: "HealthAndSafety",
    },
  ],
};

export const ARCHITECTURE = {
  title: "Technical Architecture",
  components: [
    {
      name: "Frontend",
      tech: "React.js Application",
      icon: "Code",
    },
    {
      name: "Backend",
      tech: "Machine Learning API (Flask or FastAPI)",
      icon: "Storage",
    },
    {
      name: "Model",
      tech: "XGBoost-based panel forecasting system",
      icon: "Psychology",
    },
  ],
  deployment: "Cloud-hosted scalable infrastructure",
  apis: [
    "GET /health → Server status",
    "POST /predict → Multi-step forecasting",
  ],
};

export const USERS = {
  title: "Who Can Use This Platform",
  personas: [
    {
      role: "Healthcare Analysts",
      icon: "Analytics",
    },
    {
      role: "Hospital Administrators",
      icon: "AdminPanelSettings",
    },
    {
      role: "Policy Planners",
      icon: "Policy",
    },
    {
      role: "Data Scientists",
      icon: "Science",
    },
    {
      role: "Academic Researchers",
      icon: "School",
    },
  ],
};

export const DIFFERENTIATION = {
  title: "What Makes This System Different",
  points: [
    "Uses machine learning instead of simple trend extrapolation",
    "Panel forecasting across multiple organisations",
    "Long-horizon recursive prediction",
    "Aggregated year-wise operational planning support",
    "Production-ready API architecture",
  ],
};

export const CTA_FINAL = {
  title: "Start Forecasting Now",
  button: "Go to Prediction Page",
  description: "Explore 36-month projections and plan healthcare operations with confidence.",
};

export const FOOTER = {
  portfolioStatement: "This platform implements a multivariate panel time-series forecasting engine for NHS A&E operational metrics using gradient boosting models and recursive multi-step prediction, deployed with a minimal production API architecture.",
  copyright: `© ${new Date().getFullYear()} NHS A&E Forecasting Platform. All rights reserved.`,
};

export default {
  HERO,
  DATASET,
  PROBLEM,
  PREDICTIONS,
  MODEL,
  FEATURES,
  ARCHITECTURE,
  USERS,
  DIFFERENTIATION,
  CTA_FINAL,
  FOOTER,
};
