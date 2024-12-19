import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Container,
  Button,
  CardActions,
} from '@mui/material';
import {
  Calculate,
  CompareArrows,
  AccountBalance,
  CreditCard,
  Assessment,
  Timeline,
  Security,
  WorkspacePremium,
  MonetizationOn,
  LocalAtm,
  ReceiptLong,
} from '@mui/icons-material';

const Dashboard = () => {
  const navigate = useNavigate();

  const premiumCardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'linear-gradient(135deg, #1a1a1a 0%, #2a2a2a 100%)',
    backdropFilter: 'blur(10px)',
    transition: 'all 0.3s ease-in-out',
    border: '1px solid rgba(255, 215, 0, 0.3)',
    boxShadow: '0 10px 20px rgba(0, 0, 0, 0.3), inset 0 0 60px rgba(255, 215, 0, 0.1)',
    position: 'relative',
    overflow: 'hidden',
    '&:hover': {
      transform: 'translateY(-8px)',
      boxShadow: '0 15px 30px rgba(0, 0, 0, 0.4), inset 0 0 80px rgba(255, 215, 0, 0.15)',
      '& .premium-glow': {
        opacity: 1,
        transform: 'scale(1.1)',
      }
    },
    '&::before': {
      content: '""',
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: '2px',
      background: 'linear-gradient(90deg, transparent, rgba(255, 215, 0, 0.8), transparent)',
    },
  };

  const regularCardStyle = {
    height: '100%',
    display: 'flex',
    flexDirection: 'column',
    background: 'rgba(22, 28, 36, 0.8)',
    backdropFilter: 'blur(8px)',
    border: '1px solid rgba(255, 255, 255, 0.1)',
    transition: 'transform 0.3s ease-in-out',
    '&:hover': {
      transform: 'translateY(-5px)',
    },
  };

  const features = {
    wealthManagement: [
      {
        title: 'Financial Calculators',
        description: 'Access a suite of financial calculators for FD, RD, SIP, and more',
        icon: <Calculate />,
        path: '/dashboard/calculators',
      },
      {
        title: 'Broker Comparison',
        description: 'Compare different brokers to find the best fit for your trading needs',
        icon: <CompareArrows />,
        path: '/dashboard/brokers',
      },
      {
        title: 'Insurance Analysis',
        description: 'Analyze and compare insurance policies to make informed decisions',
        icon: <Security />,
        path: '/dashboard/insurance',
      },
    ],
    financialServices: [
      {
        title: 'Credit Card Comparison',
        description: 'Compare credit cards to find the best rewards and benefits',
        icon: <CreditCard />,
        path: '/dashboard/credit-cards',
      },
      {
        title: 'Loan Services',
        description: 'Explore and apply for various loan options',
        icon: <LocalAtm />,
        path: '/dashboard/loans',
      },
      {
        title: 'Tax Management',
        description: 'Manage your taxes efficiently with our tax planning tools',
        icon: <ReceiptLong />,
        path: '/dashboard/tax',
      },
    ],
    otherServices: [
      {
        title: 'Risk Assessment',
        description: 'Evaluate your risk tolerance and get personalized recommendations',
        icon: <Assessment />,
        path: '/dashboard/risk-assessment',
      },
      {
        title: 'Financial Journey',
        description: 'Track your financial progress and set future goals',
        icon: <Timeline />,
        path: '/dashboard/journey',
      },
    ],
  };

  const renderFeatureCard = (feature) => (
    <Grid item xs={12} sm={6} md={4} key={feature.title}>
      <Card 
        sx={{
          ...regularCardStyle,
          cursor: 'pointer',
          '&:hover': {
            ...regularCardStyle['&:hover'],
            '& .cardIcon': {
              transform: 'scale(1.1)',
            }
          }
        }}
        onClick={() => navigate(feature.path)}
      >
        <CardContent sx={{ flexGrow: 1, p: 3 }}>
          <Box display="flex" alignItems="center" mb={2}>
            <Box
              className="cardIcon"
              sx={{
                mr: 2,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 48,
                height: 48,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'white',
                transition: 'transform 0.3s ease-in-out',
              }}
            >
              {feature.icon}
            </Box>
            <Typography variant="h6">
              {feature.title}
            </Typography>
          </Box>
          <Typography variant="body2" color="text.secondary">
            {feature.description}
          </Typography>
        </CardContent>
      </Card>
    </Grid>
  );

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Premium Feature Card */}
        <Grid item xs={12}>
          <Card 
            sx={{
              ...premiumCardStyle,
              cursor: 'pointer'
            }}
            onClick={() => navigate('/premium')}
          >
            <Box
              className="premium-glow"
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                width: '150%',
                height: '150%',
                background: 'radial-gradient(circle, rgba(255, 215, 0, 0.1) 0%, transparent 70%)',
                transform: 'translate(-50%, -50%) scale(1)',
                opacity: 0.8,
                transition: 'all 0.5s ease-out',
                pointerEvents: 'none',
              }}
            />
            <CardContent
              sx={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                textAlign: 'center',
                p: 4,
                position: 'relative',
                zIndex: 1,
              }}
            >
              <Box
                sx={{
                  mb: 3,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: 100,
                  height: 100,
                  borderRadius: '50%',
                  background: 'linear-gradient(135deg, rgba(255, 215, 0, 0.15), rgba(255, 215, 0, 0.05))',
                  color: '#FFD700',
                  transform: 'rotate(-10deg)',
                  transition: 'all 0.4s ease',
                  border: '2px solid rgba(255, 215, 0, 0.3)',
                  boxShadow: '0 0 20px rgba(255, 215, 0, 0.2)',
                  '&:hover': {
                    transform: 'rotate(0deg) scale(1.1)',
                    boxShadow: '0 0 30px rgba(255, 215, 0, 0.3)',
                  }
                }}
              >
                <WorkspacePremium sx={{ fontSize: 40 }} />
              </Box>
              <Typography 
                variant="h4"
                component="h2" 
                sx={{ 
                  mb: 2,
                  color: '#FFD700',
                  fontWeight: 800,
                  textTransform: 'uppercase',
                  letterSpacing: '1px',
                  textShadow: '0 2px 4px rgba(0,0,0,0.3)',
                }}
              >
                Premium Features
              </Typography>
              <Typography 
                variant="body1" 
                sx={{ 
                  mb: 3,
                  color: 'rgba(255, 255, 255, 0.9)',
                  fontWeight: 500,
                  fontSize: '1.1rem',
                  lineHeight: 1.6,
                  letterSpacing: '0.3px',
                }}
              >
                Get expert trading calls worth ₹100,000+ monthly. Subscribe now for ₹999/month - effectively FREE with profits from your first trading call!
              </Typography>
              <Box
                sx={{
                  marginTop: 'auto',
                  position: 'relative',
                  width: '100%',
                  maxWidth: '200px',
                }}
              >
                <Typography
                  variant="button"
                  onClick={() => navigate('/premium')}
                  sx={{
                    display: 'block',
                    color: '#000',
                    background: 'linear-gradient(135deg, #FFD700, #FDB931)',
                    padding: '12px 24px',
                    borderRadius: '30px',
                    fontWeight: 700,
                    fontSize: '0.95rem',
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                    transition: 'all 0.3s ease',
                    boxShadow: '0 4px 15px rgba(255, 215, 0, 0.3)',
                    cursor: 'pointer',
                    '&:hover': {
                      transform: 'translateY(-2px)',
                      boxShadow: '0 6px 20px rgba(255, 215, 0, 0.4)',
                      background: 'linear-gradient(135deg, #FDB931, #FFD700)',
                    },
                    '&:active': {
                      transform: 'translateY(0)',
                      boxShadow: '0 2px 10px rgba(255, 215, 0, 0.3)',
                    }
                  }}
                >
                  Access Now
                </Typography>
                <Typography
                  variant="caption"
                  sx={{
                    display: 'block',
                    color: '#FFD700',
                    textAlign: 'center',
                    mt: 1,
                    fontWeight: 500,
                  }}
                >
                  First profit covers subscription cost!
                </Typography>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Wealth Management Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Wealth Management
          </Typography>
          <Grid container spacing={3}>
            {features.wealthManagement.map(renderFeatureCard)}
          </Grid>
        </Grid>

        {/* Financial Services Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Financial Services
          </Typography>
          <Grid container spacing={3}>
            {features.financialServices.map(renderFeatureCard)}
          </Grid>
        </Grid>

        {/* Other Services Section */}
        <Grid item xs={12}>
          <Typography variant="h5" gutterBottom>
            Other Services
          </Typography>
          <Grid container spacing={3}>
            {features.otherServices.map(renderFeatureCard)}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Dashboard;
