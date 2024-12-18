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
  ToggleButton,
  ToggleButtonGroup,
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
  Legend,
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

const riskProfiles = {
  conservative: {
    label: 'Conservative',
    returns: 8,
    description: 'Debt-heavy portfolio with stable returns',
  },
  moderate: {
    label: 'Moderate',
    returns: 12,
    description: 'Balanced mix of equity and debt',
  },
  aggressive: {
    label: 'Aggressive',
    returns: 15,
    description: 'Equity-focused portfolio for maximum growth',
  },
};

export default function SIPCalculator() {
  const [monthlyInvestment, setMonthlyInvestment] = useState(10000);
  const [years, setYears] = useState(10);
  const [riskProfile, setRiskProfile] = useState('moderate');
  const [expectedReturns, setExpectedReturns] = useState(riskProfiles.moderate.returns);
  const [results, setResults] = useState({
    totalInvestment: 0,
    totalReturns: 0,
    maturityAmount: 0,
    chartData: [],
  });

  const handleRiskProfileChange = (event, newProfile) => {
    if (newProfile !== null) {
      setRiskProfile(newProfile);
      setExpectedReturns(riskProfiles[newProfile].returns);
    }
  };

  const calculateSIP = () => {
    const monthlyRate = expectedReturns / (12 * 100);
    const months = years * 12;
    const P = monthlyInvestment;

    // Calculate maturity amount using SIP formula
    const maturityAmount = P * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate) * (1 + monthlyRate);
    const totalInvestment = P * months;
    const totalReturns = maturityAmount - totalInvestment;

    // Generate chart data
    const chartData = [];
    let currentTotal = 0;
    for (let year = 0; year <= years; year++) {
      const invested = P * year * 12;
      const returns = P * ((Math.pow(1 + monthlyRate, year * 12) - 1) / monthlyRate) * (1 + monthlyRate) - invested;
      currentTotal = invested + returns;
      
      chartData.push({
        year,
        invested,
        returns,
        total: currentTotal,
      });
    }

    setResults({
      totalInvestment,
      totalReturns,
      maturityAmount,
      chartData,
    });
  };

  useEffect(() => {
    calculateSIP();
  }, [monthlyInvestment, years, expectedReturns]);

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
        SIP Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Investment Details
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Investment (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={monthlyInvestment}
                  onChange={(e) => setMonthlyInvestment(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 500 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Investment Period (Years): {years}</Typography>
                <Slider
                  value={years}
                  onChange={(e, newValue) => setYears(newValue)}
                  min={1}
                  max={30}
                  marks={[
                    { value: 1, label: '1Y' },
                    { value: 15, label: '15Y' },
                    { value: 30, label: '30Y' },
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Risk Profile</Typography>
                <ToggleButtonGroup
                  value={riskProfile}
                  exclusive
                  onChange={handleRiskProfileChange}
                  fullWidth
                  size="small"
                >
                  {Object.entries(riskProfiles).map(([key, profile]) => (
                    <ToggleButton
                      key={key}
                      value={key}
                      sx={{
                        '&.Mui-selected': {
                          background: 'rgba(108, 99, 255, 0.2)',
                        },
                      }}
                    >
                      {profile.label}
                    </ToggleButton>
                  ))}
                </ToggleButtonGroup>
                <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                  {riskProfiles[riskProfile].description}
                </Typography>
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Expected Returns (%): {expectedReturns}</Typography>
                <Slider
                  value={expectedReturns}
                  onChange={(e, newValue) => setExpectedReturns(newValue)}
                  min={6}
                  max={18}
                  step={0.5}
                  marks={[
                    { value: 6, label: '6%' },
                    { value: 12, label: '12%' },
                    { value: 18, label: '18%' },
                  ]}
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </StyledCard>

          <ResultCard sx={{ mt: 3 }}>
            <Typography variant="h6" gutterBottom>
              Investment Summary
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography color="text.secondary">Total Investment</Typography>
                <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                  ₹{results.totalInvestment.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography color="text.secondary">Total Returns</Typography>
                <Typography variant="h6" sx={{ color: '#ff6584' }}>
                  ₹{results.totalReturns.toLocaleString()}
                </Typography>
              </Grid>
              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2 }}>
                  Maturity Amount
                </Typography>
                <Typography variant="h4" sx={{ color: '#4CAF50' }}>
                  ₹{results.maturityAmount.toLocaleString()}
                </Typography>
              </Grid>
            </Grid>
          </ResultCard>
        </Grid>

        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Wealth Growth Projection
              </Typography>
              <Box sx={{ height: 400, mt: 2 }}>
                <ResponsiveContainer>
                  <AreaChart data={results.chartData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis
                      dataKey="year"
                      label={{ value: 'Years', position: 'bottom' }}
                    />
                    <YAxis
                      tickFormatter={(value) => `₹${(value/100000).toFixed(1)}L`}
                      label={{
                        value: 'Amount (₹)',
                        angle: -90,
                        position: 'insideLeft',
                      }}
                    />
                    <Tooltip
                      formatter={(value) => ['₹' + value.toLocaleString()]}
                    />
                    <Legend />
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
                      dataKey="returns"
                      stackId="1"
                      stroke="#ff6584"
                      fill="#ff6584"
                      fillOpacity={0.4}
                      name="Returns"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>

          <Box
            sx={{
              mt: 3,
              p: 3,
              background: 'rgba(108, 99, 255, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              This calculator assumes that returns are compounded monthly and all investments are made at
              the beginning of the month. The actual returns may vary based on market conditions and
              fund performance. The risk profiles provide a general guideline, but you should consult
              with a financial advisor for personalized investment advice.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
