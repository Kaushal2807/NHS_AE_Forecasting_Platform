import React from 'react';
import { Box, Container, Typography, Button, Stack } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HERO } from '../../utils/constants';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        background: 'linear-gradient(135deg, #1976D2 0%, #00897B 100%)',
        color: 'white',
        py: { xs: 10, md: 15 },
        position: 'relative',
        overflow: 'hidden',
        minHeight: { xs: '500px', md: '600px' },
        display: 'flex',
        alignItems: 'center',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background:
            'radial-gradient(circle at 20% 50%, rgba(255, 255, 255, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Box textAlign="center" maxWidth="900px" mx="auto">
          <Typography
            variant="h1"
            component="h1"
            gutterBottom
            sx={{
              fontWeight: 700,
              mb: 3,
              textShadow: '0 2px 10px rgba(0,0,0,0.2)',
            }}
          >
            {HERO.title}
          </Typography>

          <Typography
            variant="h5"
            sx={{
              mb: 3,
              opacity: 0.95,
              lineHeight: 1.6,
              fontWeight: 400,
            }}
          >
            {HERO.subtitle}
          </Typography>

          <Typography
            variant="body1"
            sx={{
              mb: 4,
              opacity: 0.9,
              maxWidth: 700,
              mx: 'auto',
              fontSize: '1.1rem',
              lineHeight: 1.8,
            }}
          >
            {HERO.description}
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            sx={{ mb: 2 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/predict')}
              startIcon={<RocketLaunchIcon />}
              sx={{
                bgcolor: 'white',
                color: 'primary.main',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  bgcolor: 'grey.100',
                  transform: 'translateY(-2px)',
                  boxShadow: '0 6px 20px rgba(0,0,0,0.2)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {HERO.primaryCTA}
            </Button>
            <Button
              variant="outlined"
              size="large"
              onClick={() => {
                document.getElementById('model-section')?.scrollIntoView({ behavior: 'smooth' });
              }}
              startIcon={<TrendingUpIcon />}
              sx={{
                borderColor: 'white',
                color: 'white',
                px: 4,
                py: 1.5,
                fontSize: '1.1rem',
                '&:hover': {
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)',
                  transform: 'translateY(-2px)',
                },
                transition: 'all 0.3s ease',
              }}
            >
              {HERO.secondaryCTA}
            </Button>
          </Stack>

          <Typography
            variant="body2"
            sx={{
              mt: 3,
              opacity: 0.8,
              fontStyle: 'italic',
            }}
          >
            {HERO.tagline}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default HeroSection;
