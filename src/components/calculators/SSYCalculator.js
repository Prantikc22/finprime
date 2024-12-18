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
} from '@mui/material';
import { styled } from '@mui/material/styles';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

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

const SSY_INTEREST_RATE = 8.2; // Current SSY interest rate (2024)
const COMPOUNDING_FREQUENCY = 1; // Annual compounding

export default function SSYCalculator() {
  const [yearlyInvestment, setYearlyInvestment] = useState(25000);
  const [daughterAge, setDaughterAge] = useState(5);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [chartData, setChartData] = useState([]);

  const calculateSSY = () => {
    const investmentYears = 15; // Fixed 15 years of investment
    const maturityYears = 21; // Matures when daughter turns 21
    const r = SSY_INTEREST_RATE / 100;
    
    let totalAmount = 0;
    let totalInvested = yearlyInvestment * investmentYears;
    const data = [];

    for (let year = 0; year <= maturityYears - daughterAge; year++) {
      let yearAmount = 0;
      // Add this year's investment if within investment period
      if (year < investmentYears) {
        yearAmount = yearlyInvestment;
      }
      
      // Add interest on previous balance
      if (year > 0) {
        yearAmount += totalAmount * (1 + r);
      }
      
      totalAmount = yearAmount;
      
      data.push({
        year,
        amount: Math.round(totalAmount),
        investment: year < investmentYears ? yearlyInvestment * (year + 1) : totalInvested,
      });
    }

    setMaturityAmount(totalAmount);
    setTotalInvestment(totalInvested);
    setTotalInterest(totalAmount - totalInvested);
    setChartData(data);
  };

  useEffect(() => {
    calculateSSY();
  }, [yearlyInvestment, daughterAge]);

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
        Sukanya Samriddhi Yojana Calculator
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
      >
        Plan your daughter's future with SSY calculator. Current interest rate: {SSY_INTEREST_RATE}%
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Investment Details
              </Typography>
              
              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Yearly Investment
                </Typography>
                <TextField
                  fullWidth
                  value={yearlyInvestment}
                  onChange={(e) => setYearlyInvestment(Number(e.target.value))}
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: '₹',
                  }}
                />
                <Slider
                  value={yearlyInvestment}
                  onChange={(e, value) => setYearlyInvestment(value)}
                  min={1000}
                  max={150000}
                  step={1000}
                  sx={{ mt: 3 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">₹1,000</Typography>
                  <Typography variant="body2" color="text.secondary">₹1,50,000</Typography>
                </Box>
              </Box>

              <Box sx={{ mb: 4 }}>
                <Typography variant="subtitle2" gutterBottom>
                  Daughter's Age
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={daughterAge}
                    onChange={(e) => setDaughterAge(e.target.value)}
                  >
                    {[...Array(11)].map((_, i) => (
                      <MenuItem key={i} value={i}>
                        {i} years
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Grid container spacing={3}>
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, background: 'rgba(108, 99, 255, 0.1)' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Maturity Amount
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#6c63ff' }}>
                      {formatCurrency(maturityAmount)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, background: 'rgba(108, 99, 255, 0.1)' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Total Investment
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                      {formatCurrency(totalInvestment)}
                    </Typography>
                  </Paper>
                </Grid>
                <Grid item xs={6}>
                  <Paper sx={{ p: 2, background: 'rgba(108, 99, 255, 0.1)' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Total Interest
                    </Typography>
                    <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                      {formatCurrency(totalInterest)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <GradientButton
                  fullWidth
                  variant="contained"
                  onClick={() => window.open('https://www.indiapost.gov.in/Financial/Pages/Content/Sukanya-Samriddhi-Account.aspx')}
                >
                  Open SSY Account
                </GradientButton>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <StyledCard sx={{ height: '100%' }}>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Growth Projection
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
                      name="Total Amount"
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
          About Sukanya Samriddhi Yojana
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          Sukanya Samriddhi Yojana (SSY) is a government-backed savings scheme for girl children in India.
          Key features:
        </Typography>
        <Grid container spacing={2}>
          {[
            'Account can be opened for girls up to 10 years of age',
            `Current interest rate: ${SSY_INTEREST_RATE}% p.a.`,
            'Investment period: 15 years',
            'Maturity: When girl turns 21',
            'Tax benefits under Section 80C',
            'Partial withdrawal allowed for higher education',
            'Maximum yearly investment: ₹1.5 lakh',
            'Minimum yearly investment: ₹1,000',
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
