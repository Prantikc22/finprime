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
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';

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

const COLORS = ['#6c63ff', '#ff6584', '#4CAF50'];

export default function NPSCalculator() {
  const [monthlyContribution, setMonthlyContribution] = useState(5000);
  const [currentAge, setCurrentAge] = useState(30);
  const [retirementAge, setRetirementAge] = useState(60);
  const [expectedReturn, setExpectedReturn] = useState(10);
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    monthlyPension: 0,
  });

  const calculateNPS = () => {
    const years = retirementAge - currentAge;
    const months = years * 12;
    const monthlyRate = expectedReturn / (12 * 100);
    
    // Calculate corpus at retirement
    const totalInvestment = monthlyContribution * months;
    const futureValue = monthlyContribution * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
    const totalReturns = futureValue - totalInvestment;
    
    // Assuming 60% of corpus is used for annuity with 6% annual return
    const annuityCorpus = futureValue * 0.6;
    const monthlyPension = (annuityCorpus * 0.06) / 12;

    setResults({
      totalInvestment,
      totalReturns,
      monthlyPension,
    });
  };

  useEffect(() => {
    calculateNPS();
  }, [monthlyContribution, currentAge, retirementAge, expectedReturn]);

  const pieData = [
    { name: 'Total Investment', value: results.totalInvestment },
    { name: 'Total Returns', value: results.totalReturns },
  ];

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
        NPS Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Investment Details
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Contribution (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={monthlyContribution}
                  onChange={(e) => setMonthlyContribution(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 500 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Current Age: {currentAge}</Typography>
                <Slider
                  value={currentAge}
                  onChange={(e, newValue) => setCurrentAge(newValue)}
                  min={18}
                  max={55}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Retirement Age: {retirementAge}</Typography>
                <Slider
                  value={retirementAge}
                  onChange={(e, newValue) => setRetirementAge(newValue)}
                  min={Math.max(currentAge + 5, 60)}
                  max={70}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Expected Return (%): {expectedReturn}</Typography>
                <Slider
                  value={expectedReturn}
                  onChange={(e, newValue) => setExpectedReturn(newValue)}
                  min={8}
                  max={12}
                  step={0.5}
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <ResultCard>
                <Typography variant="h6" gutterBottom>
                  Corpus Distribution
                </Typography>
                <Box sx={{ height: 300 }}>
                  <ResponsiveContainer>
                    <PieChart>
                      <Pie
                        data={pieData}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={100}
                        fill="#8884d8"
                        paddingAngle={5}
                        dataKey="value"
                      >
                        {pieData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index]} />
                        ))}
                      </Pie>
                      <Tooltip
                        formatter={(value) => ['₹' + value.toLocaleString()]}
                      />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </ResultCard>
            </Grid>

            <Grid item xs={12}>
              <ResultCard>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      At Retirement (Age {retirementAge})
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="text.secondary">Total Investment</Typography>
                    <Typography variant="h6" sx={{ color: COLORS[0] }}>
                      ₹{results.totalInvestment.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Typography color="text.secondary">Total Returns</Typography>
                    <Typography variant="h6" sx={{ color: COLORS[1] }}>
                      ₹{results.totalReturns.toLocaleString()}
                    </Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Typography variant="h6" sx={{ mt: 2, color: '#6c63ff' }}>
                      Estimated Monthly Pension
                    </Typography>
                    <Typography variant="h4">
                      ₹{Math.round(results.monthlyPension).toLocaleString()}
                    </Typography>
                  </Grid>
                </Grid>
              </ResultCard>
            </Grid>
          </Grid>
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
          Note: This calculator provides an estimate based on current NPS rules and assumed returns.
          Actual returns may vary. The monthly pension is calculated assuming 60% of the corpus is used
          for annuity purchase with a 6% annual return. The remaining 40% can be withdrawn as a lump sum.
        </Typography>
      </Box>
    </Container>
  );
}
