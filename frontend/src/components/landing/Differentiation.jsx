import React from 'react';
import { Box, Container, Typography, Paper, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import SectionTitle from '../common/SectionTitle';
import { DIFFERENTIATION } from '../../utils/constants';
import StarIcon from '@mui/icons-material/Star';

const Differentiation = () => {
  return (
    <Box sx={{ py: 8, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={DIFFERENTIATION.title} />

        <Paper
          elevation={4}
          sx={{
            p: 4,
            borderLeft: '6px solid',
            borderColor: 'success.main',
            bgcolor: 'success.50',
          }}
        >
          <List>
            {DIFFERENTIATION.points.map((point, index) => (
              <ListItem key={index} sx={{ mb: 1 }}>
                <ListItemIcon>
                  <StarIcon sx={{ color: 'success.main', fontSize: 28 }} />
                </ListItemIcon>
                <ListItemText
                  primary={point}
                  primaryTypographyProps={{ variant: 'body1', fontWeight: 600 }}
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
