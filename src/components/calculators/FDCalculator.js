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
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const CompanyCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(2),
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
  },
}));

const fdOptions = [
  {
    company: 'Bajaj Finance',
    rate: 8.60,
    minAmount: 15000,
    affiliateUrl: 'https://incredmoney.app.link/Qv2TSN6lnPb',
  },
  {
    company: 'Shriram Finance',
    rate: 8.80,
    minAmount: 5000,
    affiliateUrl: 'https://incredmoney.app.link/Qv2TSN6lnPb',
  },
  {
    company: 'Ujjivan Small Finance',
    rate: 9.00,
    minAmount: 5000,
    affiliateUrl: 'https://incredmoney.app.link/Qv2TSN6lnPb',
  },
];

export default function FDCalculator() {
  const [principal, setPrincipal] = useState(100000);
  const [tenure, setTenure] = useState(12);
  const [chartData, setChartData] = useState([]);

  const calculateMaturityAmount = (p, t, r) => {
    const n = 4; // quarterly compounding
    const rate = r / 100;
    return p * Math.pow(1 + rate/n, n * t/12);
  };

  useEffect(() => {
    const data = [];
    for (let month = 0; month <= tenure; month += 3) {
      const amounts = {};
      fdOptions.forEach(option => {
        amounts[option.company] = calculateMaturityAmount(principal, month, option.rate);
      });
      data.push({
        month,
        ...amounts,
      });
    }
    setChartData(data);
  }, [principal, tenure]);

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
        Fixed Deposit Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calculator
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Principal Amount (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={principal}
                  onChange={(e) => setPrincipal(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Tenure (Months): {tenure}</Typography>
                <Slider
                  value={tenure}
                  onChange={(e, newValue) => setTenure(newValue)}
                  min={1}
                  max={60}
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Growth Comparison
              </Typography>
              <Box sx={{ height: 300, mt: 2 }}>
                <ResponsiveContainer>
                  <LineChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" label={{ value: 'Months', position: 'bottom' }} />
                    <YAxis
                      label={{
                        value: 'Amount (₹)',
                        angle: -90,
                        position: 'insideLeft',
                      }}
                    />
                    <Tooltip
                      formatter={(value) => ['₹' + value.toFixed(2)]}
                    />
                    {fdOptions.map((option, index) => (
                      <Line
                        key={option.company}
                        type="monotone"
                        dataKey={option.company}
                        stroke={['#6c63ff', '#ff6584', '#4CAF50'][index]}
                        strokeWidth={2}
                      />
                    ))}
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            {fdOptions.map((option) => (
              <Grid item xs={12} md={4} key={option.company}>
                <CompanyCard>
                  <Typography variant="h6" gutterBottom>
                    {option.company}
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Interest Rate: {option.rate}%
                  </Typography>
                  <Typography variant="body2" color="text.secondary" gutterBottom>
                    Min Amount: ₹{option.minAmount.toLocaleString()}
                  </Typography>
                  <Typography variant="h6" sx={{ mt: 2, color: '#6c63ff' }}>
                    Maturity Amount
                  </Typography>
                  <Typography variant="h5" gutterBottom>
                    ₹{calculateMaturityAmount(principal, tenure, option.rate).toFixed(2)}
                  </Typography>
                  <Button
                    variant="contained"
                    fullWidth
                    sx={{
                      mt: 2,
                      background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
                    }}
                    href={option.affiliateUrl}
                    target="_blank"
                  >
                    Invest Now
                  </Button>
                </CompanyCard>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}
