import React from 'react';
import {  Typography, Box } from '@mui/material';

const SectionTitle = ({ title, subtitle, align = 'center', mb = 6 }) => {
  return (
    <Box mb={mb} textAlign={align}>
      <Typography
        variant="h2"
        component="h2"
        gutterBottom
        sx={{
          fontWeight: 700,
          position: 'relative',
          display: 'inline-block',
          '&::after': {
            content: '""',
            position: 'absolute',
            bottom: -8,
            left: align === 'center' ? '50%' : 0,
            transform: align === 'center' ? 'translateX(-50%)' : 'none',
            width: 60,
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
          sx={{ mt: 3, maxWidth: 800, mx: align === 'center' ? 'auto' : 0 }}
        >
          {subtitle}
        </Typography>
      )}
    </Box>
  );
};

export default SectionTitle;
