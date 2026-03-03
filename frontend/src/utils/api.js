import axios from 'axios';

// Get API base URL from environment variable or use production default
export const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || 'https://nhs-backend-api.onrender.com';

// Create axios instance with default config
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints
export const api = {
  // Health check endpoint
  getHealth: async () => {
    try {
      const response = await apiClient.get('/health');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Health check failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Get key metrics for dashboard
  getMetrics: async () => {
    try {
      const response = await apiClient.get('/metrics');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Metrics fetch failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Prediction endpoint
  predict: async (payload) => {
    try {
      const response = await apiClient.post('/predict', payload);
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Prediction failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Get available metrics
  getAvailableMetrics: async () => {
    try {
      const response = await apiClient.get('/available-metrics');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Available metrics fetch failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Get model accuracy for all models
  getModelAccuracy: async () => {
    try {
      const response = await apiClient.get('/model-accuracy');
      return { success: true, data: response.data };
    } catch (error) {
      console.error('Model accuracy fetch failed:', error);
      return { success: false, error: error.message };
    }
  },

  // Get model accuracy for specific model
  getModelAccuracyByMetric: async (metricName) => {
    try {
      const response = await apiClient.get(`/model-accuracy/${metricName}`);
      return { success: true, data: response.data };
    } catch (error) {
      console.error(`Model accuracy fetch failed for ${metricName}:`, error);
      return { success: false, error: error.message };
    }
  },
};

export default api;
