import React from 'react';
import { Box } from '@mui/material';
import HeroSection from '../components/landing/HeroSection';
import DatasetOverview from '../components/landing/DatasetOverview';
import ProblemStatement from '../components/landing/ProblemStatement';
import PredictionCapabilities from '../components/landing/PredictionCapabilities';
import ModelExplanation from '../components/landing/ModelExplanation';
import KeyMetrics from '../components/landing/KeyMetrics';
import Features from '../components/landing/Features';
import Architecture from '../components/landing/Architecture';
import IntendedUsers from '../components/landing/IntendedUsers';
import Differentiation from '../components/landing/Differentiation';
import CTASection from '../components/landing/CTASection';

const LandingPage = () => {
  return (
    <Box>
      <HeroSection />
      <DatasetOverview />
      <ProblemStatement />
      <PredictionCapabilities />
      <ModelExplanation />
      <KeyMetrics />
      <Features />
      <Architecture />
      <IntendedUsers />
      <Differentiation />
      <CTASection />
    </Box>
  );
};

export default LandingPage;
