import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  TextField,
  Box,
  Paper,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  FormLabel,
} from '@mui/material';
import { styled } from '@mui/material/styles';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

const ResultCard = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(3),
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
}));

export default function HRACalculator() {
  const [basicSalary, setBasicSalary] = useState(50000);
  const [hraReceived, setHraReceived] = useState(20000);
  const [rentPaid, setRentPaid] = useState(25000);
  const [cityType, setCityType] = useState('metro');
  const [exemption, setExemption] = useState({
    actual: 0,
    rule1: 0,
    rule2: 0,
    rule3: 0,
  });

  const calculateHRA = () => {
    // Rule 1: Actual HRA received
    const rule1 = hraReceived * 12;

    // Rule 2: Rent paid - 10% of basic salary
    const rule2 = Math.max(0, (rentPaid * 12) - (0.1 * basicSalary * 12));

    // Rule 3: 50% of basic salary for metro cities, 40% for non-metro
    const rule3 = cityType === 'metro' ? 0.5 * basicSalary * 12 : 0.4 * basicSalary * 12;

    // HRA exemption is minimum of the three rules
    const actual = Math.min(rule1, rule2, rule3);

    setExemption({
      actual,
      rule1,
      rule2,
      rule3,
    });
  };

  useEffect(() => {
    calculateHRA();
  }, [basicSalary, hraReceived, rentPaid, cityType]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
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
        HRA Calculator
      </Typography>

      <Grid container spacing={4}>
        <Grid item xs={12} md={6}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Enter Your Details
              </Typography>
              
              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Basic Salary (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={basicSalary}
                  onChange={(e) => setBasicSalary(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly HRA Received (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={hraReceived}
                  onChange={(e) => setHraReceived(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <Typography gutterBottom>Monthly Rent Paid (₹)</Typography>
                <TextField
                  fullWidth
                  type="number"
                  value={rentPaid}
                  onChange={(e) => setRentPaid(Number(e.target.value))}
                  InputProps={{ inputProps: { min: 0 } }}
                />
              </Box>

              <Box sx={{ mt: 3 }}>
                <FormControl component="fieldset">
                  <FormLabel component="legend">City Type</FormLabel>
                  <RadioGroup
                    row
                    value={cityType}
                    onChange={(e) => setCityType(e.target.value)}
                  >
                    <FormControlLabel
                      value="metro"
                      control={<Radio />}
                      label="Metro (50%)"
                    />
                    <FormControlLabel
                      value="non-metro"
                      control={<Radio />}
                      label="Non-Metro (40%)"
                    />
                  </RadioGroup>
                </FormControl>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        <Grid item xs={12} md={6}>
          <ResultCard>
            <Typography variant="h6" gutterBottom>
              HRA Exemption Details (Annual)
            </Typography>
            
            <Box sx={{ mt: 3 }}>
              <Typography color="text.secondary" gutterBottom>
                Rule 1: Actual HRA Received
              </Typography>
              <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                ₹{exemption.rule1.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography color="text.secondary" gutterBottom>
                Rule 2: Rent Paid - 10% of Basic Salary
              </Typography>
              <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                ₹{exemption.rule2.toLocaleString()}
              </Typography>
            </Box>

            <Box sx={{ mt: 3 }}>
              <Typography color="text.secondary" gutterBottom>
                Rule 3: {cityType === 'metro' ? '50%' : '40%'} of Basic Salary
              </Typography>
              <Typography variant="h6" sx={{ color: '#6c63ff' }}>
                ₹{exemption.rule3.toLocaleString()}
              </Typography>
            </Box>

            <Box
              sx={{
                mt: 4,
                p: 3,
                background: 'rgba(108, 99, 255, 0.1)',
                borderRadius: '16px',
              }}
            >
              <Typography variant="subtitle1" gutterBottom>
                Your HRA Exemption Amount
              </Typography>
              <Typography variant="h4" sx={{ color: '#4CAF50' }}>
                ₹{exemption.actual.toLocaleString()}
              </Typography>
              <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
                This is the minimum of all three rules as per Income Tax Act
              </Typography>
            </Box>
          </ResultCard>

          <Box
            sx={{
              mt: 3,
              p: 3,
              background: 'rgba(255, 152, 0, 0.1)',
              borderRadius: '16px',
            }}
          >
            <Typography variant="body2" color="text.secondary">
              Note: Metro cities include Mumbai, Delhi, Chennai, and Kolkata.
              For all other cities, use the Non-Metro option.
              The exemption is calculated on an annual basis.
            </Typography>
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
}
