import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Paper,
  Typography,
  Tab,
  Tabs,
  Button,
  Card,
  CardContent,
  CardActions,
  CircularProgress,
  useTheme,
  Avatar
} from '@mui/material';
import {
  Timeline,
  Assessment,
  AccountBalance,
  TrendingUp,
  ShowChart,
  Security,
  Diamond,
  BusinessCenter,
  LocalAtm,
} from '@mui/icons-material';
import { PieChart, Pie, Cell, ResponsiveContainer, LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { useNavigate } from 'react-router-dom';

const INVESTMENT_TYPES = [
  { id: 'mutualFunds', title: 'Mutual Funds', icon: ShowChart, color: '#FF6B6B' },
  { id: 'fixedDeposits', title: 'Fixed Deposits', icon: AccountBalance, color: '#4ECDC4' },
  { id: 'govtSecurities', title: 'Govt. Securities', icon: Security, color: '#45B7D1' },
  { id: 'realEstate', title: 'Real Estate', icon: BusinessCenter, color: '#96CEB4' },
  { id: 'gold', title: 'Gold', icon: Diamond, color: '#FFEEAD' },
  { id: 'insurance', title: 'Insurance', icon: LocalAtm, color: '#D4A5A5' },
];

const mockPortfolioData = [
  { name: 'Mutual Funds', value: 35 },
  { name: 'Fixed Deposits', value: 20 },
  { name: 'Govt. Securities', value: 15 },
  { name: 'Real Estate', value: 15 },
  { name: 'Gold', value: 10 },
  { name: 'Insurance', value: 5 },
];

const mockGrowthData = [
  { month: 'Jan', value: 100 },
  { month: 'Feb', value: 120 },
  { month: 'Mar', value: 115 },
  { month: 'Apr', value: 130 },
  { month: 'May', value: 145 },
  { month: 'Jun', value: 160 },
];

const WealthDashboard = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState(0);
  const [selectedInvestment, setSelectedInvestment] = useState(null);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  const handleInvestmentClick = (investment) => {
    setSelectedInvestment(investment);
    // Here we would typically navigate to a detailed view
    // navigate(`/wealth/${investment.id}`);
  };

  const features = [
    {
      title: 'Financial Journey',
      description: 'Create your personalized financial roadmap and track your goals',
      icon: <Timeline />,
      path: '/journey',
      color: '#2196F3'
    },
    {
      title: 'Risk Assessment',
      description: 'Understand your risk profile and get tailored investment recommendations',
      icon: <Assessment />,
      path: '/risk-assessment',
      color: '#4CAF50'
    },
    {
      title: 'Investment Options',
      description: 'Explore various investment options and strategies',
      icon: <ShowChart />,
      path: '/investment-options',
      color: '#FF6B6B'
    },
    {
      title: 'Portfolio Growth',
      description: 'Track your portfolio growth and performance',
      icon: <TrendingUp />,
      path: '/portfolio-growth',
      color: '#45B7D1'
    },
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Grid container spacing={3}>
        {/* Header */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3, mb: 3 }}>
            <Typography variant="h4" gutterBottom>
              Wealth Dashboard
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Your complete financial portfolio at a glance
            </Typography>
          </Paper>
        </Grid>

        {/* Features */}
        <Grid item xs={12}>
          <Grid container spacing={3}>
            {features.map((feature, index) => (
              <Grid item xs={12} sm={6} md={4} key={index}>
                <Card 
                  sx={{ 
                    height: '100%',
                    display: 'flex',
                    flexDirection: 'column',
                    cursor: 'pointer',
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                    }
                  }}
                  onClick={() => navigate(feature.path)}
                >
                  <CardContent>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                      <Avatar sx={{ bgcolor: feature.color, mr: 2 }}>
                        {feature.icon}
                      </Avatar>
                      <Typography variant="h6" component="div">
                        {feature.title}
                      </Typography>
                    </Box>
                    <Typography variant="body2" color="text.secondary">
                      {feature.description}
                    </Typography>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </Grid>

        {/* Portfolio Overview */}
        <Grid item xs={12} md={8}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Distribution
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={mockPortfolioData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {mockPortfolioData.map((entry, index) => (
                      <Cell key={index} fill={INVESTMENT_TYPES[index].color} />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>

        {/* Quick Stats */}
        <Grid item xs={12} md={4}>
          <Paper sx={{ p: 3, height: '100%' }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Stats
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography variant="subtitle1">Total Value</Typography>
              <Typography variant="h4" color="primary">
                ₹15,00,000
              </Typography>
              <Typography variant="subtitle2" color="success.main" sx={{ mt: 1 }}>
                +15.4% (This Month)
              </Typography>
            </Box>
          </Paper>
        </Grid>

        {/* Investment Categories */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Investment Options
            </Typography>
            <Grid container spacing={3} sx={{ mt: 1 }}>
              {INVESTMENT_TYPES.map((investment) => {
                const Icon = investment.icon;
                return (
                  <Grid item xs={12} sm={6} md={4} key={investment.id}>
                    <Card 
                      sx={{ 
                        cursor: 'pointer',
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: theme.shadows[8],
                        },
                      }}
                      onClick={() => handleInvestmentClick(investment)}
                    >
                      <CardContent>
                        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                          <Icon sx={{ mr: 1, color: investment.color }} />
                          <Typography variant="h6">{investment.title}</Typography>
                        </Box>
                        <Typography variant="body2" color="text.secondary">
                          Explore {investment.title.toLowerCase()} investment options and strategies
                        </Typography>
                      </CardContent>
                      <CardActions>
                        <Button size="small" color="primary">
                          Learn More
                        </Button>
                      </CardActions>
                    </Card>
                  </Grid>
                );
              })}
            </Grid>
          </Paper>
        </Grid>

        {/* Growth Chart */}
        <Grid item xs={12}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h6" gutterBottom>
              Portfolio Growth
            </Typography>
            <Box sx={{ height: 300 }}>
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={mockGrowthData}>
                  <XAxis dataKey="month" />
                  <YAxis />
                  <Tooltip />
                  <Line 
                    type="monotone" 
                    dataKey="value" 
                    stroke={theme.palette.primary.main} 
                    strokeWidth={2}
                  />
                </LineChart>
              </ResponsiveContainer>
            </Box>
          </Paper>
        </Grid>
      </Grid>
    </Container>
  );
};

export default WealthDashboard;
