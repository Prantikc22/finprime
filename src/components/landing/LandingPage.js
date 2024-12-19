import React, { useEffect, useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  Stack,
  CircularProgress,
  Divider as MuiDivider,
  useTheme,
  styled,
  Chip,
  Avatar,
  Rating,
  Link,
  IconButton,
  Menu,
  MenuItem,
  Divider
} from '@mui/material';
import {
  TrendingUp,
  Security,
  Assessment,
  AccountBalance,
  CreditCard,
  InsertChart,
  LocalAtm,
  Shield,
  Speed,
  Group,
  Timer,
  Verified,
  WhatsApp,
  Telegram,
  VerifiedUser,
  Gavel,
  MonetizationOn,
  TrendingUpOutlined,
  ShowChart,
  Timeline,
  Star,
  Construction,
  PeopleAlt,
  WorkspacePremium,
  ArrowForward,
  Menu as MenuIcon
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';

// Styled Components
const GradientText = styled(Typography)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  backgroundClip: 'text',
  textFillColor: 'transparent',
}));

const GlassCard = styled(motion.div)(({ theme }) => ({
  background: 'rgba(255, 255, 255, 0.05)',
  backdropFilter: 'blur(10px)',
  borderRadius: '15px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  overflow: 'hidden',
}));

const ParallaxBox = styled(Box)({
  backgroundAttachment: 'fixed',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
  backgroundSize: 'cover',
});

const StyledChip = styled(Chip)(({ theme }) => ({
  background: 'rgba(255, 215, 0, 0.1)',
  border: '1px solid #FFD700',
  color: '#FFD700',
  '& .MuiChip-icon': {
    color: '#FFD700',
  },
}));

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000 }) => {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let startTime;
    let animationFrame;

    const updateCount = (timestamp) => {
      if (!startTime) startTime = timestamp;
      const progress = timestamp - startTime;
      const percentage = Math.min(progress / duration, 1);
      
      setCount(Math.floor(end * percentage));

      if (percentage < 1) {
        animationFrame = requestAnimationFrame(updateCount);
      }
    };

    animationFrame = requestAnimationFrame(updateCount);
    return () => cancelAnimationFrame(animationFrame);
  }, [end, duration]);

  return <span>{count.toLocaleString()}</span>;
};

const testimonials = [
  {
    name: "Rajesh Kumar",
    role: "Professional Trader",
    avatar: "/images/testimonials/1.jpg",
    content: "FinPrime's holistic approach to finance is unmatched. Their option signals helped me grow my portfolio by 300% in 6 months!",
    rating: 5,
  },
  {
    name: "Priya Sharma",
    role: "Business Owner",
    avatar: "/images/testimonials/2.jpg",
    content: "Not just trading signals, their tax planning and investment advice saved me ₹3L in taxes. Best financial decision ever!",
    rating: 5,
  },
  {
    name: "Amit Patel",
    role: "Full-time Trader",
    avatar: "/images/testimonials/3.jpg",
    content: "Made ₹45,000 in a single day with their premium signals. Their risk management strategies are pure gold!",
    rating: 5,
  },
  {
    name: "Sanjay Mehta",
    role: "IT Professional",
    avatar: "/images/testimonials/4.jpg",
    content: "From SIP planning to option trading - they've transformed my financial life. Making consistent 25-30% monthly returns!",
    rating: 5,
  },
  {
    name: "Neha Gupta",
    role: "Entrepreneur",
    avatar: "/images/testimonials/5.jpg",
    content: "Unlike others who just give signals, FinPrime taught me wealth creation. Their calculators and insights are game-changers!",
    rating: 5,
  },
  {
    name: "Vikram Singh",
    role: "Corporate Professional",
    avatar: "/images/testimonials/6.jpg",
    content: "Started with ₹999/month subscription, now making ₹80-90k monthly from their option calls. Best investment decision ever!",
    rating: 5,
  }
];

const calculators = [
  {
    title: "Options Calculator",
    description: "Calculate potential profits and risks in options trading",
    icon: <ShowChart />,
    path: "/dashboard/calculators/options"
  },
  {
    title: "SIP Calculator",
    description: "Plan your long-term wealth with our advanced SIP tools",
    icon: <Timeline />,
    path: "/dashboard/calculators/sip"
  },
  {
    title: "Tax Calculator",
    description: "Optimize your tax savings with our comprehensive calculator",
    icon: <Assessment />,
    path: "/dashboard/calculators/tax"
  }
];

