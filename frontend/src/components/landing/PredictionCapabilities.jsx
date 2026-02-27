import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../common/FeatureCard';
import { PREDICTIONS } from '../../utils/constants';

const PredictionCapabilities = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <SectionTitle title={PREDICTIONS.title} subtitle={PREDICTIONS.description} />

        <Grid container spacing={4} alignItems="stretch">
          {PREDICTIONS.capabilities.map((capability, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex">
              <FeatureCard
                title={capability.title}
                description={capability.description}
                icon={capability.icon}
              />
            </Grid>
          ))}
        </Grid>

        {/* Forecast Info */}
        <Grid container spacing={4} sx={{ mt: 6 }} alignItems="stretch">
          <Grid item xs={12} md={6} display="flex">
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'white',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                minHeight: '140px',
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Forecast Range
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95 }}>
                {PREDICTIONS.forecastRange}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} display="flex">
            <Paper
              sx={{
                p: 4,
                textAlign: 'center',
                bgcolor: 'secondary.main',
                color: 'white',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                width: '100%',
                minHeight: '140px',
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Prediction Type
              </Typography>
              <Typography variant="h6" sx={{ opacity: 0.95 }}>
                {PREDICTIONS.predictionType}
              </Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PredictionCapabilities;
