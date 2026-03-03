import React from 'react';
import { Box, Container, Typography, Grid, Link as MuiLink, Divider, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import GitHubIcon from '@mui/icons-material/GitHub';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import { FOOTER } from '../../utils/constants';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        position: 'relative',
        background: 'linear-gradient(180deg, #0f172a 0%, #020617 100%)',
        borderTop: '1px solid rgba(255,255,255,0.06)',
        pt: { xs: 5, md: 8 },
        pb: { xs: 3, md: 4 },
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: '50%',
          transform: 'translateX(-50%)',
          width: '60%',
          height: '1px',
          background: 'linear-gradient(90deg, transparent, rgba(59,130,246,0.5), rgba(6,182,212,0.5), transparent)',
        },
      }}
    >
      {/* Ambient glow */}
      <Box
        sx={{
          position: 'absolute',
          bottom: '10%',
          left: '10%',
          width: 300,
          height: 300,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(59,130,246,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />
      <Box
        sx={{
          position: 'absolute',
          bottom: '20%',
          right: '10%',
          width: 200,
          height: 200,
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        }}
      />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <Grid container spacing={{ xs: 3, md: 5 }}>
          {/* Brand */}
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2.5 }}>
              <Box
                sx={{
                  width: 44,
                  height: 44,
                  borderRadius: '12px',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 20px rgba(59,130,246,0.3)',
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: 24, color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 700,
                  background: 'linear-gradient(135deg, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                  fontSize: '1.1rem',
                }}
              >
                NHS A&E Platform
              </Typography>
            </Box>
            <Typography
              variant="body2"
              sx={{
                color: 'rgba(148,163,184,0.8)',
                lineHeight: 1.8,
                maxWidth: { xs: '100%', md: 300 },
              }}
            >
              AI-powered predictive analytics for emergency department operations across UK hospitals, built to help clinicians and NHS planners forecast demand.
            </Typography>
          </Grid>

          {/* Links */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(148,163,184,0.5)',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 2,
              }}
            >
              Navigation
            </Typography>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 1.5 }}>
              {[
                { label: 'Home', path: '/', icon: HomeIcon },
                { label: 'Prediction', path: '/predict', icon: TrendingUpIcon },
              ].map(({ label, path, icon: Icon }) => (
                <MuiLink
                  key={path}
                  component={Link}
                  to={path}
                  sx={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: 1,
                    color: 'rgba(148,163,184,0.7)',
                    textDecoration: 'none',
                    fontSize: '0.9rem',
                    fontWeight: 500,
                    transition: 'all 0.2s ease',
                    '&:hover': {
                      color: '#60a5fa',
                      gap: 1.5,
                    },
                  }}
                >
                  <Icon sx={{ fontSize: 16 }} />
                  {label}
                </MuiLink>
              ))}
            </Box>
          </Grid>

          {/* Tech stack */}
          <Grid item xs={12} sm={6} md={4}>
            <Typography
              variant="overline"
              sx={{
                color: 'rgba(148,163,184,0.5)',
                fontWeight: 700,
                fontSize: '0.7rem',
                letterSpacing: '0.1em',
                display: 'block',
                mb: 2,
              }}
            >
              Technology
            </Typography>
            {[
              { label: 'React.js 19', color: '#61dafb' },
              { label: 'Material UI v7', color: '#0288d1' },
              { label: 'XGBoost ML', color: '#10b981' },
              { label: 'Python FastAPI', color: '#a78bfa' },
            ].map(({ label, color }) => (
              <Box
                key={label}
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 1.5,
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    width: 6,
                    height: 6,
                    borderRadius: '50%',
                    background: color,
                    boxShadow: `0 0 6px ${color}`,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="body2"
                  sx={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.875rem' }}
                >
                  {label}
                </Typography>
              </Box>
            ))}
          </Grid>
        </Grid>

        {/* Divider */}
        <Box
          sx={{
            my: 4,
            height: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(255,255,255,0.07), transparent)',
          }}
        />

        {/* Bottom bar */}
        <Box
          sx={{
            display: 'flex',
            flexDirection: { xs: 'column', sm: 'row' },
            justifyContent: { xs: 'center', sm: 'space-between' },
            alignItems: 'center',
            textAlign: { xs: 'center', sm: 'left' },
            gap: 2,
          }}
        >
          <Typography
            variant="body2"
            sx={{ color: 'rgba(100,116,139,0.8)', fontStyle: 'italic', fontSize: '0.8rem', maxWidth: 500 }}
          >
            {FOOTER.portfolioStatement}
          </Typography>
          <Typography variant="body2" sx={{ color: 'rgba(100,116,139,0.6)', fontSize: '0.8rem' }}>
            {FOOTER.copyright}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default Footer;
