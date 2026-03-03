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
} from '@mui/material';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SectionTitle from '../common/SectionTitle';
import { MODEL } from '../../utils/constants';

const panels = [
  { key: 'panel1', dataKey: 'approach', color: '#60a5fa', glow: 'rgba(59,130,246,0.12)' },
  { key: 'panel2', dataKey: 'whyGlobal', color: '#22d3ee', glow: 'rgba(6,182,212,0.12)' },
  { key: 'panel3', dataKey: 'method', color: '#34d399', glow: 'rgba(52,211,153,0.12)', isMethod: true },
];

const ModelExplanation = () => {
  const [expanded, setExpanded] = useState('panel1');

  const handleChange = (panel) => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <Box
      id="model-section"
      sx={{
        py: { xs: 6, sm: 8, md: 10, lg: 12 },
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      <Box sx={{
        position: 'absolute', top: '10%', right: '-5%',
        width: 400, height: 400,
        background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <Container maxWidth="lg" sx={{ position: 'relative', zIndex: 1 }}>
        <SectionTitle title={MODEL.title} />

        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {panels.map(({ key, dataKey, color, glow, isMethod }) => {
            const panelData = MODEL[dataKey];
            const isOpen = expanded === key;
            return (
              <Accordion
                key={key}
                expanded={isOpen}
                onChange={handleChange(key)}
                elevation={0}
                sx={{
                  background: isOpen
                    ? `rgba(30,41,59,0.8)`
                    : 'rgba(30,41,59,0.4)',
                  backdropFilter: 'blur(20px)',
                  border: isOpen
                    ? `1px solid ${color}40`
                    : '1px solid rgba(255,255,255,0.06)',
                  borderRadius: '16px !important',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': { margin: 0 },
                  transition: 'all 0.3s ease',
                  boxShadow: isOpen ? `0 8px 40px rgba(0,0,0,0.3), 0 0 30px ${glow}` : 'none',
                  overflow: 'hidden',
                }}
              >
                <AccordionSummary
                  expandIcon={
                    <ExpandMoreIcon sx={{ color: isOpen ? color : 'rgba(148,163,184,0.5)', transition: 'color 0.3s' }} />
                  }
                  sx={{
                    px: 4,
                    py: 2,
                    '&:hover': { background: 'rgba(255,255,255,0.02)' },
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Box
                      sx={{
                        width: 8,
                        height: 8,
                        borderRadius: '50%',
                        background: color,
                        boxShadow: `0 0 10px ${color}`,
                        flexShrink: 0,
                        transition: 'all 0.3s',
                        transform: isOpen ? 'scale(1.5)' : 'scale(1)',
                      }}
                    />
                    <Typography
                      variant="h5"
                      fontWeight={700}
                      sx={{ color: isOpen ? color : 'rgba(241,245,249,0.85)', transition: 'color 0.3s' }}
                    >
                      {panelData.title}
                    </Typography>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ px: 4, pb: 4 }}>
                  {isMethod ? (
                    <Box
                      sx={{
                        p: 3,
                        background: `${glow}`,
                        border: `1px solid ${color}30`,
                        borderRadius: '12px',
                        borderLeft: `3px solid ${color}`,
                      }}
                    >
                      <Typography variant="body1" lineHeight={1.85} fontWeight={500} sx={{ color: 'rgba(203,213,225,0.9)' }}>
                        {panelData.description}
                      </Typography>
                    </Box>
                  ) : (
                    <List dense sx={{ py: 0 }}>
                      {panelData.items.map((item, index) => (
                        <ListItem key={index} sx={{ px: 0, py: 1, alignItems: 'flex-start' }}>
                          <ListItemIcon sx={{ minWidth: 36, mt: 0.3 }}>
                            <CheckCircleIcon sx={{ fontSize: 20, color }} />
                          </ListItemIcon>
                          <ListItemText
                            primary={item}
                            primaryTypographyProps={{
                              variant: 'body1',
                              fontWeight: 500,
                              lineHeight: 1.75,
                              color: 'rgba(203,213,225,0.85)',
                            }}
                          />
                        </ListItem>
                      ))}
                    </List>
                  )}
                </AccordionDetails>
              </Accordion>
            );
          })}
        </Box>
      </Container>
    </Box>
  );
};

export default ModelExplanation;
