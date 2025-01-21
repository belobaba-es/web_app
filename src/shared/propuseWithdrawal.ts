export const WithdrawalPurpose = (isAccountSegregated: boolean) => {
  if (isAccountSegregated) {
    return [
      { value: 'INVESTMENT', name: 'INVESTMENT' },
      { value: 'REAL_ESTATE', name: 'REAL_ESTATE' },
      { value: 'TRADE_TRANSACTIONS', name: 'TRADE_TRANSACTIONS' },
      { value: 'UTILITY', name: 'UTILITY' },
      { value: 'TAX', name: 'TAX' },
      { value: 'LOAN', name: 'LOAN' },
      { value: 'TELECOM', name: 'TELECOM' },
      { value: 'INTELLECTUAL_PROPERTY', name: 'INTELLECTUAL_PROPERTY' }

    ]
  }

  return [
    { value: 'PERSONAL_ACCOUNT', name: 'PERSONAL_ACCOUNT' },
    { value: 'FAMILY', name: 'FAMILY' },
    { value: 'INVESTMENT', name: 'INVESTMENT' },
    { value: 'REAL_ESTATE', name: 'REAL_ESTATE' },
    { value: 'TUITION', name: 'TUITION' },
    { value: 'MEDICAL', name: 'MEDICAL' },
    { value: 'TRAVEL', name: 'TRAVEL' },
    { value: 'TRADE_TRANSACTIONS', name: 'TRADE_TRANSACTIONS' },
    { value: 'UTILITY', name: 'UTILITY' },
    { value: 'TAX', name: 'TAX' },
    { value: 'LOAN', name: 'LOAN' },
    { value: 'BILLS', name: 'BILLS' },
    { value: 'PAYROLL', name: 'PAYROLL' },
    { value: 'TELECOM', name: 'TELECOM' },
    { value: 'INTELLECTUAL_PROPERTY', name: 'INTELLECTUAL_PROPERTY' },
    { value: 'OTHER_BUSINESS_SERVICES', name: 'OTHER_BUSINESS_SERVICES' },
    { value: 'CHARITABLE_DONATIONS', name: 'CHARITABLE_DONATIONS' },
    { value: 'MORTGAGE', name: 'MORTGAGE' },
    { value: 'EXPENSES_REIMBURSEMENT', name: 'EXPENSES_REIMBURSEMENT' },
    { value: 'PROFESSIONAL_SERVICES', name: 'PROFESSIONAL_SERVICES' },
    { value: 'MARKETING', name: 'MARKETING' },
    { value: 'RENTAL_PROPERTY', name: 'RENTAL_PROPERTY' }
  ]
}
