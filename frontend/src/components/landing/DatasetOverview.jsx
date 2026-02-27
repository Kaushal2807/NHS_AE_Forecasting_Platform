import React from 'react';
import { Box, Container, Typography, Grid, List, ListItem, ListItemIcon, ListItemText, Paper } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { DATASET } from '../../utils/constants';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import DatasetIcon from '@mui/icons-material/Dataset';

const DatasetOverview = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <SectionTitle title={DATASET.title} subtitle={DATASET.description} />

        <Grid container spacing={4} alignItems="stretch">
          {/* Data Includes */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 4, height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <DatasetIcon sx={{ fontSize: 32, color: 'primary.main', mr: 1 }} />
                <Typography variant="h5" fontWeight={600}>
                  Data Includes
                </Typography>
              </Box>
              <List>
                {DATASET.dataIncludes.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="primary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>

          {/* Data Characteristics */}
          <Grid item xs={12} md={6}>
            <Paper elevation={1} sx={{ p: 4, height: '100%', border: '1px solid', borderColor: 'divider' }}>
              <Box display="flex" alignItems="center" mb={2}>
                <CheckCircleIcon sx={{ fontSize: 32, color: 'secondary.main', mr: 1 }} />
                <Typography variant="h5" fontWeight={600}>
                  Data Characteristics
                </Typography>
              </Box>
              <List>
                {DATASET.dataCharacteristics.map((item, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <CheckCircleIcon color="secondary" />
                    </ListItemIcon>
                    <ListItemText
                      primary={item}
                      primaryTypographyProps={{ variant: 'body1' }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Purpose */}
        <Box
          sx={{
            mt: 4,
            p: 3,
            bgcolor: 'primary.main',
            color: 'white',
            borderRadius: 2,
            textAlign: 'center',
          }}
        >
          <Typography variant="h6" fontWeight={600}>
            Purpose: {DATASET.purpose}
          </Typography>
        </Box>
      </Container>
    </Box>
  );
};

export default DatasetOverview;
