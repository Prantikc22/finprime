import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Slider,
} from '@mui/material';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from 'recharts';

const PPFCalculator = () => {
  const [inputs, setInputs] = useState({
    yearlyInvestment: 150000,
    years: 15,
    existingBalance: 0,
  });

  const [results, setResults] = useState(null);

  const calculatePPF = () => {
    const interestRate = 7.1; // Current PPF interest rate
    let yearlyData = [];
    let balance = inputs.existingBalance;
    let totalInvestment = inputs.existingBalance;
    let totalInterest = 0;

    for (let year = 1; year <= inputs.years; year++) {
      totalInvestment += inputs.yearlyInvestment;
      const yearInterest = (balance + inputs.yearlyInvestment) * (interestRate / 100);
      balance = balance + inputs.yearlyInvestment + yearInterest;
      totalInterest += yearInterest;

      yearlyData.push({
        year: year,
        balance: Math.round(balance),
        investment: Math.round(totalInvestment),
        interest: Math.round(totalInterest),
      });
    }

    setResults({
      maturityAmount: Math.round(balance),
      totalInvestment: Math.round(totalInvestment),
      totalInterest: Math.round(totalInterest),
      yearlyData,
    });
  };

  useEffect(() => {
    calculatePPF();
  }, [inputs]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (name, value) => {
    setInputs((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        PPF Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Calculate returns on your Public Provident Fund (PPF) investments at the current interest rate
        of 7.1% p.a.
      </Typography>

      <Grid container spacing={3}>
        {/* Inputs Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Investment Details
              </Typography>
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Yearly Investment"
                  type="number"
                  value={inputs.yearlyInvestment}
                  onChange={(e) =>
                    handleInputChange('yearlyInvestment', Number(e.target.value))
                  }
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Existing Balance"
                  type="number"
                  value={inputs.existingBalance}
                  onChange={(e) =>
                    handleInputChange('existingBalance', Number(e.target.value))
                  }
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <Typography gutterBottom>Investment Period (Years)</Typography>
                <Slider
                  value={inputs.years}
                  onChange={(_, value) => handleInputChange('years', value)}
                  min={15}
                  max={30}
                  marks
                  valueLabelDisplay="auto"
                />
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        {results && (
          <Grid item xs={12} md={8}>
            <Card sx={{ mb: 3 }}>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Investment Summary
                </Typography>
                <Grid container spacing={3}>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Maturity Amount
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(results.maturityAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Investment
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(results.totalInvestment)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Interest Earned
                    </Typography>
                    <Typography variant="h6" color="success.main">
                      {formatCurrency(results.totalInterest)}
                    </Typography>
                  </Grid>
                </Grid>
              </CardContent>
            </Card>

            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Year-wise Growth
                </Typography>
                <Box sx={{ width: '100%', height: 300 }}>
                  <ResponsiveContainer>
                    <LineChart
                      data={results.yearlyData}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" />
                      <XAxis dataKey="year" />
                      <YAxis />
                      <Tooltip
                        formatter={(value) => formatCurrency(value)}
                        labelFormatter={(label) => `Year ${label}`}
                      />
                      <Legend />
                      <Line
                        type="monotone"
                        dataKey="balance"
                        name="Balance"
                        stroke="#8884d8"
                        activeDot={{ r: 8 }}
                      />
                      <Line
                        type="monotone"
                        dataKey="investment"
                        name="Investment"
                        stroke="#82ca9d"
                      />
                      <Line
                        type="monotone"
                        dataKey="interest"
                        name="Interest"
                        stroke="#ffc658"
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default PPFCalculator;
