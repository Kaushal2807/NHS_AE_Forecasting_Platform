import React from 'react';
import { Box, Container, Typography, Button, Stack, Chip } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { CTA_FINAL } from '../../utils/constants';
import RocketLaunchIcon from '@mui/icons-material/RocketLaunch';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';

const CTASection = () => {
  const navigate = useNavigate();

  return (
    <Box
      sx={{
        py: { xs: 8, sm: 10, md: 14, lg: 16 },
        position: 'relative',
        background: 'linear-gradient(135deg, #0f172a 0%, #1e3a5f 30%, #0c4a6e 60%, #064e3b 100%)',
        overflow: 'hidden',
        textAlign: 'center',
      }}
    >
      {/* Animated grid */}
      <Box
        sx={{
          position: 'absolute',
          inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.05) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.05) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 70% 70% at 50% 50%, black 30%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Large center glow */}
      <Box sx={{
        position: 'absolute',
        top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 600, height: 600,
        borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(37,99,235,0.2) 0%, rgba(8,145,178,0.1) 40%, transparent 70%)',
        filter: 'blur(50px)',
        pointerEvents: 'none',
      }} />

      {/* Floating orbs */}
      {[
        { top: '15%', left: '10%', size: 80, color: 'rgba(59,130,246,0.15)', dur: '6s' },
        { top: '70%', right: '8%', size: 60, color: 'rgba(6,182,212,0.12)', dur: '8s' },
        { bottom: '20%', left: '20%', size: 40, color: 'rgba(52,211,153,0.1)', dur: '7s' },
      ].map((orb, i) => (
        <Box
          key={i}
          sx={{
            position: 'absolute',
            top: orb.top, left: orb.left,
            bottom: orb.bottom, right: orb.right,
            width: orb.size, height: orb.size,
            borderRadius: '50%',
            background: `radial-gradient(circle, ${orb.color} 0%, transparent 70%)`,
            animation: `floatSlow ${orb.dur} ease-in-out infinite alternate`,
            pointerEvents: 'none',
          }}
        />
      ))}

      <Container maxWidth="md" sx={{ position: 'relative', zIndex: 1 }}>
        {/* Badge */}
        <Chip
          icon={<LocalHospitalIcon sx={{ fontSize: 16, color: '#22d3ee !important' }} />}
          label="Ready to Transform Your A&E Analytics?"
          className="animate-fade-in-up"
          sx={{
            mb: 3,
            background: 'rgba(6,182,212,0.1)',
            border: '1px solid rgba(6,182,212,0.25)',
            color: '#67e8f9',
            fontWeight: 600,
            fontSize: '0.8rem',
            backdropFilter: 'blur(8px)',
            '& .MuiChip-icon': { ml: 0.5 },
          }}
        />

        <Typography
          variant="h2"
          component="h2"
          className="animate-fade-in-up delay-100"
          sx={{
            fontWeight: 800,
            mb: 3,
            letterSpacing: '-0.02em',
            color: 'white',
          }}
        >
          {CTA_FINAL.title}
        </Typography>

        <Typography
          variant="h6"
          className="animate-fade-in-up delay-200"
          sx={{
            mb: 5,
            color: 'rgba(148,163,184,0.9)',
            lineHeight: 1.75,
            fontWeight: 400,
            maxWidth: 600,
            mx: 'auto',
          }}
        >
          {CTA_FINAL.description}
        </Typography>

        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={2} justifyContent="center" className="animate-fade-in-up delay-300">
          <Button
            variant="contained"
            size="large"
            onClick={() => navigate('/predict')}
            startIcon={<RocketLaunchIcon />}
            sx={{
              background: 'linear-gradient(135deg, #2563eb, #0891b2)',
              boxShadow: '0 8px 30px rgba(37,99,235,0.4)',
              px: 5,
              py: 2,
              fontSize: '1.1rem',
              fontWeight: 700,
              borderRadius: 2,
              animation: 'pulse-glow 3s ease-in-out infinite',
              transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
              '&:hover': {
                background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                boxShadow: '0 16px 50px rgba(59,130,246,0.6)',
                transform: 'translateY(-3px) scale(1.02)',
              },
              '&::after': { display: 'none' },
            }}
          >
            {CTA_FINAL.button}
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
            endIcon={<ArrowForwardIcon />}
            sx={{
              borderColor: 'rgba(255,255,255,0.2)',
              color: 'rgba(255,255,255,0.8)',
              px: 4,
              py: 2,
              fontSize: '1rem',
              fontWeight: 600,
              borderRadius: 2,
              backdropFilter: 'blur(8px)',
              '&:hover': {
                borderColor: 'rgba(255,255,255,0.4)',
                background: 'rgba(255,255,255,0.05)',
                transform: 'translateY(-2px)',
              },
              '&::after': { display: 'none' },
            }}
          >
            Back to Top
          </Button>
        </Stack>
      </Container>
    </Box>
  );
};

export default CTASection;
