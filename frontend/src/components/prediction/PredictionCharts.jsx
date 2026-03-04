import React, { useState, useMemo } from 'react';
import {
  Box,
  Typography,
  ToggleButtonGroup,
  ToggleButton,
  Paper,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  ComposedChart,
} from 'recharts';
import ShowChartIcon from '@mui/icons-material/ShowChart';
import BarChartIcon from '@mui/icons-material/BarChart';
import TimelineIcon from '@mui/icons-material/Timeline';

const AVAILABLE_METRICS = [
  // Admissions Metrics
  { name: 'Type1_Admissions', label: 'Type 1 Emergency Admissions', shortLabel: 'Type 1 Adm', color: '#60a5fa' },
  { name: 'Type2_Admissions', label: 'Type 2 Emergency Admissions', shortLabel: 'Type 2 Adm', color: '#34d399' },
  { name: 'Other_Admissions', label: 'Other A&E Department Admissions', shortLabel: 'Other A&E', color: '#fb923c' },
  { name: 'Other_Emergency', label: 'Other Emergency Admissions', shortLabel: 'Other Emg', color: '#c084fc' },
  { name: 'Total_Admissions', label: 'Total Emergency Admissions', shortLabel: 'Total Adm', color: '#f87171' },
  
  // Attendances Metrics
  { name: 'Type1_Attendances', label: 'Type 1 A&E Attendances', shortLabel: 'Type 1 Att', color: '#3b82f6' },
  { name: 'Type2_Attendances', label: 'Type 2 A&E Attendances', shortLabel: 'Type 2 Att', color: '#10b981' },
  { name: 'Other_Attendances', label: 'Other A&E Attendances', shortLabel: 'Other Att', color: '#f59e0b' },
  { name: 'Total_Attendances', label: 'Total A&E Attendances', shortLabel: 'Total Att', color: '#ef4444' },
  
  // 4-Hour Target Breaches
  { name: 'Type1_Breaches', label: 'Type 1 Four-Hour Breaches', shortLabel: 'Type 1 Breach', color: '#ec4899' },
  { name: 'Type2_Breaches', label: 'Type 2 Four-Hour Breaches', shortLabel: 'Type 2 Breach', color: '#a855f7' },
  { name: 'Other_Breaches', label: 'Other Four-Hour Breaches', shortLabel: 'Other Breach', color: '#f97316' },
  { name: 'Total_Breaches', label: 'Total Four-Hour Breaches', shortLabel: 'Total Breach', color: '#dc2626' },
  { name: 'Breach_Rate', label: 'Four-Hour Breach Rate', shortLabel: 'Breach Rate', color: '#db2777' },
  
  // Wait Time Quality Indicator
  { name: 'Wait_12hrs', label: 'Patients Waiting 12+ Hours', shortLabel: '12+ Hrs Wait', color: '#f472b6' },
];

/* Glass panel component */
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

