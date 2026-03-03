import React, { useEffect, useRef } from 'react';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { HERO } from '../../utils/constants';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import SecurityIcon from '@mui/icons-material/Security';
import SpeedIcon from '@mui/icons-material/Speed';

const PARTICLES = Array.from({ length: 18 }, (_, i) => ({
  size: Math.random() * 4 + 2,
  left: `${Math.random() * 100}%`,
  delay: `${Math.random() * 6}s`,
  duration: `${10 + Math.random() * 10}s`,
  opacity: Math.random() * 0.4 + 0.15,
}));

const STAT_BADGES = [
  { icon: SpeedIcon, label: 'XGBoost ML', sub: 'Powered' },
  { icon: SecurityIcon, label: 'NHS Data', sub: 'Validated' },
  { icon: TrendingUpIcon, label: '5-Year', sub: 'Forecasts' },
];

const HeroSection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        position: 'relative',
        minHeight: { xs: '100vh', md: '95vh' },
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
        background: 'linear-gradient(135deg, #020617 0%, #0f172a 30%, #0c1a3a 60%, #082032 80%, #0a1628 100%)',
      }}
    >
      {/* Animated mesh grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 80% at 50% 50%, black 40%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Large orb glows */}
      <Box
        sx={{
          position: 'absolute',
          top: '5%',
          left: '-10%',
          width: { xs: 300, md: 600 },
          height: { xs: 300, md: 600 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.18) 0%, rgba(37,99,235,0.05) 50%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatSlow 8s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '5%',
          right: '-5%',
          width: { xs: 250, md: 500 },
          height: { xs: 250, md: 500 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(8,145,178,0.15) 0%, rgba(8,145,178,0.04) 50%, transparent 70%)',
          filter: 'blur(40px)',
          animation: 'floatSlow 10s ease-in-out infinite reverse',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          top: '40%',
          right: '30%',
          width: { xs: 150, md: 300 },
          height: { xs: 150, md: 300 },
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)',
          filter: 'blur(30px)',
          pointerEvents: 'none',
        }}
      />

      {/* Floating particles */}
      {PARTICLES.map((p, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            left: p.left,
            bottom: '-20px',
            width: p.size,
            height: p.size,
            borderRadius: '50%',
            background: i % 3 === 0
              ? 'rgba(59,130,246,0.6)'
              : i % 3 === 1
                ? 'rgba(6,182,212,0.5)'
                : 'rgba(124,58,237,0.5)',
            opacity: p.opacity,
            animation: `particle-float ${p.duration} linear ${p.delay} infinite`,
            pointerEvents: 'none',
          }}
        />
      ))}

      {/* Main Content */}
      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, py: { xs: 8, md: 4 } }}>
        <Box textAlign="center" maxWidth="1100px" mx="auto">
          {/* Tag badge */}
          <Box
            className="animate-fade-in-up"
            sx={{ mb: 3 }}
          >
            <Chip
              icon={<LocalHospitalIcon sx={{ fontSize: 16, color: '#60a5fa !important' }} />}
              label="NHS Emergency Department AI Forecasting"
              sx={{
                background: 'rgba(59,130,246,0.1)',
                border: '1px solid rgba(59,130,246,0.3)',
                color: '#93c5fd',
                fontWeight: 600,
                fontSize: { xs: '0.72rem', md: '0.85rem' },
                letterSpacing: '0.05em',
                py: 0.5,
                px: 1.5,
                backdropFilter: 'blur(8px)',
                height: 'auto',
                '& .MuiChip-icon': { ml: 0.5 },
                '& .MuiChip-label': { py: 0.75 },
              }}
            />
          </Box>

          {/* Headline */}
          <Typography
            variant="h1"
            component="h1"
            className="animate-fade-in-up delay-100"
            sx={{
              fontWeight: 900,
              mb: { xs: 2.5, md: 3 },
              fontSize: {
                xs: '2.6rem',
                sm: '3.8rem',
                md: '4rem',
                lg: '4.5rem',
                xl: '5rem',
              },
              lineHeight: { xs: 1.1, sm: 1.07, md: 1.04 },
              letterSpacing: { xs: '-0.02em', md: '-0.04em' },
              color: 'white',
            }}
          >
            {HERO.title.split(' ').slice(0, 3).join(' ')}{' '}
            <Box
              component="span"
              sx={{
                background: 'linear-gradient(135deg, #60a5fa 0%, #22d3ee 50%, #34d399 100%)',
                WebkitBackgroundClip: 'text',
                WebkitTextFillColor: 'transparent',
                backgroundClip: 'text',
                backgroundSize: '200% auto',
                animation: 'shimmer 4s linear infinite',
              }}
            >
              {HERO.title.split(' ').slice(3).join(' ')}
            </Box>
          </Typography>

          {/* Subtitle */}
          <Typography
            variant="h5"
            className="animate-fade-in-up delay-200"
            sx={{
              mb: { xs: 2.5, md: 3 },
              color: 'rgba(148,163,184,0.95)',
              lineHeight: 1.7,
              fontWeight: 400,
              fontSize: { xs: '1.1rem', sm: '1.25rem', md: '1.45rem', lg: '1.55rem' },
              maxWidth: { xs: '100%', md: 850 },
              mx: 'auto',
            }}
          >
            {HERO.subtitle}
          </Typography>

          {/* Description */}
          <Typography
            variant="body1"
            className="animate-fade-in-up delay-300"
            sx={{
              mb: 5,
              color: 'rgba(100,116,139,0.9)',
              maxWidth: { xs: '100%', md: 780 },
              mx: 'auto',
              fontSize: { xs: '0.95rem', md: '1.08rem' },
              lineHeight: 1.85,
            }}
          >
            {HERO.description}
          </Typography>

          {/* CTA Buttons */}
          <Stack
            direction={{ xs: 'column', sm: 'row' }}
            spacing={2}
            justifyContent="center"
            className="animate-fade-in-up delay-400"
            sx={{ mb: 4 }}
          >
            <Button
              variant="contained"
              size="large"
              onClick={() => navigate('/predict')}
              startIcon={<RocketLaunchIcon />}
              sx={{
                background: 'linear-gradient(135deg, #2563eb 0%, #0891b2 100%)',
                boxShadow: '0 8px 30px rgba(37,99,235,0.4)',
                px: 4,
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 700,
                borderRadius: 2,
                animation: 'pulse-glow 3s ease-in-out infinite',
                transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                '&:hover': {
                  background: 'linear-gradient(135deg, #3b82f6 0%, #06b6d4 100%)',
                  boxShadow: '0 12px 40px rgba(59,130,246,0.6)',
                  transform: 'translateY(-3px) scale(1.02)',
                },
                '&::after': { display: 'none' },
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
                borderColor: 'rgba(255,255,255,0.2)',
                color: 'rgba(255,255,255,0.85)',
                px: 4,
                py: 1.8,
                fontSize: '1.05rem',
                fontWeight: 600,
                borderRadius: 2,
                backdropFilter: 'blur(8px)',
                background: 'rgba(255,255,255,0.04)',
                transition: 'all 0.3s ease',
                '&:hover': {
                  borderColor: 'rgba(96,165,250,0.6)',
                  background: 'rgba(59,130,246,0.08)',
                  color: '#93c5fd',
                  transform: 'translateY(-2px)',
                },
                '&::after': { display: 'none' },
              }}
            >
              {HERO.secondaryCTA}
            </Button>
          </Stack>

          {/* Stat badges */}
          <Stack
            direction="row"
            spacing={2}
            justifyContent="center"
            flexWrap="wrap"
            className="animate-fade-in-up delay-500"
            sx={{ gap: 2 }}
          >
            {STAT_BADGES.map(({ icon: Icon, label, sub }) => (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1,
                  px: 2,
                  py: 1,
                  borderRadius: 2,
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px solid rgba(255,255,255,0.08)',
                  backdropFilter: 'blur(8px)',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    background: 'rgba(59,130,246,0.08)',
                    border: '1px solid rgba(59,130,246,0.2)',
                    transform: 'translateY(-2px)',
                  },
                }}
              >
                <Icon sx={{ fontSize: 18, color: '#60a5fa' }} />
                <Box>
                  <Typography sx={{ fontSize: '0.75rem', fontWeight: 700, color: 'rgba(241,245,249,0.9)', lineHeight: 1.2 }}>
                    {label}
                  </Typography>
                  <Typography sx={{ fontSize: '0.65rem', color: 'rgba(100,116,139,0.8)', lineHeight: 1.2 }}>
                    {sub}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Stack>

          <Typography
            variant="body2"
            className="animate-fade-in-up delay-600"
            sx={{ mt: 4, color: 'rgba(100,116,139,0.6)', fontStyle: 'italic', fontSize: '0.85rem' }}
          >
            {HERO.tagline}
          </Typography>
        </Box>
      </Container>

      {/* Bottom fade */}
      <Box
        sx={{
          position: 'absolute',
          bottom: 0,
          left: 0,
          right: 0,
          height: 120,
          background: 'linear-gradient(to bottom, transparent, #0f172a)',
          pointerEvents: 'none',
        }}
      />
    </Box>
  );
};

export default HeroSection;
