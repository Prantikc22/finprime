import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Stepper,
  Step,
  StepLabel,
  Button,
  Card,
  CardContent,
  TextField,
  MenuItem,
  Slider,
  useTheme,
} from '@mui/material';
import {
  AccountBalance,
  TrendingUp,
  School,
  Home,
  DirectionsCar,
  Celebration,
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

const LIFE_STAGES = [
  { id: 'early-career', label: 'Early Career', minAge: 21, maxAge: 30 },
  { id: 'career-growth', label: 'Career Growth', minAge: 31, maxAge: 40 },
  { id: 'peak-earning', label: 'Peak Earning', minAge: 41, maxAge: 50 },
  { id: 'pre-retirement', label: 'Pre-Retirement', minAge: 51, maxAge: 60 },
  { id: 'retirement', label: 'Retirement', minAge: 61, maxAge: 100 },
];

const FINANCIAL_GOALS = [
  { id: 'emergency-fund', label: 'Emergency Fund', icon: AccountBalance, timeRequired: true },
  { id: 'investment', label: 'Investment Growth', icon: TrendingUp, timeRequired: true },
  { id: 'education', label: 'Education', icon: School, timeRequired: true },
  { id: 'house', label: 'Buy a House', icon: Home, timeRequired: true },
  { id: 'vehicle', label: 'Buy a Vehicle', icon: DirectionsCar, timeRequired: true },
  { id: 'retirement', label: 'Retirement', icon: Celebration, timeRequired: true },
];

const calculateFutureValue = (amount, years, rateOfReturn = 12) => {
  const monthlyAmount = amount;
  const monthlyRate = rateOfReturn / 12 / 100;
  const months = years * 12;
  
  const futureValue = monthlyAmount * ((Math.pow(1 + monthlyRate, months) - 1) / monthlyRate);
  return Math.round(futureValue);
};

const FinancialJourney = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeStep, setActiveStep] = useState(0);
  const [showRecommendations, setShowRecommendations] = useState(false);
  const [userData, setUserData] = useState({
    age: 25,
    income: '',
    expenses: '',
    lifeStage: 'early-career',
    selectedGoals: [],
    goalDetails: {},
    riskTolerance: 5,
  });

  const handleNext = () => {
    if (activeStep === 3) {
      handleComplete();
    } else {
      setActiveStep((prevStep) => prevStep + 1);
    }
  };

  const handleBack = () => {
    setActiveStep((prevStep) => prevStep - 1);
  };

  const handleInputChange = (field) => (event) => {
    setUserData({ ...userData, [field]: event.target.value });
  };

  const handleGoalToggle = (goalId) => {
    const currentGoals = userData.selectedGoals;
    const newGoals = currentGoals.includes(goalId)
      ? currentGoals.filter(id => id !== goalId)
      : [...currentGoals, goalId];
    
    // Initialize or remove goal details
    const newGoalDetails = { ...userData.goalDetails };
    if (!currentGoals.includes(goalId)) {
      newGoalDetails[goalId] = { amount: '', years: '' };
    } else {
      delete newGoalDetails[goalId];
    }
    
    setUserData({ 
      ...userData, 
      selectedGoals: newGoals,
      goalDetails: newGoalDetails
    });
  };

  const handleGoalDetailChange = (event, goalId, field) => {
    event.stopPropagation(); // Prevent event bubbling to parent card
    setUserData({
      ...userData,
      goalDetails: {
        ...userData.goalDetails,
        [goalId]: {
          ...userData.goalDetails[goalId],
          [field]: event.target.value
        }
      }
    });
  };

  const getRecommendations = () => {
    return [
      {
        title: 'Emergency Fund',
        description: 'Build 6 months of expenses as emergency fund',
        priority: 'High',
        allocation: '20%',
        links: [
          {
            title: 'Start with Liquid Funds',
            url: 'https://zerodha.com/open-account?c=XX4244',
            description: 'Start your emergency fund with liquid funds via Zerodha'
          }
        ]
      },
      {
        title: 'Mutual Funds',
        description: 'Invest in diversified equity funds for long-term growth',
        priority: 'High',
        allocation: '40%',
        links: [
          {
            title: 'Invest via Zerodha',
            url: 'https://zerodha.com/open-account?c=XX4244',
            description: 'Start your mutual fund investment journey'
          }
        ]
      },
      {
        title: 'Fixed Deposits & Bonds',
        description: 'Secure fixed-income investments',
        priority: 'Medium',
        allocation: '20%',
        links: [
          {
            title: 'Explore FDs & Bonds',
            url: 'https://incredmoney.app.link/Qv2TSN6lnPb',
            description: 'Invest in high-yield FDs and bonds'
          }
        ]
      },
      {
        title: 'Gold Investment',
        description: 'Digital gold for portfolio diversification',
        priority: 'Medium',
        allocation: '10%',
        links: [
          {
            title: 'Invest in Digital Gold',
            url: 'https://mydigigold.com/sign-up?ref=JGHEF59000',
            description: 'Start investing in digital gold'
          }
        ]
      },
      {
        title: 'Alternative Investments',
        description: 'Explore high-yield alternative investment options',
        priority: 'Low',
        allocation: '10%',
        links: [
          {
            title: 'Explore Alternative Investments',
            url: 'https://refer.tapinvest.in/RS2OJJ',
            description: 'Discover alternative investment opportunities'
          }
        ]
      }
    ];
  };

  const handleComplete = () => {
    // Save the journey data if needed
    setShowRecommendations(true);
  };

  const renderStepContent = (step) => {
    switch (step) {
      case 0:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Age"
                type="number"
                value={userData.age}
                onChange={handleInputChange('age')}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                select
                label="Life Stage"
                value={userData.lifeStage}
                onChange={handleInputChange('lifeStage')}
              >
                {LIFE_STAGES.map((stage) => (
                  <MenuItem key={stage.id} value={stage.id}>
                    {stage.label}
                  </MenuItem>
                ))}
              </TextField>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monthly Income"
                type="number"
                value={userData.income}
                onChange={handleInputChange('income')}
                InputProps={{
                  startAdornment: '₹',
                }}
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                fullWidth
                label="Monthly Expenses"
                type="number"
                value={userData.expenses}
                onChange={handleInputChange('expenses')}
                InputProps={{
                  startAdornment: '₹',
                }}
              />
            </Grid>
          </Grid>
        );

      case 1:
        return (
          <Grid container spacing={3}>
            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Select Your Financial Goals
              </Typography>
            </Grid>
            {FINANCIAL_GOALS.map((goal) => {
              const Icon = goal.icon;
              const isSelected = userData.selectedGoals.includes(goal.id);
              return (
                <Grid item xs={12} sm={6} md={4} key={goal.id}>
                  <Card
                    sx={{
                      cursor: 'pointer',
                      bgcolor: isSelected ? 'primary.main' : 'background.paper',
                      color: isSelected ? 'primary.contrastText' : 'text.primary',
                      transition: 'all 0.3s',
                      '&:hover': {
                        transform: 'translateY(-4px)',
                        boxShadow: theme.shadows[8],
                      },
                    }}
                    onClick={() => handleGoalToggle(goal.id)}
                  >
                    <CardContent>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                        <Icon sx={{ mr: 1 }} />
                        <Typography variant="h6">{goal.label}</Typography>
                      </Box>
                      {isSelected && (
                        <Box sx={{ mt: 2 }} onClick={(e) => e.stopPropagation()}>
                          <TextField
                            fullWidth
                            label="Monthly Investment Amount"
                            type="number"
                            value={userData.goalDetails[goal.id]?.amount || ''}
                            onChange={(e) => handleGoalDetailChange(e, goal.id, 'amount')}
                            sx={{ mb: 2 }}
                            InputProps={{
                              startAdornment: '₹',
                            }}
                          />
                          <TextField
                            fullWidth
                            label="Years to Achieve"
                            type="number"
                            value={userData.goalDetails[goal.id]?.years || ''}
                            onChange={(e) => handleGoalDetailChange(e, goal.id, 'years')}
                          />
                          {userData.goalDetails[goal.id]?.amount && userData.goalDetails[goal.id]?.years && (
                            <Box sx={{ mt: 2, p: 2, bgcolor: 'rgba(0,0,0,0.1)', borderRadius: 1 }}>
                              <Typography variant="body2">
                                Expected Value: ₹{new Intl.NumberFormat('en-IN').format(
                                  calculateFutureValue(
                                    userData.goalDetails[goal.id].amount,
                                    userData.goalDetails[goal.id].years
                                  )
                                )}
                              </Typography>
                              <Typography variant="caption">
                                (Assuming 12% annual returns)
                              </Typography>
                            </Box>
                          )}
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        );

      case 2:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Risk Tolerance Assessment
            </Typography>
            <Typography variant="body2" color="text.secondary" gutterBottom>
              How comfortable are you with investment risk?
            </Typography>
            <Slider
              value={userData.riskTolerance}
              onChange={(e, newValue) => setUserData({ ...userData, riskTolerance: newValue })}
              min={1}
              max={10}
              marks
              valueLabelDisplay="auto"
              sx={{ mt: 4 }}
            />
            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'space-between' }}>
              <Typography color="text.secondary">Conservative</Typography>
              <Typography color="text.secondary">Aggressive</Typography>
            </Box>
          </Box>
        );

      case 3:
        return (
          <Box>
            <Typography variant="h6" gutterBottom>
              Your Personalized Recommendations
            </Typography>
            <Grid container spacing={3}>
              {getRecommendations().map((rec, index) => (
                <Grid item xs={12} key={index}>
                  <Paper sx={{ p: 2 }}>
                    <Typography variant="subtitle1" gutterBottom>
                      {rec.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {rec.description}
                    </Typography>
                    <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <Box>
                        <Typography variant="body2" color="primary">
                          Priority: {rec.priority}
                        </Typography>
                        <Typography variant="body2" color="primary">
                          Suggested Allocation: {rec.allocation}
                        </Typography>
                      </Box>
                      <Box>
                        {rec.links.map((link, linkIndex) => (
                          <Button
                            key={linkIndex}
                            variant="contained"
                            color="primary"
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            sx={{ ml: 1 }}
                          >
                            {link.title}
                          </Button>
                        ))}
                      </Box>
                    </Box>
                  </Paper>
                </Grid>
              ))}
            </Grid>
          </Box>
        );

      default:
        return null;
    }
  };

  const renderResult = () => {
    const recommendations = getRecommendations();
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Your Financial Journey Summary
        </Typography>
        
        <Grid container spacing={3}>
          {userData.selectedGoals.map((goalId) => {
            const goal = FINANCIAL_GOALS.find(g => g.id === goalId);
            const details = userData.goalDetails[goalId];
            return (
              <Grid item xs={12} key={goalId}>
                <Paper sx={{ p: 2 }}>
                  <Typography variant="subtitle1" gutterBottom>
                    {goal.label}
                  </Typography>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2" color="text.secondary">
                      Monthly Investment: ₹{details.amount}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Timeline: {details.years} years
                    </Typography>
                  </Box>
                  <Typography variant="body2" color="primary">
                    Expected Value: ₹{new Intl.NumberFormat('en-IN').format(
                      calculateFutureValue(details.amount, details.years)
                    )}
                  </Typography>
                </Paper>
              </Grid>
            );
          })}
        </Grid>

        <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
          Recommended Investment Options
        </Typography>
        <Grid container spacing={3}>
          {recommendations.map((rec, index) => (
            <Grid item xs={12} key={index}>
              <Paper sx={{ p: 2 }}>
                <Typography variant="subtitle1" gutterBottom>
                  {rec.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {rec.description}
                </Typography>
                <Box sx={{ mt: 1, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Box>
                    <Typography variant="body2" color="primary">
                      Priority: {rec.priority}
                    </Typography>
                    <Typography variant="body2" color="primary">
                      Suggested Allocation: {rec.allocation}
                    </Typography>
                  </Box>
                  <Box>
                    {rec.links.map((link, linkIndex) => (
                      <Button
                        key={linkIndex}
                        variant="contained"
                        color="primary"
                        href={link.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ ml: 1 }}
                      >
                        {link.title}
                      </Button>
                    ))}
                  </Box>
                </Box>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Box sx={{ mt: 4, display: 'flex', justifyContent: 'space-between' }}>
          <Button
            variant="outlined"
            onClick={() => {
              setActiveStep(0);
              setShowRecommendations(false);
            }}
          >
            Start New Journey
          </Button>
          <Button
            variant="contained"
            onClick={() => navigate('/wealth')}
          >
            Back to Dashboard
          </Button>
        </Box>
      </Box>
    );
  };

  if (showRecommendations) {
    return (
      <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
        <Paper sx={{ p: 3 }}>
          {renderResult()}
        </Paper>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Your Financial Journey
        </Typography>
        <Typography variant="body1" color="text.secondary" gutterBottom>
          Let's create your personalized financial roadmap
        </Typography>

        <Stepper activeStep={activeStep} sx={{ mt: 4, mb: 4 }}>
          <Step>
            <StepLabel>Basic Information</StepLabel>
          </Step>
          <Step>
            <StepLabel>Set Goals</StepLabel>
          </Step>
          <Step>
            <StepLabel>Risk Assessment</StepLabel>
          </Step>
          <Step>
            <StepLabel>Recommendations</StepLabel>
          </Step>
        </Stepper>

        <Box sx={{ mt: 4, mb: 4 }}>
          {renderStepContent(activeStep)}
        </Box>

        <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 3 }}>
          {activeStep > 0 && (
            <Button onClick={handleBack} sx={{ mr: 1 }}>
              Back
            </Button>
          )}
          <Button
            variant="contained"
            onClick={handleNext}
            disabled={activeStep === 3 && userData.selectedGoals.length === 0}
          >
            {activeStep === 3 ? 'Complete' : 'Next'}
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default FinancialJourney;
