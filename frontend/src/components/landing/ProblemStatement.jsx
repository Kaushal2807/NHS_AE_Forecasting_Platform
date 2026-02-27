import React from 'react';
import { Box, Container, Typography, Grid, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { PROBLEM } from '../../utils/constants';
import WarningIcon from '@mui/icons-material/Warning';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const ProblemStatement = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={PROBLEM.title} />

        <Grid container spacing={4}>
          {/* Challenges */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'divider',
                borderLeft: '4px solid',
                borderLeftColor: 'error.main',
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={600} color="error.main">
                Challenges in Emergency Departments
              </Typography>
              <List>
                {PROBLEM.challenges.map((challenge, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <WarningIcon color="error" />
                    </ListItemIcon>
                    <ListItemText
                      primary={challenge}
                      primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
              <Box
                sx={{
                  mt: 3,
                  p: 2,
                  bgcolor: 'error.main',
                  color: 'white',
                  borderRadius: 1,
                  textAlign: 'center',
                }}
              >
                <Typography variant="body1" fontWeight={600}>
                  {PROBLEM.traditional}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Solutions */}
          <Grid item xs={12} md={6}>
            <Paper
              elevation={0}
              sx={{
                p: 4,
                height: '100%',
                bgcolor: 'white',
                border: '1px solid',
                borderColor: 'divider',
                borderLeft: '4px solid',
                borderLeftColor: 'success.main',
              }}
            >
              <Typography variant="h5" gutterBottom fontWeight={600} color="success.main">
                This System Enables
              </Typography>
              <List>
                {PROBLEM.enables.map((solution, index) => (
                  <ListItem key={index} disablePadding sx={{ mb: 1 }}>
                    <ListItemIcon>
                      <CheckCircleOutlineIcon color="success" />
                    </ListItemIcon>
                    <ListItemText
                      primary={solution}
                      primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
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

export default ProblemStatement;
