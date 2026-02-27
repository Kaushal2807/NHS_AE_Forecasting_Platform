import React from 'react';
import { Box, Container, Grid, Paper, Typography } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { USERS } from '../../utils/constants';
import * as Icons from '@mui/icons-material';

const IntendedUsers = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={USERS.title} />

        <Grid container spacing={4} alignItems="stretch">
          {USERS.personas.map((persona, index) => {
            const IconComponent = Icons[persona.icon] || Icons.Person;
            return (
              <Grid item xs={12} sm={6} md={2.4} key={index} display="flex">
                <Paper
                  elevation={0}
                  sx={{
                    p: 4,
                    textAlign: 'center',
                    width: '100%',
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 2,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    minHeight: '180px',
                    transition: 'all 0.3s ease',
                    '&:hover': {
                      borderColor: 'secondary.main',
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 20px rgba(0,0,0,0.12)',
                    },
                  }}
                >
                  <Box
                    sx={{
                      width: 64,
                      height: 64,
                      borderRadius: '50%',
                      bgcolor: 'secondary.main',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      mx: 'auto',
                      mb: 3,
                      boxShadow: '0 4px 12px rgba(0, 137, 123, 0.3)',
                    }}
                  >
                    <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                  </Box>
                  <Typography variant="h6" fontWeight={600} sx={{ lineHeight: 1.4 }}>
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
