import React, { useEffect, useState } from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import HomeIcon from '@mui/icons-material/Home';
import SearchOffIcon from '@mui/icons-material/SearchOff';

const NotFoundPage = () => {
  const navigate = useNavigate();
  const [count, setCount] = useState(10);

  useEffect(() => {
    const timer = setInterval(() => {
      setCount((c) => {
        if (c <= 1) {
          clearInterval(timer);
          navigate('/');
        }
        return c - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [navigate]);

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #0f172a 0%, #0c1a2e 40%, #10182d 100%)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Background grid */}
      <Box
        sx={{
          position: 'absolute', inset: 0,
          backgroundImage: `
            linear-gradient(rgba(59,130,246,0.04) 1px, transparent 1px),
            linear-gradient(90deg, rgba(59,130,246,0.04) 1px, transparent 1px)
          `,
          backgroundSize: '50px 50px',
          maskImage: 'radial-gradient(ellipse 60% 60% at 50% 50%, black 20%, transparent 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Glow orbs */}
      <Box sx={{
        position: 'absolute', top: '20%', left: '15%',
        width: 350, height: 350, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(244,63,94,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />
      <Box sx={{
        position: 'absolute', bottom: '20%', right: '15%',
        width: 300, height: 300, borderRadius: '50%',
        background: 'radial-gradient(circle, rgba(59,130,246,0.08) 0%, transparent 70%)',
        filter: 'blur(40px)', pointerEvents: 'none',
      }} />

      <Container maxWidth="sm" sx={{ textAlign: 'center', position: 'relative', zIndex: 1 }}>
        {/* Animated icon */}
        <Box
          sx={{
            width: 120, height: 120, borderRadius: '30px',
            background: 'rgba(244,63,94,0.1)',
            border: '2px solid rgba(244,63,94,0.2)',
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            mx: 'auto', mb: 4,
            animation: 'float 3s ease-in-out infinite',
            boxShadow: '0 0 40px rgba(244,63,94,0.15)',
          }}
        >
          <SearchOffIcon sx={{ fontSize: 60, color: '#fb7185' }} />
        </Box>

        {/* 404 number */}
        <Typography
          variant="h1"
          component="p"
          sx={{
            fontWeight: 900,
            fontSize: { xs: '5rem', md: '8rem' },
            letterSpacing: '-0.05em',
            lineHeight: 1,
            mb: 2,
            background: 'linear-gradient(135deg, #fb7185 0%, #f43f5e 50%, #be123c 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            filter: 'drop-shadow(0 4px 30px rgba(244,63,94,0.3))',
          }}
        >
          404
        </Typography>

        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ color: '#e2e8f0', mb: 2 }}
        >
          Page Not Found
        </Typography>

        <Typography
          variant="body1"
          sx={{
            color: 'rgba(148,163,184,0.75)',
            mb: 5,
            lineHeight: 1.75,
            maxWidth: 380,
            mx: 'auto',
          }}
        >
          The page you're looking for doesn't exist or has been moved. Redirecting to home in <strong style={{ color: '#60a5fa' }}>{count}s</strong>.
        </Typography>

        <Button
          variant="contained"
          size="large"
          startIcon={<HomeIcon />}
          onClick={() => navigate('/')}
          sx={{
            background: 'linear-gradient(135deg, #2563eb, #0891b2)',
            boxShadow: '0 8px 25px rgba(37,99,235,0.35)',
            px: 4, py: 1.8,
            fontSize: '1rem', fontWeight: 700,
            borderRadius: 2,
            '&:hover': {
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              boxShadow: '0 12px 35px rgba(59,130,246,0.5)',
              transform: 'translateY(-2px)',
            },
            '&::after': { display: 'none' },
            transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          }}
        >
          Go to Home
        </Button>
      </Container>
    </Box>
  );
};

export default NotFoundPage;
