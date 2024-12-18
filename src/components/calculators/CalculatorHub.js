import React from 'react';
import { Container, Grid, Card, CardContent, Typography, Box } from '@mui/material';
import { styled } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import SavingsIcon from '@mui/icons-material/Savings';
import TimelineIcon from '@mui/icons-material/Timeline';
import HomeIcon from '@mui/icons-material/Home';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import ChildCareIcon from '@mui/icons-material/ChildCare';
import AccountBalanceWalletIcon from '@mui/icons-material/AccountBalanceWallet';
import FlagIcon from '@mui/icons-material/Flag';
import CalculateIcon from '@mui/icons-material/Calculate';
import HomeWorkIcon from '@mui/icons-material/HomeWork';
import HouseIcon from '@mui/icons-material/House';
import SecurityIcon from '@mui/icons-material/Security';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import BusinessCenterIcon from '@mui/icons-material/BusinessCenter';
import SchoolIcon from '@mui/icons-material/School';

const StyledContainer = styled(Container)(({ theme }) => ({
  position: 'relative',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(108, 99, 255, 0.1), transparent)',
    pointerEvents: 'none',
    borderRadius: theme.spacing(2),
  }
}));

const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  background: 'rgba(22, 23, 28, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'all 0.3s ease-in-out',
  cursor: 'pointer',
  overflow: 'hidden',
  position: 'relative',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: '0 8px 30px rgba(108, 99, 255, 0.2)',
    borderColor: theme.palette.primary.main,
    '& .calculator-icon': {
      transform: 'scale(1.1)',
    },
    '& .card-content': {
      background: 'linear-gradient(180deg, rgba(108, 99, 255, 0.1), rgba(22, 23, 28, 0.9))',
    },
  },
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '4px',
    background: 'linear-gradient(90deg, #6c63ff, #5a52ff)',
    opacity: 0,
    transition: 'opacity 0.3s ease-in-out',
  },
  '&:hover::before': {
    opacity: 1,
  },
}));

const calculators = [
  {
    title: 'Fixed Deposit (FD)',
    description: 'Calculate FD maturity amount with top 3 finance companies',
    icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/fd',
  },
  {
    title: 'National Pension System (NPS)',
    description: 'Plan your retirement with NPS calculator',
    icon: <SavingsIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/nps',
  },
  {
    title: 'Recurring Deposit (RD)',
    description: 'Calculate your RD maturity amount',
    icon: <TimelineIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/rd',
  },
  {
    title: 'HRA Calculator',
    description: 'Calculate your HRA exemption accurately',
    icon: <HomeIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/hra',
  },
  {
    title: 'SIP Calculator',
    description: 'Plan your investments with SIP calculator',
    icon: <TrendingUpIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/sip',
  },
  {
    title: 'FIRE Calculator',
    description: 'Plan your early retirement',
    icon: <LocalFireDepartmentIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/fire',
  },
  {
    title: 'NSC Calculator',
    description: 'Calculate returns on National Savings Certificate',
    icon: <AccountBalanceWalletIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/nsc',
  },
  {
    title: 'Sukanya Samriddhi Yojana',
    description: 'Plan your daughter\'s future with SSY calculator',
    icon: <ChildCareIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/ssy',
  },
  {
    title: 'Goal Based SIP',
    description: 'Calculate SIP needed to achieve your financial goals',
    icon: <FlagIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/goal-sip',
  },
  {
    title: 'EMI Calculator',
    description: 'Calculate your monthly EMI and view complete loan amortization schedule',
    icon: <CalculateIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/emi',
  },
  {
    title: 'Rent vs Buy Calculator',
    description: 'Compare the financial implications of renting versus buying a home',
    icon: <HomeWorkIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/rent-vs-buy',
  },
  {
    title: 'Home Affordability Calculator',
    description: 'Find out how much home you can afford based on your income',
    icon: <HouseIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/home-affordability',
  },
  {
    title: 'Life Insurance Calculator',
    description: 'Calculate the ideal life insurance coverage for your family',
    icon: <SecurityIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/life-insurance',
  },
  {
    title: 'FD Calculator',
    description: 'Calculate returns on your Fixed Deposits',
    icon: <AccountBalanceIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/fd',
  },
  {
    title: 'RD Calculator',
    description: 'Plan your Recurring Deposits and calculate maturity amount',
    icon: <SavingsIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/rd',
  },
  {
    title: 'SIP Calculator',
    description: 'Calculate returns on your SIP investments',
    icon: <MonetizationOnIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/sip',
  },
  {
    title: 'HRA Calculator',
    description: 'Calculate your HRA exemption and tax benefits',
    icon: <HomeIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/hra',
  },
  {
    title: 'NPS Calculator',
    description: 'Plan your retirement with NPS calculator',
    icon: <BusinessCenterIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/nps',
  },
  {
    title: 'FIRE Calculator',
    description: 'Plan your early retirement with FIRE calculator',
    icon: <CompareArrowsIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/fire',
  },
  {
    title: 'Goal SIP Calculator',
    description: 'Calculate SIP needed to achieve your financial goals',
    icon: <SchoolIcon sx={{ fontSize: 40 }} />,
    path: '/dashboard/calculators/goal-sip',
  },
];

export default function CalculatorHub() {
  return (
    <StyledContainer maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ position: 'relative', zIndex: 1 }}>
        <Typography
          component="h1"
          variant="h3"
          sx={{
            mb: 4,
            fontWeight: 700,
            textAlign: 'center',
            background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
          }}
        >
          Financial Calculators
        </Typography>

        <Typography
          variant="h6"
          color="text.secondary"
          sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
        >
          Make informed financial decisions with our comprehensive suite of calculators
          designed specifically for Indian investors
        </Typography>
        
        <Grid container spacing={4}>
          {calculators.map((calculator) => (
            <Grid item xs={12} sm={6} md={4} key={calculator.title}>
              <StyledCard
                component={Link}
                to={calculator.path}
                sx={{ textDecoration: 'none' }}
              >
                <CardContent className="card-content" sx={{ p: 3 }}>
                  <Box
                    sx={{
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      textAlign: 'center',
                    }}
                  >
                    <Box
                      className="calculator-icon"
                      sx={{
                        mb: 3,
                        p: 2,
                        borderRadius: '50%',
                        background: 'rgba(108, 99, 255, 0.1)',
                        color: '#6c63ff',
                        transition: 'transform 0.3s ease-in-out',
                      }}
                    >
                      {calculator.icon}
                    </Box>
                    <Typography
                      gutterBottom
                      variant="h6"
                      component="div"
                      sx={{ 
                        color: 'white', 
                        fontWeight: 600,
                        mb: 2,
                      }}
                    >
                      {calculator.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: 'rgba(255, 255, 255, 0.7)',
                        lineHeight: 1.6,
                      }}
                    >
                      {calculator.description}
                    </Typography>
                  </Box>
                </CardContent>
              </StyledCard>
            </Grid>
          ))}
        </Grid>
      </Box>
    </StyledContainer>
  );
}
