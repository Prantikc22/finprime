import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  Slider,
  Stack,
} from '@mui/material';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';

const EMICalculator = () => {
  const [loanAmount, setLoanAmount] = useState(1000000);
  const [interestRate, setInterestRate] = useState(8.5);
  const [loanTerm, setLoanTerm] = useState(20);
  const [results, setResults] = useState(null);

  const calculateEMI = () => {
    const principal = loanAmount;
    const ratePerMonth = interestRate / 12 / 100;
    const numberOfPayments = loanTerm * 12;

    // Calculate EMI
    const emi = principal * ratePerMonth * Math.pow(1 + ratePerMonth, numberOfPayments) / (Math.pow(1 + ratePerMonth, numberOfPayments) - 1);

    // Calculate total payment and interest
    const totalPayment = emi * numberOfPayments;
    const totalInterest = totalPayment - principal;

    // Calculate amortization schedule
    let remainingBalance = principal;
    const yearlyData = [];
    let yearlyPrincipal = 0;
    let yearlyInterest = 0;

    for (let month = 1; month <= numberOfPayments; month++) {
      const interestPayment = remainingBalance * ratePerMonth;
      const principalPayment = emi - interestPayment;
      remainingBalance -= principalPayment;

      yearlyPrincipal += principalPayment;
      yearlyInterest += interestPayment;

      if (month % 12 === 0 || month === numberOfPayments) {
        yearlyData.push({
          year: Math.ceil(month / 12),
          principal: Math.round(yearlyPrincipal),
          interest: Math.round(yearlyInterest),
          balance: Math.round(remainingBalance > 0 ? remainingBalance : 0),
        });
        yearlyPrincipal = 0;
        yearlyInterest = 0;
      }
    }

    setResults({
      emi: Math.round(emi),
      totalPayment: Math.round(totalPayment),
      totalInterest: Math.round(totalInterest),
      yearlyData,
      pieData: [
        { name: 'Principal', value: principal },
        { name: 'Interest', value: totalInterest },
      ],
    });
  };

  useEffect(() => {
    calculateEMI();
  }, [loanAmount, interestRate, loanTerm]);

  const formatCurrency = (amount) => {
    return new Intl.NumberFormat('en-IN', {
      style: 'currency',
      currency: 'INR',
      maximumFractionDigits: 0,
    }).format(amount);
  };

  const COLORS = ['#0088FE', '#FF8042'];

  return (
    <Container maxWidth="lg" sx={{ mt: 4, mb: 4 }}>
      <Typography variant="h4" gutterBottom>
        EMI Calculator
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph>
        Calculate your monthly EMI and view the complete loan amortization schedule.
      </Typography>

      <Grid container spacing={3}>
        {/* Input Section */}
        <Grid item xs={12} md={6}>
          <Card>
            <CardContent>
              <Stack spacing={4}>
                <Box>
                  <Typography gutterBottom>Loan Amount</Typography>
                  <Slider
                    value={loanAmount}
                    onChange={(_, value) => setLoanAmount(value)}
                    min={100000}
                    max={10000000}
                    step={100000}
                    valueLabelDisplay="auto"
                    valueLabelFormat={(value) => formatCurrency(value)}
                  />
                  <TextField
                    value={loanAmount}
                    onChange={(e) => setLoanAmount(Number(e.target.value))}
                    type="number"
                    fullWidth
                    InputProps={{ startAdornment: '₹' }}
                  />
                </Box>

                <Box>
                  <Typography gutterBottom>Interest Rate (%)</Typography>
                  <Slider
                    value={interestRate}
                    onChange={(_, value) => setInterestRate(value)}
                    min={5}
                    max={20}
                    step={0.1}
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    value={interestRate}
                    onChange={(e) => setInterestRate(Number(e.target.value))}
                    type="number"
                    fullWidth
                  />
                </Box>

                <Box>
                  <Typography gutterBottom>Loan Term (Years)</Typography>
                  <Slider
                    value={loanTerm}
                    onChange={(_, value) => setLoanTerm(value)}
                    min={1}
                    max={30}
                    valueLabelDisplay="auto"
                  />
                  <TextField
                    value={loanTerm}
                    onChange={(e) => setLoanTerm(Number(e.target.value))}
                    type="number"
                    fullWidth
                  />
                </Box>
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Results Section */}
        {results && (
          <Grid item xs={12} md={6}>
            <Stack spacing={3}>
              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    EMI Breakdown
                  </Typography>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      <Typography variant="h4" color="primary" gutterBottom>
                        {formatCurrency(results.emi)}/month
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Payment
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(results.totalPayment)}
                      </Typography>
                    </Grid>
                    <Grid item xs={6}>
                      <Typography variant="subtitle2" color="text.secondary">
                        Total Interest
                      </Typography>
                      <Typography variant="body1">
                        {formatCurrency(results.totalInterest)}
                      </Typography>
                    </Grid>
                  </Grid>
                </CardContent>
              </Card>

              <Card>
                <CardContent>
                  <Typography variant="h6" gutterBottom>
                    Payment Distribution
                  </Typography>
                  <Box sx={{ width: '100%', height: 300 }}>
                    <ResponsiveContainer>
                      <PieChart>
                        <Pie
                          data={results.pieData}
                          cx="50%"
                          cy="50%"
                          labelLine={false}
                          label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                          outerRadius={80}
                          fill="#8884d8"
                          dataKey="value"
                        >
                          {results.pieData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                          ))}
                        </Pie>
                        <Tooltip formatter={(value) => formatCurrency(value)} />
                        <Legend />
                      </PieChart>
                    </ResponsiveContainer>
                  </Box>
                </CardContent>
              </Card>
            </Stack>
          </Grid>
        )}

        {/* Yearly Breakdown */}
        {results && (
          <Grid item xs={12}>
            <Card>
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  Year-wise Payment Schedule
                </Typography>
                <Box sx={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr>
                        <th style={{ padding: '8px', textAlign: 'left' }}>Year</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Principal Paid</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Interest Paid</th>
                        <th style={{ padding: '8px', textAlign: 'right' }}>Remaining Balance</th>
                      </tr>
                    </thead>
                    <tbody>
                      {results.yearlyData.map((year) => (
                        <tr key={year.year}>
                          <td style={{ padding: '8px' }}>{year.year}</td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency(year.principal)}</td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency(year.interest)}</td>
                          <td style={{ padding: '8px', textAlign: 'right' }}>{formatCurrency(year.balance)}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>
    </Container>
  );
};

export default EMICalculator;
