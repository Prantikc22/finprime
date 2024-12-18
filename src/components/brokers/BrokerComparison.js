import React, { useState } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Rating,
  Chip,
  Tabs,
  Tab,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

const StyledCard = styled(Card)(({ theme, recommended }) => ({
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: recommended ? '2px solid #FFD700' : '1px solid rgba(255, 255, 255, 0.1)',
  position: 'relative',
  '&::before': recommended ? {
    content: '"Recommended"',
    position: 'absolute',
    top: '-12px',
    right: '20px',
    background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
    padding: '4px 12px',
    borderRadius: '12px',
    fontSize: '0.8rem',
    fontWeight: 'bold',
    color: '#000',
    boxShadow: '0 2px 4px rgba(0,0,0,0.2)'
  } : {},
}));

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  borderBottom: '1px solid rgba(255, 255, 255, 0.1)',
}));

const BrokerButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
  borderRadius: '8px',
  padding: '10px 20px',
  '&:hover': {
    background: 'linear-gradient(45deg, #5a52ff 30%, #4845ff 90%)',
  },
}));

const brokers = [
  {
    name: 'Zerodha',
    rating: 4.5,
    accountOpeningFee: 200,
    maintenanceFee: 300,
    equityDelivery: '0%',
    equityIntraday: '0.03%',
    futuresTrading: '0.03%',
    optionsTrading: '20/lot',
    commodities: '0.03%',
    currencies: '0.03%',
    mutualFunds: 'Free',
    pros: ['Most popular platform', 'Clean UI', 'Fast execution', 'Great educational content'],
    cons: ['Basic charting', 'Limited research', 'No trading in bonds'],
    features: ['Kite Mobile App', 'Console for backoffice', 'Coin for mutual funds'],
    referralUrl: 'https://zerodha.com/open-account?c=XX4244'
  },
  {
    name: 'Groww',
    rating: 4.3,
    accountOpeningFee: 0,
    maintenanceFee: 200,
    equityDelivery: '0%',
    equityIntraday: '0.05%',
    futuresTrading: '0.05%',
    optionsTrading: '20/lot',
    commodities: 'N/A',
    currencies: 'N/A',
    mutualFunds: 'Free',
    pros: ['User friendly', 'Great for beginners', 'Free equity delivery', 'Integrated platform'],
    cons: ['Limited research tools', 'No commodity trading', 'Basic charting'],
    features: ['Smart invest', 'Goal planning', 'SIP Tracker'],
    referralUrl: 'https://groww.in/'
  },
  {
    name: 'AngelOne',
    rating: 4.2,
    accountOpeningFee: 0,
    maintenanceFee: 250,
    equityDelivery: '0%',
    equityIntraday: '0.05%',
    futuresTrading: '0.05%',
    optionsTrading: '20/lot',
    commodities: '0.05%',
    currencies: '0.05%',
    mutualFunds: 'Free',
    pros: ['Smart API access', 'Good research', 'Multiple trading platforms'],
    cons: ['Complex interface', 'App can be slow', 'Customer service'],
    features: ['Smart API', 'Angel BEE', 'ARQ Advisory'],
    referralUrl: 'https://www.angelone.in/'
  },
  {
    name: 'Dhan',
    rating: 4.1,
    accountOpeningFee: 0,
    maintenanceFee: 299,
    equityDelivery: '0%',
    equityIntraday: '0.049%',
    futuresTrading: '0.049%',
    optionsTrading: '49/lot',
    commodities: '0.049%',
    currencies: '0.049%',
    mutualFunds: 'Free',
    pros: ['Modern platform', 'Fast execution', 'Good mobile app', 'Competitive pricing'],
    cons: ['Relatively new', 'Limited educational content', 'Smaller community'],
    features: ['One-click trading', 'Advanced charts', 'Smart filters'],
    referralUrl: 'https://join.dhan.co/?invite=MFPBM02664'
  }
];

const featuresList = [
  'Web Trading Platform',
  'Mobile App',
  'F&O Trading',
  'Commodity Trading',
  'Research Reports',
  'API Trading',
  'Paper Trading',
  'Mutual Funds'
];

const brokerFeatures = {
  'Zerodha': {
    'Web Trading Platform': true,
    'Mobile App': true,
    'F&O Trading': true,
    'Commodity Trading': true,
    'Research Reports': true,
    'API Trading': true,
    'Paper Trading': false,
    'Mutual Funds': true
  },
  'Groww': {
    'Web Trading Platform': true,
    'Mobile App': true,
    'F&O Trading': true,
    'Commodity Trading': false,
    'Research Reports': true,
    'API Trading': false,
    'Paper Trading': true,
    'Mutual Funds': true
  },
  'AngelOne': {
    'Web Trading Platform': true,
    'Mobile App': true,
    'F&O Trading': true,
    'Commodity Trading': true,
    'Research Reports': true,
    'API Trading': true,
    'Paper Trading': true,
    'Mutual Funds': true
  },
  'Dhan': {
    'Web Trading Platform': true,
    'Mobile App': true,
    'F&O Trading': true,
    'Commodity Trading': true,
    'Research Reports': true,
    'API Trading': true,
    'Paper Trading': false,
    'Mutual Funds': true
  }
};

