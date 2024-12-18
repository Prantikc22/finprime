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
  Stack,
  Alert,
} from '@mui/material';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const HomeAffordabilityCalculator = () => {
  const [inputs, setInputs] = useState({
    annualIncome: 1200000,
    monthlyDebts: 10000,
    downPayment: 1000000,
    interestRate: 8.5,
    loanTerm: 20,
    propertyTax: 1.5,
    homeInsurance: 0.5,
    monthlyExpenses: 30000,
  });

  const [results, setResults] = useState(null);

  const calculateAffordability = () => {
    // Calculate monthly income and expenses
    const monthlyIncome = inputs.annualIncome / 12;
    const totalMonthlyDebts = inputs.monthlyDebts + inputs.monthlyExpenses;

    // Calculate maximum monthly payment using 40% DTI ratio
    const maxMonthlyPayment = (monthlyIncome * 0.4) - totalMonthlyDebts;

    // Calculate maximum loan amount
    const monthlyInterestRate = inputs.interestRate / 12 / 100;
    const numberOfPayments = inputs.loanTerm * 12;
    const maxLoanAmount = maxMonthlyPayment / (monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1));

    // Calculate maximum home price
    const maxHomePrice = maxLoanAmount + inputs.downPayment;

    // Calculate monthly costs for maximum affordable home
    const monthlyPrincipalInterest = maxMonthlyPayment;
    const monthlyPropertyTax = (maxHomePrice * inputs.propertyTax / 100) / 12;
    const monthlyInsurance = (maxHomePrice * inputs.homeInsurance / 100) / 12;
    const totalMonthlyPayment = monthlyPrincipalInterest + monthlyPropertyTax + monthlyInsurance;

    // Calculate expense breakdown
    const expenseBreakdown = [
      {
        name: 'Housing',
        amount: totalMonthlyPayment,
      },
      {
        name: 'Other Debts',
        amount: inputs.monthlyDebts,
      },
      {
        name: 'Living Expenses',
        amount: inputs.monthlyExpenses,
      },
      {
        name: 'Remaining Income',
        amount: monthlyIncome - totalMonthlyPayment - inputs.monthlyDebts - inputs.monthlyExpenses,
      },
    ];

    setResults({
      maxHomePrice,
      maxLoanAmount,
      monthlyPayment: totalMonthlyPayment,
      monthlyIncome,
      expenseBreakdown,
      debtToIncomeRatio: (totalMonthlyPayment + totalMonthlyDebts) / monthlyIncome,
    });
  };

  useEffect(() => {
    calculateAffordability();
  }, [inputs]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const handleInputChange = (name, value) => {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Home Affordability Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Find out how much home you can afford based on your income, expenses, and down payment.
      </Typography>

      <Grid container spacing={3}>
        {/* Income and Expenses */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Income & Expenses
                </Typography>
                <TextField
                  label="Annual Income"
                  type="number"
                  value={inputs.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Monthly Debts"
                  type="number"
                  value={inputs.monthlyDebts}
                  onChange={(e) => handleInputChange('monthlyDebts', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Monthly Living Expenses"
                  type="number"
                  value={inputs.monthlyExpenses}
                  onChange={(e) => handleInputChange('monthlyExpenses', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Loan Details */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Loan Details
                </Typography>
                <TextField
                  label="Down Payment"
                  type="number"
                  value={inputs.downPayment}
                  onChange={(e) => handleInputChange('downPayment', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <Box>
                  <Typography gutterBottom>Interest Rate (%)</Typography>
                  <Slider
                    value={inputs.interestRate}
                    onChange={(_, value) => handleInputChange('interestRate', value)}
                    min={5}
                    max={15}
                    step={0.1}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Box>
                  <Typography gutterBottom>Loan Term (Years)</Typography>
                  <Slider
                    value={inputs.loanTerm}
                    onChange={(_, value) => handleInputChange('loanTerm', value)}
                    min={5}
                    max={30}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        {results && (
          <>
            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Maximum Home Price
                  </Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {formatCurrency(results.maxHomePrice)}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Maximum Loan Amount
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(results.maxLoanAmount)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Monthly Payment
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(results.monthlyPayment)}
                      </Typography>
                    </Grid>
                  </Grid>
                  {results.debtToIncomeRatio > 0.4 && (
                    <Alert severity="warning" sx={{ mt: 2 }}>
                      Your debt-to-income ratio is high. Consider reducing monthly debts or increasing down payment.
                    </Alert>
                  )}
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Budget Breakdown
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <BarChart
                        data={results.expenseBreakdown}
                        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="name" />
                        <YAxis />
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                        <Bar dataKey="amount" name="Amount" fill="#8884d8" />
                      </BarChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          </>
        )}
      </Grid>
    </Container>
  );
};

export default HomeAffordabilityCalculator;
