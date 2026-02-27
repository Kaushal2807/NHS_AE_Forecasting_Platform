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
    <Box id="model-section" sx={{ py: 8 }}>
      <Container maxWidth="lg">
        <SectionTitle title={MODEL.title} />

        {/* Model Approach */}
        <Accordion
          expanded={expanded === 'panel1'}
          onChange={handleChange('panel1')}
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>
              {MODEL.approach.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {MODEL.approach.items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="primary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
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
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>
              {MODEL.whyGlobal.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <List>
              {MODEL.whyGlobal.items.map((item, index) => (
                <ListItem key={index}>
                  <ListItemIcon>
                    <CheckCircleIcon color="secondary" />
                  </ListItemIcon>
                  <ListItemText
                    primary={item}
                    primaryTypographyProps={{ variant: 'body1', fontWeight: 500 }}
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
          sx={{ mb: 2 }}
        >
          <AccordionSummary expandIcon={<ExpandMoreIcon />}>
            <Typography variant="h6" fontWeight={600}>
              {MODEL.method.title}
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <Paper sx={{ p: 3, bgcolor: 'grey.100' }}>
              <Typography variant="body1" lineHeight={1.8}>
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
