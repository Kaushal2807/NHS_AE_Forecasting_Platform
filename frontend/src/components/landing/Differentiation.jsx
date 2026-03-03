import React from 'react';
import { Box, Container, Typography, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { DIFFERENTIATION } from '../../utils/constants';
import StarIcon from '@mui/icons-material/Star';
import AutoAwesomeIcon from '@mui/icons-material/AutoAwesome';

const Differentiation = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient glow */}
      <Box sx={{
        position: 'absolute', top: '50%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 500, height: 400,
        background: 'radial-gradient(ellipse, rgba(52,211,153,0.04) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={DIFFERENTIATION.title} />

        <Box
          className="animate-fade-in-up delay-200"
          sx={{
            p: { xs: 3, md: 5 },
            background: 'rgba(30,41,59,0.65)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(52,211,153,0.15)',
            borderLeft: '4px solid #10b981',
            borderRadius: '20px',
            position: 'relative',
            overflow: 'hidden',
            '&::before': {
              content: '""',
              position: 'absolute',
              top: 0, right: 0,
              width: 200, height: 200,
              background: 'radial-gradient(circle, rgba(52,211,153,0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            },
            transition: 'all 0.3s ease',
            '&:hover': {
              border: '1px solid rgba(52,211,153,0.3)',
              borderLeft: '4px solid #10b981',
              boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 40px rgba(52,211,153,0.05)',
            },
          }}
        >
          {/* Header */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <AutoAwesomeIcon sx={{ fontSize: 28, color: '#34d399' }} />
            <Typography variant="h5" fontWeight={700} sx={{ color: '#6ee7b7' }}>
              What Sets Us Apart
            </Typography>
          </Box>

          <List sx={{ py: 0 }}>
            {DIFFERENTIATION.points.map((point, index) => (
              <ListItem
                key={index}
                sx={{
                  mb: index < DIFFERENTIATION.points.length - 1 ? 2 : 0,
                  px: 0,
                  alignItems: 'flex-start',
                  borderBottom: index < DIFFERENTIATION.points.length - 1
                    ? '1px solid rgba(255,255,255,0.05)'
                    : 'none',
                  pb: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 44, mt: 0.5 }}>
                  <StarIcon sx={{ color: '#34d399', fontSize: 24 }} />
                </ListItemIcon>
                <ListItemText
                  primary={point}
                  primaryTypographyProps={{
                    variant: 'body1',
                    fontWeight: 600,
                    lineHeight: 1.7,
                    color: 'rgba(226,232,240,0.9)',
                    fontSize: '1rem',
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Container>
    </Box>
  );
};

export default Differentiation;
