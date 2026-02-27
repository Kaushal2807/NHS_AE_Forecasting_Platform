import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../common/FeatureCard';
import { FEATURES } from '../../utils/constants';

const Features = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={FEATURES.title} />

        <Grid container spacing={4} alignItems="stretch">
          {FEATURES.features.map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index} display="flex">
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
