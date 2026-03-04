import React, { useState, useEffect } from 'react';
import {
  Box, Container, Typography, Button, Paper,
  FormControl, Select, MenuItem, Checkbox,
  ListItemText, Slider, CircularProgress, Alert,
  Chip, LinearProgress, Stack,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import TimelineIcon from '@mui/icons-material/Timeline';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import AutoGraphIcon from '@mui/icons-material/AutoGraph';
import TuneIcon from '@mui/icons-material/Tune';
import { api } from '../utils/api';
import PredictionCharts from '../components/prediction/PredictionCharts';

const AVAILABLE_METRICS = [
  // Admissions Metrics
  { name: 'Type1_Admissions', label: 'Type 1 Emergency Admissions', description: 'Major A&E departments (consultant-led 24/7)', color: '#60a5fa', glow: 'rgba(96,165,250,0.3)' },
  { name: 'Type2_Admissions', label: 'Type 2 Emergency Admissions', description: 'Single specialty A&E services (e.g., eye, dental)', color: '#34d399', glow: 'rgba(52,211,153,0.3)' },
  { name: 'Other_Admissions', label: 'Other A&E Department Admissions', description: 'Other A&E departments not classified as Type 1 or 2', color: '#fb923c', glow: 'rgba(251,146,60,0.3)' },
  { name: 'Other_Emergency', label: 'Other Emergency Admissions', description: 'Emergency admissions not via A&E departments', color: '#c084fc', glow: 'rgba(192,132,252,0.3)' },
  { name: 'Total_Admissions', label: 'Total Emergency Admissions', description: 'Sum of all admission types', color: '#f87171', glow: 'rgba(248,113,113,0.3)' },
  
  // Attendances Metrics
  { name: 'Type1_Attendances', label: 'Type 1 A&E Attendances', description: 'Total attendances at Type 1 A&E departments', color: '#3b82f6', glow: 'rgba(59,130,246,0.3)' },
  { name: 'Type2_Attendances', label: 'Type 2 A&E Attendances', description: 'Total attendances at Type 2 A&E services', color: '#10b981', glow: 'rgba(16,185,129,0.3)' },
  { name: 'Other_Attendances', label: 'Other A&E Attendances', description: 'Total attendances at other A&E departments', color: '#f59e0b', glow: 'rgba(245,158,11,0.3)' },
  { name: 'Total_Attendances', label: 'Total A&E Attendances', description: 'Sum of all A&E attendances', color: '#ef4444', glow: 'rgba(239,68,68,0.3)' },
  
  // 4-Hour Target Breaches
  { name: 'Type1_Breaches', label: 'Type 1 Four-Hour Breaches', description: 'Number of patients not seen within 4 hours at Type 1', color: '#ec4899', glow: 'rgba(236,72,153,0.3)' },
  { name: 'Type2_Breaches', label: 'Type 2 Four-Hour Breaches', description: 'Number of patients not seen within 4 hours at Type 2', color: '#a855f7', glow: 'rgba(168,85,247,0.3)' },
  { name: 'Other_Breaches', label: 'Other Four-Hour Breaches', description: 'Number of patients not seen within 4 hours at other A&E', color: '#f97316', glow: 'rgba(249,115,22,0.3)' },
  { name: 'Total_Breaches', label: 'Total Four-Hour Breaches', description: 'Sum of all 4-hour target breaches', color: '#dc2626', glow: 'rgba(220,38,38,0.3)' },
  { name: 'Breach_Rate', label: 'Four-Hour Breach Rate', description: 'Percentage of patients not seen within 4 hours', color: '#db2777', glow: 'rgba(219,39,119,0.3)' },
  
  // Wait Time Quality Indicator
  { name: 'Wait_12hrs', label: 'Patients Waiting 12+ Hours', description: 'Quality indicator - patients waiting over 12 hours', color: '#f472b6', glow: 'rgba(244,114,182,0.3)' },
];

/* Reusable glass panel */
const GlassPanel = ({ children, sx = {}, ...props }) => (
  <Box
    sx={{
      background: 'rgba(30,41,59,0.7)',
      backdropFilter: 'blur(20px)',
      border: '1px solid rgba(255,255,255,0.07)',
      borderRadius: { xs: '16px', md: '20px' },
      ...sx,
    }}
    {...props}
  >
    {children}
  </Box>
);

const PredictionPage = () => {
  const navigate = useNavigate();
  const [selectedMetrics, setSelectedMetrics] = useState(['Type1_Admissions', 'Total_Admissions']);
  const [forecastHorizon, setForecastHorizon] = useState(60);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [prediction, setPrediction] = useState(null);
  const [modelAccuracy, setModelAccuracy] = useState(null);

  useEffect(() => { loadModelAccuracy(); }, []);

  const loadModelAccuracy = async () => {
    const result = await api.getModelAccuracy();
    if (result.success) setModelAccuracy(result.data.models);
  };

  const handleMetricChange = (e) => {
    const v = e.target.value;
    setSelectedMetrics(typeof v === 'string' ? v.split(',') : v);
  };

  const handleSelectAll = () => {
    setSelectedMetrics(selectedMetrics.length === AVAILABLE_METRICS.length
      ? [] : AVAILABLE_METRICS.map(m => m.name));
  };

  const handlePredict = async () => {
    if (!selectedMetrics.length) { setError('Please select at least one metric'); return; }
    setLoading(true); setError(null); setPrediction(null);
    try {
      const result = await api.predict({ metrics: selectedMetrics, forecast_horizon: forecastHorizon });
      result.success ? setPrediction(result.data) : setError(result.error || 'Prediction failed');
    } catch { setError('An unexpected error occurred'); }
    finally { setLoading(false); }
  };

  const formatNumber = (n) => new Intl.NumberFormat('en-US').format(Math.round(n));

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(180deg, #0f172a 0%, #0c1a2e 50%, #0f172a 100%)',
        position: 'relative',
        overflow: 'hidden',
        pb: { xs: 6, md: 8 },
      }}
    >
      {/* Ambient glows — fixed so they don't scroll */}
      <Box sx={{ position: 'fixed', top: '10%', left: '-8%', width: { xs: 200, md: 500 }, height: { xs: 200, md: 500 }, borderRadius: '50%', background: 'radial-gradient(circle, rgba(37,99,235,0.07) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />
      <Box sx={{ position: 'fixed', bottom: '10%', right: '-5%', width: { xs: 150, md: 400 }, height: { xs: 150, md: 400 }, borderRadius: '50%', background: 'radial-gradient(circle, rgba(8,145,178,0.06) 0%, transparent 70%)', pointerEvents: 'none', zIndex: 0 }} />

      <Container maxWidth="xl" sx={{ position: 'relative', zIndex: 1, px: { xs: 2, sm: 3, md: 4 } }}>
        {/* ── Page header ── */}
        <Box sx={{ pt: { xs: 3, md: 5 }, mb: { xs: 3, md: 5 } }}>
          <Button
            startIcon={<ArrowBackIcon />}
            onClick={() => navigate('/')}
            size="small"
            sx={{
              mb: 2.5,
              color: 'rgba(148,163,184,0.8)',
              border: '1px solid rgba(255,255,255,0.08)',
              borderRadius: 2,
              backdropFilter: 'blur(8px)',
              background: 'rgba(255,255,255,0.04)',
              px: 2, py: 0.7,
              fontSize: '0.83rem',
              '&:hover': { color: '#60a5fa', border: '1px solid rgba(59,130,246,0.3)', background: 'rgba(59,130,246,0.06)' },
              '&::after': { display: 'none' },
            }}
          >
            Back to Home
          </Button>

          <Box sx={{ display: 'flex', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, flexDirection: { xs: 'column', sm: 'row' } }}>
            <Box sx={{ width: { xs: 42, md: 48 }, height: { xs: 42, md: 48 }, borderRadius: '14px', background: 'linear-gradient(135deg, #2563eb, #0891b2)', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 6px 20px rgba(37,99,235,0.4)', flexShrink: 0 }}>
              <AutoGraphIcon sx={{ fontSize: { xs: 22, md: 26 }, color: 'white' }} />
            </Box>
            <Box>
              <Typography
                variant="h3"
                fontWeight={800}
                sx={{
                  background: 'linear-gradient(135deg, #f1f5f9, #94a3b8)',
                  WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text',
                  letterSpacing: '-0.02em',
                  fontSize: { xs: '1.6rem', sm: '2rem', md: '2.5rem' },
                  lineHeight: 1.15,
                }}
              >
                Forecast Generator
              </Typography>
              <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.7)', mt: 0.5, fontSize: { xs: '0.8rem', md: '0.9rem' } }}>
                Generate multi-step forecasts for NHS A&E metrics using XGBoost
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* ── Main two-column layout, stacks on mobile ── */}
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: { xs: 2, md: 3, lg: 4 }, alignItems: 'flex-start' }}>

          {/* Left: Configuration */}
          <Box sx={{ width: { xs: '100%', md: '320px', lg: '340px' }, flexShrink: 0 }}>
            <GlassPanel sx={{ p: { xs: 3, md: 4 }, width: '100%', position: { md: 'sticky' }, top: { md: 80 } }}>
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: { xs: 3, md: 4 } }}>
                <TuneIcon sx={{ fontSize: 20, color: '#60a5fa' }} />
                <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0', fontSize: { xs: '1.05rem', md: '1.25rem' } }}>
                  Configuration
                </Typography>
              </Box>

              {/* Metric selector */}
              <Box sx={{ mb: 3 }}>
                <Typography variant="body2" fontWeight={600} sx={{ color: 'rgba(148,163,184,0.7)', mb: 1.5, textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
                  Select Metrics
                </Typography>
                <FormControl fullWidth>
                  <Select
                    multiple value={selectedMetrics} onChange={handleMetricChange} displayEmpty
                    renderValue={(selected) =>
                      selected.length === 0
                        ? <Typography sx={{ color: 'rgba(100,116,139,0.6)', fontSize: '0.85rem' }}>Choose metrics…</Typography>
                        : <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.6, py: 0.5, maxHeight: '120px', overflowY: 'auto', '&::-webkit-scrollbar': { width: '4px' }, '&::-webkit-scrollbar-thumb': { background: 'rgba(148,163,184,0.3)', borderRadius: '4px' } }}>
                          {selected.map((val) => {
                            const m = AVAILABLE_METRICS.find(x => x.name === val);
                            return (
                              <Chip key={val} label={m?.label} size="small" sx={{ bgcolor: `${m?.color}20`, border: `1px solid ${m?.color}50`, color: m?.color, fontSize: '0.7rem', fontWeight: 600, height: 24, '& .MuiChip-label': { px: 1.5 } }} />
                            );
                          })}
                        </Box>
                    }
                    sx={{
                      '& .MuiOutlinedInput-notchedOutline': { border: 'none' },
                      background: 'rgba(15,23,42,0.5)',
                      border: '1px solid rgba(255,255,255,0.08)',
                      borderRadius: '12px',
                      '&:hover': { border: '1px solid rgba(59,130,246,0.3)' },
                      '&.Mui-focused': { border: '1px solid rgba(59,130,246,0.5)' },
                      minHeight: '56px',
                      '& .MuiSelect-select': {
                        py: 1.5,
                        px: 2,
                        minHeight: '56px',
                        display: 'flex',
                        alignItems: 'center',
                      },
                    }}
                  >
                    {AVAILABLE_METRICS.map(m => (
                      <MenuItem key={m.name} value={m.name} dense>
                        <Checkbox checked={selectedMetrics.includes(m.name)} size="small" sx={{ color: m.color, '&.Mui-checked': { color: m.color }, p: 0.5 }} />
                        <ListItemText
                          primary={m.label} secondary={m.description}
                          primaryTypographyProps={{ fontWeight: 600, fontSize: '0.88rem' }}
                          secondaryTypographyProps={{ fontSize: '0.72rem', sx: { color: 'rgba(100,116,139,0.7)' } }}
                        />
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
                <Button size="small" onClick={handleSelectAll} sx={{ mt: 0.8, fontSize: '0.75rem', color: '#60a5fa', '&:hover': { background: 'rgba(59,130,246,0.08)' }, '&::after': { display: 'none' }, px: 1 }}>
                  {selectedMetrics.length === AVAILABLE_METRICS.length ? 'Deselect All' : 'Select All'}
                </Button>
              </Box>

              {/* Horizon slider */}
              <Box sx={{ mb: { xs: 3, md: 4 } }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 2 }}>
                  <Typography variant="body2" fontWeight={600} sx={{ color: 'rgba(148,163,184,0.7)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.7rem' }}>
                    Forecast Horizon
                  </Typography>
                  <Chip
                    label={`${forecastHorizon} months • ${(forecastHorizon / 12).toFixed(1)} years`}
                    size="small"
                    sx={{
                      background: 'rgba(59,130,246,0.12)',
                      border: '1px solid rgba(59,130,246,0.3)',
                      color: '#93c5fd',
                      fontWeight: 700,
                      fontSize: '0.72rem',
                      height: 26
                    }}
                  />
                </Stack>
                <Box sx={{ px: 1.5 }}>
                  <Slider
                    value={forecastHorizon}
                    onChange={(_, v) => setForecastHorizon(v)}
                    min={1}
                    max={60}
                    marks={[
                      { value: 12, label: '1y' },
                      { value: 24, label: '2y' },
                      { value: 36, label: '3y' },
                      { value: 48, label: '4y' },
                      { value: 60, label: '5y' }
                    ]}
                    valueLabelDisplay="auto"
                    sx={{
                      '& .MuiSlider-thumb': {
                        boxShadow: '0 2px 8px rgba(59,130,246,0.4)',
                      },
                      '& .MuiSlider-track': {
                        height: 6,
                      },
                      '& .MuiSlider-rail': {
                        height: 6,
                      },
                    }}
                  />
                </Box>
              </Box>

              {/* CTA */}
              <Button
                variant="contained" size="large" fullWidth onClick={handlePredict}
                disabled={loading || !selectedMetrics.length}
                startIcon={loading ? <CircularProgress size={18} color="inherit" /> : <TrendingUpIcon />}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                  boxShadow: '0 8px 28px rgba(37,99,235,0.4)',
                  py: { xs: 1.6, md: 1.9 },
                  fontSize: { xs: '0.92rem', md: '1.02rem' },
                  fontWeight: 700,
                  borderRadius: '12px',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    boxShadow: '0 12px 38px rgba(59,130,246,0.55)',
                    transform: 'translateY(-2px)'
                  },
                  '&:disabled': {
                    background: 'rgba(30,41,59,0.5)',
                    color: 'rgba(100,116,139,0.5)'
                  },
                  '&::after': { display: 'none' },
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                }}
              >
                {loading ? 'Generating…' : 'Generate Forecast'}
              </Button>

              {error && <Alert severity="error" sx={{ mt: 2.5, fontSize: '0.84rem', borderRadius: '10px' }}>{error}</Alert>}

              {/* Accuracy bars */}
              {modelAccuracy && selectedMetrics.length > 0 && (
                <Box sx={{ mt: 3 }}>
                  <Box sx={{ height: '1px', background: 'rgba(255,255,255,0.06)', mb: 2.5 }} />
                  <Typography variant="body2" fontWeight={700} sx={{ color: 'rgba(148,163,184,0.6)', textTransform: 'uppercase', letterSpacing: '0.08em', fontSize: '0.68rem', mb: 2 }}>
                    Model Accuracy
                  </Typography>
                  {selectedMetrics.map(name => {
                    const acc = modelAccuracy[name];
                    if (!acc) return null;
                    const accuracy = acc.accuracy_metrics.accuracy_percentage;
                    const metric = AVAILABLE_METRICS.find(m => m.name === name);
                    return (
                      <Box key={name} sx={{ mb: 2 }}>
                        <Stack direction="row" justifyContent="space-between" sx={{ mb: 0.6 }}>
                          <Typography variant="caption" sx={{ color: 'rgba(203,213,225,0.75)', fontSize: '0.74rem' }}>{metric?.label}</Typography>
                          <Typography variant="caption" sx={{ fontWeight: 700, color: metric?.color, fontSize: '0.74rem' }}>{accuracy.toFixed(2)}%</Typography>
                        </Stack>
                        <LinearProgress
                          variant="determinate" value={accuracy}
                          sx={{ height: 4, borderRadius: 4, background: 'rgba(255,255,255,0.08)', '& .MuiLinearProgress-bar': { background: accuracy > 95 ? 'linear-gradient(90deg, #059669, #34d399)' : accuracy > 90 ? 'linear-gradient(90deg, #d97706, #fbbf24)' : 'linear-gradient(90deg, #dc2626, #f87171)', borderRadius: 4 } }}
                        />
                      </Box>
                    );
                  })}
                </Box>
              )}
            </GlassPanel>
          </Box>

          {/* Right: Results */}
          <Box sx={{ flex: 1, minWidth: 0, width: { xs: '100%', md: 'auto' } }}>
            {/* Loading */}
            {loading && (
              <GlassPanel sx={{ p: { xs: 4, md: 8 }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 250, md: 350 }, width: '100%' }}>
                <Box sx={{ position: 'relative', mb: 3 }}>
                  <CircularProgress size={72} thickness={3.5} sx={{ color: '#3b82f6', filter: 'drop-shadow(0 0 18px rgba(59,130,246,0.6))' }} />
                </Box>
                <Typography variant="h6" fontWeight={700} sx={{ color: '#e2e8f0', mb: 1.5, fontSize: { xs: '1.05rem', md: '1.2rem' } }}>Generating Forecast…</Typography>
                <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.7)', fontSize: '0.85rem' }}>
                  Processing {selectedMetrics.length} metric(s) for {forecastHorizon} months
                </Typography>
              </GlassPanel>
            )}

            {/* Empty state */}
            {!loading && !prediction && (
              <GlassPanel sx={{ p: { xs: 4, md: 8 }, textAlign: 'center', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: { xs: 250, md: 350 }, border: '2px dashed rgba(255,255,255,0.08)', width: '100%' }}>
                <Box sx={{ width: { xs: 75, md: 95 }, height: { xs: 75, md: 95 }, borderRadius: '24px', background: 'rgba(59,130,246,0.08)', border: '1px solid rgba(59,130,246,0.15)', display: 'flex', alignItems: 'center', justifyContent: 'center', mb: 3, animation: 'float 4s ease-in-out infinite' }}>
                  <TimelineIcon sx={{ fontSize: { xs: 38, md: 50 }, color: '#60a5fa', opacity: 0.7 }} />
                </Box>
                <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0', mb: 1.5, fontSize: { xs: '1.15rem', md: '1.4rem' } }}>Ready to Generate</Typography>
                <Typography variant="body1" sx={{ color: 'rgba(148,163,184,0.7)', maxWidth: 360, fontSize: { xs: '0.88rem', md: '0.98rem' }, lineHeight: 1.6 }}>
                  Configure your metrics and horizon on the left, then click Generate Forecast to see detailed predictions.
                </Typography>
              </GlassPanel>
            )}

            {/* Results */}
            {!loading && prediction && (
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, width: '100%' }}>
                {/* Success */}
                <GlassPanel sx={{ p: { xs: 3, md: 4 }, border: '1px solid rgba(16,185,129,0.3)', background: 'rgba(5,150,105,0.1)', width: '100%' }}>
                  <Box sx={{ width: '100%' }}>
                    <Stack direction="row" alignItems="center" justifyContent="center" gap={1.5} sx={{ mb: 1.5 }}>
                      <CheckCircleIcon sx={{ color: '#34d399', fontSize: { xs: 24, md: 26 } }} />
                      <Typography variant="h6" fontWeight={700} sx={{ color: '#34d399', fontSize: { xs: '1.1rem', md: '1.25rem' } }}>Forecast Generated Successfully</Typography>
                    </Stack>
                    <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="center" alignItems="center" gap={{ xs: 0.5, sm: 4 }}>
                      <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.8)', fontSize: { xs: '0.85rem', md: '0.9rem' }, fontWeight: 500 }}>{(() => {
                        const now = new Date();
                        const day = now.getDate();
                        const suffix = day % 10 === 1 && day !== 11 ? 'st' : day % 10 === 2 && day !== 12 ? 'nd' : day % 10 === 3 && day !== 13 ? 'rd' : 'th';
                        const months = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
                        const hours = now.getHours();
                        const mins = now.getMinutes().toString().padStart(2, '0');
                        const ampm = hours >= 12 ? 'PM' : 'AM';
                        const h12 = hours % 12 || 12;
                        return <>{day}<sup style={{ fontSize: '0.6em', verticalAlign: 'super' }}>{suffix}</sup> {months[now.getMonth()]} {now.getFullYear()}, {h12}:{mins} {ampm}</>;
                      })()}</Typography>
                      <Typography variant="body2" sx={{ color: 'rgba(148,163,184,0.8)', fontSize: { xs: '0.85rem', md: '0.9rem' }, fontWeight: 500 }}>Horizon: {prediction.horizon_months} months</Typography>
                    </Stack>
                  </Box>
                </GlassPanel>

                {/* Yearly projections */}
                {prediction.yearly_aggregates && (
                  <GlassPanel sx={{ p: { xs: 3, md: 4 }, width: '100%' }}>
                    <Stack direction="row" alignItems="center" gap={1.5} sx={{ mb: 3.5 }}>
                      <TrendingUpIcon sx={{ fontSize: 22, color: '#60a5fa' }} />
                      <Typography variant="h5" fontWeight={700} sx={{ color: '#e2e8f0', fontSize: { xs: '1.05rem', md: '1.25rem' } }}>Yearly Projections Summary</Typography>
                    </Stack>

                    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2.5 }}>
                      {Object.entries(prediction.yearly_aggregates).map(([name, years]) => {
                        const metric = AVAILABLE_METRICS.find(m => m.name === name);
                        return (
                          <Box
                            key={name}
                            sx={{
                              p: { xs: 2.5, md: 3 },
                              background: 'rgba(15,23,42,0.5)',
                              border: `1px solid ${metric?.color}30`,
                              borderLeft: `4px solid ${metric?.color}`,
                              borderRadius: '14px',
                              '&:hover': {
                                background: 'rgba(15,23,42,0.7)',
                                border: `1px solid ${metric?.color}50`,
                                borderLeft: `4px solid ${metric?.color}`,
                                boxShadow: `0 10px 30px ${metric?.glow}`,
                                transform: 'translateY(-2px)',
                              },
                              transition: 'all 0.3s ease'
                            }}
                          >
                            <Typography variant="subtitle1" fontWeight={700} sx={{ color: metric?.color, mb: 2.5, fontSize: { xs: '0.88rem', md: '0.95rem' }, textAlign: 'center', letterSpacing: '0.02em' }}>
                              {metric?.label}
                            </Typography>
                            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1.5 }}>
                              {Object.keys(years)
                                .filter(key => key.startsWith('year_') && years[key] > 0)
                                .sort((a, b) => {
                                  const numA = parseInt(a.split('_')[1]);
                                  const numB = parseInt(b.split('_')[1]);
                                  return numA - numB;
                                })
                                .map((yr) => {
                                  const yearNum = parseInt(yr.split('_')[1]);
                                  return (
                                    <Box key={yr} sx={{ flex: '1 1 0', minWidth: { xs: '120px', sm: '140px' } }}>
                                      <Box sx={{
                                        textAlign: 'center',
                                        p: { xs: 1.2, md: 1.6 },
                                        background: 'rgba(255,255,255,0.04)',
                                        borderRadius: '12px',
                                        border: '1px solid rgba(255,255,255,0.06)',
                                        transition: 'all 0.2s ease',
                                        '&:hover': {
                                          background: 'rgba(255,255,255,0.06)',
                                          border: `1px solid ${metric?.color}40`,
                                          transform: 'translateY(-2px)',
                                        },
                                      }}>
                                        <Typography variant="caption" sx={{ color: 'rgba(148,163,184,0.8)', fontSize: '0.7rem', display: 'block', mb: 0.6, fontWeight: 600, textTransform: 'uppercase', letterSpacing: '0.05em' }}>Year {yearNum}</Typography>
                                        <Typography variant="h6" fontWeight={700} sx={{ color: '#f1f5f9', fontSize: { xs: '0.95rem', md: '1.12rem' } }}>{formatNumber(years[yr])}</Typography>
                                      </Box>
                                    </Box>
                                  );
                                })}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </GlassPanel>
                )}

                {/* Charts */}
                <PredictionCharts prediction={prediction} selectedMetrics={selectedMetrics} />
              </Box>
            )}
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default PredictionPage;
