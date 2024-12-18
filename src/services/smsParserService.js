// SMS Parser for different banks and UPI apps
const SMS_PATTERNS = {
  // UPI Transaction Patterns
  UPI: {
    GOOGLE_PAY: /(?:paid|received|sent)\s+(?:Rs\.|INR|₹)\s*([0-9,]+(?:\.[0-9]{2})?)\s+(?:to|from)\s+([A-Za-z0-9@\s]+)\s+on\s+Google\s+Pay/i,
    PHONEPE: /(?:paid|received|sent)\s+(?:Rs\.|INR|₹)\s*([0-9,]+(?:\.[0-9]{2})?)\s+(?:to|from)\s+([A-Za-z0-9@\s]+)\s+on\s+PhonePe/i,
    PAYTM: /(?:paid|received|sent)\s+(?:Rs\.|INR|₹)\s*([0-9,]+(?:\.[0-9]{2})?)\s+(?:to|from)\s+([A-Za-z0-9@\s]+)\s+via\s+paytm/i,
  },
  
  // Bank Transaction Patterns
  BANK: {
    HDFC: /(?:Rs|INR|₹)\s*([0-9,]+(?:\.[0-9]{2})?)\s+(?:debited|credited|spent)\s+(?:from|to|at)\s+(?:Ac\s+(?:[0-9X]+)\s+)?(?:on|at)\s+([A-Za-z0-9\s]+)/i,
    ICICI: /(?:Rs|INR|₹)\s*([0-9,]+(?:\.[0-9]{2})?)\s+(?:debited|credited|spent)\s+(?:from|to|at)\s+(?:Ac\s+(?:[0-9X]+)\s+)?(?:on|at)\s+([A-Za-z0-9\s]+)/i,
    SBI: /(?:Rs|INR|₹)\s*([0-9,]+(?:\.[0-9]{2})?)\s+(?:debited|credited|spent)\s+(?:from|to|at)\s+(?:Ac\s+(?:[0-9X]+)\s+)?(?:on|at)\s+([A-Za-z0-9\s]+)/i,
  }
};

export const parseSMS = (message, sender) => {
  try {
    // Identify bank/UPI app from sender
    const provider = identifyProvider(sender);
    if (!provider) return null;

    // Get relevant pattern
    const pattern = getPattern(provider);
    if (!pattern) return null;

    // Extract transaction details
    const match = message.match(pattern);
    if (!match) return null;

    return {
      amount: parseAmount(match[1]),
      entity: match[2].trim(),
      type: determineTransactionType(message),
      timestamp: extractTimestamp(message),
      provider: provider,
      category: categorizeTransaction(match[2].trim()),
    };
  } catch (error) {
    console.error('Error parsing SMS:', error);
    return null;
  }
};

// Helper functions
const identifyProvider = (sender) => {
  sender = sender.toLowerCase();
  if (sender.includes('gpay')) return 'GOOGLE_PAY';
  if (sender.includes('phonepe')) return 'PHONEPE';
  if (sender.includes('paytm')) return 'PAYTM';
  if (sender.includes('hdfc')) return 'HDFC';
  if (sender.includes('icici')) return 'ICICI';
  if (sender.includes('sbi')) return 'SBI';
  return null;
};

const getPattern = (provider) => {
  if (SMS_PATTERNS.UPI[provider]) return SMS_PATTERNS.UPI[provider];
  if (SMS_PATTERNS.BANK[provider]) return SMS_PATTERNS.BANK[provider];
  return null;
};

const parseAmount = (amountStr) => {
  return parseFloat(amountStr.replace(/,/g, ''));
};

const determineTransactionType = (message) => {
  message = message.toLowerCase();
  if (message.includes('debited') || message.includes('paid') || message.includes('spent')) return 'DEBIT';
  if (message.includes('credited') || message.includes('received')) return 'CREDIT';
  return 'UNKNOWN';
};

const extractTimestamp = (message) => {
  // Try to find date and time in the message
  const datePattern = /(\d{1,2}(?:\/|-)\d{1,2}(?:\/|-)\d{2,4})|(\d{1,2}(?::|\.)\d{2}(?::|\.)\d{2})/g;
  const matches = message.match(datePattern);
  if (matches) {
    return new Date(matches[0]);
  }
  return new Date(); // Fallback to current time if no date found
};

const categorizeTransaction = (entity) => {
  entity = entity.toLowerCase();
  
  // Common categories based on keywords
  const categories = {
    FOOD: ['swiggy', 'zomato', 'food', 'restaurant', 'cafe'],
    TRANSPORT: ['uber', 'ola', 'metro', 'petrol', 'fuel'],
    SHOPPING: ['amazon', 'flipkart', 'myntra', 'mall'],
    BILLS: ['electricity', 'water', 'gas', 'broadband', 'mobile'],
    ENTERTAINMENT: ['netflix', 'amazon prime', 'spotify', 'movie'],
    HEALTH: ['hospital', 'pharmacy', 'medical', 'doctor'],
    EDUCATION: ['school', 'college', 'course', 'training'],
  };

  for (const [category, keywords] of Object.entries(categories)) {
    if (keywords.some(keyword => entity.includes(keyword))) {
      return category;
    }
  }

  return 'OTHERS';
};
