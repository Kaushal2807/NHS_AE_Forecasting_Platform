import React, { useState, useEffect } from 'react';
import { Box, Container, Grid, CircularProgress, Alert, Typography } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import MetricCard from '../common/MetricCard';
import { api } from '../../utils/api';
import { mockMetrics } from '../../assets/data/mockMetrics';

const KeyMetrics = () => {
  const [metrics, setMetrics] = useState(mockMetrics);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMetrics = async () => {
      setLoading(true);
      const result = await api.getMetrics();
      if (result.success) {
        setMetrics(result.data);
        setError(null);
      } else {
        setError('Using demo data. Connect backend for live metrics.');
      }
      setLoading(false);
    };
    fetchMetrics();
  }, []);

  const metricsArray = Object.values(metrics);

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        position: 'relative',
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: '80%',
          height: '60%',
          background: 'radial-gradient(ellipse, rgba(37,99,235,0.06) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle
          title="Key Metrics Highlight"
          subtitle="Live platform statistics and forecasting insights"
        />

        {error && (
          <Alert severity="info" sx={{ mb: 4, maxWidth: 500, mx: 'auto' }}>
            {error}
          </Alert>
        )}

        {loading ? (
          <Box display="flex" flexDirection="column" alignItems="center" py={8} gap={2}>
            <CircularProgress sx={{ color: '#60a5fa' }} />
            <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.6)' }}>
              Loading live metrics...
            </Typography>
          </Box>
        ) : (
          <Grid container spacing={3} alignItems="stretch" justifyContent="center">
            {metricsArray.map((metric, index) => (
              <Grid item xs={12} sm={6} md={3} key={index} display="flex">
                <MetricCard
                  label={metric.label}
                  value={metric.value}
                  change={metric.change}
                  icon={metric.icon}
                  gradient={false}
                  index={index}
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
