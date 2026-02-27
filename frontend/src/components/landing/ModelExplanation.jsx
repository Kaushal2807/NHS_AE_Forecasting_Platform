import React, { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Paper,
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionTitle from '../common/SectionTitle';
import { MODEL } from '../../utils/constants';

const ModelExplanation = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box id="model-section" sx={{ py: 10, bgcolor: 'grey.50' }}>
      <Container maxWidth="lg">
        <SectionTitle title={MODEL.title} />

        {/* Model Approach */}
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          elevation={0}
          sx={{ 
            mb: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: '0 0 24px 0' },
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 4, py: 2 }}
          >
            <Typography variant="h5" fontWeight={700}>
              {MODEL.approach.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 4, pb: 3 }}>
            <List sx={{ py: 0 }}>
              {MODEL.approach.items.map((item, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleIcon color="primary" sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, lineHeight: 1.7 }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Why Global Model */}
        <Accordion
          expanded={expanded === 'panel2'}
          onChange={handleChange('panel2')}
          elevation={0}
          sx={{ 
            mb: 3,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            '&:before': { display: 'none' },
            '&.Mui-expanded': { margin: '0 0 24px 0' },
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 4, py: 2 }}
          >
            <Typography variant="h5" fontWeight={700}>
              {MODEL.whyGlobal.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 4, pb: 3 }}>
            <List sx={{ py: 0 }}>
              {MODEL.whyGlobal.items.map((item, index) => (
                <ListItem key={index} sx={{ px: 0, py: 1 }}>
                  <ListItemIcon sx={{ minWidth: 40 }}>
                    <CheckCircleIcon color="secondary" sx={{ fontSize: 24 }} />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500, lineHeight: 1.7 }}
                  />
                </ListItem>
              ))}
            </List>
          </AccordionDetails>
        </Accordion>

        {/* Forecasting Method */}
        <Accordion
          expanded={expanded === 'panel3'}
          onChange={handleChange('panel3')}
          elevation={0}
          sx={{ 
            mb: 0,
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: 2,
            '&:before': { display: 'none' },
          }}
        >
          <AccordionSummary 
            expandIcon={<ExpandMoreIcon />}
            sx={{ px: 4, py: 2 }}
          >
            <Typography variant="h5" fontWeight={700}>
              {MODEL.method.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails sx={{ px: 4, pb: 3 }}>
            <Paper 
              elevation={0}
              sx={{ 
                p: 4, 
                bgcolor: 'primary.50',
                border: '1px solid',
                borderColor: 'primary.100',
                borderRadius: 2,
              }}
            >
              <Typography variant="body1" lineHeight={1.8} fontWeight={500}>
                {MODEL.method.description}
              </Typography>
            </Paper>
          </AccordionDetails>
        </Accordion>
      </Container>
    </Box>
  );
};

export default ModelExplanation;
