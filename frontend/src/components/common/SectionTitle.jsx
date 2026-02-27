import React from 'react';
import {  Typography, Box } from '@mui/material';

const SectionTitle = ({ title, subtitle, align = 'center', mb = 8 }) => {
  return (
    <Box mb={mb} textAlign={align}>
      <Typography
        variant="h2"
        component="h2"
        sx={{
          fontWeight: 700,
          position: 'relative',
          display: 'inline-block',
          mb: 2,
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -12,
            left: align === 'center' ? '50%' : 0,
            transform: align === 'center' ? 'translateX(-50%)' : 'none',
            width: 80,
            height: 4,
            backgroundColor: 'primary.main',
            borderRadius: 2,
          },
        }}
      >
        {title}
      </Typography>
      {subtitle && (
        <Typography
          variant="body1"
          color="text.secondary"
          sx={{ mt: 4, maxWidth: 700, mx: align === 'center' ? 'auto' : 0, lineHeight: 1.8 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
