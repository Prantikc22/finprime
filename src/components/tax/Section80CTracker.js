import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Typography,
  TextField,
  Grid,
  Button,
  LinearProgress,
  Box,
  Card,
  CardContent,
  Alert,
} from '@mui/material';

const LIMIT_80C = 150000;

const defaultInvestments = {
  epf: 0,
  ppf: 0,
  elss: 0,
  lifeInsurance: 0,
  nps: 0,
  tuitionFees: 0,
  homeLoanPrincipal: 0,
  sukanyaSamriddhi: 0,
  fixedDeposit: 0,
};

const Section80CTracker = () => {
  const [investments, setInvestments] = useState(defaultInvestments);
  const [total, setTotal] = useState(0);
  const [saved, setSaved] = useState(false);

  useEffect(() => {
    // Calculate total whenever investments change
    const newTotal = Object.values(investments).reduce((sum, value) => sum + (Number(value) || 0), 0);
    setTotal(newTotal);
  }, [investments]);

  const handleChange = (field) => (event) => {
    const value = event.target.value === '' ? 0 : Number(event.target.value);
    setInvestments(prev => ({
      ...prev,
      [field]: value
    }));
    setSaved(false);
  };

  const handleSave = () => {
    // Save to localStorage
    localStorage.setItem('80c_investments', JSON.stringify(investments));
    setSaved(true);
  };

  const getProgressColor = () => {
    const percentage = (total / LIMIT_80C) * 100;
    if (percentage < 50) return 'error';
    if (percentage < 80) return 'warning';
    return 'success';
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        Section 80C Investment Tracker
      </Typography>

      <Paper sx={{ p: 3, mb: 3 }}>
        <Typography variant="h6" gutterBottom>
          Investment Progress
        </Typography>
        <Box sx={{ mb: 2 }}>
          <LinearProgress 
            variant="determinate" 
            value={Math.min((total / LIMIT_80C) * 100, 100)}
            color={getProgressColor()}
            sx={{ height: 10, borderRadius: 5 }}
          />
        </Box>
        <Typography variant="body1">
          ₹{total.toLocaleString()} / ₹{LIMIT_80C.toLocaleString()} 
          ({Math.min(Math.round((total / LIMIT_80C) * 100), 100)}%)
        </Typography>
        {total > LIMIT_80C && (
          <Alert severity="warning" sx={{ mt: 2 }}>
            You've exceeded the ₹1.5L limit. Additional investments won't provide tax benefits under 80C.
          </Alert>
        )}
      </Paper>

      <Grid container spacing={3}>
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Retirement & Long-term Savings
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="EPF Contribution"
                    type="number"
                    value={investments.epf || ''}
                    onChange={handleChange('epf')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="PPF Investment"
                    type="number"
                    value={investments.ppf || ''}
                    onChange={handleChange('ppf')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="NPS Contribution (Tier 1)"
                    type="number"
                    value={investments.nps || ''}
                    onChange={handleChange('nps')}
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
                Insurance & Investments
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Life Insurance Premium"
                    type="number"
                    value={investments.lifeInsurance || ''}
                    onChange={handleChange('lifeInsurance')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="ELSS Mutual Funds"
                    type="number"
                    value={investments.elss || ''}
                    onChange={handleChange('elss')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Tax Saving Fixed Deposit"
                    type="number"
                    value={investments.fixedDeposit || ''}
                    onChange={handleChange('fixedDeposit')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Other Deductions
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Children's Tuition Fees"
                    type="number"
                    value={investments.tuitionFees || ''}
                    onChange={handleChange('tuitionFees')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Home Loan Principal Repayment"
                    type="number"
                    value={investments.homeLoanPrincipal || ''}
                    onChange={handleChange('homeLoanPrincipal')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Sukanya Samriddhi Account"
                    type="number"
                    value={investments.sukanyaSamriddhi || ''}
                    onChange={handleChange('sukanyaSamriddhi')}
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Grid>
              </Grid>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end' }}>
        <Button
          variant="contained"
          size="large"
          onClick={handleSave}
          color="primary"
        >
          Save Progress
        </Button>
      </Box>

      {saved && (
        <Alert severity="success" sx={{ mt: 2 }}>
          Your investment details have been saved successfully!
        </Alert>
      )}
    </Container>
  );
};

export default Section80CTracker;
