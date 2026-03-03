import React from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { ARCHITECTURE } from '../../utils/constants';
import * as Icons from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import CodeIcon from '@mui/icons-material/Code';
import ElectricBoltIcon from '@mui/icons-material/ElectricBolt';

const Architecture = () => {
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
          top: '40%', left: '50%', transform: 'translate(-50%, -50%)',
          width: '70%', height: '60%',
          background: 'radial-gradient(ellipse, rgba(124,58,237,0.04) 0%, transparent 70%)',
          pointerEvents: 'none',
        },
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={ARCHITECTURE.title} />

        {/* Architecture Flow */}
        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: { xs: 2, md: 1.5 },
            flexWrap: { xs: 'wrap', md: 'nowrap' },
            mb: 6,
          }}
        >
          {ARCHITECTURE.components.map((component, index) => {
            const IconComponent = Icons[component.icon] || Icons.Category;
            const gradients = [
              'linear-gradient(135deg, #2563eb, #0891b2)',
              'linear-gradient(135deg, #7c3aed, #0891b2)',
              'linear-gradient(135deg, #059669, #0891b2)',
            ];
            const glows = [
              'rgba(37,99,235,0.3)',
              'rgba(124,58,237,0.3)',
              'rgba(5,150,105,0.3)',
            ];
            return (
              <React.Fragment key={index}>
                <Box
                  className={`animate-fade-in-up delay-${index * 200 + 100}`}
                  sx={{
                    flex: { xs: '0 0 auto', md: 1 },
                    maxWidth: { xs: 200, md: 220 },
                    background: 'rgba(30,41,59,0.7)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    p: 3.5,
                    textAlign: 'center',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    minHeight: '190px',
                    justifyContent: 'center',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&:hover': {
                      border: '1px solid rgba(59,130,246,0.3)',
                      transform: 'translateY(-8px)',
                      boxShadow: `0 20px 50px rgba(0,0,0,0.4), 0 0 30px ${glows[index % glows.length]}`,
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 68,
                      height: 68,
                      borderRadius: '18px',
                      background: gradients[index % gradients.length],
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mb: 2.5,
                      boxShadow: `0 8px 25px ${glows[index % glows.length]}`,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" fontWeight={700} sx={{ color: '#f1f5f9', mb: 0.5 }}>
                    {component.name}
                  </Typography>
                  <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.75)', fontSize: '0.82rem' }}>
                    {component.tech}
                  </Typography>
                </Box>
                {index < ARCHITECTURE.components.length - 1 && (
                  <Box
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      px: 0.5,
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 28, color: '#60a5fa', opacity: 0.6 }} />
                  </Box>
                )}
              </React.Fragment>
            );
          })}
        </Box>

        {/* Deployment & APIs */}
        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              sx={{
                width: '100%',
                p: 4,
                borderRadius: '20px',
                background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(8,145,178,0.1))',
                border: '1px solid rgba(59,130,246,0.2)',
                backdropFilter: 'blur(20px)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(59,130,246,0.35)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.3)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <ElectricBoltIcon sx={{ fontSize: 28, color: '#60a5fa' }} />
                <Typography variant="h5" fontWeight={700} sx={{ color: '#93c5fd' }}>
                  Deployment
                </Typography>
              </Box>
              <Typography variant="body1" sx={{ color: 'rgba(203,213,225,0.85)', lineHeight: 1.85 }}>
                {ARCHITECTURE.deployment}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              sx={{
                width: '100%',
                p: 4,
                borderRadius: '20px',
                background: 'rgba(30,41,59,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(255,255,255,0.07)',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(124,58,237,0.3)',
                  boxShadow: '0 16px 40px rgba(0,0,0,0.3), 0 0 30px rgba(124,58,237,0.05)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 2 }}>
                <CodeIcon sx={{ fontSize: 28, color: '#a78bfa' }} />
                <Typography variant="h5" fontWeight={700} sx={{ color: '#c4b5fd' }}>
                  APIs
                </Typography>
              </Box>
              <List dense sx={{ mt: 1 }}>
                {ARCHITECTURE.apis.map((api, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                    <ListItemText
                      primary={api}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontFamily: '"JetBrains Mono", "Fira Code", monospace',
                        fontSize: '0.82rem',
                        color: '#34d399',
                        sx: {
                          background: 'rgba(52,211,153,0.06)',
                          border: '1px solid rgba(52,211,153,0.12)',
                          borderRadius: '8px',
                          px: 1.5,
                          py: 0.8,
                          display: 'block',
                        },
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Architecture;
