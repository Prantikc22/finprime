// Financial year in India: April 1 to March 31
const FINANCIAL_YEAR = {
  START_MONTH: 3,  // April (0-based)
  END_MONTH: 2    // March (0-based)
};

// Important tax dates
const TAX_DATES = [
  {
    date: '2024-07-31',
    title: 'Income Tax Return Filing (Non-Audit)',
    description: 'Last date for filing ITR for non-audit cases',
    category: 'TAX',
    priority: 'HIGH'
  },
  {
    date: '2024-03-15',
    title: 'Advance Tax (Last Quarter)',
    description: 'Due date for last installment of advance tax',
    category: 'TAX',
    priority: 'HIGH'
  }
];

// Investment-related dates
const INVESTMENT_DATES = [
  {
    date: '2024-03-31',
    title: '80C Investment Deadline',
    description: 'Last date for tax-saving investments under 80C',
    category: 'INVESTMENT',
    priority: 'HIGH'
  }
];

// Market events (IPOs, NFOs, etc.)
const MARKET_EVENTS = [
  // This will be updated dynamically from external APIs
];

// Get all financial events for a given month
export const getMonthlyEvents = (year, month) => {
  const allEvents = [...TAX_DATES, ...INVESTMENT_DATES, ...MARKET_EVENTS];
  
  return allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate.getFullYear() === year && eventDate.getMonth() === month;
  });
};

// Get upcoming events
export const getUpcomingEvents = (daysAhead = 30) => {
  const today = new Date();
  const futureDate = new Date(today.getTime() + (daysAhead * 24 * 60 * 60 * 1000));
  
  const allEvents = [...TAX_DATES, ...INVESTMENT_DATES, ...MARKET_EVENTS];
  
  return allEvents.filter(event => {
    const eventDate = new Date(event.date);
    return eventDate >= today && eventDate <= futureDate;
  }).sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Get tax filing deadlines based on user profile
export const getTaxFilingDeadlines = (isAuditCase = false) => {
  const currentYear = new Date().getFullYear();
  
  return {
    itrDeadline: isAuditCase ? `${currentYear}-10-31` : `${currentYear}-07-31`,
    advanceTaxDeadlines: [
      {
        installment: '1st',
        dueDate: `${currentYear}-06-15`,
        percentage: 15
      },
      {
        installment: '2nd',
        dueDate: `${currentYear}-09-15`,
        percentage: 45
      },
      {
        installment: '3rd',
        dueDate: `${currentYear}-12-15`,
        percentage: 75
      },
      {
        installment: '4th',
        dueDate: `${currentYear + 1}-03-15`,
        percentage: 100
      }
    ]
  };
};

// Get investment deadlines
export const getInvestmentDeadlines = () => {
  const currentYear = new Date().getFullYear();
  const nextYear = currentYear + 1;
  
  return {
    section80C: `${nextYear}-03-31`,
    nps: `${nextYear}-03-31`,
    elss: `${nextYear}-03-31`,
    ppf: `${nextYear}-03-31`,
    sukanya: `${nextYear}-03-31`
  };
};

// Add custom reminder
export const addCustomReminder = (date, title, description, category = 'CUSTOM', priority = 'MEDIUM') => {
  const reminder = {
    date,
    title,
    description,
    category,
    priority
  };
  
  // Store in local storage or backend
  const customReminders = JSON.parse(localStorage.getItem('customReminders') || '[]');
  customReminders.push(reminder);
  localStorage.setItem('customReminders', JSON.stringify(customReminders));
  
  return reminder;
};

// Get all reminders including custom ones
export const getAllReminders = () => {
  const customReminders = JSON.parse(localStorage.getItem('customReminders') || '[]');
  const allEvents = [...TAX_DATES, ...INVESTMENT_DATES, ...MARKET_EVENTS, ...customReminders];
  
  return allEvents.sort((a, b) => new Date(a.date) - new Date(b.date));
};

// Check if it's a financial year end
export const isFinancialYearEnd = (date = new Date()) => {
  return date.getMonth() === FINANCIAL_YEAR.END_MONTH && date.getDate() === 31;
};

// Get days remaining for financial year end
export const getDaysToFinancialYearEnd = (date = new Date()) => {
  const currentFYEnd = new Date(
    date.getMonth() <= FINANCIAL_YEAR.END_MONTH ? date.getFullYear() : date.getFullYear() + 1,
    FINANCIAL_YEAR.END_MONTH,
    31
  );
  
  return Math.ceil((currentFYEnd - date) / (1000 * 60 * 60 * 24));
};
