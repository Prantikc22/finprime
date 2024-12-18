import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Slider,
  Paper,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ResultCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

export default function RDCalculator() {
  const [monthlyDeposit, setMonthlyDeposit] = useState(5000);
  const [tenure, setTenure] = useState(36);
  const [interestRate, setInterestRate] = useState(7.5);
  const [chartData, setChartData] = useState([]);
  const [maturityAmount, setMaturityAmount] = useState(0);
  const [totalInvestment, setTotalInvestment] = useState(0);
  const [totalInterest, setTotalInterest] = useState(0);

  const calculateRD = () => {
    const monthlyRate = interestRate / (12 * 100);
    const months = tenure;
    const P = monthlyDeposit;

    // Calculate maturity amount using RD formula
    const maturityAmount = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalInvestment = P * months;
    const totalInterest = maturityAmount - totalInvestment;

    setMaturityAmount(maturityAmount);
    setTotalInvestment(totalInvestment);
    setTotalInterest(totalInterest);

    // Generate chart data
    const data = [];
    for (let i = 0; i <= months; i++) {
      const invested = P * i;
      const interest = P * ((Math.pow(1 + monthlyRate, i) - 1) / monthlyRate) - invested;
      data.push({
        month: i,
        invested,
        interest,
        total: invested + interest,
      });
    }
    setChartData(data);
  };

  useEffect(() => {
    calculateRD();
  }, [monthlyDeposit, tenure, interestRate]);

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
        RD Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Calculate Your Returns
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Deposit (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={monthlyDeposit}
                  onChange={(e) => setMonthlyDeposit(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 100 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Tenure (Months): {tenure}</Typography>
                <Slider
                  value={tenure}
                  onChange={(e, newValue) => setTenure(newValue)}
                  min={6}
                  max={120}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Interest Rate (%): {interestRate}</Typography>
                <Slider
                  value={interestRate}
                  onChange={(e, newValue) => setInterestRate(newValue)}
                  min={5}
                  max={9}
                  step={0.1}
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </StyledCard>

          <ResultCard sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              On Maturity
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="text.secondary">Total Investment</Typography>
                <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                  ₹{totalInvestment.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">Total Interest</Typography>
                <Typography variant="h6" sx={{ color: '#ff6584' }}>
                  ₹{totalInterest.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Maturity Amount
                </Typography>
                <Typography variant="h4" sx={{ color: '#4CAF50' }}>
                  ₹{maturityAmount.toLocaleString(undefined, { maximumFractionDigits: 0 })}
                </Typography>
              </Grid>
            </Grid>
          </ResultCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Growth Projection
              </Typography>
              <Box sx={{ height: 400, mt: 2 }}>
                <ResponsiveContainer>
                  <AreaChart data={chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="month"
                      label={{ value: 'Months', position: 'bottom' }}
                    />
                    <YAxis
                      label={{
                        value: 'Amount (₹)',
                        angle: -90,
                        position: 'insideLeft',
                      }}
                    />
                    <Tooltip
                      formatter={(value) => ['₹' + value.toLocaleString()]}
                    />
                    <Area
                      type="monotone"
                      dataKey="invested"
                      stackId="1"
                      stroke="#6c63ff"
                      fill="#6c63ff"
                      fillOpacity={0.4}
                      name="Invested Amount"
                    />
                    <Area
                      type="monotone"
                      dataKey="interest"
                      stackId="1"
                      stroke="#ff6584"
                      fill="#ff6584"
                      fillOpacity={0.4}
                      name="Interest Earned"
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
          mt: 4,
          p: 3,
          background: 'rgba(108, 99, 255, 0.1)',
          borderRadius: '16px',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Note: This calculator provides an estimate based on the current interest rates.
          The actual returns may vary depending on the bank and market conditions.
          Interest is compounded quarterly in this calculation.
        </Typography>
      </Box>
    </Container>
  );
}
