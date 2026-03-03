import React from 'react';
import { Box, Container, Grid, Typography } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { USERS } from '../../utils/constants';
import * as Icons from '@mui/icons-material';

const tealGradients = [
  'linear-gradient(135deg, #0891b2, #3b82f6)',
  'linear-gradient(135deg, #7c3aed, #0891b2)',
  'linear-gradient(135deg, #059669, #0891b2)',
  'linear-gradient(135deg, #d97706, #ef4444)',
  'linear-gradient(135deg, #2563eb, #7c3aed)',
];

const IntendedUsers = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={USERS.title} />

        <Grid container spacing={3} alignItems="stretch" justifyContent="center">
          {USERS.personas.map((persona, index) => {
            const IconComponent = Icons[persona.icon] || Icons.Person;
            const gradient = tealGradients[index % tealGradients.length];
            return (
              <Grid item xs={12} sm={6} md={2.4} key={index} display="flex" justifyContent="center">
                <Box
                  className={`animate-scale-in delay-${index * 100 + 100}`}
                  sx={{
                    width: '100%',
                    p: 3.5,
                    textAlign: 'center',
                    background: 'rgba(30,41,59,0.6)',
                    backdropFilter: 'blur(20px)',
                    border: '1px solid rgba(255,255,255,0.07)',
                    borderRadius: '20px',
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '175px',
                    position: 'relative',
                    overflow: 'hidden',
                    transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
                    '&::before': {
                      content: '""',
                      position: 'absolute',
                      top: 0, left: 0, right: 0, height: '2px',
                      background: gradient,
                      opacity: 0,
                      transition: 'opacity 0.3s ease',
                    },
                    '&:hover': {
                      transform: 'translateY(-8px)',
                      border: '1px solid rgba(59,130,246,0.25)',
                      boxShadow: '0 20px 50px rgba(0,0,0,0.4)',
                      background: 'rgba(30,41,59,0.85)',
                      '&::before': { opacity: 1 },
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 62,
                      height: 62,
                      borderRadius: '16px',
                      background: gradient,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2.5,
                      boxShadow: '0 6px 20px rgba(0,0,0,0.3)',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 30, color: 'white' }} />
                  </Box>
                  <Typography
                    variant="h6"
                    fontWeight={600}
                    sx={{ color: '#e2e8f0', lineHeight: 1.4, fontSize: '0.95rem' }}
                  >
                    {persona.role}
                  </Typography>
                </Box>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default IntendedUsers;
