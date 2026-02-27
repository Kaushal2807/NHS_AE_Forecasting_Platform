import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

const MetricCard = ({ label, value, change, icon, gradient = false }) => {
  const IconComponent = Icons[icon] || Icons.Assessment;

  return (
    <Card
      sx={{
        height: '100%',
        background: gradient
          ? 'linear-gradient(135deg, #1976D2 0%, #00897B 100%)'
          : 'white',
        color: gradient ? 'white' : 'inherit',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-8px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.15)',
        },
      }}
    >
      <CardContent>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={2}>
          <IconComponent
            sx={{
              fontSize: 40,
              color: gradient ? 'rgba(255,255,255,0.9)' : 'primary.main',
            }}
          />
        </Box>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 700,
            mb: 1,
            color: gradient ? 'white' : 'text.primary',
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: gradient ? 'rgba(255,255,255,0.9)' : 'text.secondary',
            fontWeight: 600,
            mb: 0.5,
          }}
        >
          {label}
        </Typography>
        {change && (
          <Typography
            variant="caption"
            sx={{
              color: gradient ? 'rgba(255,255,255,0.7)' : 'text.secondary',
            }}
          >
            {change}
          </Typography>
        )}
      </CardContent>
    </Card>
  );
};

export default MetricCard;
