import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  RadioGroup,
  Radio,
  FormControlLabel,
  Button,
  LinearProgress,
  Card,
  CardContent,
  useTheme,
} from '@mui/material';
import {
  TrendingUp,
  TrendingDown,
  Security,
  Assessment,
  Timeline,
  ArrowBack,
} from '@mui/icons-material';

const RISK_QUESTIONS = [
  {
    id: 1,
    question: "How would you react if your investments dropped by 20% in a month?",
    options: [
      { value: 1, label: "Sell everything immediately", score: 1 },
      { value: 2, label: "Sell some investments", score: 2 },
      { value: 3, label: "Do nothing and wait", score: 3 },
      { value: 4, label: "Buy more at lower prices", score: 4 },
    ],
  },
  {
    id: 2,
    question: "What's your primary investment goal?",
    options: [
      { value: 1, label: "Preserve my capital", score: 1 },
      { value: 2, label: "Generate steady income", score: 2 },
      { value: 3, label: "Grow my wealth moderately", score: 3 },
      { value: 4, label: "Maximize long-term returns", score: 4 },
    ],
  },
  {
    id: 3,
    question: "How long can you keep your money invested?",
    options: [
      { value: 1, label: "Less than 1 year", score: 1 },
      { value: 2, label: "1-3 years", score: 2 },
      { value: 3, label: "3-5 years", score: 3 },
      { value: 4, label: "More than 5 years", score: 4 },
    ],
  },
  {
    id: 4,
    question: "What's your investment experience?",
    options: [
      { value: 1, label: "No experience", score: 1 },
      { value: 2, label: "Some experience with mutual funds", score: 2 },
      { value: 3, label: "Experienced with stocks and bonds", score: 3 },
      { value: 4, label: "Very experienced across assets", score: 4 },
    ],
  },
  {
    id: 5,
    question: "How stable is your income?",
    options: [
      { value: 1, label: "Very unstable", score: 1 },
      { value: 2, label: "Somewhat stable", score: 2 },
      { value: 3, label: "Stable", score: 3 },
      { value: 4, label: "Very stable", score: 4 },
    ],
  },
];

const RISK_PROFILES = [
  {
    type: 'Conservative',
    description: 'Focus on capital preservation with minimal risk',
    allocation: {
      equity: 20,
      debt: 60,
      gold: 10,
      cash: 10,
    },
    recommendations: [
      {
        type: 'Debt Funds',
        description: 'Low-risk debt mutual funds',
        allocation: '40%',
        options: [
          {
            name: 'Liquid Funds',
            description: 'Highly liquid, low-risk investments',
            link: 'https://zerodha.com/open-account?c=XX4244'
          }
        ]
      },
      {
        type: 'Fixed Deposits & Bonds',
        description: 'Secure fixed-income investments',
        allocation: '20%',
        options: [
          {
            name: 'Corporate Bonds',
            description: 'High-yield corporate bonds',
            link: 'https://incredmoney.app.link/Qv2TSN6lnPb'
          },
          {
            name: 'Fixed Deposits',
            description: 'Secure fixed deposits with good returns',
            link: 'https://incredmoney.app.link/Qv2TSN6lnPb'
          }
        ]
      },
      {
        type: 'Digital Gold',
        description: 'Safe haven investment',
        allocation: '10%',
        options: [
          {
            name: 'Digital Gold',
            description: 'Investment in 24K digital gold',
            link: 'https://mydigigold.com/sign-up?ref=JGHEF59000'
          }
        ]
      },
      {
        type: 'Large Cap Funds',
        description: 'Stable equity investments',
        allocation: '20%',
        options: [
          {
            name: 'Index Funds',
            description: 'Track major market indices',
            link: 'https://zerodha.com/open-account?c=XX4244'
          }
        ]
      }
    ],
    icon: Security,
    color: '#4CAF50',
  },
  {
    type: 'Moderate',
    description: 'Balance between growth and stability',
    allocation: {
      equity: 40,
      debt: 40,
      gold: 10,
      cash: 10,
    },
    recommendations: [
      {
        type: 'Equity Funds',
        description: 'Mix of large and mid-cap funds',
        allocation: '40%',
        options: [
          {
            name: 'Flexi Cap Funds',
            description: 'Diversified across market caps',
            link: 'https://zerodha.com/open-account?c=XX4244'
          },
          {
            name: 'Large & Mid Cap Funds',
            description: 'Blend of stability and growth',
            link: 'https://zerodha.com/open-account?c=XX4244'
          }
        ]
      },
      {
        type: 'Fixed Income',
        description: 'Mix of bonds and deposits',
        allocation: '40%',
        options: [
          {
            name: 'Corporate Bonds',
            description: 'Higher yielding debt investments',
            link: 'https://incredmoney.app.link/Qv2TSN6lnPb'
          },
          {
            name: 'Fixed Deposits',
            description: 'Stable returns with safety',
            link: 'https://incredmoney.app.link/Qv2TSN6lnPb'
          }
        ]
      },
      {
        type: 'Gold',
        description: 'Portfolio diversification',
        allocation: '10%',
        options: [
          {
            name: 'Digital Gold',
            description: 'Secure gold investments',
            link: 'https://mydigigold.com/sign-up?ref=JGHEF59000'
          }
        ]
      }
    ],
    icon: Timeline,
    color: '#2196F3',
  },
  {
    type: 'Aggressive',
    description: 'Focus on maximum growth with higher risk tolerance',
    allocation: {
      equity: 70,
      debt: 20,
      gold: 5,
      cash: 5,
    },
    recommendations: [
      {
        type: 'Equity Funds',
        description: 'High-growth potential funds',
        allocation: '70%',
        options: [
          {
            name: 'Small Cap Funds',
            description: 'High growth potential',
            link: 'https://zerodha.com/open-account?c=XX4244'
          },
          {
            name: 'Sectoral Funds',
            description: 'Focus on high-growth sectors',
            link: 'https://zerodha.com/open-account?c=XX4244'
          }
        ]
      },
      {
        type: 'Alternative Investments',
        description: 'High-yield opportunities',
        allocation: '20%',
        options: [
          {
            name: 'Alternative Assets',
            description: 'High-yield investment opportunities',
            link: 'https://refer.tapinvest.in/RS2OJJ'
          }
        ]
      },
      {
        type: 'Gold',
        description: 'Hedge against market volatility',
        allocation: '5%',
        options: [
          {
            name: 'Digital Gold',
            description: 'Strategic gold allocation',
            link: 'https://mydigigold.com/sign-up?ref=JGHEF59000'
          }
        ]
      }
    ],
    icon: TrendingUp,
    color: '#F44336',
  },
];

