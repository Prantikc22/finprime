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
} from '@mui/material';

const oldRegimeSlabs = [
  { limit: 250000, rate: 0 },
  { limit: 500000, rate: 5 },
  { limit: 1000000, rate: 20 },
  { limit: 1500000, rate: 30 },
  { limit: Infinity, rate: 30 },
];

const newRegimeSlabs = [
  { limit: 300000, rate: 0 },
  { limit: 600000, rate: 5 },
  { limit: 900000, rate: 10 },
  { limit: 1200000, rate: 15 },
  { limit: 1500000, rate: 20 },
  { limit: Infinity, rate: 30 },
];

// Standard deduction under new regime
const NEW_REGIME_STD_DEDUCTION = 50000;

const TaxRegimeComparison = () => {
  const [income, setIncome] = useState('');
  const [deductions, setDeductions] = useState({
    section80C: '',
    section80D: '',
    hra: '',
    lta: '',
    standardDeduction: 50000, // Fixed standard deduction
  });
  const [taxDetails, setTaxDetails] = useState({
    old: { taxableIncome: 0, tax: 0 },
    new: { taxableIncome: 0, tax: 0 },
  });

  const calculateTax = (amount, slabs) => {
    let remainingAmount = amount;
    let totalTax = 0;
    let previousLimit = 0;

    for (const slab of slabs) {
      const slabAmount = Math.min(remainingAmount, slab.limit - previousLimit);
      if (slabAmount > 0) {
        totalTax += (slabAmount * slab.rate) / 100;
        remainingAmount -= slabAmount;
      }
      previousLimit = slab.limit;
      if (remainingAmount <= 0) break;
    }

    // Add 4% cess
    totalTax += totalTax * 0.04;

    return Math.round(totalTax);
  };

  useEffect(() => {
    if (!income) return;

    // Calculate old regime taxable income
    const totalDeductions = Object.values(deductions).reduce((sum, value) => 
      sum + (Number(value) || 0), 0
    );
    const oldTaxableIncome = Math.max(Number(income) - totalDeductions, 0);
    const oldTax = calculateTax(oldTaxableIncome, oldRegimeSlabs);

    // Calculate new regime tax (no deductions except standard deduction)
    const newTaxableIncome = Math.max(Number(income) - NEW_REGIME_STD_DEDUCTION, 0);
    const newTax = calculateTax(newTaxableIncome, newRegimeSlabs);

    setTaxDetails({
      old: { taxableIncome: oldTaxableIncome, tax: oldTax },
      new: { taxableIncome: newTaxableIncome, tax: newTax },
    });
  }, [income, deductions]);

  const handleIncomeChange = (event) => {
    setIncome(event.target.value);
  };

  const handleDeductionChange = (field) => (event) => {
    setDeductions(prev => ({
      ...prev,
      [field]: event.target.value
    }));
  };

  const getBetterRegime = () => {
    if (!income) return null;
    const difference = taxDetails.old.tax - taxDetails.new.tax;
    if (difference > 0) {
      return {
        regime: 'New',
        savings: difference,
        message: 'The new tax regime is better for you.'
      };
    } else if (difference < 0) {
      return {
        regime: 'Old',
        savings: -difference,
        message: 'The old tax regime is better for you.'
      };
    }
    return {
      regime: 'Equal',
      savings: 0,
      message: 'Both regimes will result in the same tax.'
    };
  };

  const recommendation = getBetterRegime();

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Tax Regime Comparison
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Income Details
              </Typography>
              <TextField
                fullWidth
                label="Annual Income"
                type="number"
                value={income}
                onChange={handleIncomeChange}
                sx={{ mb: 2 }}
                InputProps={{ startAdornment: '₹' }}
              />

              <Typography variant="h6" gutterBottom sx={{ mt: 3 }}>
                Deductions & Exemptions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Section 80C (Max ₹1.5L)"
                    type="number"
                    value={deductions.section80C}
                    onChange={handleDeductionChange('section80C')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Section 80D - Health Insurance (Max ₹25K/50K)"
                    type="number"
                    value={deductions.section80D}
                    onChange={handleDeductionChange('section80D')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="HRA Exemption"
                    type="number"
                    value={deductions.hra}
                    onChange={handleDeductionChange('hra')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="LTA Exemption"
                    type="number"
                    value={deductions.lta}
                    onChange={handleDeductionChange('lta')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Tax Calculation Summary
              </Typography>
              
              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary">
                  Old Tax Regime
                </Typography>
                <Typography variant="body1">
                  Taxable Income: ₹{taxDetails.old.taxableIncome.toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Tax Amount: ₹{taxDetails.old.tax.toLocaleString()}
                </Typography>
              </Box>

              <Divider sx={{ my: 2 }} />

              <Box sx={{ mb: 3 }}>
                <Typography variant="subtitle1" color="primary">
                  New Tax Regime
                </Typography>
                <Typography variant="body1">
                  Taxable Income: ₹{taxDetails.new.taxableIncome.toLocaleString()}
                </Typography>
                <Typography variant="body1">
                  Tax Amount: ₹{taxDetails.new.tax.toLocaleString()}
                </Typography>
              </Box>

              {recommendation && (
                <Alert 
                  severity={recommendation.regime === 'Equal' ? 'info' : 'success'}
                  sx={{ mt: 2 }}
                >
                  <Typography variant="subtitle2">
                    {recommendation.message}
                  </Typography>
                  {recommendation.savings > 0 && (
                    <Typography variant="body2">
                      You can save ₹{recommendation.savings.toLocaleString()} by choosing the {recommendation.regime} regime.
                    </Typography>
                  )}
                </Alert>
              )}
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Container>
  );
};

export default TaxRegimeComparison;
