import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Slider,
  Paper,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import SchoolIcon from '@mui/icons-material/School';
import HomeIcon from '@mui/icons-material/Home';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import CelebrationIcon from '@mui/icons-material/Celebration';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  overflow: 'visible',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
  border: 0,
  borderRadius: 8,
  color: 'white',
  padding: '12px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, #5a52ff 30%, #4845ff 90%)',
  },
}));

const GOALS = [
  {
    id: 'education',
    name: 'Higher Education',
    icon: <SchoolIcon />,
    defaultAmount: 2500000,
    defaultYears: 10,
    expectedReturn: 12,
  },
  {
    id: 'house',
    name: 'House Purchase',
    icon: <HomeIcon />,
    defaultAmount: 5000000,
    defaultYears: 15,
    expectedReturn: 12,
  },
  {
    id: 'car',
    name: 'Car Purchase',
    icon: <DirectionsCarIcon />,
    defaultAmount: 1000000,
    defaultYears: 5,
    expectedReturn: 12,
  },
  {
    id: 'marriage',
    name: 'Marriage',
    icon: <CelebrationIcon />,
    defaultAmount: 2000000,
    defaultYears: 8,
    expectedReturn: 12,
  },
  {
    id: 'retirement',
    name: 'Retirement',
    icon: <AccountBalanceIcon />,
    defaultAmount: 10000000,
    defaultYears: 25,
    expectedReturn: 12,
  },
];

export default function GoalSIPCalculator() {
  const [selectedGoal, setSelectedGoal] = useState(GOALS[0]);
  const [targetAmount, setTargetAmount] = useState(GOALS[0].defaultAmount);
  const [timeHorizon, setTimeHorizon] = useState(GOALS[0].defaultYears);
  const [expectedReturn, setExpectedReturn] = useState(GOALS[0].expectedReturn);
  const [monthlyInvestment, setMonthlyInvestment] = useState(0);
  const [chartData, setChartData] = useState([]);

  const calculateSIP = () => {
    const r = expectedReturn / 100 / 12; // Monthly rate
    const n = timeHorizon * 12; // Total months
    
    // Calculate required monthly investment using FV formula
    const monthlyInv = (targetAmount * r) / ((Math.pow(1 + r, n) - 1) * (1 + r));
    setMonthlyInvestment(monthlyInv);

    // Generate chart data
    const data = [];
    let currentAmount = 0;
    for (let year = 0; year <= timeHorizon; year++) {
      const months = year * 12;
      currentAmount = monthlyInv * ((Math.pow(1 + r, months) - 1) / r) * (1 + r);
      data.push({
        year,
        amount: Math.round(currentAmount),
        investment: Math.round(monthlyInv * months),
      });
    }
    setChartData(data);
  };

  useEffect(() => {
    calculateSIP();
  }, [targetAmount, timeHorizon, expectedReturn]);

  useEffect(() => {
    setTargetAmount(selectedGoal.defaultAmount);
    setTimeHorizon(selectedGoal.defaultYears);
    setExpectedReturn(selectedGoal.expectedReturn);
  }, [selectedGoal]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(value);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        Goal Based SIP Calculator
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
      >
        Calculate the monthly SIP amount needed to achieve your financial goals
      </Typography>

      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'center', gap: 2, flexWrap: 'wrap' }}>
        {GOALS.map((goal) => (
          <Chip
            key={goal.id}
            icon={goal.icon}
            label={goal.name}
            onClick={() => setSelectedGoal(goal)}
            sx={{
              p: 3,
              background: selectedGoal.id === goal.id ? 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)' : 'rgba(108, 99, 255, 0.1)',
              '&:hover': {
                background: selectedGoal.id === goal.id ? 'linear-gradient(45deg, #5a52ff 30%, #4845ff 90%)' : 'rgba(108, 99, 255, 0.2)',
              },
            }}
          />
        ))}
      </Box>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Goal Details
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Target Amount
                </Typography>
                <TextField
                  fullWidth
                  value={targetAmount}
                  onChange={(e) => setTargetAmount(Number(e.target.value))}
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: '₹',
                  }}
                />
                <Slider
                  value={targetAmount}
                  onChange={(e, value) => setTargetAmount(value)}
                  min={100000}
                  max={10000000}
                  step={100000}
                  sx={{ mt: 3 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">₹1L</Typography>
                  <Typography variant="body2" color="text.secondary">₹1Cr</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Time Horizon (Years)
                </Typography>
                <Slider
                  value={timeHorizon}
                  onChange={(e, value) => setTimeHorizon(value)}
                  min={1}
                  max={30}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Expected Return (% p.a.)
                </Typography>
                <Slider
                  value={expectedReturn}
                  onChange={(e, value) => setExpectedReturn(value)}
                  min={6}
                  max={15}
                  step={0.5}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>

              <Paper sx={{ p: 3, background: 'rgba(108, 99, 255, 0.1)' }}>
                <Typography variant="subtitle2" gutterBottom>
                  Required Monthly SIP
                </Typography>
                <Typography variant="h4" sx={{ color: '#6c63ff' }}>
                  {formatCurrency(monthlyInvestment)}
                </Typography>
              </Paper>

              <Box sx={{ mt: 4 }}>
                <GradientButton
                  fullWidth
                  variant="contained"
                  onClick={() => window.open('https://www.amfiindia.com/investor-corner/online-center/invest-now.html')}
                >
                  Start SIP Now
                </GradientButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <StyledCard sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Wealth Growth Projection
              </Typography>
              <Box sx={{ height: 400, mt: 2 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart
                    data={chartData}
                    margin={{
                      top: 10,
                      right: 30,
                      left: 0,
                      bottom: 0,
                    }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                    <XAxis
                      dataKey="year"
                      label={{ value: 'Years', position: 'bottom' }}
                      stroke="rgba(255,255,255,0.5)"
                    />
                    <YAxis
                      tickFormatter={(value) => formatCurrency(value)}
                      stroke="rgba(255,255,255,0.5)"
                    />
                    <Tooltip
                      formatter={(value) => formatCurrency(value)}
                      labelFormatter={(label) => `Year ${label}`}
                      contentStyle={{
                        background: 'rgba(22, 23, 28, 0.9)',
                        border: '1px solid rgba(255,255,255,0.1)',
                        borderRadius: '8px',
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="investment"
                      stackId="1"
                      stroke="#4845ff"
                      fill="#4845ff"
                      fillOpacity={0.3}
                      name="Total Investment"
                    />
                    <Area
                      type="monotone"
                      dataKey="amount"
                      stackId="2"
                      stroke="#6c63ff"
                      fill="#6c63ff"
                      fillOpacity={0.6}
                      name="Expected Amount"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      <Box
        sx={{
          mt: 6,
          p: 3,
          borderRadius: 2,
          background: 'rgba(108, 99, 255, 0.1)',
          border: '1px solid rgba(108, 99, 255, 0.2)',
        }}
      >
        <Typography variant="h6" gutterBottom>
          About Goal Based SIP
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          A Goal Based SIP helps you plan your investments according to your specific financial goals:
        </Typography>
        <Grid container spacing={2}>
          {[
            'Automatically calculates required monthly investment',
            'Considers time value of money',
            'Accounts for inflation and expected returns',
            'Helps track progress towards your goal',
            'Enables disciplined investing',
            'Provides visual wealth growth projection',
          ].map((feature, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Box
                sx={{
                  p: 2,
                  borderRadius: 1,
                  background: 'rgba(255,255,255,0.05)',
                  height: '100%',
                }}
              >
                <Typography variant="body2">{feature}</Typography>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Container>
  );
}
