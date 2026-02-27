import React from 'react';
import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { ARCHITECTURE } from '../../utils/constants';
import * as Icons from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Architecture = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <SectionTitle title={ARCHITECTURE.title} />

        {/* Architecture Flow */}
        <Grid container spacing={4} alignItems="center" sx={{ mb: 6 }}>
          {ARCHITECTURE.components.map((component, index) => {
            const IconComponent = Icons[component.icon] || Icons.Category;
            return (
              <React.Fragment key={index}>
                <Grid item xs={12} md={index === 1 ? 4 : 3.5} display="flex">
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
                      minHeight: '200px',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        borderColor: 'primary.main',
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 72,
                        height: 72,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 3,
                        boxShadow: '0 4px 12px rgba(25, 118, 210, 0.3)',
                      }}
                    >
                      <IconComponent sx={{ fontSize: 36, color: 'white' }} />
                    </Box>
                    <Typography variant="h6" fontWeight={700} gutterBottom>
                      {component.name}
                    </Typography>
                    <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
                      {component.tech}
                    </Typography>
                  </Paper>
                </Grid>
                {index < ARCHITECTURE.components.length - 1 && (
                  <Grid
                    item
                    xs={12}
                    md={0.5}
                    sx={{
                      display: { xs: 'none', md: 'flex' },
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}
                  >
                    <ArrowForwardIcon sx={{ fontSize: 40, color: 'primary.main' }} />
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
        </Grid>

        {/* Deployment & APIs */}
        <Grid container spacing={4} alignItems="stretch">
          <Grid item xs={12} md={6} display="flex">
            <Paper 
              elevation={2}
              sx={{ 
                p: 4, 
                width: '100%',
                bgcolor: 'primary.main', 
                color: 'white',
                borderRadius: 2,
                display: 'flex',
                flexDirection: 'column',
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                Deployment
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8 }}>
                {ARCHITECTURE.deployment}
              </Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6} display="flex">
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                width: '100%',
                border: '1px solid',
                borderColor: 'divider',
                borderRadius: 2,
              }}
            >
              <Typography variant="h5" fontWeight={700} gutterBottom>
                APIs
              </Typography>
              <List dense sx={{ mt: 2 }}>
                {ARCHITECTURE.apis.map((api, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5 }}>
                    <ListItemText
                      primary={api}
                      primaryTypographyProps={{
                        variant: 'body1',
                        fontFamily: 'monospace',
                        bgcolor: 'grey.100',
                        p: 1.5,
                        borderRadius: 1,
                        fontSize: '0.9rem',
                      }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Architecture;
