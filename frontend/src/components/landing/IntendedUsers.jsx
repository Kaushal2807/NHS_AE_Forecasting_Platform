import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { USERS } from '../../utils/constants';
import * as Icons from '@mui/icons-material';

const IntendedUsers = () => {
  return (
    <Box sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SectionTitle title={USERS.title} />

        <Grid container spacing={3}>
          {USERS.personas.map((persona, index) => {
            const IconComponent = Icons[persona.icon] || Icons.Person;
            return (
              <Grid item xs={12} sm={6} md={2.4} key={index}>
                <Paper
                  elevation={2}
                  sx={{
                    p: 3,
                    textAlign: 'center',
                    height: '100%',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      bgcolor: 'secondary.50',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 56,
                      height: 56,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 2,
                    }}
                  >
                    <IconComponent sx={{ fontSize: 28, color: 'white' }} />
                  </Box>
                  <Typography variant="body1" fontWeight={600}>
                    {persona.role}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </Box>
  );
};

export default IntendedUsers;
