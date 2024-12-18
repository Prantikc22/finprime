import React from 'react';
import { Routes, Route } from 'react-router-dom';
import PageTransitionWrapper from '../components/common/PageTransitionWrapper';
import Dashboard from '../components/dashboard/Dashboard';
import CalculatorHub from '../components/calculators/CalculatorHub';
import PremiumFeatures from '../components/premium/PremiumFeatures';
import UserProfile from '../components/profile/UserProfile';
import RiskAssessment from '../components/risk/RiskAssessment';
// Import other components...

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<PageTransitionWrapper><Dashboard /></PageTransitionWrapper>} />
      <Route path="/calculators" element={<PageTransitionWrapper><CalculatorHub /></PageTransitionWrapper>} />
      <Route path="/premium" element={<PageTransitionWrapper><PremiumFeatures /></PageTransitionWrapper>} />
      <Route path="/profile" element={<PageTransitionWrapper><UserProfile /></PageTransitionWrapper>} />
      <Route path="/risk-assessment" element={<PageTransitionWrapper><RiskAssessment /></PageTransitionWrapper>} />
      {/* Add other routes with PageTransitionWrapper */}
    </Routes>
  );
};

export default AppRoutes;
