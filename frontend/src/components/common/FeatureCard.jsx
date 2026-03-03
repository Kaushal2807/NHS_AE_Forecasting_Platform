import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

const FeatureCard = ({ title, description, icon, index = 0 }) => {
  const IconComponent = Icons[icon] || Icons.CheckCircle;
  const gradients = [
    'linear-gradient(135deg, #2563eb, #0891b2)',
    'linear-gradient(135deg, #7c3aed, #0891b2)',
    'linear-gradient(135deg, #059669, #0891b2)',
    'linear-gradient(135deg, #d97706, #ef4444)',
    'linear-gradient(135deg, #2563eb, #7c3aed)',
    'linear-gradient(135deg, #059669, #2563eb)',
  ];
  const glowColors = [
    'rgba(37,99,235,0.35)',
    'rgba(124,58,237,0.35)',
    'rgba(5,150,105,0.35)',
    'rgba(217,119,6,0.35)',
    'rgba(37,99,235,0.35)',
    'rgba(5,150,105,0.35)',
  ];
  const gradient = gradients[index % gradients.length];
  const glow = glowColors[index % glowColors.length];

  return (
    <Card
      elevation={0}
      sx={{
        height: '100%',
        width: '100%',
        background: 'rgba(30,41,59,0.6)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.07)',
        borderRadius: { xs: '16px', md: '20px' },
        display: 'flex',
        flexDirection: 'column',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        position: 'relative',
        overflow: 'hidden',
        '&::before': {
          content: '""',
          position: 'absolute',
          top: 0, left: 0, right: 0,
          height: '2px',
          background: gradient,
          opacity: 0,
          transition: 'opacity 0.3s ease',
        },
        '&:hover': {
          transform: { xs: 'none', sm: 'translateY(-6px)' },
          border: '1px solid rgba(59,130,246,0.25)',
          boxShadow: `0 20px 60px rgba(0,0,0,0.4), 0 0 40px ${glow}`,
          background: 'rgba(30,41,59,0.85)',
          '&::before': { opacity: 1 },
        },
      }}
    >
      <CardContent
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          textAlign: 'center',
          p: { xs: 3, md: 4 },
          flexGrow: 1,
          '&:last-child': { pb: { xs: 3, md: 4 } },
        }}
      >
        {/* Icon */}
        <Box
          sx={{
            width: { xs: 60, md: 76 },
            height: { xs: 60, md: 76 },
            borderRadius: { xs: '16px', md: '20px' },
            background: gradient,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            mb: { xs: 2, md: 3 },
            boxShadow: `0 8px 30px ${glow}`,
            flexShrink: 0,
          }}
        >
          <IconComponent sx={{ fontSize: { xs: 28, md: 36 }, color: 'white' }} />
        </Box>

        <Typography
          variant="h6"
          gutterBottom
          sx={{
            fontWeight: 700,
            mb: 1.5,
            color: 'rgba(241,245,249,0.95)',
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            lineHeight: 1.3,
          }}
        >
          {title}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: 'rgba(148,163,184,0.8)',
            lineHeight: 1.75,
            fontSize: { xs: '0.82rem', md: '0.875rem' },
          }}
        >
          {description}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default FeatureCard;
