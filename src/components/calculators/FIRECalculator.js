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
  Tooltip,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  ReferenceLine,
} from 'recharts';
import InfoIcon from '@mui/icons-material/Info';

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

export default function FIRECalculator() {
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(45);
  const [monthlyExpenses, setMonthlyExpenses] = useState(50000);
  const [currentSavings, setCurrentSavings] = useState(2000000);
  const [monthlySavings, setMonthlySavings] = useState(50000);
  const [inflationRate, setInflationRate] = useState(6);
  const [returnRate, setReturnRate] = useState(12);
  const [retirementData, setRetirementData] = useState({
    requiredCorpus: 0,
    monthlyInvestmentNeeded: 0,
    chartData: [],
  });

  const calculateFIRE = () => {
    const yearsToRetirement = retirementAge - currentAge;
    const monthsToRetirement = yearsToRetirement * 12;
    
    // Calculate future monthly expenses considering inflation
    const futureMonthlyExpenses = monthlyExpenses * Math.pow(1 + inflationRate/100, yearsToRetirement);
    
    // Using the 4% rule (25x annual expenses) plus inflation adjustment
    const requiredCorpus = futureMonthlyExpenses * 12 * 25;
    
    // Calculate how much the current savings will grow
    const futureSavings = currentSavings * Math.pow(1 + returnRate/100, yearsToRetirement);
    
    // Calculate required monthly investment
    const r = returnRate / (12 * 100);
    const n = monthsToRetirement;
    const P = (requiredCorpus - futureSavings) / Math.pow(1 + r, n);
    const monthlyInvestmentNeeded = (P * r) / (Math.pow(1 + r, n) - 1);

    // Generate chart data
    const chartData = [];
    let currentTotal = currentSavings;
    for (let year = 0; year <= yearsToRetirement; year++) {
      const age = currentAge + year;
      const savings = currentTotal * Math.pow(1 + returnRate/100, 1) +
        monthlySavings * 12 * ((Math.pow(1 + returnRate/100, 1) - 1) / (returnRate/100));
      currentTotal = savings;
      
      chartData.push({
        age,
        savings,
        required: requiredCorpus,
      });
    }

    setRetirementData({
      requiredCorpus,
      monthlyInvestmentNeeded,
      chartData,
    });
  };

  useEffect(() => {
    calculateFIRE();
  }, [currentAge, retirementAge, monthlyExpenses, currentSavings, monthlySavings, inflationRate, returnRate]);

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
        FIRE Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={5}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Your Details
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Current Age: {currentAge}</Typography>
                <Slider
                  value={currentAge}
                  onChange={(e, newValue) => setCurrentAge(newValue)}
                  min={18}
                  max={60}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Target Retirement Age: {retirementAge}</Typography>
                <Slider
                  value={retirementAge}
                  onChange={(e, newValue) => setRetirementAge(newValue)}
                  min={Math.max(currentAge + 5, 35)}
                  max={70}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Expenses (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={monthlyExpenses}
                  onChange={(e) => setMonthlyExpenses(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Current Savings (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={currentSavings}
                  onChange={(e) => setCurrentSavings(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Savings (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={monthlySavings}
                  onChange={(e) => setMonthlySavings(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Expected Return Rate (%): {returnRate}</Typography>
                <Slider
                  value={returnRate}
                  onChange={(e, newValue) => setReturnRate(newValue)}
                  min={8}
                  max={15}
                  step={0.5}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Inflation Rate (%): {inflationRate}</Typography>
                <Slider
                  value={inflationRate}
                  onChange={(e, newValue) => setInflationRate(newValue)}
                  min={4}
                  max={8}
                  step={0.5}
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={7}>
          <ResultCard>
            <Typography variant="h6" gutterBottom>
              FIRE Journey Projection
            </Typography>
            <Box sx={{ height: 300, mt: 2 }}>
              <ResponsiveContainer>
                <AreaChart data={retirementData.chartData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis
                    dataKey="age"
                    label={{ value: 'Age', position: 'bottom' }}
                  />
                  <YAxis
                    tickFormatter={(value) => `₹${(value/10000000).toFixed(1)}Cr`}
                    label={{
                      value: 'Corpus (₹)',
                      angle: -90,
                      position: 'insideLeft',
                    }}
                  />
                  <ReferenceLine
                    y={retirementData.requiredCorpus}
                    label="Required Corpus"
                    stroke="#ff6584"
                    strokeDasharray="3 3"
                  />
                  <Area
                    type="monotone"
                    dataKey="savings"
                    stroke="#6c63ff"
                    fill="#6c63ff"
                    fillOpacity={0.3}
                  />
                </AreaChart>
              </ResponsiveContainer>
            </Box>
          </ResultCard>

          <Grid container spacing={2} sx={{ mt: 2 }}>
            <Grid item xs={12} md={6}>
              <ResultCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1">Required Corpus</Typography>
                  <Tooltip title="Based on the 4% withdrawal rule, accounting for inflation">
                    <InfoIcon sx={{ ml: 1, fontSize: 16, color: 'text.secondary' }} />
                  </Tooltip>
                </Box>
                <Typography variant="h5" sx={{ color: '#6c63ff' }}>
                  ₹{(retirementData.requiredCorpus/10000000).toFixed(2)} Cr
                </Typography>
              </ResultCard>
            </Grid>
            <Grid item xs={12} md={6}>
              <ResultCard>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                  <Typography variant="subtitle1">Required Monthly Investment</Typography>
                  <Tooltip title="Additional monthly investment needed to reach your FIRE goal">
                    <InfoIcon sx={{ ml: 1, fontSize: 16, color: 'text.secondary' }} />
                  </Tooltip>
                </Box>
                <Typography variant="h5" sx={{ color: '#4CAF50' }}>
                  ₹{Math.max(0, retirementData.monthlyInvestmentNeeded).toLocaleString()}
                </Typography>
              </ResultCard>
            </Grid>
          </Grid>

          <Box
            sx={{
              mt: 2,
              p: 3,
              background: 'rgba(108, 99, 255, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              The FIRE (Financial Independence, Retire Early) calculation is based on the 4% withdrawal rule,
              which suggests that you can withdraw 4% of your retirement corpus annually while maintaining
              its value over time. The projection considers inflation and expected returns on investments.
              It's recommended to consult with a financial advisor for personalized retirement planning.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
