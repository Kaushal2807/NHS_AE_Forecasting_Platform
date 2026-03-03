import React from 'react';
import { Box, Container, Grid } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../common/FeatureCard';
import { FEATURES } from '../../utils/constants';

const Features = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #131f35 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          bottom: 0, left: 0, right: 0,
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.2), transparent)',
        },
      }}
    >
      <Container maxWidth="lg">
        <SectionTitle title={FEATURES.title} />

        <Grid
          container
          spacing={3}
          justifyContent="center"
          alignItems="stretch"
          sx={{ mt: 1 }}
        >
          {FEATURES.features.map((feature, index) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              key={index}
              display="flex"
              sx={{ alignItems: 'stretch' }}
            >
              <FeatureCard
                title={feature.title}
                description={feature.description}
                icon={feature.icon}
                index={index}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Features;
