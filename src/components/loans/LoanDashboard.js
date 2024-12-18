import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
  CardMedia
} from '@mui/material';
import { BusinessLoanTypes } from '../../models/LoanApplication';

const LoanDashboard = () => {
  const [value, setValue] = React.useState(0);
  const navigate = useNavigate();

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleApplyBusinessLoan = () => {
    navigate('/loans/apply');
  };

  const handleApplyPersonalLoan = () => {
    window.open('https://www.oxyzo.in/personal-loan-application', '_blank');
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 3 }}>
        <Typography variant="h4" gutterBottom>
          Financial Solutions
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Explore our comprehensive range of business and personal loan solutions designed to meet your financial needs
        </Typography>
      </Box>

      <Box sx={{ borderBottom: 1, borderColor: 'divider', mb: 3 }}>
        <Tabs value={value} onChange={handleChange} aria-label="loan types">
          <Tab label="Business Loans" />
          <Tab label="Personal Loans" />
        </Tabs>
      </Box>

      {value === 0 && (
        <>
          <Box sx={{ mb: 3 }}>
            <Typography variant="h5" gutterBottom>
              Business Loans
            </Typography>
            <Typography variant="body1" color="text.secondary" paragraph>
              Choose from our range of business financing solutions tailored to your needs
            </Typography>
            <Button
              variant="contained"
              color="primary"
              size="large"
              onClick={handleApplyBusinessLoan}
              sx={{ mt: 2, mb: 4 }}
            >
              Apply Now
            </Button>
          </Box>

          <Grid container spacing={3}>
            {Object.values(BusinessLoanTypes).map((loan) => (
              <Grid item xs={12} sm={6} md={4} key={loan.id}>
                <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <CardContent sx={{ flexGrow: 1 }}>
                    <Typography variant="h6" component="div" gutterBottom>
                      {loan.name}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      {loan.description}
                    </Typography>
                    <Typography variant="body2" sx={{ mt: 'auto' }}>
                      Amount Range: ₹{(loan.minAmount/100000).toFixed(1)}L - ₹{(loan.maxAmount/10000000).toFixed(1)}Cr
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}

      {value === 1 && (
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <Card>
              <CardMedia
                component="img"
                height="300"
                image="https://t4.ftcdn.net/jpg/10/13/37/29/360_F_1013372937_DUbwM6PArgrPfc0fbS9OXspa0grv7YJ4.jpg"
                alt="Personal Loan"
                sx={{ 
                  objectFit: 'cover',
                  objectPosition: 'center center',
                  width: '100%'
                }}
              />
              <CardContent>
                <Typography variant="h5" gutterBottom>
                  Personal Loans
                </Typography>
                <Typography variant="body1" paragraph>
                  Quick and hassle-free personal loans up to ₹5 Lakhs with minimal documentation.
                </Typography>
                <Typography variant="body2" color="text.secondary" paragraph>
                  • Competitive interest rates
                  • Minimal documentation
                  • Quick disbursement
                  • Flexible repayment options
                </Typography>
                <Button
                  variant="contained"
                  color="primary"
                  size="large"
                  onClick={handleApplyPersonalLoan}
                >
                  Apply for Personal Loan
                </Button>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      )}
    </Container>
  );
};

export default LoanDashboard;
