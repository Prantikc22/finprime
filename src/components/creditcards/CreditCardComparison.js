import React, { useState } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Typography,
  Button,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { styled } from '@mui/material/styles';
import { creditCards, banks, incomeRanges } from '../../data/creditCards';

// Styled components
const StyledCard = styled(Card)(({ theme }) => ({
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
  transition: 'transform 0.2s ease-in-out',
  '&:hover': {
    transform: 'translateY(-5px)',
    boxShadow: theme.shadows[4],
  },
}));

const CardActions = styled(Box)(({ theme }) => ({
  padding: theme.spacing(2),
  marginTop: 'auto',
  display: 'flex',
  gap: theme.spacing(1),
  borderTop: `1px solid ${theme.palette.divider}`,
}));

const ApplyButton = styled(Button)(({ theme }) => ({
  background: 'linear-gradient(45deg, #FFD700, #FFA500)',
  color: 'black',
  fontWeight: 600,
  '&:hover': {
    background: 'linear-gradient(45deg, #FFA500, #FFD700)',
  },
}));

const FeatureChip = styled(Chip)(({ theme }) => ({
  margin: theme.spacing(0.5),
}));

const CreditCardComparison = () => {
  const [filterBank, setFilterBank] = useState('');
  const [filterIncome, setFilterIncome] = useState('');
  const [filterAnnualFee, setFilterAnnualFee] = useState('');
  const [filterCardType, setFilterCardType] = useState('');
  const [detailsDialogOpen, setDetailsDialogOpen] = useState(false);
  const [selectedCard, setSelectedCard] = useState(null);

  const annualFeeRanges = [
    { value: '0', label: 'Lifetime Free' },
    { value: '500', label: 'Up to ₹500' },
    { value: '1000', label: 'Up to ₹1,000' },
    { value: '2000', label: 'Up to ₹2,000' },
    { value: '5000', label: 'Up to ₹5,000' },
    { value: '999999', label: 'All' }
  ];

  const cardTypes = [
    { value: 'rewards', label: 'Rewards' },
    { value: 'cashback', label: 'Cashback' },
    { value: 'travel', label: 'Travel' },
    { value: 'fuel', label: 'Fuel' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'lifestyle', label: 'Lifestyle' }
  ];

  const handleOpenDetails = (card) => {
    setSelectedCard(card);
    setDetailsDialogOpen(true);
  };

  const filteredCards = creditCards.filter((card) => {
    if (filterBank && card.bankName !== filterBank) return false;
    if (filterIncome) {
      const minIncome = parseInt(card.minIncome.replace(/[^0-9]/g, ''));
      if (minIncome > filterIncome) return false;
    }
    if (filterAnnualFee && filterAnnualFee !== '999999') {
      const annualFee = card.annualFee.toLowerCase().includes('free') ? 0 : 
        parseInt(card.annualFee.replace(/[^0-9]/g, ''));
      if (annualFee > parseInt(filterAnnualFee)) return false;
    }
    if (filterCardType) {
      const cardFeatures = card.features.map(f => f.toLowerCase()).join(' ');
      const cardName = card.cardName.toLowerCase();
      if (!cardFeatures.includes(filterCardType) && !cardName.includes(filterCardType)) return false;
    }
    return true;
  });

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Box sx={{ mb: 4 }}>
        <Typography variant="h4" gutterBottom>
          Credit Cards
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Bank</InputLabel>
              <Select
                value={filterBank}
                onChange={(e) => setFilterBank(e.target.value)}
                label="Filter by Bank"
              >
                <MenuItem value="">All Banks</MenuItem>
                {banks.map((bank) => (
                  <MenuItem key={bank} value={bank}>
                    {bank}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Filter by Income</InputLabel>
              <Select
                value={filterIncome}
                onChange={(e) => setFilterIncome(e.target.value)}
                label="Filter by Income"
              >
                <MenuItem value="">All Income Ranges</MenuItem>
                {incomeRanges.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Annual Fee Range</InputLabel>
              <Select
                value={filterAnnualFee}
                onChange={(e) => setFilterAnnualFee(e.target.value)}
                label="Annual Fee Range"
              >
                <MenuItem value="">All Fees</MenuItem>
                {annualFeeRanges.map((range) => (
                  <MenuItem key={range.value} value={range.value}>
                    {range.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <FormControl fullWidth>
              <InputLabel>Card Type</InputLabel>
              <Select
                value={filterCardType}
                onChange={(e) => setFilterCardType(e.target.value)}
                label="Card Type"
              >
                <MenuItem value="">All Types</MenuItem>
                {cardTypes.map((type) => (
                  <MenuItem key={type.value} value={type.value}>
                    {type.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>

      <Grid container spacing={3}>
        {filteredCards.map((card) => (
          <Grid item xs={12} sm={6} md={4} key={card.id}>
            <StyledCard>
              <CardMedia
                component="img"
                height="200"
                image={card.image}
                alt={card.cardName}
                sx={{ objectFit: 'contain', p: 2, bgcolor: 'background.paper' }}
              />
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {card.cardName}
                </Typography>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  {card.bankName}
                </Typography>
                <Box sx={{ mt: 2 }}>
                  <Typography variant="body2">
                    <strong>Annual Fee:</strong> {card.annualFee}
                  </Typography>
                  <Typography variant="body2">
                    <strong>Rewards:</strong> {card.rewards}
                  </Typography>
                </Box>
                <Box sx={{ mt: 2, display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                  {card.features.slice(0, 3).map((feature, index) => (
                    <Chip key={index} label={feature} size="small" variant="outlined" />
                  ))}
                </Box>
              </CardContent>
              <CardActions>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleOpenDetails(card)}
                  sx={{ flex: 1 }}
                >
                  Details
                </Button>
                <ApplyButton
                  variant="contained"
                  size="small"
                  href={card.applicationUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{ flex: 1 }}
                >
                  Apply
                </ApplyButton>
              </CardActions>
            </StyledCard>
          </Grid>
        ))}
      </Grid>

      <Dialog
        open={detailsDialogOpen}
        onClose={() => setDetailsDialogOpen(false)}
        maxWidth="md"
        fullWidth
      >
        {selectedCard && (
          <>
            <DialogTitle>
              {selectedCard.cardName}
              <IconButton
                onClick={() => setDetailsDialogOpen(false)}
                sx={{ position: 'absolute', right: 8, top: 8 }}
              >
                <CloseIcon />
              </IconButton>
            </DialogTitle>
            <DialogContent>
              <Grid container spacing={3}>
                <Grid item xs={12} sm={6}>
                  <CardMedia
                    component="img"
                    height="250"
                    image={selectedCard.image}
                    alt={selectedCard.cardName}
                    sx={{ objectFit: 'contain', bgcolor: 'background.paper' }}
                  />
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Typography variant="h6" gutterBottom>
                    Card Details
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Bank:</strong> {selectedCard.bankName}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Annual Fee:</strong> {selectedCard.annualFee}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Joining Fee:</strong> {selectedCard.joiningFee}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Rewards:</strong> {selectedCard.rewards}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Welcome Bonus:</strong> {selectedCard.welcomeBonus}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Interest Rate:</strong> {selectedCard.interestRate}
                  </Typography>
                  <Typography variant="body2" paragraph>
                    <strong>Minimum Income:</strong> {selectedCard.minIncome}
                  </Typography>
                </Grid>
                <Grid item xs={12}>
                  <Typography variant="h6" gutterBottom>
                    Features
                  </Typography>
                  <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                    {selectedCard.features.map((feature, index) => (
                      <FeatureChip key={index} label={feature} />
                    ))}
                  </Box>
                </Grid>
              </Grid>
            </DialogContent>
            <DialogActions>
              <ApplyButton
                variant="contained"
                href={selectedCard.applicationUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                Apply Now
              </ApplyButton>
              <Button onClick={() => setDetailsDialogOpen(false)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
};

export default CreditCardComparison;
