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

const EPFCalculator = () => {
  const [inputs, setInputs] = useState({
    monthlyBasic: 50000,
    currentAge: 30,
    retirementAge: 60,
    existingBalance: 0,
    employeeContribution: 12,
    employerContribution: 12,
  });

  const [results, setResults] = useState(null);

  const calculateEPF = () => {
    const interestRate = 8.15; // Current EPF interest rate
    const years = inputs.retirementAge - inputs.currentAge;
    let yearlyData = [];
    let balance = inputs.existingBalance;
    let totalInvestment = inputs.existingBalance;
    let totalInterest = 0;

    const monthlyContribution =
      (inputs.monthlyBasic * (inputs.employeeContribution + inputs.employerContribution)) / 100;

    for (let year = 1; year <= years; year++) {
      const yearlyContribution = monthlyContribution * 12;
      totalInvestment += yearlyContribution;
      const yearInterest = (balance + yearlyContribution) * (interestRate / 100);
      balance = balance + yearlyContribution + yearInterest;
      totalInterest += yearInterest;

      yearlyData.push({
        year: inputs.currentAge + year,
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
      monthlyContribution: Math.round(monthlyContribution),
    });
  };

  useEffect(() => {
    calculateEPF();
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
        EPF Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Calculate your Employee Provident Fund (EPF) returns at the current interest rate of 8.15% p.a.
      </Typography>

      <Grid container spacing={3}>
        {/* Inputs Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Employment Details
              </Typography>
              <Box sx={{ mt: 3 }}>
                <TextField
                  label="Monthly Basic Salary"
                  type="number"
                  value={inputs.monthlyBasic}
                  onChange={(e) => handleInputChange('monthlyBasic', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <TextField
                  label="Existing EPF Balance"
                  type="number"
                  value={inputs.existingBalance}
                  onChange={(e) => handleInputChange('existingBalance', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                  sx={{ mb: 3 }}
                />
                <Typography gutterBottom>Current Age</Typography>
                <Slider
                  value={inputs.currentAge}
                  onChange={(_, value) => handleInputChange('currentAge', value)}
                  min={18}
                  max={59}
                  marks
                  valueLabelDisplay="auto"
                  sx={{ mb: 3 }}
                />
                <Typography gutterBottom>Retirement Age</Typography>
                <Slider
                  value={inputs.retirementAge}
                  onChange={(_, value) => handleInputChange('retirementAge', value)}
                  min={inputs.currentAge + 1}
                  max={60}
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
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Monthly Contribution
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(results.monthlyContribution)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Maturity Amount
                    </Typography>
                    <Typography variant="h6" color="primary">
                      {formatCurrency(results.maturityAmount)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Investment
                    </Typography>
                    <Typography variant="h6">
                      {formatCurrency(results.totalInvestment)}
                    </Typography>
                  </Grid>
                  <Grid item xs={12} sm={3}>
                    <Typography variant="subtitle2" color="text.secondary">
                      Total Interest
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
                        labelFormatter={(label) => `Age ${label}`}
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

export default EPFCalculator;
