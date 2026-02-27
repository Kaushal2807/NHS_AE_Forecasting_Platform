import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink, Divider } from '@mui/material';
import { Link } from 'react-router-dom';
import { FOOTER } from '../../utils/constants';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: 'grey.900',
        color: 'white',
        py: 6,
        mt: 'auto',
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* About Section */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              NHS A&E Forecasting Platform
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.8 }}>
              AI-powered predictive analytics for emergency department operations across UK hospitals.
            </Typography>
          </Grid>

          {/* Quick Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Quick Links
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1 }}>
              <MuiLink
                component={Link}
                to="/"
                sx={{ color: 'grey.400', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Home
              </MuiLink>
              <MuiLink
                component={Link}
                to="/predict"
                sx={{ color: 'grey.400', textDecoration: 'none', '&:hover': { color: 'white' } }}
              >
                Prediction
              </MuiLink>
            </Box>
          </Grid>

          {/* Contact/Info */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography variant="h6" gutterBottom fontWeight={700}>
              Technology
            </Typography>
            <Typography variant="body2" sx={{ color: 'grey.400', lineHeight: 1.8 }}>
              Built with React.js, Material-UI, and powered by XGBoost machine learning models.
            </Typography>
          </Grid>
        </Grid>

        <Divider sx={{ my: 4, borderColor: 'grey.800' }} />

        {/* Portfolio Statement */}
        <Typography
          variant="body2"
          sx={{
            color: 'grey.500',
            lineHeight: 1.8,
            mb: 3,
            fontStyle: 'italic',
          }}
        >
          {FOOTER.portfolioStatement}
        </Typography>

        {/* Copyright */}
        <Typography variant="body2" sx={{ color: 'grey.500', textAlign: 'center' }}>
          {FOOTER.copyright}
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
