// API Configuration file
// Add any API configurations here as needed

// Example:
export const API_CONFIG = {
    baseUrl: process.env.REACT_APP_API_BASE_URL || 'http://localhost:3000',
    timeout: 5000,
    headers: {
        'Content-Type': 'application/json'
    }
};

// Common stock and index tokens mapping
export const TOKEN_MAPPING = {
    // Indices
    'NIFTY': '26000',
    'BANKNIFTY': '26009',
    'FINNIFTY': '26037',
    'MIDCPNIFTY': '26074',
    'SENSEX': '1',
    
    // Large Cap Stocks
    'RELIANCE': '2885',
    'TCS': '11536',
    'HDFCBANK': '341249',
    'INFY': '1594',
    'ICICIBANK': '4963',
    'ITC': '1660',
    'HDFC': '340193',
    'SBIN': '3045',
    'BHARTIARTL': '2714',
    'KOTAKBANK': '492',
    'HINDUNILVR': '1394',
    'ASIANPAINT': '236',
    'MARUTI': '10999',
    'AXISBANK': '5900',
    'LT': '11483',
    
    // Mid Cap Stocks
    'INDIGO': '11195',
    'PNB': '2730',
    'BANDHANBNK': '2263',
    'FEDERALBNK': '1023',
    'INDUSTOWER': '29135',
    
    // Tech Stocks
    'WIPRO': '3787',
    'TECHM': '13538',
    'LTIM': '17963',
    'HCLTECH': '7229',
    
    // Auto Stocks
    'TATAMOTORS': '3456',
    'M&M': '2031',
    'HEROMOTOCO': '1348',
    'BAJAJ-AUTO': '16669',
    'EICHERMOT': '910',
    
    // Metal Stocks
    'TATASTEEL': '3499',
    'HINDALCO': '1363',
    'JSWSTEEL': '11723',
    'VEDL': '3063',
    
    // Pharma Stocks
    'SUNPHARMA': '3351',
    'DRREDDY': '881',
    'CIPLA': '694',
    'DIVISLAB': '10940',
    
    // Energy Stocks
    'ONGC': '2475',
    'POWERGRID': '14977',
    'NTPC': '11630',
    'ADANIGREEN': '24794',
    
    // Financial Services
    'BAJFINANCE': '317',
    'HDFCLIFE': '119717',
    'SBILIFE': '21808',
    'ICICIPRULI': '18652',
    
    // FMCG
    'NESTLEIND': '17963',
    'BRITANNIA': '547',
    'DABUR': '772',
    'MARICO': '4067'
};

// Expiry date format mapping
export const EXPIRY_FORMAT = {
    weekly: "YYYY-MM-DD",
    monthly: "YYYY-MM-DD"
};
