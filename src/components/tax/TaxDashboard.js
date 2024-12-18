import React, { useState } from 'react';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Button,
  Box,
  Paper,
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  useTheme,
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import TimerIcon from '@mui/icons-material/Timer';
import CalculateIcon from '@mui/icons-material/Calculate';
import AccountBalanceIcon from '@mui/icons-material/AccountBalance';
import AnalyticsIcon from '@mui/icons-material/Analytics';
import MonetizationOnIcon from '@mui/icons-material/MonetizationOn';
import CloseIcon from '@mui/icons-material/Close';
import CompareArrowsIcon from '@mui/icons-material/CompareArrows';
import HomeIcon from '@mui/icons-material/Home';
import FlightIcon from '@mui/icons-material/Flight';
import TaxRegimeComparison from './TaxRegimeComparison';
import HRALTACalculator from './HRALTACalculator';

const QUICKO_AFFILIATE_URL = "https://quicko.com/income-tax?affiliate_id=5821c10c-90b0-46fc-9d20-de9e55ccd242&utm_source=prasrupa_engineering_%28opc%29_private_limited&utm_medium=referral&utm_campaign=telegram&utm_term=finprime_tax_file&utm_id=finprime-tax&utm_content=financial_products";

const TaxDashboard = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [selectedTool, setSelectedTool] = useState(null);

  const handleQuickFileClick = () => {
    window.open(QUICKO_AFFILIATE_URL, '_blank', 'noopener,noreferrer');
  };

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const handleCloseDialog = () => {
    setSelectedTool(null);
  };

  const taxTools = [
    {
      id: 'regime-comparison',
      title: 'Tax Regime Comparison',
      description: 'Compare old vs new tax regime to find which one saves you more money',
      icon: <CompareArrowsIcon />,
      component: <TaxRegimeComparison />,
      isReady: true
    },
    {
      id: 'hra-lta',
      title: 'HRA & LTA Calculator',
      description: 'Optimize your House Rent Allowance and Leave Travel Allowance claims',
      icon: <HomeIcon />,
      component: <HRALTACalculator />,
      isReady: true
    },
    {
      id: 'section-80c',
      title: 'Section 80C Tracker',
      description: 'Track and optimize your tax-saving investments under Section 80C',
      icon: <AccountBalanceIcon />,
      path: '/tax/section-80c',
      isReady: false
    },
    {
      id: 'capital-gains',
      title: 'Capital Gains Calculator',
      description: 'Calculate tax on your stock, mutual fund, and crypto investments',
      icon: <AnalyticsIcon />,
      path: '/tax/capital-gains',
      isReady: false
    },
    {
      id: 'gst-calculator',
      title: 'GST Input Credit',
      description: 'Calculate and track your GST input credit claims',
      icon: <CalculateIcon />,
      path: '/tax/gst',
      isReady: false
    },
    {
      id: 'form16-analyzer',
      title: 'Form 16 Analyzer',
      description: 'Get personalized tax saving recommendations from your Form 16',
      icon: <MonetizationOnIcon />,
      path: '/tax/form16',
      isReady: false
    }
  ];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      {/* Quick Tax Filing Feature */}
      <Paper 
        elevation={6}
        sx={{
          p: 3,
          mb: 4,
          background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
          color: '#1A237E',
          borderRadius: 2,
          position: 'relative',
          overflow: 'hidden',
          '&::before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(45deg, rgba(255,255,255,0.1) 0%, rgba(255,255,255,0.2) 100%)',
            zIndex: 1
          }
        }}
      >
        <Box sx={{ maxWidth: 800, mx: 'auto', position: 'relative', zIndex: 2 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <TimerIcon sx={{ fontSize: 40, mr: 2, color: '#1A237E' }} />
            <Typography 
              variant="h4" 
              component="h1" 
              sx={{ 
                fontWeight: 700,
                textShadow: '1px 1px 2px rgba(0,0,0,0.1)',
                letterSpacing: '0.5px'
              }}
            >
              File Your Taxes in 5 Minutes
            </Typography>
          </Box>

          <Grid container spacing={3}>
            <Grid item xs={12} md={8}>
              <Box 
                sx={{ 
                  display: 'grid', 
                  gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)' },
                  gap: 2,
                }}
              >
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: '#1A237E',
                    flexShrink: 0
                  }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Automatic Form 16 Upload
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: '#1A237E',
                    flexShrink: 0
                  }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Smart Tax Recommendations
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: '#1A237E',
                    flexShrink: 0
                  }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Expert Assistance 24/7
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Box sx={{ 
                    width: 6, 
                    height: 6, 
                    borderRadius: '50%', 
                    bgcolor: '#1A237E',
                    flexShrink: 0
                  }} />
                  <Typography variant="body1" sx={{ fontWeight: 500 }}>
                    Secure & Compliant Filing
                  </Typography>
                </Box>
              </Box>
            </Grid>
            <Grid 
              item 
              xs={12} 
              md={4} 
              sx={{ 
                display: 'flex', 
                alignItems: { xs: 'flex-start', md: 'center' },
                justifyContent: { xs: 'flex-start', md: 'flex-end' }
              }}
            >
              <Button
                variant="contained"
                size="large"
                onClick={handleQuickFileClick}
                sx={{
                  bgcolor: '#1A237E',
                  color: 'white',
                  py: 1.5,
                  px: 4,
                  fontSize: '1.1rem',
                  fontWeight: 600,
                  '&:hover': {
                    bgcolor: '#0D47A1',
                  },
                  boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
                  borderRadius: 2,
                  minWidth: '160px'
                }}
              >
                File Now →
              </Button>
            </Grid>
          </Grid>
        </Box>
      </Paper>

      {/* Tax Planning Tools */}
      <Typography variant="h5" gutterBottom sx={{ mb: 3 }}>
        Tax Planning Tools
      </Typography>
      
      <Grid container spacing={3}>
        {taxTools.map((tool) => (
          <Grid item xs={12} sm={6} md={4} key={tool.id}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'transform 0.2s',
                position: 'relative',
                opacity: tool.isReady ? 1 : 0.7,
                '&:hover': {
                  transform: tool.isReady ? 'translateY(-5px)' : 'none',
                  cursor: tool.isReady ? 'pointer' : 'default'
                }
              }}
              onClick={() => {
                if (tool.isReady) {
                  tool.component ? handleToolClick(tool) : navigate(tool.path);
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Box sx={{ 
                    p: 1,
                    borderRadius: 1,
                    bgcolor: tool.isReady ? 'primary.main' : 'grey.400',
                    color: 'white',
                    mr: 2
                  }}>
                    {tool.icon}
                  </Box>
                  <Typography variant="h6" component="h2">
                    {tool.title}
                  </Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  {tool.description}
                </Typography>
                {!tool.isReady && (
                  <Typography 
                    variant="caption" 
                    sx={{ 
                      position: 'absolute', 
                      bottom: 8, 
                      right: 8,
                      color: 'grey.500',
                      fontStyle: 'italic'
                    }}
                  >
                    Coming Soon
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      {/* Tool Dialog */}
      <Dialog
        fullWidth
        maxWidth="lg"
        open={Boolean(selectedTool)}
        onClose={handleCloseDialog}
        sx={{
          '& .MuiDialog-paper': {
            m: 0,
            borderRadius: 1,
          }
        }}
      >
        {selectedTool && (
          <>
            <DialogTitle sx={{ m: 0, p: 2, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <Box sx={{ display: 'flex', alignItems: 'center' }}>
                {selectedTool.icon}
                <Typography variant="h6" sx={{ ml: 2 }}>
                  {selectedTool.title}
                </Typography>
              </Box>
              <IconButton
                aria-label="close"
                onClick={handleCloseDialog}
                sx={{
                  color: theme.palette.grey[500],
                }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent dividers>
              {selectedTool.component}
            </DialogContent>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default TaxDashboard;
