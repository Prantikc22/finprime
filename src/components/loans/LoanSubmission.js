import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Button,
  Box,
  Stepper,
  Step,
  StepLabel,
  MenuItem,
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  Alert,
  CircularProgress,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const VisuallyHiddenInput = styled('input')({
  clip: 'rect(0 0 0 0)',
  clipPath: 'inset(50%)',
  height: 1,
  overflow: 'hidden',
  position: 'absolute',
  bottom: 0,
  left: 0,
  whiteSpace: 'nowrap',
  width: 1,
});

const steps = ['Company Details', 'Financial Information', 'Document Upload'];

export default function LoanSubmission() {
  const [activeStep, setActiveStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [formData, setFormData] = useState({
    // Company Details
    companyName: '',
    businessType: '',
    registrationType: '',
    yearEstablished: '',
    gstNumber: '',
    panNumber: '',
    
    // Financial Information
    annualRevenue: '',
    monthlyRevenue: '',
    profitMargin: '',
    existingLoans: 'no',
    loanAmount: '',
    loanPurpose: '',
    
    // Documents
    gstReturns: null,
    bankStatements: null,
    financialStatements: null,
  });

  const handleNext = () => {
    if (activeStep === steps.length - 1) {
      handleSubmit();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = async () => {
    setLoading(true);
    // Simulate API call
    setTimeout(() => {
      setSuccess(true);
      setLoading(false);
    }, 2000);
  };

  const handleFileUpload = (field) => (event) => {
    const file = event.target.files[0];
    setFormData({
      ...formData,
      [field]: file,
    });
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Company Name"
                value={formData.companyName}
                onChange={(e) => setFormData({ ...formData, companyName: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Business Type"
                value={formData.businessType}
                onChange={(e) => setFormData({ ...formData, businessType: e.target.value })}
                required
              >
                <MenuItem value="manufacturing">Manufacturing</MenuItem>
                <MenuItem value="services">Services</MenuItem>
                <MenuItem value="retail">Retail</MenuItem>
                <MenuItem value="wholesale">Wholesale</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Registration Type"
                value={formData.registrationType}
                onChange={(e) => setFormData({ ...formData, registrationType: e.target.value })}
                required
              >
                <MenuItem value="proprietorship">Proprietorship</MenuItem>
                <MenuItem value="partnership">Partnership</MenuItem>
                <MenuItem value="pvtLtd">Private Limited</MenuItem>
                <MenuItem value="llp">LLP</MenuItem>
              </TextField>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Year Established"
                type="number"
                value={formData.yearEstablished}
                onChange={(e) => setFormData({ ...formData, yearEstablished: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="GST Number"
                value={formData.gstNumber}
                onChange={(e) => setFormData({ ...formData, gstNumber: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="PAN Number"
                value={formData.panNumber}
                onChange={(e) => setFormData({ ...formData, panNumber: e.target.value })}
                required
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Annual Revenue"
                type="number"
                value={formData.annualRevenue}
                onChange={(e) => setFormData({ ...formData, annualRevenue: e.target.value })}
                InputProps={{ startAdornment: '₹' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Monthly Revenue"
                type="number"
                value={formData.monthlyRevenue}
                onChange={(e) => setFormData({ ...formData, monthlyRevenue: e.target.value })}
                InputProps={{ startAdornment: '₹' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Profit Margin (%)"
                type="number"
                value={formData.profitMargin}
                onChange={(e) => setFormData({ ...formData, profitMargin: e.target.value })}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <FormControl component="fieldset">
                <FormLabel>Existing Business Loans?</FormLabel>
                <RadioGroup
                  row
                  value={formData.existingLoans}
                  onChange={(e) => setFormData({ ...formData, existingLoans: e.target.value })}
                >
                  <FormControlLabel value="yes" control={<Radio />} label="Yes" />
                  <FormControlLabel value="no" control={<Radio />} label="No" />
                </RadioGroup>
              </FormControl>
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                label="Required Loan Amount"
                type="number"
                value={formData.loanAmount}
                onChange={(e) => setFormData({ ...formData, loanAmount: e.target.value })}
                InputProps={{ startAdornment: '₹' }}
                required
              />
            </Grid>
            <Grid item xs={12} sm={6}>
              <TextField
                fullWidth
                select
                label="Loan Purpose"
                value={formData.loanPurpose}
                onChange={(e) => setFormData({ ...formData, loanPurpose: e.target.value })}
                required
              >
                <MenuItem value="working_capital">Working Capital</MenuItem>
                <MenuItem value="expansion">Business Expansion</MenuItem>
                <MenuItem value="equipment">Equipment Purchase</MenuItem>
                <MenuItem value="inventory">Inventory Purchase</MenuItem>
                <MenuItem value="other">Other</MenuItem>
              </TextField>
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ height: 100 }}
              >
                Upload GST Returns (Last 12 months)
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload('gstReturns')}
                />
              </Button>
              {formData.gstReturns && (
                <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                  ✓ {formData.gstReturns.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ height: 100 }}
              >
                Upload Bank Statements (Last 6 months)
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload('bankStatements')}
                />
              </Button>
              {formData.bankStatements && (
                <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                  ✓ {formData.bankStatements.name}
                </Typography>
              )}
            </Grid>
            <Grid item xs={12}>
              <Button
                component="label"
                variant="outlined"
                startIcon={<CloudUploadIcon />}
                fullWidth
                sx={{ height: 100 }}
              >
                Upload Financial Statements
                <VisuallyHiddenInput
                  type="file"
                  onChange={handleFileUpload('financialStatements')}
                />
              </Button>
              {formData.financialStatements && (
                <Typography variant="body2" sx={{ mt: 1, color: 'success.main' }}>
                  ✓ {formData.financialStatements.name}
                </Typography>
              )}
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  if (success) {
    return (
      <Container maxWidth="sm" sx={{ mt: 4, mb: 4 }}>
        <StyledCard>
          <CardContent sx={{ textAlign: 'center' }}>
            <Typography variant="h4" gutterBottom sx={{ color: '#4CAF50' }}>
              Application Submitted Successfully!
            </Typography>
            <Typography variant="body1" sx={{ mb: 3 }}>
              Our team will review your application and contact you within 24-48 hours.
            </Typography>
            <Button
              variant="contained"
              onClick={() => {
                setSuccess(false);
                setActiveStep(0);
                setFormData({});
              }}
            >
              Submit Another Application
            </Button>
          </CardContent>
        </StyledCard>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
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
        Business Loan Application
      </Typography>

      <StyledCard>
        <CardContent>
          <Stepper activeStep={activeStep} sx={{ mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          {renderStepContent(activeStep)}

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={loading}
              sx={{
                background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
              }}
            >
              {loading ? (
                <CircularProgress size={24} />
              ) : activeStep === steps.length - 1 ? (
                'Submit Application'
              ) : (
                'Next'
              )}
            </Button>
          </Box>
        </CardContent>
      </StyledCard>

      <Box
        sx={{
          mt: 4,
          p: 3,
          background: 'rgba(108, 99, 255, 0.1)',
          borderRadius: '16px',
        }}
      >
        <Typography variant="body2" color="text.secondary">
          Note: All submitted information is kept confidential and secure.
          Make sure to provide accurate information to expedite the loan approval process.
          Our partner NBFCs will review your application and provide competitive interest rates
          based on your business profile.
        </Typography>
      </Box>
    </Container>
  );
}
