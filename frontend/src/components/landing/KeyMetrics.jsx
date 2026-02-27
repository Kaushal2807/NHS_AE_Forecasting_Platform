import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, CircularProgress, Alert } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import MetricCard from '../common/MetricCard';
import { api } from '../../utils/api';
import { mockMetrics } from '../../assets/data/mockMetrics';

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState(mockMetrics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Try to fetch real metrics from backend
    const fetchMetrics = async () => {
      setLoading(true);
      const result = await api.getMetrics();
      
      if (result.success) {
        // Backend available - use real data
        setMetrics(result.data);
        setError(null);
      } else {
        // Backend not available - use mock data (already set)
        setError('Using demo data. Connect backend for live metrics.');
      }
      setLoading(false);
    };

    fetchMetrics();
  }, []);

  const metricsArray = Object.values(metrics);

  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle
          title="Key Metrics Highlight"
          subtitle="Platform statistics and forecasting insights"
        />

        {error && (
          <Alert severity="info" sx={{ mb: 4 }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" justifyContent="center" py={8}>
            <CircularProgress />
          </Box>
        ) : (
          <Grid container spacing={3}>
            {metricsArray.map((metric, index) => (
              <Grid item xs={12} sm={6} md={4} lg={2.4} key={index}>
                <MetricCard
                  label={metric.label}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  gradient={index === 4} // Last card has gradient
                />
              </Grid>
            ))}
          </Grid>
        )}
      </Container>
    </Box>
  );
};

export default KeyMetrics;
