import { createTheme, alpha } from '@mui/material/styles';
import { colors } from './colors';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: colors.medicalBlue[400],
      light: colors.medicalBlue[300],
      dark: colors.medicalBlue[700],
      contrastText: '#ffffff',
    },
    secondary: {
      main: colors.softTeal[400],
      light: colors.softTeal[300],
      dark: colors.softTeal[700],
      contrastText: '#ffffff',
    },
    success: {
      main: colors.healthGreen[400],
      light: colors.healthGreen[300],
      dark: colors.healthGreen[700],
    },
    error: {
      main: colors.rose[500],
      light: colors.rose[400],
      dark: colors.rose[600],
    },
    warning: {
      main: colors.amber[500],
      light: colors.amber[400],
      dark: colors.amber[600],
    },
    background: {
      default: colors.dark[900],
      paper: colors.dark[800],
    },
    text: {
      primary: colors.dark[100],
      secondary: colors.dark[400],
      disabled: colors.dark[500],
    },
    divider: 'rgba(255,255,255,0.08)',
  },

  typography: {
    fontFamily: [
      'Inter',
      'Plus Jakarta Sans',
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      'sans-serif',
    ].join(','),
    h1: {
      fontSize: 'clamp(2.2rem, 5vw, 3.5rem)',
      fontWeight: 800,
      lineHeight: 1.1,
      letterSpacing: '-0.03em',
    },
    h2: {
      fontSize: 'clamp(1.8rem, 4vw, 2.75rem)',
      fontWeight: 700,
      lineHeight: 1.2,
      letterSpacing: '-0.02em',
    },
    h3: {
      fontSize: 'clamp(1.5rem, 3vw, 2.2rem)',
      fontWeight: 700,
      lineHeight: 1.3,
      letterSpacing: '-0.01em',
    },
    h4: {
      fontSize: 'clamp(1.25rem, 2.5vw, 1.75rem)',
      fontWeight: 600,
      lineHeight: 1.4,
    },
    h5: {
      fontSize: 'clamp(1.1rem, 2vw, 1.35rem)',
      fontWeight: 600,
      lineHeight: 1.5,
    },
    h6: {
      fontSize: '1.1rem',
      fontWeight: 600,
      lineHeight: 1.6,
    },
    body1: {
      fontSize: '1rem',
      lineHeight: 1.7,
    },
    body2: {
      fontSize: '0.875rem',
      lineHeight: 1.7,
    },
    subtitle1: {
      fontSize: '1.05rem',
      fontWeight: 500,
      lineHeight: 1.6,
    },
    button: {
      fontWeight: 600,
      letterSpacing: '0.01em',
    },
  },

  breakpoints: {
    values: { xs: 0, sm: 600, md: 900, lg: 1200, xl: 1536 },
  },
  spacing: 8,
  shape: { borderRadius: 16 },

  shadows: [
    'none',
    '0 2px 8px rgba(0,0,0,0.3)',
    '0 4px 16px rgba(0,0,0,0.35)',
    '0 8px 24px rgba(0,0,0,0.4)',
    '0 12px 32px rgba(0,0,0,0.45)',
    '0 16px 40px rgba(0,0,0,0.5)',
    '0 20px 48px rgba(0,0,0,0.55)',
    '0 24px 56px rgba(0,0,0,0.6)',
    '0 28px 64px rgba(0,0,0,0.65)',
    ...Array(16).fill('0 32px 80px rgba(0,0,0,0.7)'),
  ],

  components: {
    /* ---- GLOBAL ---- */
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: colors.dark[900],
          scrollbarWidth: 'thin',
        },
      },
    },

    /* ---- BUTTONS ---- */
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontWeight: 600,
          borderRadius: 12,
          padding: '10px 24px',
          fontSize: '0.95rem',
          minHeight: 44,
          transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
          position: 'relative',
          overflow: 'hidden',
          '&::after': {
            content: '""',
            position: 'absolute',
            inset: 0,
            background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.08) 50%, transparent 100%)',
            transform: 'translateX(-100%)',
            transition: 'transform 0.4s ease',
          },
          '&:hover::after': {
            transform: 'translateX(100%)',
          },
        },
        contained: {
          background: `linear-gradient(135deg, ${colors.medicalBlue[600]} 0%, ${colors.softTeal[600]} 100%)`,
          boxShadow: `0 4px 20px ${alpha(colors.medicalBlue[500], 0.4)}`,
          '&:hover': {
            background: `linear-gradient(135deg, ${colors.medicalBlue[500]} 0%, ${colors.softTeal[500]} 100%)`,
            boxShadow: `0 8px 30px ${alpha(colors.medicalBlue[400], 0.5)}`,
            transform: 'translateY(-2px)',
          },
          '&:active': { transform: 'translateY(0)' },
        },
        outlined: {
          borderWidth: '1.5px',
          borderColor: alpha(colors.medicalBlue[400], 0.4),
          backdropFilter: 'blur(8px)',
          '&:hover': {
            borderWidth: '1.5px',
            borderColor: colors.medicalBlue[400],
            background: alpha(colors.medicalBlue[400], 0.08),
            transform: 'translateY(-2px)',
          },
        },
        sizeLarge: {
          padding: '14px 36px',
          fontSize: '1.05rem',
          minHeight: 52,
        },
        sizeSmall: {
          padding: '6px 16px',
          fontSize: '0.85rem',
          minHeight: 34,
        },
      },
    },

    /* ---- CARDS ---- */
    MuiCard: {
      styleOverrides: {
        root: {
          background: alpha(colors.dark[800], 0.8),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#ffffff', 0.08)}`,
          borderRadius: 20,
          transition: 'all 0.35s cubic-bezier(0.34, 1.56, 0.64, 1)',
          '&:hover': {
            transform: 'translateY(-6px)',
            border: `1px solid ${alpha(colors.medicalBlue[400], 0.3)}`,
            boxShadow: `0 20px 60px rgba(0,0,0,0.5), 0 0 40px ${alpha(colors.medicalBlue[400], 0.1)}`,
          },
        },
      },
    },

    /* ---- PAPER ---- */
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
          background: alpha(colors.dark[800], 0.85),
          backdropFilter: 'blur(20px)',
          border: `1px solid ${alpha('#ffffff', 0.07)}`,
          borderRadius: 20,
        },
        elevation0: { boxShadow: 'none' },
        elevation1: { boxShadow: '0 2px 12px rgba(0,0,0,0.3)' },
        elevation2: { boxShadow: '0 4px 20px rgba(0,0,0,0.35)' },
        elevation3: { boxShadow: '0 8px 30px rgba(0,0,0,0.4)' },
      },
    },

    /* ---- APP BAR ---- */
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
      },
    },

    /* ---- CHIP ---- */
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          fontWeight: 600,
          backdropFilter: 'blur(8px)',
        },
        filled: {
          background: alpha(colors.medicalBlue[500], 0.2),
          border: `1px solid ${alpha(colors.medicalBlue[400], 0.3)}`,
          '&:hover': { background: alpha(colors.medicalBlue[500], 0.3) },
        },
      },
    },

    /* ---- TEXT FIELDS ---- */
    MuiTextField: {
      styleOverrides: {
        root: {
          '& .MuiOutlinedInput-root': {
            borderRadius: 12,
            background: alpha(colors.dark[900], 0.5),
            backdropFilter: 'blur(8px)',
            transition: 'all 0.3s ease',
            '& fieldset': {
              borderColor: alpha('#ffffff', 0.1),
              transition: 'border-color 0.3s ease',
            },
            '&:hover fieldset': { borderColor: alpha(colors.medicalBlue[400], 0.5) },
            '&.Mui-focused fieldset': {
              borderColor: colors.medicalBlue[400],
              borderWidth: 2,
              boxShadow: `0 0 0 3px ${alpha(colors.medicalBlue[400], 0.1)}`,
            },
          },
        },
      },
    },

    /* ---- SELECT ---- */
    MuiSelect: {
      styleOverrides: {
        root: {
          borderRadius: 12,
          background: alpha(colors.dark[900], 0.5),
        },
      },
    },

    /* ---- INPUT LABEL ---- */
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: colors.dark[400],
          '&.Mui-focused': { color: colors.medicalBlue[400] },
        },
      },
    },

    /* ---- SLIDER ---- */
    MuiSlider: {
      styleOverrides: {
        root: {
          color: colors.medicalBlue[400],
          '& .MuiSlider-thumb': {
            boxShadow: `0 0 0 8px ${alpha(colors.medicalBlue[400], 0.15)}`,
            '&:hover': {
              boxShadow: `0 0 0 12px ${alpha(colors.medicalBlue[400], 0.2)}`,
            },
          },
          '& .MuiSlider-track': {
            background: `linear-gradient(90deg, ${colors.medicalBlue[500]}, ${colors.softTeal[400]})`,
            border: 'none',
          },
          '& .MuiSlider-rail': {
            background: alpha('#ffffff', 0.15),
          },
          '& .MuiSlider-markLabel': {
            color: colors.dark[400],
          },
        },
      },
    },

    /* ---- LINEAR PROGRESS ---- */
    MuiLinearProgress: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          height: 8,
          background: alpha('#ffffff', 0.1),
        },
        bar: {
          borderRadius: 8,
          background: `linear-gradient(90deg, ${colors.medicalBlue[500]}, ${colors.softTeal[400]})`,
        },
      },
    },

    /* ---- CIRCULAR PROGRESS ---- */
    MuiCircularProgress: {
      styleOverrides: {
        circle: {
          strokeLinecap: 'round',
        },
      },
    },

    /* ---- ALERT ---- */
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: 14,
          fontWeight: 500,
          backdropFilter: 'blur(8px)',
          border: `1px solid`,
        },
        standardSuccess: {
          background: alpha(colors.healthGreen[500], 0.12),
          borderColor: alpha(colors.healthGreen[400], 0.3),
          color: colors.healthGreen[300],
        },
        standardError: {
          background: alpha(colors.rose[500], 0.12),
          borderColor: alpha(colors.rose[400], 0.3),
          color: colors.rose[300],
        },
        standardWarning: {
          background: alpha(colors.amber[500], 0.12),
          borderColor: alpha(colors.amber[400], 0.3),
          color: colors.amber[400],
        },
        standardInfo: {
          background: alpha(colors.medicalBlue[500], 0.12),
          borderColor: alpha(colors.medicalBlue[400], 0.3),
          color: colors.medicalBlue[300],
        },
      },
    },

    /* ---- DIVIDER ---- */
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: alpha('#ffffff', 0.08),
        },
      },
    },

    /* ---- MENU ITEM ---- */
    MuiMenuItem: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          margin: '2px 4px',
          transition: 'background 0.2s ease',
          '&:hover': {
            background: alpha(colors.medicalBlue[400], 0.1),
          },
          '&.Mui-selected': {
            background: alpha(colors.medicalBlue[400], 0.15),
            '&:hover': { background: alpha(colors.medicalBlue[400], 0.2) },
          },
        },
      },
    },

    /* ---- CONTAINER ---- */
    MuiContainer: {
      styleOverrides: {
        root: {
          '@media (max-width:600px)': {
            paddingLeft: 16,
            paddingRight: 16,
          },
        },
      },
    },
  },
});

export default theme;
