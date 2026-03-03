import React from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { DATASET } from '../../utils/constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DatasetIcon from '@mui/icons-material/Dataset';
import StorageIcon from '@mui/icons-material/Storage';

const DatasetOverview = () => {
  return (
    <Box
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{
        position: 'absolute', top: '5%', right: '5%',
        width: 300, height: 300,
        background: 'radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={DATASET.title} subtitle={DATASET.description} />

        <Grid container spacing={4} alignItems="stretch" justifyContent="center">
          {/* Data Includes */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              className="animate-fade-in-left"
              sx={{
                width: '100%',
                background: 'rgba(30,41,59,0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(59,130,246,0.15)',
                borderRadius: '20px',
                p: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(59,130,246,0.3)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(59,130,246,0.06)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))',
                  border: '1px solid rgba(59,130,246,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <DatasetIcon sx={{ fontSize: 24, color: '#60a5fa' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#93c5fd' }}>
                  Data Includes
                </Typography>
              </Box>
              <List dense>
                {DATASET.dataIncludes.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.3 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: '#60a5fa' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2', lineHeight: 1.7, color: 'rgba(203,213,225,0.85)', fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>

          {/* Data Characteristics */}
          <Grid item xs={12} md={6} display="flex" justifyContent="center">
            <Box
              className="animate-fade-in-right"
              sx={{
                width: '100%',
                background: 'rgba(30,41,59,0.65)',
                backdropFilter: 'blur(20px)',
                border: '1px solid rgba(6,182,212,0.15)',
                borderRadius: '20px',
                p: 4,
                transition: 'all 0.3s ease',
                '&:hover': {
                  border: '1px solid rgba(6,182,212,0.3)',
                  boxShadow: '0 20px 50px rgba(0,0,0,0.3), 0 0 30px rgba(6,182,212,0.06)',
                },
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
                <Box sx={{
                  width: 44, height: 44, borderRadius: '12px',
                  background: 'linear-gradient(135deg, rgba(6,182,212,0.2), rgba(52,211,153,0.2))',
                  border: '1px solid rgba(6,182,212,0.2)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                }}>
                  <StorageIcon sx={{ fontSize: 24, color: '#22d3ee' }} />
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#67e8f9' }}>
                  Data Characteristics
                </Typography>
              </Box>
              <List dense>
                {DATASET.dataCharacteristics.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 36, mt: 0.3 }}>
                      <CheckCircleIcon sx={{ fontSize: 18, color: '#22d3ee' }} />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: 'body2', lineHeight: 1.7, color: 'rgba(203,213,225,0.85)', fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>

        {/* Purpose Banner */}
        <Box
          className="animate-fade-in-up delay-400"
          sx={{
            mt: 4,
            p: 3.5,
            background: 'linear-gradient(135deg, rgba(37,99,235,0.15), rgba(8,145,178,0.15))',
            border: '1px solid rgba(59,130,246,0.2)',
            borderRadius: '16px',
            textAlign: 'center',
            backdropFilter: 'blur(8px)',
          }}
        >
          <Typography variant="h6" fontWeight={600} sx={{ color: '#93c5fd' }}>
            Purpose: {DATASET.purpose}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DatasetOverview;
