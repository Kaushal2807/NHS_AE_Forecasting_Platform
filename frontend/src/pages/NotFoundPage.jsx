import React from 'react';
import { Box, Container, Typography, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';

const NotFoundPage = () => {
  const navigate = useNavigate();

  return (
    <Container maxWidth="sm" sx={{ py: 12, textAlign: 'center' }}>
      <ErrorOutlineIcon sx={{ fontSize: 100, color: 'error.main', mb: 3 }} />
      
      <Typography variant="h1" component="h1" gutterBottom fontWeight={700}>
        404
      </Typography>
      
      <Typography variant="h5" gutterBottom color="text.secondary">
        Page Not Found
      </Typography>
      
      <Typography variant="body1" color="text.secondary" sx={{ mb: 4 }}>
        The page you're looking for doesn't exist.
      </Typography>

      <Button
        variant="contained"
        size="large"
        onClick={() => navigate('/')}
      >
        Go to Home
      </Button>
    </Container>
  );
};

export default NotFoundPage;