const financialServices = [
  {
    title: "Fixed Deposit",
    description: "Compare & choose the best FD rates",
    icon: <AccountBalance />
  },
  {
    title: "Mutual Funds",
    description: "Expert-curated fund portfolios",
    icon: <TrendingUp />
  },
  {
    title: "Insurance",
    description: "Protect your wealth and family",
    icon: <Shield />
  },
  {
    title: "Alternative Investments",
    description: "P2P, REITs & more opportunities",
    icon: <ShowChart />
  },
  {
    title: "Tax Services",
    description: "Optimize your tax planning",
    icon: <Assessment />
  },
  {
    title: "Loans",
    description: "Get the best loan rates and offers",
    icon: <MonetizationOn />
  }
];

const pages = ['Tools', 'Financial Solutions', 'FinPrime TradeRoom'];

const LandingPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [timeLeft, setTimeLeft] = useState(24 * 60 * 60);
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours}h ${minutes}m ${secs}s`;
  };

  const features = [
    {
      icon: <ShowChart fontSize="large" />,
      title: "Expert Option Signals",
      description: "SEBI registered advisors providing high-accuracy option trading calls",
      highlight: true,
    },
    {
      icon: <Timeline fontSize="large" />,
      title: "Live Trade Tracking",
      description: "Watch our experts trade in real-time and learn while you earn",
      highlight: true,
    },
    {
      icon: <Assessment fontSize="large" />,
      title: "Complete Financial Planning",
      description: "AI-powered roadmap to build and grow your wealth",
    },
    {
      icon: <AccountBalance fontSize="large" />,
      title: "Investment Advisory",
      description: "Expert guidance on FDs, mutual funds, and alternative investments",
    },
    {
      icon: <CreditCard fontSize="large" />,
      title: "Credit Card Optimization",
      description: "Maximize rewards with our AI-powered recommendations",
    },
    {
      icon: <Shield fontSize="large" />,
      title: "Insurance Planning",
      description: "Comprehensive coverage analysis and recommendations",
    },
  ];

  return (
    <Box sx={{ bgcolor: 'background.default' }}>
      {/* Single Header Implementation */}
      <Box 
        component="header" 
        sx={{ 
          py: 1, 
          bgcolor: 'background.paper', 
          borderBottom: 1, 
          borderColor: 'divider', 
          position: 'sticky', 
          top: 0, 
          zIndex: 1100 
        }}
      >
        <Container maxWidth="xl">
          <Stack direction="row" alignItems="center" justifyContent="space-between">
            {/* Logo */}
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <img src="/logo.png" alt="FinPrime Logo" style={{ height: 40 }} />
            </Box>
            
            {/* Desktop Navigation */}
            <Stack 
              direction="row" 
              spacing={4} 
              alignItems="center" 
              sx={{ 
                display: { xs: 'none', md: 'flex' } 
              }}
            >
              <Link 
                href="#tools" 
                sx={{ 
                  color: 'text.primary', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Tools
              </Link>
              <Link 
                href="#financial-solutions" 
                sx={{ 
                  color: 'text.primary', 
                  textDecoration: 'none',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                Financial Solutions
              </Link>
              <Link 
                onClick={() => navigate('/premium')}
                sx={{ 
                  color: 'text.primary', 
                  textDecoration: 'none',
                  cursor: 'pointer',
                  '&:hover': { color: 'primary.main' }
                }}
              >
                FinPrime TradeRoom
              </Link>
              <Button
                variant="outlined"
                onClick={() => navigate('/login')}
                sx={{
                  borderColor: '#FFD700',
                  color: '#FFD700',
                  '&:hover': {
                    borderColor: '#FFA500',
                    color: '#FFA500',
                    bgcolor: 'rgba(255, 215, 0, 0.1)'
                  }
                }}
              >
                Login
              </Button>
              <Button
                variant="contained"
                onClick={() => navigate('/register')}
                sx={{
                  background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                  color: 'black',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shine 2s infinite',
                  },
                  '@keyframes shine': {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' }
                  },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                  }
                }}
              >
                Register
              </Button>
            </Stack>

            {/* Mobile Navigation */}
            <Box sx={{ display: { xs: 'block', md: 'none' } }}>
              <IconButton
                size="large"
                aria-label="menu"
                onClick={handleOpenNavMenu}
                sx={{ color: 'text.primary' }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                anchorEl={anchorElNav}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                  '& .MuiPaper-root': {
                    backgroundColor: 'background.paper',
                  }
                }}
              >
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('#tools'); }}>
                  <Typography textAlign="center">Tools</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('#financial-solutions'); }}>
                  <Typography textAlign="center">Financial Solutions</Typography>
                </MenuItem>
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/premium'); }}>
                  <Typography textAlign="center">FinPrime TradeRoom</Typography>
                </MenuItem>
                <Divider />
                <MenuItem onClick={() => { handleCloseNavMenu(); navigate('/login'); }}>
                  <Typography textAlign="center">Login</Typography>
                </MenuItem>
                <MenuItem 
                  onClick={() => { handleCloseNavMenu(); navigate('/register'); }}
                  sx={{
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    color: 'black',
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    }
                  }}
                >
                  <Typography textAlign="center">Register</Typography>
                </MenuItem>
              </Menu>
            </Box>
          </Stack>
        </Container>
      </Box>

      {/* Hero Section */}
      <Box sx={{ 
        minHeight: '92vh', 
        bgcolor: 'background.default', 
        pt: { xs: 4, md: 6 },
        pb: { xs: 6, md: 8 },
        display: 'flex',
        alignItems: 'center'
      }}>
        <Container maxWidth="xl">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.5 }}
              >
                <Stack spacing={4} sx={{ maxWidth: 600 }}>
                  <GradientText 
                    variant="h1" 
                    sx={{ 
                      fontSize: { xs: '2.5rem', md: '3.5rem' },
                      fontWeight: 700,
                      lineHeight: 1.2,
                      mb: 2,
                      background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent'
                    }}
                  >
                    Your Complete Financial Freedom Partner
                  </GradientText>
                  <Typography 
                    variant="h2" 
                    color="text.secondary"
                    sx={{ 
                      fontSize: { xs: '1.25rem', md: '1.5rem' },
                      fontWeight: 400,
                      mb: 3
                    }}
                  >
                    Join thousands of successful traders and investors who trust FinPrime for their financial journey
                  </Typography>

                  <Grid container spacing={3} sx={{ mb: 4, pl: 0 }}>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <PeopleAlt sx={{ fontSize: 40, color: '#FFD700' }} />
                        <Typography variant="h6">10K+</Typography>
                        <Typography variant="body2" color="text.secondary">Active Members</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <Star sx={{ fontSize: 40, color: '#FFD700' }} />
                        <Typography variant="h6">4.8/5</Typography>
                        <Typography variant="body2" color="text.secondary">User Rating</Typography>
                      </Stack>
                    </Grid>
                    <Grid item xs={4}>
                      <Stack spacing={1}>
                        <WorkspacePremium sx={{ fontSize: 40, color: '#FFD700' }} />
                        <Typography variant="h6">15+</Typography>
                        <Typography variant="body2" color="text.secondary">Pro Tools</Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Box>
                    <Button
                      variant="contained"
                      size="large"
                      endIcon={<ArrowForward />}
                      sx={{
                        py: 1.5,
                        px: 4,
                        borderRadius: 2,
                        fontSize: '1.1rem',
                        background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                        color: 'black',
                        position: 'relative',
                        overflow: 'hidden',
                        '&::after': {
                          content: '""',
                          position: 'absolute',
                          top: 0,
                          left: '-100%',
                          width: '200%',
                          height: '100%',
                          background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                          animation: 'shine 2s infinite',
                        },
                        '@keyframes shine': {
                          '0%': { left: '-100%' },
                          '100%': { left: '100%' }
                        },
                        '&:hover': {
                          background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                        }
                      }}
                    >
                      Join the Club
                    </Button>
                  </Box>
                </Stack>
              </motion.div>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box 
                sx={{ 
                  width: '100%', 
                  position: 'relative',
                  height: { xs: '300px', md: '400px' },
                  borderRadius: 4,
                  overflow: 'hidden',
                  boxShadow: '0 10px 40px rgba(0,0,0,0.2)',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    bottom: 0,
                    background: 'linear-gradient(45deg, rgba(0,0,0,0.1), transparent)',
                    borderRadius: 4
                  }
                }}
              >
                <img
                  src="/images/hero-finance.png"
                  alt="FinPrime Trading Platform"
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    borderRadius: 'inherit'
                  }}
                />
              </Box>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Premium TradeRoom Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Grid container spacing={6} alignItems="center">
            <Grid item xs={12} md={6}>
              <Box sx={{ width: '100%', position: 'relative', mb: 4 }}>
                <img
                  src="/images/trade-room.png"
                  alt="FinPrime TradeRoom"
                  style={{
                    width: '100%',
                    height: 'auto',
                    maxWidth: '100%',
                    objectFit: 'contain',
                    borderRadius: '8px'
                  }}
                />
              </Box>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={4}>
                <GradientText variant="h2">
                  FinPrime TradeRoom
                </GradientText>
                <Typography variant="h5" color="text.secondary">
                  Premium Option Trading Signals That Pay For Themselves
                </Typography>
                <Box sx={{ bgcolor: 'rgba(255,215,0,0.1)', p: 3, borderRadius: 2, border: '1px solid rgba(255,215,0,0.2)' }}>
                  <Typography variant="h6" color="primary" gutterBottom>
                    Invest ₹999/month → Earn ₹1,00,000+ Monthly*
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    *Based on average member returns following our signals
                  </Typography>
                </Box>
                <Stack spacing={0.75}>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.03)',
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <VerifiedUser sx={{ color: 'primary.main' }} />
                      Expert Signals from SEBI Registered Research Analysts
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.03)',
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <MonetizationOn sx={{ color: 'primary.main' }} />
                      We Invest Our Own Money in Every Call
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.03)',
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Assessment sx={{ color: 'primary.main' }} />
                      Detailed Analysis & Learning with Each Trade
                    </Typography>
                  </Box>
                  <Box sx={{ 
                    p: 1, 
                    borderRadius: 1,
                    '&:hover': { 
                      bgcolor: 'rgba(255,255,255,0.03)',
                      transform: 'translateX(10px)',
                      transition: 'all 0.3s ease'
                    }
                  }}>
                    <Typography variant="body1" sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Speed sx={{ color: 'primary.main' }} />
                      Real-time Entry/Exit Alerts
                    </Typography>
                  </Box>
                </Stack>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    py: 1.5,
                    px: 4,
                    borderRadius: 2,
                    fontSize: '1.1rem',
                    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                    color: 'black',
                    position: 'relative',
                    overflow: 'hidden',
                    '&::after': {
                      content: '""',
                      position: 'absolute',
                      top: 0,
                      left: '-100%',
                      width: '200%',
                      height: '100%',
                      background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                      animation: 'shine 2s infinite',
                    },
                    '@keyframes shine': {
                      '0%': { left: '-100%' },
                      '100%': { left: '100%' }
                    },
                    '&:hover': {
                      background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                    }
                  }}
                  onClick={() => navigate('/premium')}
                >
                  Start Earning Today
                </Button>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* Calculators Section */}
      <Box id="tools" sx={{ py: 8, scrollMarginTop: '64px' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            Smart Financial Tools
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
            25+ Premium Calculators for Smarter Financial Decisions
          </Typography>
          <Grid container spacing={4}>
            {calculators.map((calc, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <GlassCard>
                    <CardContent>
                      <Stack spacing={2}>
                        <Box sx={{ color: 'primary.main', mb: 2 }}>
                          {calc.icon}
                        </Box>
                        <Typography variant="h5">{calc.title}</Typography>
                        <Typography variant="body1" color="text.secondary">
                          {calc.description}
                        </Typography>
                      </Stack>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* One Stop Financial Solution */}
      <Box id="financial-solutions" sx={{ py: 8, scrollMarginTop: '64px' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            One Stop Financial Solution
          </Typography>
          <Typography variant="h5" align="center" color="text.secondary" sx={{ mb: 6 }}>
            Everything you need to achieve financial freedom
          </Typography>
          <Grid container spacing={4}>
            {financialServices.map((service, index) => (
              <Grid item xs={12} sm={6} md={4} key={service.title}>
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  style={{ height: '100%' }}
                >
                  <GlassCard sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    minHeight: 200,
                    border: '1px solid rgba(255, 215, 0, 0.3)',
                    '&:hover': {
                      border: '1px solid #FFD700',
                      transform: 'translateY(-8px)',
                      transition: 'all 0.3s ease-in-out'
                    }
                  }}>
                    <CardContent sx={{ 
                      display: 'flex', 
                      flexDirection: 'column', 
                      alignItems: 'center',
                      justifyContent: 'center',
                      textAlign: 'center',
                      height: '100%',
                      p: 3
                    }}>
                      {service.icon}
                      <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                        {service.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {service.description}
                      </Typography>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Testimonials Section */}
      <Box sx={{ py: 8, bgcolor: 'background.paper' }}>
        <Container maxWidth="lg">
          <Typography variant="h2" align="center" gutterBottom>
            What Our Members Say
          </Typography>
          <Grid container spacing={4} sx={{ mt: 4 }}>
            {testimonials.map((testimonial, index) => (
              <Grid item xs={12} md={4} key={index}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.2 }}
                >
                  <GlassCard>
                    <CardContent>
                      <Stack spacing={2}>
                        <Stack direction="row" spacing={2} alignItems="center">
                          <Avatar
                            src={testimonial.avatar}
                            sx={{ width: 60, height: 60 }}
                          />
                          <Box>
                            <Typography variant="h6">{testimonial.name}</Typography>
                            <Typography variant="body2" color="text.secondary">
                              {testimonial.role}
                            </Typography>
                          </Box>
                        </Stack>
                        <Rating value={testimonial.rating} readOnly />
                        <Typography variant="body1">
                          "{testimonial.content}"
                        </Typography>
                      </Stack>
                    </CardContent>
                  </GlassCard>
                </motion.div>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Final CTA Section */}
      <Box 
        sx={{ 
          py: 8,
          backgroundImage: 'url(/images/cta-bg.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          position: 'relative'
        }}
      >
        <Container maxWidth="md">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <Stack spacing={4} alignItems="center" textAlign="center">
              <GradientText variant="h2">
                Transform Your Financial Journey Today
              </GradientText>
              <Typography variant="h5" color="text.secondary" sx={{ maxWidth: 800 }}>
                Get complete financial planning tools & premium options signals that pay for themselves. Join 30,000+ members earning consistent profits.
              </Typography>
              <Box sx={{ bgcolor: 'rgba(255,215,0,0.1)', p: 3, borderRadius: 2, border: '1px solid rgba(255,215,0,0.2)', mb: 3 }}>
                <Typography variant="h6" color="primary">
                  ₹999/month → Potential ₹1L+ Monthly Returns
                </Typography>
              </Box>
              <Button
                variant="contained"
                size="large"
                sx={{
                  py: 1.5,
                  px: 4,
                  borderRadius: 2,
                  fontSize: '1.2rem',
                  background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                  color: 'black',
                  position: 'relative',
                  overflow: 'hidden',
                  '&::after': {
                    content: '""',
                    position: 'absolute',
                    top: 0,
                    left: '-100%',
                    width: '200%',
                    height: '100%',
                    background: 'linear-gradient(to right, transparent, rgba(255,255,255,0.4), transparent)',
                    animation: 'shine 2s infinite',
                  },
                  '@keyframes shine': {
                    '0%': { left: '-100%' },
                    '100%': { left: '100%' }
                  },
                  '&:hover': {
                    background: 'linear-gradient(45deg, #FFA500 30%, #FFD700 90%)',
                  }
                }}
                onClick={() => navigate('/premium')}
              >
                Access Premium Features
              </Button>
            </Stack>
          </motion.div>
        </Container>
      </Box>

      {/* Footer */}
      <Box sx={{ bgcolor: 'background.paper', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Box sx={{ width: 160 }}>
                  <img src="/logo.png" alt="FinPrime Logo" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Your complete financial freedom partner. Join the community of successful traders and investors.
                </Typography>
              </Stack>
            </Grid>
            <Grid item xs={12} md={6}>
              <Stack spacing={2}>
                <Typography variant="h6">Customer Support</Typography>
                <Typography variant="body2" color="text.secondary">
                  Email: contact@logicwerk.com
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {new Date().getFullYear()} FinPrime. All rights reserved.
                </Typography>
              </Stack>
            </Grid>
          </Grid>
        </Container>
      </Box>
    </Box>
  );
};

export default LandingPage;
