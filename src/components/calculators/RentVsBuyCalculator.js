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
  Button,
  Stack,
} from '@mui/material';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const RentVsBuyCalculator = () => {
  const [inputs, setInputs] = useState({
    homePrice: 5000000,
    downPayment: 20,
    loanTerm: 20,
    interestRate: 8.5,
    propertyTax: 1.5,
    maintenance: 1,
    homeInsurance: 0.5,
    rentAmount: 25000,
    rentIncrease: 5,
    investmentReturn: 12,
    timeHorizon: 20,
  });

  const [results, setResults] = useState(null);

  const calculateResults = () => {
    const downPaymentAmount = (inputs.homePrice * inputs.downPayment) / 100;
    const loanAmount = inputs.homePrice - downPaymentAmount;
    const monthlyInterestRate = inputs.interestRate / 12 / 100;
    const numberOfPayments = inputs.loanTerm * 12;

    // Calculate monthly mortgage payment (EMI)
    const monthlyMortgage = loanAmount * monthlyInterestRate * Math.pow(1 + monthlyInterestRate, numberOfPayments) / (Math.pow(1 + monthlyInterestRate, numberOfPayments) - 1);

    // Calculate other monthly costs
    const monthlyPropertyTax = (inputs.homePrice * inputs.propertyTax) / 100 / 12;
    const monthlyMaintenance = (inputs.homePrice * inputs.maintenance) / 100 / 12;
    const monthlyInsurance = (inputs.homePrice * inputs.homeInsurance) / 100 / 12;

    const totalMonthlyOwning = monthlyMortgage + monthlyPropertyTax + monthlyMaintenance + monthlyInsurance;

    // Calculate year by year comparison
    const yearlyData = [];
    let currentRent = inputs.rentAmount;
    let totalRentPaid = 0;
    let totalOwningCost = downPaymentAmount; // Initial down payment
    let rentInvestmentValue = downPaymentAmount; // If down payment was invested instead
    let homeValue = inputs.homePrice;
    let remainingLoanBalance = loanAmount;

    for (let year = 1; year <= inputs.timeHorizon; year++) {
      // Calculate rent scenario
      totalRentPaid += currentRent * 12;
      rentInvestmentValue *= (1 + inputs.investmentReturn / 100);
      currentRent *= (1 + inputs.rentIncrease / 100);

      // Calculate buying scenario
      totalOwningCost += totalMonthlyOwning * 12;
      homeValue *= (1 + inputs.propertyAppreciation / 100);

      // Calculate loan amortization
      let yearlyInterestPaid = 0;
      let yearlyPrincipalPaid = 0;
      for (let month = 1; month <= 12; month++) {
        const interestPayment = remainingLoanBalance * monthlyInterestRate;
        const principalPayment = monthlyMortgage - interestPayment;
        yearlyInterestPaid += interestPayment;
        yearlyPrincipalPaid += principalPayment;
        remainingLoanBalance -= principalPayment;
      }

      yearlyData.push({
        year,
        rentScenario: Math.round(totalRentPaid + rentInvestmentValue),
        buyScenario: Math.round(homeValue - remainingLoanBalance - totalOwningCost),
      });
    }

    setResults({
      monthlyMortgage,
      totalMonthlyOwning,
      yearlyData,
    });
  };

  useEffect(() => {
    calculateResults();
  }, [inputs]);

  const handleInputChange = (name, value) => {
    setInputs(prev => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Rent vs Buy Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Compare the financial implications of renting versus buying a home over time.
      </Typography>

      <Grid container spacing={3}>
        {/* Inputs Section */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Home Purchase Details
                </Typography>
                <TextField
                  label="Home Price"
                  type="number"
                  value={inputs.homePrice}
                  onChange={(e) => handleInputChange('homePrice', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <Box>
                  <Typography gutterBottom>Down Payment (%)</Typography>
                  <Slider
                    value={inputs.downPayment}
                    onChange={(_, value) => handleInputChange('downPayment', value)}
                    min={10}
                    max={50}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <TextField
                  label="Loan Term (Years)"
                  type="number"
                  value={inputs.loanTerm}
                  onChange={(e) => handleInputChange('loanTerm', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  label="Interest Rate (%)"
                  type="number"
                  value={inputs.interestRate}
                  onChange={(e) => handleInputChange('interestRate', Number(e.target.value))}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Costs */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Additional Costs & Assumptions
                </Typography>
                <TextField
                  label="Property Tax Rate (%)"
                  type="number"
                  value={inputs.propertyTax}
                  onChange={(e) => handleInputChange('propertyTax', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  label="Annual Maintenance (%)"
                  type="number"
                  value={inputs.maintenance}
                  onChange={(e) => handleInputChange('maintenance', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  label="Home Insurance (%)"
                  type="number"
                  value={inputs.homeInsurance}
                  onChange={(e) => handleInputChange('homeInsurance', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  label="Property Appreciation (%)"
                  type="number"
                  value={inputs.propertyAppreciation}
                  onChange={(e) => handleInputChange('propertyAppreciation', Number(e.target.value))}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Rent & Investment Details */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Rent & Investment Details
                </Typography>
                <TextField
                  label="Monthly Rent"
                  type="number"
                  value={inputs.rentAmount}
                  onChange={(e) => handleInputChange('rentAmount', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Annual Rent Increase (%)"
                  type="number"
                  value={inputs.rentIncrease}
                  onChange={(e) => handleInputChange('rentIncrease', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  label="Investment Return (%)"
                  type="number"
                  value={inputs.investmentReturn}
                  onChange={(e) => handleInputChange('investmentReturn', Number(e.target.value))}
                  fullWidth
                />
                <TextField
                  label="Time Horizon (Years)"
                  type="number"
                  value={inputs.timeHorizon}
                  onChange={(e) => handleInputChange('timeHorizon', Number(e.target.value))}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        {results && (
          <>
            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Monthly Costs Breakdown
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">
                        Monthly Mortgage Payment: ₹{Math.round(results.monthlyMortgage).toLocaleString()}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      <Typography variant="subtitle1">
                        Total Monthly Cost: ₹{Math.round(results.totalMonthlyOwning).toLocaleString()}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Long-term Comparison
                  </Typography>
                  <Box sx={{ width: '100%', height: 400 }}>
                    <ResponsiveContainer>
                      <LineChart
                        data={results.yearlyData}
                        margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                      >
                        <CartesianGrid strokeDasharray="3 3" />
                        <XAxis dataKey="year" label={{ value: 'Years', position: 'insideBottom', offset: -5 }} />
                        <YAxis label={{ value: 'Value (₹)', angle: -90, position: 'insideLeft' }} />
                        <Tooltip formatter={(value) => `₹${value.toLocaleString()}`} />
                        <Legend />
                        <Line type="monotone" dataKey="rentScenario" name="Renting & Investing" stroke="#8884d8" />
                        <Line type="monotone" dataKey="buyScenario" name="Buying" stroke="#82ca9d" />
                      </LineChart>
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

export default RentVsBuyCalculator;
