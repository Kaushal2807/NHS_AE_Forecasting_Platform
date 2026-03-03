// Mock metrics data for Key Metrics section
// This will be replaced with real data from backend API when available

export const mockMetrics = {
  hospitals: {
    label: "Hospitals Covered",
    value: "127",
    change: "+5 this year",
    icon: "LocalHospital",
  },
  records: {
    label: "Historical Records",
    value: "45,234",
    change: "Monthly data points",
    icon: "Storage",
  },
  latestAttendance: {
    label: "Latest Month Total Attendance",
    value: "1.2M",
    change: "+3.2% MoM",
    icon: "People",
  },
  growthRate: {
    label: "Average Annual Growth Rate",
    value: "4.7%",
    change: "Year-over-year",
    icon: "TrendingUp",
  },
};

export default mockMetrics;
