import React, { useState, useEffect } from 'react';
import {
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Box,
  LinearProgress,
  Chip,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
} from '@mui/material';
import { styled } from '@mui/material/styles';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import LocalAtmIcon from '@mui/icons-material/LocalAtm';
import { calculateFinancialHealthScore, checkAchievements, getWeeklyChallenges } from '../../services/rewardsService';
import { analyzeSpending } from '../../services/upiService';

const StyledCard = styled(Card)(({ theme }) => ({
  background: 'rgba(22, 23, 28, 0.8)',
  backdropFilter: 'blur(10px)',
  borderRadius: '16px',
  border: '1px solid rgba(255, 255, 255, 0.1)',
  height: '100%',
}));

const AchievementBadge = styled(Box)(({ theme, locked }) => ({
  padding: theme.spacing(2),
  background: locked ? 'rgba(255, 255, 255, 0.1)' : 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
  borderRadius: '16px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  textAlign: 'center',
  opacity: locked ? 0.5 : 1,
  transition: 'transform 0.3s ease-in-out',
  '&:hover': {
    transform: locked ? 'none' : 'translateY(-5px)',
  },
}));

export default function RewardsHub() {
  const [healthScore, setHealthScore] = useState(0);
  const [achievements, setAchievements] = useState([]);
  const [challenges, setChallenges] = useState([]);
  const [selectedAchievement, setSelectedAchievement] = useState(null);
  const [spendingAnalysis, setSpendingAnalysis] = useState(null);

  useEffect(() => {
    // Fetch user's UPI transactions and calculate metrics
    // This is a mock implementation
    const mockTransactions = [
      { amount: 500, date: new Date(), upiId: 'user@bank' },
      { amount: 1200, date: new Date(), upiId: 'merchant@bank' },
    ];

    setHealthScore(calculateFinancialHealthScore(mockTransactions, 50000));
    setAchievements(checkAchievements(mockTransactions, []));
    setChallenges(getWeeklyChallenges(mockTransactions));
    setSpendingAnalysis(analyzeSpending(mockTransactions));
  }, []);

  const handleAchievementClick = (achievement) => {
    setSelectedAchievement(achievement);
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
        Financial Rewards Hub
      </Typography>

      <Grid container spacing={4}>
        {/* Financial Health Score */}
        <Grid item xs={12} md={4}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Financial Health Score
              </Typography>
              <Box sx={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
                <Box
                  sx={{
                    position: 'relative',
                    display: 'inline-flex',
                    width: '120px',
                    height: '120px',
                  }}
                >
                  <CircularProgress
                    variant="determinate"
                    value={healthScore}
                    size={120}
                    thickness={4}
                    sx={{
                      color: '#6c63ff',
                    }}
                  />
                  <Box
                    sx={{
                      top: 0,
                      left: 0,
                      bottom: 0,
                      right: 0,
                      position: 'absolute',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                    }}
                  >
                    <Typography variant="h4" sx={{ color: '#6c63ff' }}>
                      {healthScore}
                    </Typography>
                  </Box>
                </Box>
                <Box sx={{ ml: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Great job! Your financial health is looking good.
                  </Typography>
                  <Button
                    variant="outlined"
                    size="small"
                    sx={{ mt: 2 }}
                    onClick={() => {/* Show detailed breakdown */}}
                  >
                    View Details
                  </Button>
                </Box>
              </Box>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Weekly Challenges */}
        <Grid item xs={12} md={8}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Active Challenges
              </Typography>
              <Grid container spacing={2}>
                {challenges.map((challenge) => (
                  <Grid item xs={12} sm={6} key={challenge.id}>
                    <Box
                      sx={{
                        p: 2,
                        background: 'rgba(108, 99, 255, 0.1)',
                        borderRadius: '12px',
                      }}
                    >
                      <Typography variant="subtitle1" gutterBottom>
                        {challenge.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary" gutterBottom>
                        {challenge.description}
                      </Typography>
                      <LinearProgress
                        variant="determinate"
                        value={challenge.progress}
                        sx={{ mt: 1, mb: 1 }}
                      />
                      <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                        <Typography variant="body2">
                          {challenge.progress}% Complete
                        </Typography>
                        <Chip
                          label={`${challenge.points} pts`}
                          size="small"
                          sx={{
                            background: 'linear-gradient(45deg, #6c63ff 30%, #5a52ff 90%)',
                          }}
                        />
                      </Box>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>

        {/* Achievements */}
        <Grid item xs={12}>
          <StyledCard>
            <CardContent>
              <Typography variant="h6" gutterBottom>
                Achievements
              </Typography>
              <Grid container spacing={2}>
                {achievements.map((achievement) => (
                  <Grid item xs={6} sm={4} md={3} key={achievement.id}>
                    <AchievementBadge
                      locked={!achievement.unlocked}
                      onClick={() => handleAchievementClick(achievement)}
                    >
                      <EmojiEventsIcon sx={{ fontSize: 40, mb: 1 }} />
                      <Typography variant="subtitle1" gutterBottom>
                        {achievement.title}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {achievement.description}
                      </Typography>
                      <Chip
                        label={`${achievement.points} pts`}
                        size="small"
                        sx={{ mt: 1 }}
                      />
                    </AchievementBadge>
                  </Grid>
                ))}
              </Grid>
            </CardContent>
          </StyledCard>
        </Grid>
      </Grid>

      {/* Achievement Dialog */}
      <Dialog
        open={Boolean(selectedAchievement)}
        onClose={() => setSelectedAchievement(null)}
        maxWidth="sm"
        fullWidth
      >
        {selectedAchievement && (
          <>
            <DialogTitle>{selectedAchievement.title}</DialogTitle>
            <DialogContent>
              <Typography gutterBottom>
                {selectedAchievement.description}
              </Typography>
              <Typography variant="body2" color="text.secondary">
                Earn {selectedAchievement.points} points by completing this achievement!
              </Typography>
            </DialogContent>
            <DialogActions>
              <Button onClick={() => setSelectedAchievement(null)}>Close</Button>
            </DialogActions>
          </>
        )}
      </Dialog>
    </Container>
  );
}
