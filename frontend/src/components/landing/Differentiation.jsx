import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { DIFFERENTIATION } from '../../utils/constants';
import StarIcon from '@mui/icons-material/Star';

const Differentiation = () => {
  return (
    <Box sx={{ py: 10, bgcolor: 'white' }}>
      <Container maxWidth="lg">
        <SectionTitle title={DIFFERENTIATION.title} />

        <Paper
          elevation={0}
          sx={{
            p: 5,
            borderLeft: '6px solid',
            borderColor: 'success.main',
            bgcolor: 'white',
            border: '1px solid',
            borderLeftWidth: '6px',
            borderRadius: 2,
          }}
        >
          <List sx={{ py: 0 }}>
            {DIFFERENTIATION.points.map((point, index) => (
              <ListItem 
                key={index} 
                sx={{ 
                  mb: index < DIFFERENTIATION.points.length - 1 ? 2.5 : 0,
                  px: 2,
                }}
              >
                <ListItemIcon sx={{ minWidth: 48 }}>
                  <StarIcon sx={{ color: 'success.main', fontSize: 32 }} />
                </ListItemIcon>
                <ListItemText
                  primary={point}
                  primaryTypographyProps={{ 
                    variant: 'h6', 
                    fontWeight: 600,
                    color: 'text.primary',
                    lineHeight: 1.6,
                  }}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Container>
    </Box>
  );
};

export default Differentiation;
