import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

const MetricCard = ({ label, value, change, icon, gradient = false }) => {
  const IconComponent = Icons[icon] || Icons.Assessment;

  return (
    <Card
      elevation={gradient ? 2 : 0}
      sx={{
        height: '100%',
        background: gradient
          ? 'linear-gradient(135deg, #1976D2 0%, #00897B 100%)'
          : 'white',
        color: gradient ? 'white' : 'inherit',
        border: gradient ? 'none' : '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-6px)',
          boxShadow: gradient 
            ? '0 12px 28px rgba(25, 118, 210, 0.3)' 
            : '0 8px 24px rgba(0,0,0,0.12)',
          borderColor: gradient ? 'transparent' : 'primary.main',
        },
      }}
    >
      <CardContent sx={{ p: 4, flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box display="flex" alignItems="center" justifyContent="space-between" mb={3}>
          <IconComponent
            sx={{
              fontSize: 48,
              color: gradient ? 'rgba(255,255,255,0.95)' : 'primary.main',
            }}
          />
        </Box>
        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: gradient ? 'white' : 'text.primary',
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: gradient ? 'rgba(255,255,255,0.95)' : 'text.secondary',
            fontWeight: 600,
            mb: 1,
          }}
        >
          {label}
        </Typography>
        {change && (
          <Typography
            variant="body2"
            sx={{
              color: gradient ? 'rgba(255,255,255,0.8)' : 'text.secondary',
              mt: 'auto',
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
