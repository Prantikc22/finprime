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

const NSC_INTEREST_RATE = 7.7; // Current NSC interest rate (2024)
const COMPOUNDING_FREQUENCY = 2; // Semi-annual compounding

export default function NSCCalculator() {
  const [investment, setInvestment] = useState(10000);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);
  const [chartData, setChartData] = useState([]);

  const calculateNSC = () => {
    const years = 5; // NSC has a fixed 5-year term
    const r = NSC_INTEREST_RATE / 100 / COMPOUNDING_FREQUENCY;
    const n = COMPOUNDING_FREQUENCY * years;
    
    const maturityAmt = investment * Math.pow(1 + r, n);
    const interest = maturityAmt - investment;
    
    setMaturityAmount(maturityAmt);
    setTotalInterest(interest);

    // Generate chart data
    const data = [];
    for (let i = 0; i <= years * 2; i++) {
      const timePoint = i / 2;
      const amount = investment * Math.pow(1 + r, i);
      data.push({
        year: timePoint.toFixed(1),
        amount: Math.round(amount),
        principal: investment,
      });
    }
    setChartData(data);
  };

  useEffect(() => {
    calculateNSC();
  }, [investment]);

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
        NSC Calculator
      </Typography>

      <Typography
        variant="h6"
        color="text.secondary"
        sx={{ mb: 6, textAlign: 'center', maxWidth: '800px', mx: 'auto' }}
      >
        Calculate returns on your National Savings Certificate (NSC) investment
        with current interest rate of {NSC_INTEREST_RATE}%
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent sx={{ p: 4 }}>
              <Typography variant="h6" gutterBottom>
                Investment Amount
              </Typography>
              <Box sx={{ mb: 4 }}>
                <TextField
                  fullWidth
                  value={investment}
                  onChange={(e) => setInvestment(Number(e.target.value))}
                  type="number"
                  variant="outlined"
                  InputProps={{
                    startAdornment: '₹',
                  }}
                />
                <Slider
                  value={investment}
                  onChange={(e, value) => setInvestment(value)}
                  min={1000}
                  max={500000}
                  step={1000}
                  sx={{ mt: 3 }}
                />
                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 1 }}>
                  <Typography variant="body2" color="text.secondary">₹1,000</Typography>
                  <Typography variant="body2" color="text.secondary">₹5,00,000</Typography>
                </Box>
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
                <Grid item xs={12}>
                  <Paper sx={{ p: 2, background: 'rgba(108, 99, 255, 0.1)' }}>
                    <Typography variant="subtitle2" gutterBottom>
                      Total Interest Earned
                    </Typography>
                    <Typography variant="h5" sx={{ color: '#6c63ff' }}>
                      {formatCurrency(totalInterest)}
                    </Typography>
                  </Paper>
                </Grid>
              </Grid>

              <Box sx={{ mt: 4 }}>
                <GradientButton
                  fullWidth
                  variant="contained"
                  onClick={() => window.open('https://www.indiapost.gov.in/Financial/Pages/Content/NSC.aspx')}
                >
                  Invest in NSC
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
                      dataKey="principal"
                      stackId="1"
                      stroke="#4845ff"
                      fill="#4845ff"
                      fillOpacity={0.3}
                      name="Principal"
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
          About NSC
        </Typography>
        <Typography variant="body1" color="text.secondary" sx={{ mb: 2 }}>
          National Savings Certificate (NSC) is a fixed income investment scheme
          offered by India Post. Key features:
        </Typography>
        <Grid container spacing={2}>
          {[
            'Fixed 5-year investment term',
            `Current interest rate: ${NSC_INTEREST_RATE}% p.a.`,
            'Semi-annual compounding',
            'Eligible for tax deduction under Section 80C',
            'Backed by Government of India',
            'Can be used as collateral for loans',
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
