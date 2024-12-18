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
  FormControlLabel,
  Switch,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const LifeInsuranceCalculator = () => {
  const [inputs, setInputs] = useState({
    age: 30,
    annualIncome: 1200000,
    monthlyExpenses: 50000,
    existingDebts: 2000000,
    existingInvestments: 1000000,
    existingInsurance: 5000000,
    dependents: 2,
    yearsOfSupport: 20,
    inflationRate: 6,
    returnRate: 8,
    includeChildEducation: true,
    childEducationCost: 2000000,
  });

  const [results, setResults] = useState(null);

  const calculateInsuranceNeeds = () => {
    // Calculate income replacement needs
    const monthlyIncomeNeeded = inputs.monthlyExpenses * (1 + inputs.inflationRate / 100);
    const annualIncomeNeeded = monthlyIncomeNeeded * 12;
    const presentValueOfIncome = calculatePresentValue(
      annualIncomeNeeded,
      inputs.returnRate - inputs.inflationRate,
      inputs.yearsOfSupport
    );

    // Calculate education costs
    const educationCost = inputs.includeChildEducation
      ? inputs.childEducationCost * inputs.dependents
      : 0;

    // Calculate total insurance needs
    const totalNeeds = presentValueOfIncome + inputs.existingDebts + educationCost;
    const existingCoverage = inputs.existingInvestments + inputs.existingInsurance;
    const additionalCoverageNeeded = Math.max(0, totalNeeds - existingCoverage);

    // Calculate breakdown
    const breakdown = [
      {
        name: 'Income Replacement',
        value: presentValueOfIncome,
      },
      {
        name: 'Debt Coverage',
        value: inputs.existingDebts,
      },
      {
        name: 'Education Fund',
        value: educationCost,
      },
    ];

    setResults({
      totalNeeds,
      existingCoverage,
      additionalCoverageNeeded,
      breakdown,
      monthlyIncomeNeeded,
      annualIncomeNeeded,
    });
  };

  const calculatePresentValue = (payment, rate, years) => {
    const r = rate / 100;
    return payment * ((1 - Math.pow(1 + r, -years)) / r);
  };

  useEffect(() => {
    calculateInsuranceNeeds();
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

  const COLORS = ['#0088FE', '#00C49F', '#FFBB28'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Life Insurance Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Calculate how much life insurance coverage you need to protect your family's financial future.
      </Typography>

      <Grid container spacing={3}>
        {/* Personal Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Personal Information
                </Typography>
                <Box>
                  <Typography gutterBottom>Age</Typography>
                  <Slider
                    value={inputs.age}
                    onChange={(_, value) => handleInputChange('age', value)}
                    min={18}
                    max={65}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <TextField
                  label="Annual Income"
                  type="number"
                  value={inputs.annualIncome}
                  onChange={(e) => handleInputChange('annualIncome', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Monthly Expenses"
                  type="number"
                  value={inputs.monthlyExpenses}
                  onChange={(e) => handleInputChange('monthlyExpenses', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Number of Dependents"
                  type="number"
                  value={inputs.dependents}
                  onChange={(e) => handleInputChange('dependents', Number(e.target.value))}
                  fullWidth
                />
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Financial Information */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Financial Information
                </Typography>
                <TextField
                  label="Existing Debts"
                  type="number"
                  value={inputs.existingDebts}
                  onChange={(e) => handleInputChange('existingDebts', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Existing Investments"
                  type="number"
                  value={inputs.existingInvestments}
                  onChange={(e) => handleInputChange('existingInvestments', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <TextField
                  label="Existing Life Insurance"
                  type="number"
                  value={inputs.existingInsurance}
                  onChange={(e) => handleInputChange('existingInsurance', Number(e.target.value))}
                  InputProps={{ startAdornment: '₹' }}
                  fullWidth
                />
                <Box>
                  <Typography gutterBottom>Years of Support Needed</Typography>
                  <Slider
                    value={inputs.yearsOfSupport}
                    onChange={(_, value) => handleInputChange('yearsOfSupport', value)}
                    min={5}
                    max={30}
                    valueLabelDisplay="auto"
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Additional Considerations */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Stack spacing={3}>
                <Typography variant="h6" gutterBottom>
                  Additional Considerations
                </Typography>
                <FormControlLabel
                  control={
                    <Switch
                      checked={inputs.includeChildEducation}
                      onChange={(e) => handleInputChange('includeChildEducation', e.target.checked)}
                    />
                  }
                  label="Include Children's Education"
                />
                {inputs.includeChildEducation && (
                  <TextField
                    label="Education Cost per Child"
                    type="number"
                    value={inputs.childEducationCost}
                    onChange={(e) => handleInputChange('childEducationCost', Number(e.target.value))}
                    InputProps={{ startAdornment: '₹' }}
                    fullWidth
                  />
                )}
                <Box>
                  <Typography gutterBottom>Expected Inflation Rate (%)</Typography>
                  <Slider
                    value={inputs.inflationRate}
                    onChange={(_, value) => handleInputChange('inflationRate', value)}
                    min={4}
                    max={10}
                    step={0.5}
                    valueLabelDisplay="auto"
                  />
                </Box>
                <Box>
                  <Typography gutterBottom>Expected Return Rate (%)</Typography>
                  <Slider
                    value={inputs.returnRate}
                    onChange={(_, value) => handleInputChange('returnRate', value)}
                    min={6}
                    max={15}
                    step={0.5}
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
                    Insurance Coverage Needed
                  </Typography>
                  <Typography variant="h3" color="primary" gutterBottom>
                    {formatCurrency(results.additionalCoverageNeeded)}
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Needs
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(results.totalNeeds)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Existing Coverage
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(results.existingCoverage)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>
            </Grid>

            <Grid item xs={12} md={6}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Coverage Breakdown
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={results.breakdown}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {results.breakdown.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
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

export default LifeInsuranceCalculator;
