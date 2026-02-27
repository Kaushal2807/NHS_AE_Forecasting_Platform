import React from 'react';
import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { ARCHITECTURE } from '../../utils/constants';
import * as Icons from '@mui/icons-material';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';

const Architecture = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={ARCHITECTURE.title} />

        {/* Architecture Flow */}
        <Grid container spacing={3} alignItems="center" sx={{ mb: 4 }}>
          {ARCHITECTURE.components.map((component, index) => {
            const IconComponent = Icons[component.icon] || Icons.Category;
            return (
              <React.Fragment key={index}>
                <Grid item xs={12} md={index === 1 ? 4 : 3.5}>
                  <Paper
                    elevation={3}
                    sx={{
                      p: 3,
                      textAlign: 'center',
                      height: '100%',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 64,
                        height: 64,
                        borderRadius: '50%',
                        bgcolor: 'primary.main',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        mx: 'auto',
                        mb: 2,
                      }}
                    >
                      <IconComponent sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h6" fontWeight={600} gutterBottom>
                      {component.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
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
                    <ArrowForwardIcon sx={{ fontSize: 32, color: 'primary.main' }} />
                  </Grid>
                )}
              </React.Fragment>
            );
          })}
        </Grid>

        {/* Deployment & APIs */}
        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%', bgcolor: 'primary.main', color: 'white' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                Deployment
              </Typography>
              <Typography variant="body1">{ARCHITECTURE.deployment}</Typography>
            </Paper>
          </Grid>
          <Grid item xs={12} md={6}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Typography variant="h6" fontWeight={600} gutterBottom>
                APIs
              </Typography>
              <List dense>
                {ARCHITECTURE.apis.map((api, index) => (
                  <ListItem key={index} disablePadding>
                    <ListItemText
                      primary={api}
                      primaryTypographyProps={{
                        variant: 'body2',
                        fontFamily: 'monospace',
                        bgcolor: 'grey.100',
                        p: 1,
                        borderRadius: 1,
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
