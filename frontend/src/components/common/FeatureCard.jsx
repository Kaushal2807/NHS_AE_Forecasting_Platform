import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

const FeatureCard = ({ title, description, icon }) => {
  const IconComponent = Icons[icon] || Icons.CheckCircle;

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        border: '1px solid',
        borderColor: 'divider',
        borderRadius: 2,
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'translateY(-4px)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          borderColor: 'primary.main',
        },
      }}
    >
      <CardContent 
        sx={{ 
          textAlign: 'center', 
          p: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          flexGrow: 1,
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
        <Typography variant="h6" gutterBottom fontWeight={600} sx={{ mb: 2 }}>
          {title}
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
