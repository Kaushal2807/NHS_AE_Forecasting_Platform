import React from 'react';
import { Typography, Box } from '@mui/material';

const SectionTitle = ({ title, subtitle, align = 'center', mb = 8, light = false }) => {
  return (
    <Box mb={{ xs: Math.max(mb - 3, 4), md: mb }} textAlign={align}>
      <Typography
        variant="h2"
        component="h2"
        className="animate-fade-in-up"
        sx={{
          fontWeight: 700,
          position: 'relative',
          display: 'inline-block',
          mb: subtitle ? 3 : 2,
          color: light ? 'white' : 'text.primary',
          /* Responsive font size — scales smoothly across all breakpoints */
          fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem', lg: '2.8rem' },
          lineHeight: 1.2,
          letterSpacing: '-0.01em',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: align === 'center' ? '50%' : 0,
            transform: align === 'center' ? 'translateX(-50%)' : 'none',
            width: { xs: 50, md: 80 },
            height: 3,
            background: 'linear-gradient(90deg, #3b82f6, #06b6d4)',
            borderRadius: 4,
            animation: 'line-expand 0.8s ease 0.3s both',
            boxShadow: '0 0 12px rgba(59,130,246,0.5)',
          },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          className="animate-fade-in-up delay-200"
          sx={{
            mt: { xs: 3, md: 4 },
            color: light ? 'rgba(255,255,255,0.75)' : 'text.secondary',
            maxWidth: { xs: '100%', md: 680 },
            mx: align === 'center' ? 'auto' : 0,
            lineHeight: 1.85,
            fontSize: { xs: '0.95rem', md: '1.05rem' },
            px: { xs: 1, md: 0 },
          }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