/* Custom tooltip for charts */
const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;

  // Group historical and forecast values by metric
  const groupedMetrics = {};
  payload.forEach((entry) => {
    const isForecast = entry.dataKey?.includes('_Forecast');
    const metricKey = isForecast ? entry.dataKey.replace('_Forecast', '') : entry.dataKey;
    
    if (!groupedMetrics[metricKey]) {
      groupedMetrics[metricKey] = { color: entry.color, name: entry.name };
    }
    
    if (isForecast) {
      groupedMetrics[metricKey].forecastValue = entry.value;
    } else {
      groupedMetrics[metricKey].historicalValue = entry.value;
    }
  });

  const metrics = Object.entries(groupedMetrics);
  const useCompactLayout = metrics.length > 5;

  return (
    <Box
      sx={{
        background: 'rgba(15,23,42,0.98)',
        backdropFilter: 'blur(20px)',
        border: '1px solid rgba(255,255,255,0.15)',
        borderRadius: '12px',
        p: 1.5,
        boxShadow: '0 8px 32px rgba(0,0,0,0.5)',
        maxWidth: useCompactLayout ? '400px' : '320px',
        maxHeight: '400px',
        overflowY: 'auto',
        '&::-webkit-scrollbar': {
          width: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(96,165,250,0.3)',
          borderRadius: '3px',
          '&:hover': {
            background: 'rgba(96,165,250,0.5)',
          },
        },
      }}
    >
      <Typography 
        variant="body2" 
        sx={{ 
          color: '#e2e8f0', 
          mb: 1.5, 
          fontWeight: 700, 
          fontSize: '0.8rem',
          borderBottom: '1px solid rgba(255,255,255,0.1)',
          pb: 0.75,
        }}
      >
        {label}
      </Typography>
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: useCompactLayout ? 'repeat(2, 1fr)' : '1fr',
          gap: useCompactLayout ? 1.5 : 1,
        }}
      >
        {metrics.map(([metricKey, data], index) => {
          const metricInfo = AVAILABLE_METRICS.find(m => m.name === metricKey);
          const displayName = metricInfo?.shortLabel || metricKey;
          const value = data.forecastValue || data.historicalValue;
          const isForecast = data.forecastValue !== undefined;

          return (
            <Box
              key={index}
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: 0.25,
              }}
            >
              <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                <Box
                  sx={{
                    width: 8,
                    height: 8,
                    borderRadius: '50%',
                    backgroundColor: data.color,
                    flexShrink: 0,
                  }}
                />
                <Typography
                  variant="caption"
                  sx={{
                    color: 'rgba(148,163,184,0.9)',
                    fontSize: '0.68rem',
                    fontWeight: 500,
                    lineHeight: 1.2,
                  }}
                >
                  {displayName}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                sx={{
                  color: data.color,
                  fontWeight: 700,
                  fontSize: '0.8rem',
                  pl: 1.5,
                  lineHeight: 1.2,
                }}
              >
                {new Intl.NumberFormat('en-US').format(Math.round(value))}
                {isForecast && (
                  <Typography 
                    component="span" 
                    sx={{ 
                      ml: 0.5, 
                      color: 'rgba(148,163,184,0.7)', 
                      fontSize: '0.65rem',
                      fontStyle: 'italic',
                    }}
                  >
                    (F)
                  </Typography>
                )}
              </Typography>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
};

/* Format large numbers for Y-axis */
const formatYAxis = (value) => {
  if (value >= 1000000) return `${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${(value / 1000).toFixed(0)}K`;
  return value;
};

/* Compact legend for mobile and desktop */
const CompactLegend = ({ payload }) => {
  if (!payload) return null;
  // Filter out forecast-only and "none" legend entries
  const items = payload.filter(entry => entry.type !== 'none');
  
  // For many metrics, use a scrollable container
  const hasMany = items.length > 8;
  
  return (
    <Box
      sx={{
        display: 'flex',
        flexWrap: hasMany ? 'nowrap' : 'wrap',
        justifyContent: hasMany ? 'flex-start' : 'center',
        gap: '12px 20px',
        px: 2,
        pb: 2,
        pt: 1.5,
        overflowX: hasMany ? 'auto' : 'visible',
        maxWidth: '100%',
        '&::-webkit-scrollbar': {
          height: '6px',
        },
        '&::-webkit-scrollbar-track': {
          background: 'rgba(255,255,255,0.05)',
          borderRadius: '3px',
        },
        '&::-webkit-scrollbar-thumb': {
          background: 'rgba(96,165,250,0.3)',
          borderRadius: '3px',
          '&:hover': {
            background: 'rgba(96,165,250,0.5)',
          },
        },
      }}
    >
      {items.map((entry, index) => {
        // Extract metric name from the dataKey
        const metricKey = entry.dataKey?.replace('_Forecast', '');
        const metric = AVAILABLE_METRICS.find(m => m.name === metricKey);
        return (
          <Box 
            key={index} 
            sx={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '5px',
              px: 1,
              py: 0.5,
              borderRadius: '6px',
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid rgba(255,255,255,0.08)',
              flexShrink: 0,
            }}
          >
            <Box
              sx={{
                width: 10,
                height: 10,
                borderRadius: '50%',
                backgroundColor: entry.color,
                flexShrink: 0,
                boxShadow: `0 0 8px ${entry.color}40`,
              }}
            />
            <Typography
              sx={{
                fontSize: '0.68rem',
                color: 'rgba(226,232,240,0.95)',
                fontWeight: 600,
                whiteSpace: 'nowrap',
                letterSpacing: '0.01em',
              }}
            >
              {metric?.shortLabel || entry.value}
            </Typography>
          </Box>
        );
      })}
    </Box>
  );
};

/* Format date for X-axis */
const formatXAxis = (value, isMobile) => {
  const [year, month] = value.split('-');
  const monthNames = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthIndex = parseInt(month) - 1;
  const monthName = monthNames[monthIndex] || month;

  // Always use short year format to save space
  return `${monthName} '${year.slice(2)}`;
};

