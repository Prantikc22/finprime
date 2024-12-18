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
  MenuItem,
  Stepper,
  Step,
  StepLabel,
  FormControl,
  InputLabel,
  Select,
  FormHelperText,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { BusinessLoanTypes, BusinessType, RequiredDocuments } from '../../models/LoanApplication';
import { useAuth } from '../../contexts/AuthContext';

const steps = ['Basic Details', 'Business Information', 'Documents Upload', 'Review & Submit'];

const LoanApplicationForm = () => {
  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [formData, setFormData] = useState({
    businessName: '',
    businessType: '',
    loanType: '',
    loanAmount: '',
    loanPurpose: '',
    gstNumber: '',
    annualTurnover: '',
    businessVintage: '',
    contactName: '',
    contactEmail: '',
    contactPhone: '',
    documents: {}
  });
  const [errors, setErrors] = useState({});

  const handleNext = () => {
    if (validateForm(activeStep)) {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleSubmit = () => {
    if (validateForm(activeStep)) {
      const applicationData = {
        ...formData,
        id: Date.now(),
        status: 'submitted',
        createdAt: new Date().toISOString(),
        userId: currentUser.uid
      };

      // Get existing applications
      const existingApps = JSON.parse(localStorage.getItem(`loan_applications_${currentUser.uid}`)) || [];
      
      // Add new application
      localStorage.setItem(
        `loan_applications_${currentUser.uid}`,
        JSON.stringify([...existingApps, applicationData])
      );

      navigate('/loans');
    }
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleFileUpload = (documentId) => (event) => {
    const file = event.target.files[0];
    if (file) {
      setFormData(prev => ({
        ...prev,
        documents: {
          ...prev.documents,
          [documentId]: file
        }
      }));
    }
  };

  const validateForm = (step) => {
    const newErrors = {};
    
    switch(step) {
      case 0:
        if (!formData.loanType) newErrors.loanType = 'Please select a loan type';
        if (!formData.loanAmount) newErrors.loanAmount = 'Please enter loan amount';
        if (!formData.loanPurpose) newErrors.loanPurpose = 'Please enter loan purpose';
        break;
      case 1:
        if (!formData.businessName) newErrors.businessName = 'Please enter business name';
        if (!formData.businessType) newErrors.businessType = 'Please select business type';
        if (!formData.gstNumber) newErrors.gstNumber = 'Please enter GST number';
        if (!formData.annualTurnover) newErrors.annualTurnover = 'Please enter annual turnover';
        if (!formData.businessVintage) newErrors.businessVintage = 'Please enter business vintage';
        break;
      case 2:
        // Check required documents
        Object.entries(RequiredDocuments).forEach(([key, doc]) => {
          if (doc.required && !formData.documents[key]) {
            newErrors[`document_${key}`] = `${doc.name} is required`;
          }
        });
        break;
      case 3:
        if (!formData.contactName) newErrors.contactName = 'Please enter contact name';
        if (!formData.contactEmail) newErrors.contactEmail = 'Please enter valid email';
        if (!formData.contactPhone) newErrors.contactPhone = 'Please enter contact phone';
        break;
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.loanType}>
                <InputLabel>Loan Type</InputLabel>
                <Select
                  name="loanType"
                  value={formData.loanType}
                  onChange={handleChange}
                  label="Loan Type"
                >
                  {Object.values(BusinessLoanTypes).map((type) => (
                    <MenuItem key={type.id} value={type.id}>
                      {type.name}
                    </MenuItem>
                  ))}
                </Select>
                {errors.loanType && <FormHelperText>{errors.loanType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Loan Amount"
                name="loanAmount"
                type="number"
                value={formData.loanAmount}
                onChange={handleChange}
                required
                error={!!errors.loanAmount}
                helperText={errors.loanAmount}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Purpose of Loan"
                name="loanPurpose"
                multiline
                rows={3}
                value={formData.loanPurpose}
                onChange={handleChange}
                required
                error={!!errors.loanPurpose}
                helperText={errors.loanPurpose}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Name"
                name="businessName"
                value={formData.businessName}
                onChange={handleChange}
                required
                error={!!errors.businessName}
                helperText={errors.businessName}
              />
            </Grid>
            <Grid item xs={12}>
              <FormControl fullWidth required error={!!errors.businessType}>
                <InputLabel>Business Type</InputLabel>
                <Select
                  name="businessType"
                  value={formData.businessType}
                  onChange={handleChange}
                  label="Business Type"
                >
                  {Object.entries(BusinessType).map(([key, value]) => (
                    <MenuItem key={key} value={value}>
                      {value}
                    </MenuItem>
                  ))}
                </Select>
                {errors.businessType && <FormHelperText>{errors.businessType}</FormHelperText>}
              </FormControl>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="GST Number"
                name="gstNumber"
                value={formData.gstNumber}
                onChange={handleChange}
                required
                error={!!errors.gstNumber}
                helperText={errors.gstNumber}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Annual Turnover"
                name="annualTurnover"
                type="number"
                value={formData.annualTurnover}
                onChange={handleChange}
                required
                error={!!errors.annualTurnover}
                helperText={errors.annualTurnover}
                InputProps={{
                  startAdornment: '₹'
                }}
              />
            </Grid>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Business Vintage (in years)"
                name="businessVintage"
                type="number"
                value={formData.businessVintage}
                onChange={handleChange}
                required
                error={!!errors.businessVintage}
                helperText={errors.businessVintage}
              />
            </Grid>
          </Grid>
        );

      case 2:
        return (
          <Grid container spacing={3}>
            {Object.entries(RequiredDocuments).map(([key, doc]) => (
              <Grid item xs={12} key={key}>
                <FormControl fullWidth error={!!errors[`document_${key}`]}>
                  <Typography variant="subtitle1" gutterBottom>
                    {doc.name} {doc.required && '*'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary" gutterBottom>
                    {doc.description}
                  </Typography>
                  <Button
                    variant="outlined"
                    component="label"
                  >
                    {formData.documents[key]?.name || 'Upload File'}
                    <input
                      type="file"
                      hidden
                      accept={doc.formats.join(',')}
                      onChange={handleFileUpload(key)}
                    />
                  </Button>
                  <FormHelperText>
                    Accepted formats: {doc.formats.join(', ')} (Max: {doc.maxSize}MB)
                    {errors[`document_${key}`] && <span style={{ color: 'red' }}>{errors[`document_${key}`]}</span>}
                  </FormHelperText>
                </FormControl>
              </Grid>
            ))}
          </Grid>
        );

      case 3:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <TextField
                fullWidth
                label="Contact Person Name"
                name="contactName"
                value={formData.contactName}
                onChange={handleChange}
                required
                error={!!errors.contactName}
                helperText={errors.contactName}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Email"
                name="contactEmail"
                type="email"
                value={formData.contactEmail}
                onChange={handleChange}
                required
                error={!!errors.contactEmail}
                helperText={errors.contactEmail}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Phone Number"
                name="contactPhone"
                value={formData.contactPhone}
                onChange={handleChange}
                required
                error={!!errors.contactPhone}
                helperText={errors.contactPhone}
              />
            </Grid>
          </Grid>
        );

      default:
        return null;
    }
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Card>
        <CardContent>
          <Typography variant="h5" gutterBottom>
            Business Loan Application
          </Typography>
          
          <Stepper activeStep={activeStep} sx={{ mt: 3, mb: 4 }}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>

          <Box sx={{ mt: 4 }}>
            {renderStepContent(activeStep)}
          </Box>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 4 }}>
            {activeStep !== 0 && (
              <Button onClick={handleBack} sx={{ mr: 1 }}>
                Back
              </Button>
            )}
            {activeStep === steps.length - 1 ? (
              <Button
                variant="contained"
                onClick={handleSubmit}
              >
                Submit Application
              </Button>
            ) : (
              <Button
                variant="contained"
                onClick={handleNext}
              >
                Next
              </Button>
            )}
          </Box>
        </CardContent>
      </Card>
    </Container>
  );
};

export default LoanApplicationForm;
