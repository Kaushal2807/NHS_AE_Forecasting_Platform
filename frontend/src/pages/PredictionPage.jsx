import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConstructionIcon from '@mui/icons-material/Construction';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const PredictionPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="md" sx={{ py: 8 }}>
      <Paper
        elevation={3}
        sx={{
          p: 6,
          textAlign: 'center',
          borderRadius: 3,
        }}
      >
        <ConstructionIcon sx={{ fontSize: 80, color: 'primary.main', mb: 3 }} />
        
        <Typography variant="h3" gutterBottom fontWeight={700}>
          Prediction Page
        </Typography>
        
        <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
          Coming Soon
        </Typography>
        
        <Typography variant="body1" color="text.secondary" sx={{ mb: 4, lineHeight: 1.8 }}>
          The prediction interface is currently under development. This page will allow you to:
        </Typography>

        <Box sx={{ textAlign: 'left', mb: 4, maxWidth: 500, mx: 'auto' }}>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Select hospital organisation
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Choose metrics to forecast
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Set forecast horizon (1-36 months)
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • View detailed predictions and visualizations
          </Typography>
          <Typography variant="body1" sx={{ mb: 1 }}>
            • Download forecast reports
          </Typography>
        </Box>

        <Button
          variant="contained"
          size="large"
          startIcon={<ArrowBackIcon />}
          onClick={() => navigate('/')}
          sx={{ mt: 2 }}
        >
          Back to Home
        </Button>
      </Paper>
    </Container>
  );
};

export default PredictionPage;