export default function BrokerComparison() {
  const [currentTab, setCurrentTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setCurrentTab(newValue);
  };

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
        Compare Stock Brokers
      </Typography>

      <StyledCard sx={{ mb: 4 }}>
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={currentTab} onChange={handleTabChange}>
            <Tab label="Brokerage Comparison" />
            <Tab label="Features Comparison" />
            <Tab label="Detailed Analysis" />
          </Tabs>
        </Box>

        {currentTab === 0 && (
          <TableContainer component={Paper} sx={{ background: 'transparent' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Broker</StyledTableCell>
                  <StyledTableCell align="right">Account Opening</StyledTableCell>
                  <StyledTableCell align="right">Maintenance</StyledTableCell>
                  <StyledTableCell align="right">Equity Delivery</StyledTableCell>
                  <StyledTableCell align="right">Intraday</StyledTableCell>
                  <StyledTableCell align="right">F&O</StyledTableCell>
                  <StyledTableCell></StyledTableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {brokers.map((broker) => (
                  <TableRow 
                    key={broker.name}
                    sx={broker.name === 'Dhan' ? {
                      '& td': {
                        background: 'rgba(255, 215, 0, 0.05)',
                      },
                      '& td:first-of-type': {
                        position: 'relative',
                        '&::before': {
                          content: '"Recommended"',
                          position: 'absolute',
                          top: '4px',
                          left: '8px',
                          background: 'linear-gradient(45deg, #FFD700 30%, #FFA500 90%)',
                          padding: '2px 8px',
                          borderRadius: '8px',
                          fontSize: '0.7rem',
                          fontWeight: 'bold',
                          color: '#000',
                        }
                      }
                    } : {}}
                  >
                    <StyledTableCell component="th" scope="row">
                      <Box sx={{ display: 'flex', alignItems: 'center' }}>
                        {broker.name}
                        <Rating value={broker.rating} precision={0.1} size="small" readOnly sx={{ ml: 1 }} />
                      </Box>
                    </StyledTableCell>
                    <StyledTableCell align="right">₹{broker.accountOpeningFee}</StyledTableCell>
                    <StyledTableCell align="right">₹{broker.maintenanceFee}/year</StyledTableCell>
                    <StyledTableCell align="right">{broker.equityDelivery}</StyledTableCell>
                    <StyledTableCell align="right">{broker.equityIntraday}</StyledTableCell>
                    <StyledTableCell align="right">{broker.optionsTrading}</StyledTableCell>
                    <StyledTableCell>
                      <BrokerButton
                        variant="contained"
                        href={broker.referralUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Open Account
                      </BrokerButton>
                    </StyledTableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {currentTab === 1 && (
          <TableContainer component={Paper} sx={{ background: 'transparent' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <StyledTableCell>Feature</StyledTableCell>
                  {brokers.map((broker) => (
                    <StyledTableCell key={broker.name} align="center">{broker.name}</StyledTableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {featuresList.map((feature) => (
                  <TableRow key={feature}>
                    <StyledTableCell>{feature}</StyledTableCell>
                    {brokers.map((broker) => (
                      <StyledTableCell key={broker.name} align="center">
                        {brokerFeatures[broker.name][feature] ? (
                          <CheckCircleIcon color="success" />
                        ) : (
                          <CancelIcon color="error" />
                        )}
                      </StyledTableCell>
                    ))}
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}

        {currentTab === 2 && (
          <Box sx={{ p: 3 }}>
            <Grid container spacing={4}>
              {brokers.map((broker) => (
                <Grid item xs={12} md={4} key={broker.name}>
                  <StyledCard recommended={broker.name === 'Dhan'}>
                    <CardContent>
                      <Typography variant="h6" gutterBottom>
                        {broker.name}
                      </Typography>
                      <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                        <Rating value={broker.rating} precision={0.1} readOnly />
                        <Typography variant="body2" sx={{ ml: 1 }}>
                          ({broker.rating})
                        </Typography>
                      </Box>

                      <Typography variant="subtitle1" gutterBottom>
                        Pros
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {broker.pros.map((pro, index) => (
                          <Chip
                            key={index}
                            label={pro}
                            sx={{ m: 0.5 }}
                            size="small"
                            color="primary"
                          />
                        ))}
                      </Box>

                      <Typography variant="subtitle1" gutterBottom>
                        Cons
                      </Typography>
                      <Box sx={{ mb: 2 }}>
                        {broker.cons.map((con, index) => (
                          <Chip
                            key={index}
                            label={con}
                            sx={{ m: 0.5 }}
                            size="small"
                            color="error"
                          />
                        ))}
                      </Box>

                      <BrokerButton
                        variant="contained"
                        fullWidth
                        href={broker.referralUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{ mt: 2 }}
                      >
                        Open Account
                      </BrokerButton>
                    </CardContent>
                  </StyledCard>
                </Grid>
              ))}
            </Grid>
          </Box>
        )}
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
          Note: The brokerage rates and features mentioned above are indicative and may vary.
          Please check the respective broker's website for the latest information.
          All brokers listed are registered with SEBI and are members of NSE/BSE.
        </Typography>
      </Box>
    </Container>
  );
}
