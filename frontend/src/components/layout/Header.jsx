import React, { useState, useEffect } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Box,
  IconButton,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Container,
  useMediaQuery,
  useTheme,
  alpha,
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import CloseIcon from '@mui/icons-material/Close';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleDrawerToggle = () => setMobileOpen(!mobileOpen);

  const handleNavigation = (path) => {
    navigate(path);
    setMobileOpen(false);
  };

  const navItems = [
    { label: 'Home', path: '/' },
    { label: 'Predict', path: '/predict' },
  ];

  const isActive = (path) => location.pathname === path;

  const drawer = (
    <Box
      sx={{
        height: '100%',
        background: 'linear-gradient(180deg, #0f172a 0%, #1e293b 100%)',
        display: 'flex',
        flexDirection: 'column',
        p: 3,
      }}
    >
      {/* Drawer Header */}
      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
          <Box
            sx={{
              width: 36,
              height: 36,
              borderRadius: '10px',
              background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              boxShadow: '0 4px 15px rgba(59,130,246,0.4)',
            }}
          >
            <LocalHospitalIcon sx={{ fontSize: 20, color: 'white' }} />
          </Box>
          <Typography sx={{ fontWeight: 700, color: 'white', fontSize: '1rem' }}>
            NHS A&E Platform
          </Typography>
        </Box>
        <IconButton onClick={handleDrawerToggle} sx={{ color: 'rgba(255,255,255,0.6)' }}>
          <CloseIcon />
        </IconButton>
      </Box>

      {/* Nav Items */}
      <List sx={{ flexGrow: 1 }}>
        {navItems.map((item) => (
          <ListItem key={item.path} disablePadding sx={{ mb: 1 }}>
            <ListItemButton
              onClick={() => handleNavigation(item.path)}
              sx={{
                borderRadius: 2,
                py: 1.5,
                px: 2,
                background: isActive(item.path)
                  ? 'linear-gradient(135deg, rgba(59,130,246,0.2), rgba(6,182,212,0.2))'
                  : 'transparent',
                border: isActive(item.path)
                  ? '1px solid rgba(59,130,246,0.3)'
                  : '1px solid transparent',
                '&:hover': {
                  background: 'rgba(59,130,246,0.1)',
                  border: '1px solid rgba(59,130,246,0.2)',
                },
              }}
            >
              <ListItemText
                primary={item.label}
                primaryTypographyProps={{
                  fontWeight: 600,
                  color: isActive(item.path) ? '#60a5fa' : 'rgba(255,255,255,0.8)',
                  fontSize: '1rem',
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      {/* Mobile CTA */}
      <Button
        variant="contained"
        fullWidth
        startIcon={<TrendingUpIcon />}
        onClick={() => handleNavigation('/predict')}
        sx={{
          background: 'linear-gradient(135deg, #2563eb, #0891b2)',
          boxShadow: '0 8px 25px rgba(37,99,235,0.4)',
          py: 1.5,
          fontSize: '1rem',
          borderRadius: 2,
          '&:hover': {
            background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
            boxShadow: '0 12px 30px rgba(59,130,246,0.5)',
          },
        }}
      >
        Start Prediction
      </Button>
    </Box>
  );

  return (
    <>
      <AppBar
        position="sticky"
        elevation={0}
        sx={{
          background: scrolled
            ? alpha('#0f172a', 0.9)
            : 'transparent',
          backdropFilter: scrolled ? 'blur(20px)' : 'none',
          borderBottom: scrolled
            ? '1px solid rgba(255,255,255,0.07)'
            : 'none',
          transition: 'all 0.4s cubic-bezier(0.4, 0, 0.2, 1)',
          boxShadow: scrolled
            ? '0 4px 30px rgba(0,0,0,0.4)'
            : 'none',
        }}
      >
        <Container maxWidth="xl">
          <Toolbar disableGutters sx={{ py: 1.8, minHeight: { xs: 68, md: 80 } }}>
            {/* Logo */}
            <Box
              component={Link}
              to="/"
              sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1.5,
                textDecoration: 'none',
                flexGrow: isMobile ? 1 : 0,
                transition: 'transform 0.3s ease',
                '&:hover': { transform: 'scale(1.02)' },
              }}
            >
              <Box
                sx={{
                  width: { xs: 46, md: 54 },
                  height: { xs: 46, md: 54 },
                  borderRadius: '14px',
                  background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  boxShadow: '0 4px 22px rgba(59,130,246,0.45)',
                  transition: 'box-shadow 0.3s ease',
                  '&:hover': {
                    boxShadow: '0 8px 32px rgba(59,130,246,0.65)',
                  },
                }}
              >
                <LocalHospitalIcon sx={{ fontSize: { xs: 26, md: 30 }, color: 'white' }} />
              </Box>
              <Typography
                variant="h6"
                sx={{
                  fontWeight: 800,
                  fontSize: { sm: '1.35rem', md: '1.5rem' },
                  display: { xs: 'none', sm: 'block' },
                  letterSpacing: '-0.01em',
                  background: 'linear-gradient(135deg, #60a5fa, #22d3ee)',
                  WebkitBackgroundClip: 'text',
                  WebkitTextFillColor: 'transparent',
                  backgroundClip: 'text',
                }}
              >
                NHS A&E Platform
              </Typography>
            </Box>

            {/* Desktop Navigation */}
            {!isMobile && (
              <Box sx={{ display: 'flex', alignItems: 'center', ml: 5, flexGrow: 1, gap: 1 }}>
                {navItems.map((item) => (
                  <Button
                    key={item.path}
                    component={Link}
                    to={item.path}
                    sx={{
                      color: isActive(item.path) ? '#60a5fa' : 'rgba(255,255,255,0.75)',
                      fontWeight: 600,
                      px: 2.5,
                      py: 1.2,
                      borderRadius: 2,
                      fontSize: '1.05rem',
                      position: 'relative',
                      background: isActive(item.path)
                        ? 'rgba(59,130,246,0.08)'
                        : 'transparent',
                      border: isActive(item.path)
                        ? '1px solid rgba(59,130,246,0.2)'
                        : '1px solid transparent',
                      transition: 'all 0.3s ease',
                      '&:hover': {
                        color: '#60a5fa',
                        background: 'rgba(59,130,246,0.08)',
                        border: '1px solid rgba(59,130,246,0.2)',
                      },
                      '&::after': { display: 'none' },
                    }}
                  >
                    {item.label}
                  </Button>
                ))}
              </Box>
            )}

            {/* Desktop CTA */}
            {!isMobile && (
              <Button
                variant="contained"
                startIcon={<TrendingUpIcon />}
                onClick={() => navigate('/predict')}
                sx={{
                  background: 'linear-gradient(135deg, #2563eb, #0891b2)',
                  boxShadow: '0 4px 22px rgba(37,99,235,0.4)',
                  px: 3.5,
                  py: 1.3,
                  borderRadius: '12px',
                  fontSize: '1rem',
                  fontWeight: 700,
                  letterSpacing: '0.01em',
                  transition: 'all 0.3s cubic-bezier(0.34, 1.56, 0.64, 1)',
                  '&:hover': {
                    background: 'linear-gradient(135deg, #3b82f6, #06b6d4)',
                    boxShadow: '0 10px 32px rgba(59,130,246,0.55)',
                    transform: 'translateY(-2px)',
                  },
                  '&::after': { display: 'none' },
                }}
              >
                Start Prediction
              </Button>
            )}

            {/* Mobile Menu Icon */}
            {isMobile && (
              <IconButton
                onClick={handleDrawerToggle}
                sx={{
                  color: 'white',
                  background: 'rgba(255,255,255,0.08)',
                  border: '1px solid rgba(255,255,255,0.1)',
                  borderRadius: 2,
                  '&:hover': { background: 'rgba(59,130,246,0.15)' },
                }}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </Container>
      </AppBar>

      {/* Mobile Drawer */}
      <Drawer
        variant="temporary"
        anchor="right"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', md: 'none' },
          '& .MuiDrawer-paper': {
            width: 280,
            border: 'none',
          },
          '& .MuiBackdrop-root': {
            backdropFilter: 'blur(4px)',
            background: 'rgba(0,0,0,0.6)',
          },
        }}
      >
        {drawer}
      </Drawer>
    </>
  );
};

export default Header;
