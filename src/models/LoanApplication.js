export const LoanStatus = {
  DRAFT: 'draft',
  SUBMITTED: 'submitted',
  UNDER_REVIEW: 'under_review',
  DOCUMENTS_PENDING: 'documents_pending',
  PROCESSING: 'processing',
  APPROVED: 'approved',
  REJECTED: 'rejected'
};

export const BusinessLoanTypes = {
  WORKING_CAPITAL: {
    id: 'working_capital',
    name: 'Working Capital',
    description: 'Short-term financing to manage day-to-day operations',
    minAmount: 1000000,
    maxAmount: 100000000
  },
  PURCHASE_FINANCE: {
    id: 'purchase_finance',
    name: 'Purchase Finance',
    description: 'Finance for purchasing inventory or raw materials',
    minAmount: 500000,
    maxAmount: 50000000
  },
  WORK_ORDER: {
    id: 'work_order',
    name: 'Work Order Finance',
    description: 'Finance against confirmed work orders',
    minAmount: 1000000,
    maxAmount: 100000000
  },
  INVOICE_DISCOUNTING: {
    id: 'invoice_discounting',
    name: 'Invoice Discounting',
    description: 'Quick finance against unpaid invoices',
    minAmount: 500000,
    maxAmount: 50000000
  },
  VENDOR_FINANCE: {
    id: 'vendor_finance',
    name: 'Vendor Finance',
    description: 'Supply chain financing for vendors',
    minAmount: 1000000,
    maxAmount: 100000000
  },
  WORKING_CAPITAL_TERM: {
    id: 'working_capital_term',
    name: 'Working Capital Term Loan',
    description: 'Long-term working capital solution',
    minAmount: 2000000,
    maxAmount: 200000000
  },
  BUSINESS_LOAN: {
    id: 'business_loan',
    name: 'Business Loan',
    description: 'General purpose business financing',
    minAmount: 1000000,
    maxAmount: 100000000
  },
  MACHINERY_FINANCE: {
    id: 'machinery_finance',
    name: 'Machinery Finance',
    description: 'Finance for purchasing machinery and equipment',
    minAmount: 2000000,
    maxAmount: 200000000
  },
  LOAN_AGAINST_PROPERTY: {
    id: 'loan_against_property',
    name: 'Loan Against Property',
    description: 'Secured loan against commercial property',
    minAmount: 5000000,
    maxAmount: 500000000
  }
};

export const RequiredDocuments = {
  BUSINESS_PROOF: {
    id: 'business_proof',
    name: 'Business Registration Proof',
    description: 'Certificate of Incorporation/Partnership Deed/Shop Act License',
    required: true,
    formats: ['.pdf', '.jpg', '.png'],
    maxSize: 5 // MB
  },
  GST: {
    id: 'gst',
    name: 'GST Registration',
    description: 'GST Registration Certificate',
    required: true,
    formats: ['.pdf'],
    maxSize: 2
  },
  BANK_STATEMENTS: {
    id: 'bank_statements',
    name: 'Bank Statements',
    description: 'Last 12 months bank statements',
    required: true,
    formats: ['.pdf', '.xlsx'],
    maxSize: 10
  },
  FINANCIAL_STATEMENTS: {
    id: 'financial_statements',
    name: 'Financial Statements',
    description: 'Last 2 years audited financial statements',
    required: true,
    formats: ['.pdf', '.xlsx'],
    maxSize: 10
  },
  ITR: {
    id: 'itr',
    name: 'Income Tax Returns',
    description: 'Last 2 years ITR with computation',
    required: true,
    formats: ['.pdf'],
    maxSize: 5
  },
  KYC_DOCUMENTS: {
    id: 'kyc_documents',
    name: 'KYC Documents',
    description: 'PAN Card, Aadhaar Card of Directors/Partners/Proprietor',
    required: true,
    formats: ['.pdf', '.jpg', '.png'],
    maxSize: 5
  },
  OWNERSHIP_PROOF: {
    id: 'ownership_proof',
    name: 'Property Documents',
    description: 'For Loan Against Property - Property ownership documents',
    required: false,
    formats: ['.pdf'],
    maxSize: 10
  },
  EXISTING_LOANS: {
    id: 'existing_loans',
    name: 'Existing Loan Documents',
    description: 'Sanction letters and statements of existing loans if any',
    required: false,
    formats: ['.pdf'],
    maxSize: 5
  }
};

export const BusinessType = {
  PRIVATE_LIMITED: 'Private Limited Company',
  PUBLIC_LIMITED: 'Public Limited Company',
  LLP: 'Limited Liability Partnership',
  PARTNERSHIP: 'Partnership Firm',
  PROPRIETORSHIP: 'Proprietorship',
  OPC: 'One Person Company'
};
