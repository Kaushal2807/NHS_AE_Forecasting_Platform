import React from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Chip } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { PROBLEM } from '../../utils/constants';
import WarningAmberIcon from '@mui/icons-material/WarningAmber';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const ProblemStatement = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #131f35 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Ambient left glow */}
      <Box sx={{
        position: 'absolute', left: 0, top: '20%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(244,63,94,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />
      {/* Ambient right glow */}
      <Box sx={{
        position: 'absolute', right: 0, bottom: '10%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(16,185,129,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={PROBLEM.title} />

        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {/* Challenges column */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              className="animate-fade-in-left"
              sx={{
                width: '100%',
                background: 'rgba(30,41,59,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(244,63,94,0.2)',
                borderLeft: '3px solid #f43f5e',
                borderRadius: '20px',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(244,63,94,0.35)',
                  borderLeft: '3px solid #f43f5e',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 30px rgba(244,63,94,0.05)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0, right: 0,
                  width: 150, height: 150,
                  background: 'radial-gradient(circle, rgba(244,63,94,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{
                  width: 40, height: 40,
                  borderRadius: '10px',
                  background: 'rgba(244,63,94,0.15)',
                  border: '1px solid rgba(244,63,94,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <ErrorOutlineIcon sx={{ fontSize: 22, color: '#fb7185' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#fb7185' }}>
                  Current Challenges
                </Typography>
              </Box>
              <List dense>
                {PROBLEM.challenges.map((challenge, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.4 }}>
                      <WarningAmberIcon sx={{ fontSize: 18, color: '#fb7185' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={challenge}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                        lineHeight: 1.7,
                        color: 'rgba(203,213,225,0.85)',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  mt: 3,
                  p: 2.5,
                  background: 'rgba(244,63,94,0.08)',
                  border: '1px solid rgba(244,63,94,0.2)',
                  borderRadius: '12px',
                  textAlign: 'center',
                }}
              >
                <Typography variant="body2" fontWeight={600} sx={{ color: '#fb7185' }}>
                  {PROBLEM.traditional}
                </Typography>
              </Box>
            </Box>
          </Grid>

          {/* Solutions column */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              className="animate-fade-in-right"
              sx={{
                width: '100%',
                background: 'rgba(30,41,59,0.6)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(16,185,129,0.2)',
                borderLeft: '3px solid #10b981',
                borderRadius: '20px',
                p: 4,
                position: 'relative',
                overflow: 'hidden',
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(16,185,129,0.35)',
                  borderLeft: '3px solid #10b981',
                  boxShadow: '0 20px 60px rgba(0,0,0,0.3), 0 0 30px rgba(16,185,129,0.05)',
                },
                '&::before': {
                  content: '""',
                  position: 'absolute',
                  top: 0, right: 0,
                  width: 150, height: 150,
                  background: 'radial-gradient(circle, rgba(16,185,129,0.06) 0%, transparent 70%)',
                  pointerEvents: 'none',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{
                  width: 40, height: 40,
                  borderRadius: '10px',
                  background: 'rgba(16,185,129,0.15)',
                  border: '1px solid rgba(16,185,129,0.25)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <CheckCircleIcon sx={{ fontSize: 22, color: '#34d399' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#34d399' }}>
                  This System Enables
                </Typography>
              </Box>
              <List dense>
                {PROBLEM.enables.map((solution, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.4 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: '#34d399' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={solution}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontWeight: 500,
                        lineHeight: 1.7,
                        color: 'rgba(203,213,225,0.85)',
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

export default ProblemStatement;
