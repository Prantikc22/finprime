import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import SecurityIcon from '@mui/icons-material/Security';
import HealthAndSafetyIcon from '@mui/icons-material/HealthAndSafety';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ComingSoonIcon from '@mui/icons-material/NewReleases';

// Insurance Samadhan Integration
const INSURANCE_SAMADHAN_AFFILIATE = {
  baseUrl: 'https://insurancesamadhan.com',
  affiliateId: 'finprime',
  services: {
    claimAssistance: '/claim-assistance',
    policyAnalysis: '/policy-analysis',
    grievanceResolution: '/grievance-resolution',
  },
};

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.9)',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  overflow: 'visible',
}));

const GradientButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
  border: 0,
  borderRadius: 8,
  color: 'white',
  padding: '12px 24px',
  '&:hover': {
    background: 'linear-gradient(45deg, #5a52ff 30%, #4845ff 90%)',
  },
}));

const ComingSoonCard = styled(Card)(({ theme }) => ({
  background: 'linear-gradient(135deg, rgba(108, 99, 255, 0.2), rgba(90, 82, 255, 0.1))',
  backdropFilter: 'blur(20px)',
  borderRadius: '16px',
  border: '2px dashed rgba(108, 99, 255, 0.3)',
  position: 'relative',
  overflow: 'hidden',
  '&::before': {
    content: '""',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    background: 'radial-gradient(circle at top right, rgba(108, 99, 255, 0.2), transparent)',
    pointerEvents: 'none',
  },
}));

export default function InsuranceAnalysis() {
  const [showComingSoon, setShowComingSoon] = useState(false);

  const getInsuranceSamadhanUrl = (service) => {
    const baseUrl = INSURANCE_SAMADHAN_AFFILIATE.baseUrl;
    const affiliateId = INSURANCE_SAMADHAN_AFFILIATE.affiliateId;
    return `${baseUrl}${INSURANCE_SAMADHAN_AFFILIATE.services[service]}?ref=${affiliateId}`;
  };

  const handleComingSoonClick = () => {
    setShowComingSoon(true);
  };

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography
        variant="h4"
        gutterBottom
        sx={{
          fontWeight: 600,
          textAlign: 'center',
          mb: 4,
        }}
      >
        Insurance Services
      </Typography>

      {/* Coming Soon Dialog */}
      <Dialog open={showComingSoon} onClose={() => setShowComingSoon(false)}>
        <DialogTitle>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <ComingSoonIcon sx={{ color: '#6c63ff' }} />
            Coming Soon: Direct Insurance Purchase
          </Box>
        </DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            We're working on bringing you a seamless insurance buying experience right here in the app!
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Features coming soon:
          </Typography>
          <List>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#6c63ff' }} />
              </ListItemIcon>
              <ListItemText primary="Compare insurance plans from top providers" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#6c63ff' }} />
              </ListItemIcon>
              <ListItemText primary="Direct policy purchase with instant issuance" />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <CheckCircleIcon sx={{ color: '#6c63ff' }} />
              </ListItemIcon>
              <ListItemText primary="Exclusive discounts and offers" />
            </ListItem>
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setShowComingSoon(false)}>Close</Button>
          <GradientButton
            onClick={() => {
              window.open(getInsuranceSamadhanUrl('policyAnalysis'), '_blank');
              setShowComingSoon(false);
            }}
          >
            Get Expert Advice
          </GradientButton>
        </DialogActions>
      </Dialog>

      {/* Coming Soon Card */}
      <ComingSoonCard sx={{ p: 3, mb: 6 }}>
        <Grid container spacing={3} alignItems="center">
          <Grid item xs={12} md={8}>
            <Typography variant="h5" gutterBottom sx={{ color: '#6c63ff' }}>
              Coming Soon: Direct Insurance Purchase
            </Typography>
            <Typography variant="body1" sx={{ mb: 2 }}>
              We're building a revolutionary insurance purchasing platform that will make buying insurance as easy as shopping online.
            </Typography>
            <Typography variant="body2" color="text.secondary">
              Meanwhile, get expert assistance from Insurance Samadhan for all your insurance needs.
            </Typography>
          </Grid>
          <Grid item xs={12} md={4} sx={{ textAlign: 'center' }}>
            <ShoppingCartIcon sx={{ fontSize: 60, color: '#6c63ff', mb: 2 }} />
            <GradientButton
              fullWidth
              onClick={handleComingSoonClick}
              startIcon={<ComingSoonIcon />}
            >
              Learn More
            </GradientButton>
          </Grid>
        </Grid>
      </ComingSoonCard>

      {/* Insurance Samadhan Integration Section */}
      <Box>
        <Typography variant="h5" gutterBottom>
          Expert Insurance Services
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <SecurityIcon sx={{ fontSize: 40, color: '#6c63ff', mr: 1 }} />
                  <Typography variant="h6">
                    Claim Assistance
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get expert help with your insurance claims and maximize your claim settlement.
                </Typography>
                <GradientButton
                  fullWidth
                  onClick={() => window.open(getInsuranceSamadhanUrl('claimAssistance'), '_blank')}
                >
                  Get Claim Help
                </GradientButton>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <HealthAndSafetyIcon sx={{ fontSize: 40, color: '#6c63ff', mr: 1 }} />
                  <Typography variant="h6">
                    Policy Analysis
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get detailed analysis of your policies and recommendations from experts.
                </Typography>
                <GradientButton
                  fullWidth
                  onClick={() => window.open(getInsuranceSamadhanUrl('policyAnalysis'), '_blank')}
                >
                  Analyze Policy
                </GradientButton>
              </CardContent>
            </StyledCard>
          </Grid>
          <Grid item xs={12} md={4}>
            <StyledCard sx={{ height: '100%' }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <DirectionsCarIcon sx={{ fontSize: 40, color: '#6c63ff', mr: 1 }} />
                  <Typography variant="h6">
                    Grievance Resolution
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  Get help resolving disputes with insurance companies effectively.
                </Typography>
                <GradientButton
                  fullWidth
                  onClick={() => window.open(getInsuranceSamadhanUrl('grievanceResolution'), '_blank')}
                >
                  Resolve Issues
                </GradientButton>
              </CardContent>
            </StyledCard>
          </Grid>
        </Grid>
      </Box>
    </Container>
  );
}