const RiskAssessment = () => {
  const theme = useTheme();
  const [answers, setAnswers] = useState({});
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [showResult, setShowResult] = useState(false);
  const [riskProfile, setRiskProfile] = useState(null);
  const [showInvestments, setShowInvestments] = useState(false);

  const handleAnswer = (questionId, value) => {
    setAnswers({ ...answers, [questionId]: value });
  };

  const handleNext = () => {
    if (currentQuestion < RISK_QUESTIONS.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      calculateRiskProfile();
    }
  };

  const handleBack = () => {
    setCurrentQuestion(currentQuestion - 1);
  };

  const calculateRiskProfile = () => {
    const totalScore = Object.values(answers).reduce((sum, score) => sum + score, 0);
    const averageScore = totalScore / RISK_QUESTIONS.length;

    let profile;
    if (averageScore <= 2) {
      profile = RISK_PROFILES[0]; // Conservative
    } else if (averageScore <= 3) {
      profile = RISK_PROFILES[1]; // Moderate
    } else {
      profile = RISK_PROFILES[2]; // Aggressive
    }

    setRiskProfile(profile);
    setShowResult(true);
  };

  const renderQuestion = () => {
    const question = RISK_QUESTIONS[currentQuestion];
    return (
      <Box>
        <Typography variant="h6" gutterBottom>
          Question {currentQuestion + 1} of {RISK_QUESTIONS.length}
        </Typography>
        <Typography variant="body1" gutterBottom>
          {question.question}
        </Typography>
        <RadioGroup
          value={answers[question.id] || ''}
          onChange={(e) => handleAnswer(question.id, parseInt(e.target.value))}
        >
          {question.options.map((option) => (
            <FormControlLabel
              key={option.value}
              value={option.score}
              control={<Radio />}
              label={option.label}
            />
          ))}
        </RadioGroup>
      </Box>
    );
  };

  const renderResult = () => {
    const Icon = riskProfile.icon;
    return (
      <Box>
        {!showInvestments ? (
          <>
            <Typography variant="h5" gutterBottom align="center">
              Your Risk Profile
            </Typography>
            
            <Card sx={{ mb: 4, bgcolor: `${riskProfile.color}15` }}>
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Icon sx={{ fontSize: 40, color: riskProfile.color, mr: 2 }} />
                  <Typography variant="h6">{riskProfile.type}</Typography>
                </Box>
                <Typography variant="body1" gutterBottom>
                  {riskProfile.description}
                </Typography>
              </CardContent>
            </Card>

            <Typography variant="h6" gutterBottom>
              Recommended Asset Allocation
            </Typography>
            <Grid container spacing={2}>
              {Object.entries(riskProfile.allocation).map(([asset, percentage]) => (
                <Grid item xs={12} key={asset}>
                  <Typography variant="subtitle1" gutterBottom>
                    {asset.charAt(0).toUpperCase() + asset.slice(1)}
                  </Typography>
                  <Box sx={{ display: 'flex', alignItems: 'center' }}>
                    <Box sx={{ flexGrow: 1, mr: 1 }}>
                      <LinearProgress
                        variant="determinate"
                        value={percentage}
                        sx={{
                          height: 10,
                          borderRadius: 5,
                          bgcolor: 'background.paper',
                          '& .MuiLinearProgress-bar': {
                            bgcolor: riskProfile.color,
                          },
                        }}
                      />
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {percentage}%
                    </Typography>
                  </Box>
                </Grid>
              ))}
            </Grid>

            <Box sx={{ mt: 4 }}>
              <Typography variant="h6" gutterBottom>
                Next Steps
              </Typography>
              <Typography variant="body1" paragraph>
                Based on your risk profile, we have prepared detailed investment recommendations for you.
              </Typography>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{ mb: 2 }}
                    onClick={() => setShowInvestments(true)}
                  >
                    View Recommended Investments
                  </Button>
                </Grid>
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    fullWidth
                    onClick={() => {
                      setAnswers({});
                      setCurrentQuestion(0);
                      setShowResult(false);
                      setShowInvestments(false);
                    }}
                  >
                    Retake Assessment
                  </Button>
                </Grid>
              </Grid>
            </Box>
          </>
        ) : (
          <>
            <Box sx={{ mb: 4, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Typography variant="h5">
                Recommended Investments
              </Typography>
              <Button
                variant="outlined"
                onClick={() => setShowInvestments(false)}
                startIcon={<ArrowBack />}
              >
                Back to Profile
              </Button>
            </Box>
            
            <Grid container spacing={3}>
              {riskProfile.recommendations.map((rec, index) => (
                <Grid item xs={12} key={index}>
                  <Card>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {rec.type} ({rec.allocation})
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {rec.description}
                      </Typography>
                      <Box sx={{ mt: 2 }}>
                        <Typography variant="subtitle2" gutterBottom>
                          Recommended Options:
                        </Typography>
                        <Grid container spacing={2}>
                          {rec.options.map((option, optIndex) => (
                            <Grid item xs={12} sm={6} md={4} key={optIndex}>
                              <Card variant="outlined">
                                <CardContent>
                                  <Typography variant="subtitle1" gutterBottom>
                                    {option.name}
                                  </Typography>
                                  <Typography variant="body2" color="text.secondary" gutterBottom>
                                    {option.description}
                                  </Typography>
                                  <Button
                                    variant="contained"
                                    color="primary"
                                    href={option.link}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    fullWidth
                                    sx={{ mt: 1 }}
                                  >
                                    Invest Now
                                  </Button>
                                </CardContent>
                              </Card>
                            </Grid>
                          ))}
                        </Grid>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}
      </Box>
    );
  };

  return (
    <Container maxWidth="md" sx={{ mt: 4, mb: 4 }}>
      <Paper sx={{ p: 3 }}>
        <Typography variant="h4" gutterBottom>
          Risk Profile Assessment
        </Typography>
        <Typography variant="body1" color="text.secondary" paragraph>
          Let's understand your investment style and risk tolerance
        </Typography>

        {!showResult && (
          <Box sx={{ mb: 4 }}>
            <LinearProgress
              variant="determinate"
              value={(currentQuestion + 1) * (100 / RISK_QUESTIONS.length)}
              sx={{ mb: 2, height: 8, borderRadius: 4 }}
            />
          </Box>
        )}

        {showResult ? renderResult() : renderQuestion()}

        {!showResult && (
          <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 4 }}>
            <Button
              onClick={handleBack}
              disabled={currentQuestion === 0}
            >
              Back
            </Button>
            <Button
              variant="contained"
              onClick={handleNext}
              disabled={!answers[RISK_QUESTIONS[currentQuestion].id]}
            >
              {currentQuestion === RISK_QUESTIONS.length - 1 ? 'Finish' : 'Next'}
            </Button>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default RiskAssessment;
