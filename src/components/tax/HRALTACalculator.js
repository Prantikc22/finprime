import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Box,
  Divider,
  Alert,
  MenuItem,
  FormControl,
  InputLabel,
  Select,
} from '@mui/material';

const cities = [
  { value: 'metro', label: 'Metro (Delhi, Mumbai, Kolkata, Chennai)', percentage: 50 },
  { value: 'non-metro', label: 'Non-Metro', percentage: 40 },
];

const formatCurrency = (amount) => {
  if (!amount) return '₹0';
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    maximumFractionDigits: 0
  }).format(amount);
};

const HRALTACalculator = () => {
  const [hraInputs, setHraInputs] = useState({
    basicSalary: '',
    hraReceived: '',
    rentPaid: '',
    cityType: 'metro',
  });

  const [ltaInputs, setLtaInputs] = useState({
    ltaReceived: '',
    travelExpenses: '',
  });

  const [calculations, setCalculations] = useState({
    hra: {
      exemption: 0,
      taxable: 0,
      breakdown: {
        actualHRA: 0,
        rentLessPercent: 0,
        basicPercent: 0,
      },
    },
    lta: {
      exemption: 0,
      taxable: 0,
    },
  });

  const calculateHRA = () => {
    const { basicSalary, hraReceived, rentPaid, cityType } = hraInputs;
    
    if (!basicSalary || !hraReceived || !rentPaid) return;

    const basic = Number(basicSalary);
    const hra = Number(hraReceived);
    const rent = Number(rentPaid);
    const cityPercentage = cities.find(city => city.value === cityType).percentage;

    // Calculate as per rules
    const actualHRA = hra;
    const rentLessPercent = rent - (0.1 * basic);
    const basicPercent = (basic * cityPercentage) / 100;

    // Minimum of the three is exempt
    const exemption = Math.min(
      actualHRA,
      rentLessPercent,
      basicPercent
    );

    setCalculations(prev => ({
      ...prev,
      hra: {
        exemption: Math.max(0, exemption),
        taxable: Math.max(0, hra - exemption),
        breakdown: {
          actualHRA,
          rentLessPercent,
          basicPercent,
        },
      },
    }));
  };

  const calculateLTA = () => {
    const { ltaReceived, travelExpenses } = ltaInputs;
    
    if (!ltaReceived || !travelExpenses) return;

    const received = Number(ltaReceived);
    const expenses = Number(travelExpenses);

    // LTA exemption is minimum of actual expenses or amount received
    const exemption = Math.min(received, expenses);

    setCalculations(prev => ({
      ...prev,
      lta: {
        exemption,
        taxable: Math.max(0, received - exemption),
      },
    }));
  };

  useEffect(() => {
    calculateHRA();
  }, [hraInputs]);

  useEffect(() => {
    calculateLTA();
  }, [ltaInputs]);

  const handleHRAChange = (field) => (event) => {
    setHraInputs(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const handleLTAChange = (field) => (event) => {
    setLtaInputs(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        HRA & LTA Calculator
      </Typography>

      <Grid container spacing={3}>
        {/* HRA Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                House Rent Allowance (HRA)
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Basic Salary (Annual)"
                    type="number"
                    value={hraInputs.basicSalary}
                    onChange={handleHRAChange('basicSalary')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="HRA Received (Annual)"
                    type="number"
                    value={hraInputs.hraReceived}
                    onChange={handleHRAChange('hraReceived')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Rent Paid (Annual)"
                    type="number"
                    value={hraInputs.rentPaid}
                    onChange={handleHRAChange('rentPaid')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <FormControl fullWidth>
                    <InputLabel>City Type</InputLabel>
                    <Select
                      value={hraInputs.cityType}
                      label="City Type"
                      onChange={handleHRAChange('cityType')}
                    >
                      {cities.map(city => (
                        <MenuItem key={city.value} value={city.value}>
                          {city.label}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  HRA Calculation Breakdown
                </Typography>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <Alert severity="info" sx={{ mb: 2 }}>
                      HRA exemption is the minimum of the following three amounts
                    </Alert>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Actual HRA Received
                        </Typography>
                        <Typography variant="h6">
                          {formatCurrency(calculations.hra.breakdown.actualHRA)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Rent - 10% of Basic
                        </Typography>
                        <Typography variant="h6">
                          {formatCurrency(calculations.hra.breakdown.rentLessPercent)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={4}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          {cities.find(city => city.value === hraInputs.cityType).percentage}% of Basic
                        </Typography>
                        <Typography variant="h6">
                          {formatCurrency(calculations.hra.breakdown.basicPercent)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
                
                <Box sx={{ mt: 3, p: 2, bgcolor: 'success.light', borderRadius: 1 }}>
                  <Typography variant="h6" color="success.contrastText">
                    HRA Exemption: {formatCurrency(calculations.hra.exemption)}
                  </Typography>
                  <Typography variant="body1" color="success.contrastText">
                    Taxable HRA: {formatCurrency(calculations.hra.taxable)}
                  </Typography>
                </Box>
              </Box>
            </CardContent>
          </Card>
        </Grid>

        {/* LTA Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Leave Travel Allowance (LTA)
              </Typography>
              
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LTA Received"
                    type="number"
                    value={ltaInputs.ltaReceived}
                    onChange={handleLTAChange('ltaReceived')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Travel Expenses"
                    type="number"
                    value={ltaInputs.travelExpenses}
                    onChange={handleLTAChange('travelExpenses')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
              </Grid>

              <Box sx={{ mt: 3 }}>
                <Typography variant="subtitle1" color="primary" gutterBottom>
                  LTA Calculation Summary
                </Typography>
                <Alert severity="info" sx={{ mb: 2 }}>
                  LTA exemption is limited to the lower of actual expenses or LTA received
                </Alert>
                <Grid container spacing={2}>
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Exemption Amount
                        </Typography>
                        <Typography variant="h6" color="success.main">
                          {formatCurrency(calculations.lta.exemption)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Card variant="outlined">
                      <CardContent>
                        <Typography variant="subtitle2" color="text.secondary">
                          Taxable Amount
                        </Typography>
                        <Typography variant="h6" color="error.main">
                          {formatCurrency(calculations.lta.taxable)}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Box>

              <Alert severity="info" sx={{ mt: 2 }}>
                <Typography variant="body2">
                  LTA is exempt only for domestic travel within India. The exemption is limited to the economy airfare of national carrier by the shortest route or actual expenses, whichever is less.
                </Typography>
              </Alert>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default HRALTACalculator;