/* Calculate tick interval for better display */
const calculateInterval = (dataLength, isMobile) => {
  if (isMobile) {
    // Show fewer labels on mobile
    if (dataLength > 60) return Math.ceil(dataLength / 6);
    if (dataLength > 36) return Math.ceil(dataLength / 5);
    return Math.ceil(dataLength / 4);
  }
  // Desktop - space out labels to prevent overlap
  if (dataLength > 80) return Math.ceil(dataLength / 12);
  if (dataLength > 60) return Math.ceil(dataLength / 10);
  if (dataLength > 36) return Math.ceil(dataLength / 8);
  return Math.ceil(dataLength / 6);
};

/* Prepare data for time series chart (historical + forecast) */
const prepareTimeSeriesData = (prediction, selectedMetrics) => {
  const data = [];
  const historicalMonths = prediction.historical_data.months || [];
  const forecastMonths = prediction.forecast.months || [];

  // Add historical data
  historicalMonths.forEach((month, idx) => {
    const point = { month };
    selectedMetrics.forEach((metricName) => {
      const values = prediction.historical_data[metricName];
      if (values && values[idx] !== undefined) {
        point[metricName] = values[idx];
      }
    });
    data.push(point);
  });

  // Add forecast data
  forecastMonths.forEach((month, idx) => {
    const point = { month };
    selectedMetrics.forEach((metricName) => {
      const values = prediction.forecast[metricName];
      if (values && values[idx] !== undefined) {
        point[`${metricName}_Forecast`] = values[idx];
      }
    });
    data.push(point);
  });

  return data;
};

/* Prepare data for yearly bar chart */
const prepareYearlyData = (yearlyAggregates, selectedMetrics) => {
  const years = new Set();

  // Collect all years
  Object.values(yearlyAggregates).forEach((metricData) => {
    Object.keys(metricData).forEach((key) => {
      if (key.startsWith('year_') && metricData[key] > 0) {
        years.add(key);
      }
    });
  });

  const sortedYears = Array.from(years).sort((a, b) => {
    const numA = parseInt(a.split('_')[1]);
    const numB = parseInt(b.split('_')[1]);
    return numA - numB;
  });

  return sortedYears.map((yearKey) => {
    const yearNum = parseInt(yearKey.split('_')[1]);
    const dataPoint = { year: `Year ${yearNum}` };

    selectedMetrics.forEach((metricName) => {
      if (yearlyAggregates[metricName]?.[yearKey]) {
        dataPoint[metricName] = yearlyAggregates[metricName][yearKey];
      }
    });

    return dataPoint;
  });
};

