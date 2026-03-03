import React from 'react';
import { Box, Container, Typography, Grid } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import FeatureCard from '../common/FeatureCard';
import { PREDICTIONS } from '../../utils/constants';
import DateRangeIcon from '@mui/icons-material/DateRange';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';

/* ─── 2 info tiles defined as data so they slot into the same Grid ─── */
const INFO_TILES = [
  {
    icon: <DateRangeIcon sx={{ fontSize: 40, color: '#60a5fa', mb: 2 }} />,
    label: 'Forecast Range',
    labelColor: '#93c5fd',
    valueKey: 'forecastRange',
    bg: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(8,145,178,0.1))',
    border: 'rgba(59,130,246,0.2)',
    hoverBorder: 'rgba(59,130,246,0.4)',
    hoverGlow: 'rgba(59,130,246,0.1)',
  },
  {
    icon: <AutoGraphIcon sx={{ fontSize: 40, color: '#22d3ee', mb: 2 }} />,
    label: 'Prediction Type',
    labelColor: '#67e8f9',
    valueKey: 'predictionType',
    bg: 'linear-gradient(135deg, rgba(8,145,178,0.15), rgba(5,150,105,0.1))',
    border: 'rgba(6,182,212,0.2)',
    hoverBorder: 'rgba(6,182,212,0.4)',
    hoverGlow: 'rgba(6,182,212,0.1)',
  },
];

const PredictionCapabilities = () => {
  const capabilities = PREDICTIONS.capabilities ?? [];

  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #131f35 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={PREDICTIONS.title} subtitle={PREDICTIONS.description} />

        {/*
          ONE unified Grid for all 8 tiles.
          justifyContent="center" ensures any partial last row is centred.
          Full rows (3 × md=4 = 12) are unaffected — they still stretch edge-to-edge.
          Partial row (2 × md=4 = 8) gets 2 equal gutters → perfectly centred.
        */}
        <Grid container spacing={3} justifyContent="center" alignItems="stretch">

          {/* ── Six capability cards ── */}
          {capabilities.map((capability, index) => (
            <Grid item xs={12} sm={6} md={4} key={`cap-${index}`} display="flex">
              <FeatureCard
                title={capability.title}
                description={capability.description}
                icon={capability.icon}
                index={index + 3}
              />
            </Grid>
          ))}

          {/* ── Two info tiles — same md=4 width, different visual style ── */}
          {INFO_TILES.map((tile, i) => (
            <Grid item xs={12} sm={6} md={4} key={`info-${i}`} display="flex">
              <Box
                sx={{
                  width: '100%',
                  p: { xs: 3, md: 4 },
                  textAlign: 'center',
                  borderRadius: '20px',
                  background: tile.bg,
                  border: `1px solid ${tile.border}`,
                  backdropFilter: 'blur(20px)',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  minHeight: '185px',          /* match FeatureCard height feel */
                  transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    border: `1px solid ${tile.hoverBorder}`,
                    boxShadow: `0 20px 50px rgba(0,0,0,0.35), 0 0 35px ${tile.hoverGlow}`,
                    transform: 'translateY(-8px)',
                  },
                }}
              >
                {tile.icon}
                <Typography
                  variant="h5"
                  fontWeight={700}
                  sx={{ color: tile.labelColor, mb: 1, fontSize: { xs: '1rem', md: '1.15rem' } }}
                >
                  {tile.label}
                </Typography>
                <Typography
                  variant="body1"
                  sx={{ color: 'rgba(148,163,184,0.85)', lineHeight: 1.65, fontSize: '0.9rem' }}
                >
                  {PREDICTIONS[tile.valueKey]}
                </Typography>
              </Box>
            </Grid>
          ))}

        </Grid>
      </Container>
    </Box>
  );
};

export default PredictionCapabilities;
