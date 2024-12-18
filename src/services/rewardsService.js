import { getUPITransactions } from './upiService';

// Reward tiers based on transaction amounts
const REWARD_TIERS = {
  TIER1: { max: 1000, points: 50 },    // Smaller transactions get more points
  TIER2: { max: 2000, points: 40 },
  TIER3: { max: 5000, points: 30 },
  TIER4: { max: 10000, points: 20 },
  TIER5: { max: Infinity, points: 10 }
};

// Achievement badges
const ACHIEVEMENTS = {
  SAVINGS_MASTER: {
    id: 'savings_master',
    title: 'Savings Master',
    description: 'Keep 80% of transactions under ₹1000 for a month',
    points: 500
  },
  STREAK_KEEPER: {
    id: 'streak_keeper',
    title: 'Streak Keeper',
    description: 'Maintain savings streak for 7 days',
    points: 200
  },
  BUDGET_GURU: {
    id: 'budget_guru',
    title: 'Budget Guru',
    description: 'Stay within budget for all categories this month',
    points: 300
  }
};

// Weekly challenges
const WEEKLY_CHALLENGES = [
  {
    id: 'small_spender',
    title: 'Small Spender',
    description: 'Make 5 transactions under ₹500',
    points: 100,
    requirement: { count: 5, maxAmount: 500 }
  },
  {
    id: 'consistent_saver',
    title: 'Consistent Saver',
    description: 'Keep daily spending under ₹1000 for 5 days',
    points: 150,
    requirement: { days: 5, maxDaily: 1000 }
  }
];

// Calculate points for a transaction
export const calculateTransactionPoints = (amount) => {
  for (const tier of Object.values(REWARD_TIERS)) {
    if (amount <= tier.max) {
      return tier.points;
    }
  }
  return 0;
};

// Calculate financial health score (0-100)
export const calculateFinancialHealthScore = (transactions, monthlyBudget) => {
  const metrics = {
    smallTransactionsRatio: 0,    // % of transactions under ₹1000
    budgetAdherence: 0,           // How well staying within budget
    savingsStreak: 0,             // Consecutive days of controlled spending
    consistencyScore: 0           // Regular small transactions vs sporadic large ones
  };

  // Calculate small transactions ratio
  const smallTransactions = transactions.filter(t => t.amount <= 1000);
  metrics.smallTransactionsRatio = (smallTransactions.length / transactions.length) * 30;

  // Calculate budget adherence
  const totalSpent = transactions.reduce((sum, t) => sum + t.amount, 0);
  metrics.budgetAdherence = Math.min(((monthlyBudget - totalSpent) / monthlyBudget) * 30, 30);

  // Calculate savings streak
  let currentStreak = 0;
  let maxStreak = 0;
  // Group transactions by date and check daily totals
  // ... (streak calculation logic)
  metrics.savingsStreak = (maxStreak / 30) * 20;

  // Calculate consistency score
  const variance = calculateSpendingVariance(transactions);
  metrics.consistencyScore = Math.max(20 - (variance / 1000), 0);

  return Object.values(metrics).reduce((sum, score) => sum + score, 0);
};

// Check and award achievements
export const checkAchievements = (transactions, currentAchievements) => {
  const newAchievements = [];

  // Check Savings Master
  const monthlySmallTransactions = transactions.filter(t => t.amount <= 1000);
  if (monthlySmallTransactions.length / transactions.length >= 0.8) {
    newAchievements.push(ACHIEVEMENTS.SAVINGS_MASTER);
  }

  // Check Streak Keeper
  // ... (streak checking logic)

  // Check Budget Guru
  // ... (budget checking logic)

  return newAchievements;
};

// Get active weekly challenges
export const getWeeklyChallenges = (transactions) => {
  return WEEKLY_CHALLENGES.map(challenge => ({
    ...challenge,
    progress: calculateChallengeProgress(challenge, transactions),
    completed: isChallengeCompleted(challenge, transactions)
  }));
};

// Helper function to calculate spending variance
const calculateSpendingVariance = (transactions) => {
  if (transactions.length === 0) return 0;
  const amounts = transactions.map(t => t.amount);
  const mean = amounts.reduce((sum, amount) => sum + amount, 0) / amounts.length;
  const variance = amounts.reduce((sum, amount) => sum + Math.pow(amount - mean, 2), 0) / amounts.length;
  return Math.sqrt(variance);
};
