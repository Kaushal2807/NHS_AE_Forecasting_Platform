import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CTA_FINAL } from '../../utils/constants';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: 8,
        background: 'linear-gradient(135deg, #1976D2 0%, #00897B 100%)',
        color: 'white',
        textAlign: 'center',
      }}
    >
      <Container maxWidth="md">
        <Typography
          variant="h2"
          component="h2"
          gutterBottom
          sx={{ fontWeight: 700, mb: 3 }}
        >
          {CTA_FINAL.title}
        </Typography>

        <Typography
          variant="h6"
          sx={{ mb: 4, opacity: 0.95, lineHeight: 1.8 }}
        >
          {CTA_FINAL.description}
        </Typography>

        <Button
          variant="contained"
          size="large"
          onClick={() => navigate('/predict')}
          startIcon={<RocketLaunchIcon />}
          sx={{
            bgcolor: 'white',
            color: 'primary.main',
            px: 6,
            py: 2,
            fontSize: '1.2rem',
            fontWeight: 600,
            '&:hover': {
              bgcolor: 'grey.100',
              transform: 'translateY(-2px)',
              boxShadow: '0 8px 24px rgba(0,0,0,0.2)',
            },
            transition: 'all 0.3s ease',
          }}
        >
          {CTA_FINAL.button}
        </Button>
      </Container>
    </Box>
  );
};

export default CTASection;