const PredictionCharts = ({ prediction, selectedMetrics }) => {
  const [chartType, setChartType] = useState('line'); // 'line', 'area', 'bar'
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  if (!prediction) return null;

  const timeSeriesData = useMemo(
    () => prepareTimeSeriesData(prediction, selectedMetrics),
    [prediction, selectedMetrics]
  );
  const yearlyData = useMemo(
    () => prepareYearlyData(prediction.yearly_aggregates, selectedMetrics),
    [prediction, selectedMetrics]
  );

  // Get metric info
  const getMetricInfo = (name) => AVAILABLE_METRICS.find((m) => m.name === name);

  // Calculate chart height based on screen size
  const chartHeight = isMobile ? 380 : 450;

  return (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: { xs: 2, md: 3 }, width: '100%' }}>
      {/* Time Series Chart */}
      <GlassPanel sx={{ p: { xs: 3, md: 4 }, width: '100%' }}>
        <Box sx={{ display: 'flex', flexDirection: { xs: 'column', sm: 'row' }, justifyContent: 'space-between', alignItems: { xs: 'flex-start', sm: 'center' }, gap: 2, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <TimelineIcon sx={{ fontSize: 20, color: '#60a5fa' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#e2e8f0', fontSize: { xs: '1rem', md: '1.15rem' } }}>
              Historical & Forecast Trend
            </Typography>
          </Box>

          <ToggleButtonGroup
            value={chartType}
            exclusive
            onChange={(e, newValue) => newValue && setChartType(newValue)}
            size="small"
            sx={{
              '& .MuiToggleButton-root': {
                color: 'rgba(148,163,184,0.7)',
                border: '1px solid rgba(255,255,255,0.1)',
                px: { xs: 1.5, sm: 2 },
                py: 0.5,
                fontSize: '0.75rem',
                '&.Mui-selected': {
                  background: 'rgba(59,130,246,0.2)',
                  color: '#60a5fa',
                  border: '1px solid rgba(59,130,246,0.4)',
                },
                '&:hover': {
                  background: 'rgba(255,255,255,0.05)',
                },
              },
            }}
          >
            <ToggleButton value="line">
              <ShowChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
              Line
            </ToggleButton>
            <ToggleButton value="area">
              <TimelineIcon sx={{ fontSize: 16, mr: 0.5 }} />
              Area
            </ToggleButton>
            <ToggleButton value="bar">
              <BarChartIcon sx={{ fontSize: 16, mr: 0.5 }} />
              Bar
            </ToggleButton>
          </ToggleButtonGroup>
        </Box>

        <ResponsiveContainer width="100%" height={chartHeight}>
          {chartType === 'line' ? (
            <LineChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="month"
                stroke="rgba(148,163,184,0.6)"
                tick={{ fontSize: isMobile ? 9 : 11, fontWeight: 500, fill: 'rgba(148,163,184,0.6)' }}
                tickFormatter={(value) => formatXAxis(value, isMobile)}
                interval={calculateInterval(timeSeriesData.length, isMobile)}
                angle={-45}
                textAnchor="end"
                height={90}
                tickMargin={10}
              />
              <YAxis
                stroke="rgba(148,163,184,0.6)"
                style={{ fontSize: '0.72rem', fontWeight: 500 }}
                tickFormatter={formatYAxis}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={<CompactLegend />}
                iconType="line"
                verticalAlign="top"
                align="center"
              />
              {selectedMetrics.map((metricName) => {
                const metric = getMetricInfo(metricName);
                return (
                  <React.Fragment key={metricName}>
                    <Line
                      type="monotone"
                      dataKey={metricName}
                      stroke={metric?.color}
                      strokeWidth={2.5}
                      dot={false}
                      name={`${metric?.label} (Forecast/Historical)`}
                      connectNulls
                      animationDuration={500}
                    />
                    <Line
                      type="monotone"
                      dataKey={`${metricName}_Forecast`}
                      stroke={metric?.color}
                      strokeWidth={2.5}
                      strokeDasharray="6 4"
                      dot={false}
                      name={`${metric?.label} (Forecast)`}
                      legendType="none"
                      connectNulls
                      animationDuration={500}
                    />
                  </React.Fragment>
                );
              })}
            </LineChart>
          ) : chartType === 'area' ? (
            <AreaChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
              <defs>
                {selectedMetrics.map((metricName) => {
                  const metric = getMetricInfo(metricName);
                  return (
                    <React.Fragment key={metricName}>
                      <linearGradient id={`color${metricName}`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metric?.color} stopOpacity={0.3} />
                        <stop offset="95%" stopColor={metric?.color} stopOpacity={0} />
                      </linearGradient>
                      <linearGradient id={`color${metricName}Forecast`} x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor={metric?.color} stopOpacity={0.2} />
                        <stop offset="95%" stopColor={metric?.color} stopOpacity={0} />
                      </linearGradient>
                    </React.Fragment>
                  );
                })}
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="month"
                stroke="rgba(148,163,184,0.6)"
                tick={{ fontSize: isMobile ? 9 : 11, fontWeight: 500, fill: 'rgba(148,163,184,0.6)' }}
                tickFormatter={(value) => formatXAxis(value, isMobile)}
                interval={calculateInterval(timeSeriesData.length, isMobile)}
                angle={-45}
                textAnchor="end"
                height={90}
                tickMargin={10}
              />
              <YAxis
                stroke="rgba(148,163,184,0.6)"
                style={{ fontSize: '0.72rem', fontWeight: 500 }}
                tickFormatter={formatYAxis}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={<CompactLegend />}
                iconType="rect"
                verticalAlign="top"
                align="center"
              />
              {selectedMetrics.map((metricName) => {
                const metric = getMetricInfo(metricName);
                return (
                  <React.Fragment key={metricName}>
                    <Area
                      type="monotone"
                      dataKey={metricName}
                      stroke={metric?.color}
                      strokeWidth={2.5}
                      fill={`url(#color${metricName})`}
                      name={`${metric?.label} (Forecast/Historical)`}
                      connectNulls
                      animationDuration={500}
                    />
                    <Area
                      type="monotone"
                      dataKey={`${metricName}_Forecast`}
                      stroke={metric?.color}
                      strokeWidth={2.5}
                      strokeDasharray="6 4"
                      fill={`url(#color${metricName}Forecast)`}
                      name={`${metric?.label} (Forecast)`}
                      legendType="none"
                      connectNulls
                      animationDuration={500}
                    />
                  </React.Fragment>
                );
              })}
            </AreaChart>
          ) : (
            <BarChart data={timeSeriesData} margin={{ top: 10, right: 30, left: 10, bottom: 40 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="month"
                stroke="rgba(148,163,184,0.6)"
                tick={{ fontSize: isMobile ? 9 : 11, fontWeight: 500, fill: 'rgba(148,163,184,0.6)' }}
                tickFormatter={(value) => formatXAxis(value, isMobile)}
                interval={calculateInterval(timeSeriesData.length, isMobile)}
                angle={-45}
                textAnchor="end"
                height={90}
                tickMargin={10}
              />
              <YAxis
                stroke="rgba(148,163,184,0.6)"
                style={{ fontSize: '0.72rem', fontWeight: 500 }}
                tickFormatter={formatYAxis}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={<CompactLegend />}
                iconType="rect"
                verticalAlign="top"
                align="center"
              />
              {selectedMetrics.map((metricName) => {
                const metric = getMetricInfo(metricName);
                return (
                  <React.Fragment key={metricName}>
                    <Bar
                      dataKey={metricName}
                      fill={metric?.color}
                      name={`${metric?.label} (Forecast/Historical)`}
                      opacity={0.85}
                      isAnimationActive={false}
                    />
                    <Bar
                      dataKey={`${metricName}_Forecast`}
                      fill={metric?.color}
                      name={`${metric?.label} (Forecast)`}
                      legendType="none"
                      opacity={0.5}
                      isAnimationActive={false}
                    />
                  </React.Fragment>
                );
              })}
            </BarChart>
          )}
        </ResponsiveContainer>

        <Typography
          variant="caption"
          sx={{
            display: 'block',
            textAlign: 'center',
            color: 'rgba(148,163,184,0.7)',
            mt: 1,
            fontSize: '0.72rem',
            fontStyle: 'italic',
          }}
        >
          Solid lines/bars represent historical data • Dashed lines/transparent bars represent forecasted values
        </Typography>
      </GlassPanel>

      {/* Yearly Aggregate Bar Chart */}
      {yearlyData.length > 0 && (
        <GlassPanel sx={{ p: { xs: 3, md: 4 }, width: '100%' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5, mb: 3 }}>
            <BarChartIcon sx={{ fontSize: 20, color: '#60a5fa' }} />
            <Typography variant="h6" fontWeight={700} sx={{ color: '#e2e8f0', fontSize: { xs: '1rem', md: '1.15rem' } }}>
              Yearly Aggregate Comparison
            </Typography>
          </Box>

          <ResponsiveContainer width="100%" height={chartHeight}>
            <BarChart data={yearlyData} margin={{ top: 10, right: 20, left: 10, bottom: 20 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.08)" />
              <XAxis
                dataKey="year"
                stroke="rgba(148,163,184,0.6)"
                style={{ fontSize: '0.8rem', fontWeight: 600 }}
              />
              <YAxis
                stroke="rgba(148,163,184,0.6)"
                style={{ fontSize: '0.72rem', fontWeight: 500 }}
                tickFormatter={formatYAxis}
                width={60}
              />
              <Tooltip content={<CustomTooltip />} />
              <Legend
                content={<CompactLegend />}
                iconType="rect"
                verticalAlign="top"
                align="center"
              />
              {selectedMetrics.map((metricName) => {
                const metric = getMetricInfo(metricName);
                return (
                  <Bar
                    key={metricName}
                    dataKey={metricName}
                    fill={metric?.color}
                    name={metric?.label}
                    radius={[8, 8, 0, 0]}
                    animationDuration={1000}
                  />
                );
              })}
            </BarChart>
          </ResponsiveContainer>

          <Typography
            variant="caption"
            sx={{
              display: 'block',
              textAlign: 'center',
              color: 'rgba(148,163,184,0.7)',
              mt: 1,
              fontSize: '0.72rem',
              fontStyle: 'italic',
            }}
          >
            Total projected values for each forecast year
          </Typography>
        </GlassPanel>
      )}
    </Box>
  );
};

export default React.memo(PredictionCharts);
