import React, { useState } from 'react';
import { useNavigate, Link, useLocation } from 'react-router-dom';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  Container,
  Avatar,
  Button,
  MenuItem,
  ListItemIcon,
  ListItemText,
  Divider,
  useTheme,
  useMediaQuery
} from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import { Timeline, Assessment, Person, Settings } from '@mui/icons-material';
import { useAuth } from '../../contexts/AuthContext';

const publicPages = [
  { title: 'Home', path: '/' },
  { title: 'FinPrime TradeRoom', path: '/premium' },
];

const wealthItems = [
  {
    text: 'Financial Journey',
    icon: <Timeline />,
    path: '/journey'
  },
  {
    text: 'Risk Assessment',
    icon: <Assessment />,
    path: '/risk'
  },
];

const profileMenuItems = [
  { text: 'Profile', icon: <Person />, path: '/profile' },
];

function Navbar() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));

  const pages = currentUser ? [
    { title: 'Dashboard', path: '/dashboard' },
    { title: 'Calculators', path: '/dashboard/calculators' },
    { title: 'Credit Cards', path: '/dashboard/credit-cards' },
    { title: 'Insurance', path: '/dashboard/insurance' },
    { title: 'Loans', path: '/dashboard/loans' },
  ] : publicPages;

  const userWealthItems = currentUser ? [
    {
      text: 'Financial Journey',
      path: '/dashboard/journey',
      icon: <Timeline fontSize="small" />,
    },
    {
      text: 'Risk Assessment',
      path: '/dashboard/risk-assessment',
      icon: <Assessment fontSize="small" />,
    },
    {
      text: 'Profile',
      path: '/dashboard/profile',
      icon: <Person fontSize="small" />,
    },
    {
      text: 'Settings',
      path: '/dashboard/settings',
      icon: <Settings fontSize="small" />,
    },
  ] : [];

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  const handleMenuItemClick = (path) => {
    navigate(path);
    handleCloseNavMenu();
  };

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out:', error);
    }
  };

  const handleLogoClick = () => {
    if (currentUser) {
      navigate('/dashboard');
    } else {
      navigate('/');
    }
  };

  return (
    <AppBar position="sticky" sx={{ background: 'rgba(22, 23, 28, 0.8)', backdropFilter: 'blur(10px)' }}>
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          {/* Mobile Menu */}
          {isMobile && (
            <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: 'white' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                {pages.map((page) => (
                  <MenuItem
                    key={page.title}
                    onClick={() => {
                      handleCloseNavMenu();
                      navigate(page.path);
                    }}
                  >
                    <Typography textAlign="center">{page.title}</Typography>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}

          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="Finprime Logo"
            onClick={handleLogoClick}
            sx={{
              height: isMobile ? '32px' : '40px',
              mr: 2,
              cursor: 'pointer'
            }}
          />

          {/* Desktop Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Button
                key={page.title}
                onClick={() => {
                  handleCloseNavMenu();
                  navigate(page.path);
                }}
                sx={{
                  my: 2,
                  mx: 1,
                  color: 'white',
                  display: 'block',
                }}
              >
                {page.title}
              </Button>
            ))}
          </Box>

          {/* User Menu */}
          <Box sx={{ flexGrow: 0 }}>
            {currentUser ? (
              <>
                <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                  <Avatar alt={currentUser.email} src="/static/images/avatar/2.jpg" />
                </IconButton>
                <Menu
                  sx={{ mt: '45px' }}
                  id="menu-appbar"
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  {userWealthItems.map((item) => (
                    <MenuItem
                      key={item.text}
                      onClick={() => handleMenuItemClick(item.path)}
                    >
                      <ListItemIcon>{item.icon}</ListItemIcon>
                      <ListItemText primary={item.text} />
                    </MenuItem>
                  ))}
                  <Divider />
                  <MenuItem onClick={handleLogout}>
                    <ListItemIcon>
                      <LogoutIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Logout" />
                  </MenuItem>
                </Menu>
              </>
            ) : (
              <Box sx={{ display: 'flex', gap: 2 }}>
                <Button
                  variant="outlined"
                  onClick={() => navigate('/login')}
                  sx={{ color: 'white', borderColor: 'white' }}
                >
                  Login
                </Button>
                <Button
                  variant="contained"
                  onClick={() => navigate('/register')}
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    color: 'black',
                  }}
                >
                  Register
                </Button>
              </Box>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
