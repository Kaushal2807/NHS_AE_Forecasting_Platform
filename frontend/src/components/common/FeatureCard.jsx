import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

const FeatureCard = ({ title, description, icon }) => {
  const IconComponent = Icons[icon] || Icons.CheckCircle;

  return (
    <Card
      sx={{
        height: '100%',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          bgcolor: 'primary.50',
        },
      }}
    >
      <CardContent sx={{ textAlign: 'center', p: 3 }}>
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
        <Typography variant="h6" gutterBottom fontWeight={600}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
