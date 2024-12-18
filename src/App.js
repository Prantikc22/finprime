import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import Navbar from './components/layout/Navbar';
import Login from './components/auth/Login';
import Register from './components/auth/Register';
import Dashboard from './components/dashboard/Dashboard';
import CalculatorHub from './components/calculators/CalculatorHub';
import FDCalculator from './components/calculators/FDCalculator';
import NPSCalculator from './components/calculators/NPSCalculator';
import RDCalculator from './components/calculators/RDCalculator';
import HRACalculator from './components/calculators/HRACalculator';
import SIPCalculator from './components/calculators/SIPCalculator';
import FIRECalculator from './components/calculators/FIRECalculator';
import NSCCalculator from './components/calculators/NSCCalculator';
import SSYCalculator from './components/calculators/SSYCalculator';
import GoalSIPCalculator from './components/calculators/GoalSIPCalculator';
import PremiumFeatures from './components/premium/PremiumFeatures';
import BrokerComparison from './components/brokers/BrokerComparison';
import InsuranceAnalysis from './components/insurance/InsuranceAnalysis';
import CreditCardComparison from './components/creditcards/CreditCardComparison';
import LoanDashboard from './components/loans/LoanDashboard';
import LoanApplicationForm from './components/loans/LoanApplicationForm';
import AdminLoanApplications from './components/admin/LoanApplications';
import TaxDashboard from './components/tax/TaxDashboard';
import FinancialJourney from './components/journey/FinancialJourney';
import RiskAssessment from './components/risk/RiskAssessment';
import UserProfile from './components/profile/UserProfile';
import LandingPage from './components/landing/LandingPage';
import EMICalculator from './components/calculators/EMICalculator';
import RentVsBuyCalculator from './components/calculators/RentVsBuyCalculator';
import HomeAffordabilityCalculator from './components/calculators/HomeAffordabilityCalculator';
import LifeInsuranceCalculator from './components/calculators/LifeInsuranceCalculator';
import PPFCalculator from './components/calculators/PPFCalculator';
import EPFCalculator from './components/calculators/EPFCalculator';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#6c63ff',
    },
    secondary: {
      main: '#ff6584',
    },
    background: {
      default: '#0a0b0e',
      paper: 'rgba(22, 28, 36, 0.8)',
    },
    text: {
      primary: '#fff',
      secondary: 'rgba(255, 255, 255, 0.7)',
    }
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 700,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {
      fontWeight: 600,
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 600,
    },
    h6: {
      fontWeight: 600,
    },
  },
  components: {
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'rgba(22, 28, 36, 0.8)',
          backdropFilter: 'blur(8px)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: 'rgba(22, 28, 36, 0.8)',
          backdropFilter: 'blur(8px)',
        },
      },
    },
  },
});

const PrivateRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return currentUser ? children : <Navigate to="/login" />;
};

const PublicRoute = ({ children }) => {
  const { currentUser } = useAuth();
  return !currentUser ? children : <Navigate to="/dashboard" />;
};

const AdminRoute = ({ children }) => {
  const { currentUser, isAdmin } = useAuth();
  if (!currentUser) return <Navigate to="/login" />;
  if (!isAdmin) return <Navigate to="/dashboard" />;
  return children;
};

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Routes>
            {/* Public Routes - No Navbar */}
            <Route path="/" element={<LandingPage />} />
            
            {/* All other routes - With Navbar */}
            <Route path="/*" element={
              <>
                <Navbar />
                <Routes>
                  <Route path="/premium" element={<PremiumFeatures />} />
                  
                  {/* Auth Routes */}
                  <Route
                    path="/login"
                    element={
                      <PublicRoute>
                        <Login />
                      </PublicRoute>
                    }
                  />
                  <Route
                    path="/register"
                    element={
                      <PublicRoute>
                        <Register />
                      </PublicRoute>
                    }
                  />

                  {/* Protected Routes */}
                  <Route
                    path="/dashboard/*"
                    element={
                      <PrivateRoute>
                        <Routes>
                          <Route index element={<Dashboard />} />
                          <Route path="calculators" element={<CalculatorHub />} />
                          <Route path="calculators/ppf" element={<PPFCalculator />} />
                          <Route path="calculators/epf" element={<EPFCalculator />} />
                          <Route path="calculators/fd" element={<FDCalculator />} />
                          <Route path="calculators/nps" element={<NPSCalculator />} />
                          <Route path="calculators/rd" element={<RDCalculator />} />
                          <Route path="calculators/hra" element={<HRACalculator />} />
                          <Route path="calculators/sip" element={<SIPCalculator />} />
                          <Route path="calculators/fire" element={<FIRECalculator />} />
                          <Route path="calculators/nsc" element={<NSCCalculator />} />
                          <Route path="calculators/ssy" element={<SSYCalculator />} />
                          <Route path="calculators/goal-sip" element={<GoalSIPCalculator />} />
                          <Route path="calculators/emi" element={<EMICalculator />} />
                          <Route path="calculators/rent-vs-buy" element={<RentVsBuyCalculator />} />
                          <Route path="calculators/home-affordability" element={<HomeAffordabilityCalculator />} />
                          <Route path="calculators/life-insurance" element={<LifeInsuranceCalculator />} />
                          <Route path="brokers" element={<BrokerComparison />} />
                          <Route path="insurance" element={<InsuranceAnalysis />} />
                          <Route path="credit-cards" element={<CreditCardComparison />} />
                          <Route path="loans" element={<LoanDashboard />} />
                          <Route path="loans/apply" element={<LoanApplicationForm />} />
                          {/* Admin Only Route */}
                          <Route
                            path="admin/loans"
                            element={
                              <AdminRoute>
                                <AdminLoanApplications />
                              </AdminRoute>
                            }
                          />
                          <Route path="tax" element={<TaxDashboard />} />
                          <Route path="journey" element={<FinancialJourney />} />
                          <Route path="risk-assessment" element={<RiskAssessment />} />
                          <Route path="profile" element={<UserProfile />} />
                        </Routes>
                      </PrivateRoute>
                    }
                  />
                </Routes>
              </>
            } />
          </Routes>
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;
