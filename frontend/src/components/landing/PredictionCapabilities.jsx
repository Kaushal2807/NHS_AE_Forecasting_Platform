import React from 'react';
import { Box, Container, Typography, Grid, Paper } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../common/FeatureCard';
import { PREDICTIONS } from '../../utils/constants';

const PredictionCapabilities = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={PREDICTIONS.title} subtitle={PREDICTIONS.description} />

        <Grid container spacing={3}>
          {PREDICTIONS.capabilities.map((capability, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <FeatureCard
                title={capability.title}
                description={capability.description}
                icon={capability.icon}
              />
            </Grid>
          ))}
        </Grid>

        {/* Forecast Info */}
        <Grid container spacing={3} sx={{ mt: 4 }}>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: 'primary.main',
                color: 'white',
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Forecast Range
              </Typography>
              <Typography variant="body1">{PREDICTIONS.forecastRange}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper
              sx={{
                p: 3,
                textAlign: 'center',
                bgcolor: 'secondary.main',
                color: 'white',
              }}
            >
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Prediction Type
              </Typography>
              <Typography variant="body1">{PREDICTIONS.predictionType}</Typography>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default PredictionCapabilities;
