import React from 'react';
import { Card, CardContent, Typography, Box } from '@mui/material';
import * as Icons from '@mui/icons-material';

const MetricCard = ({ label, value, change, icon, gradient = false, index = 0 }) => {
  const IconComponent = Icons[icon] || Icons.Assessment;

  return (
    <Card
      elevation={gradient ? 3 : 0}
      sx={{
        height: '100%',
        width: '100%',
        background: gradient
          ? 'linear-gradient(135deg, #1e40af 0%, #0e7490 50%, #065f46 100%)'
          : 'rgba(30,41,59,0.7)',
        backdropFilter: 'blur(20px)',
        border: gradient
          ? '1px solid rgba(255,255,255,0.15)'
          : '1px solid rgba(255,255,255,0.07)',
        borderRadius: { xs: '16px', md: '20px' },
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        transition: 'all 0.4s cubic-bezier(0.34, 1.56, 0.64, 1)',
        '&::before': gradient ? {
          content: '""',
          position: 'absolute', inset: 0,
          background: 'radial-gradient(ellipse at 0% 0%, rgba(255,255,255,0.12) 0%, transparent 60%)',
          pointerEvents: 'none',
        } : {},
        '&:hover': {
          transform: { xs: 'none', sm: 'translateY(-6px) scale(1.01)' },
          boxShadow: gradient
            ? '0 20px 60px rgba(30,64,175,0.4)'
            : '0 20px 50px rgba(0,0,0,0.35)',
          border: gradient ? '1px solid rgba(255,255,255,0.25)' : '1px solid rgba(59,130,246,0.2)',
        },
      }}
    >
      <CardContent
        sx={{
          p: { xs: 2.5, md: 3.5 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          zIndex: 1,
          '&:last-child': { pb: { xs: 2.5, md: 3.5 } },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', mb: 2 }}>
          <Box
            sx={{
              width: { xs: 44, md: 52 },
              height: { xs: 44, md: 52 },
              borderRadius: '14px',
              background: gradient
                ? 'rgba(255,255,255,0.15)'
                : 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))',
              border: gradient
                ? '1px solid rgba(255,255,255,0.2)'
                : '1px solid rgba(59,130,246,0.15)',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}
          >
            <IconComponent sx={{ fontSize: { xs: 22, md: 26 }, color: gradient ? 'rgba(255,255,255,0.95)' : '#60a5fa' }} />
          </Box>
        </Box>

        <Typography
          variant="h3"
          component="div"
          sx={{
            fontWeight: 800,
            mb: 0.5,
            color: gradient ? 'white' : '#f1f5f9',
            letterSpacing: '-0.02em',
            fontSize: { xs: '1.5rem', sm: '1.8rem', md: '2.1rem' },
            lineHeight: 1.1,
          }}
        >
          {value}
        </Typography>
        <Typography
          variant="body2"
          sx={{
            color: gradient ? 'rgba(255,255,255,0.75)' : 'rgba(148,163,184,0.8)',
            fontWeight: 500,
            fontSize: { xs: '0.78rem', md: '0.85rem' },
            lineHeight: 1.5,
            mt: 'auto',
          }}
        >
          {label}
        </Typography>
      </CardContent>
    </Card>
  );
};

export default MetricCard;
