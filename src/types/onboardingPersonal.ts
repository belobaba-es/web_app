export type OnboardingPersonal = {
  firstName: string
  middleName: string
  lastName: string
  email: string
  dateBirth: string
  dni: string
  taxId: string
  passport: string
  phoneCountry: string
  phoneNumber: string
  streetOne: string
  streetTwo: string
  postalCode: string
  city: string
  region: string
  country: string
  type: string
  referredByAccountId: string
  employmentStatus: string
  occupation: string
  primarySourceOfFunds: string
  usdValueOfFiat: string
  usdValueOfCrypto: string
  monthlyDeposits: string
  monthlyCryptoDeposits: string
  monthlyInvestmentDeposit: string
  monthlyCryptoInvestmentDeposit: string
  monthlyWithdrawals: string
  monthlyCryptoWithdrawals: string
  monthlyInvestmentWithdrawal: string
  monthlyCryptoInvestmentWithdrawal: string
  fundsSendReceiveJurisdictions: string[]
  engageInActivities: string[]
  addressShipping?: AddressShipping
  documentExpirationDate?: string
  nationality?: string
}

export type AddressShipping = {
  streetOne: string
  streetTwo: string
  postalCode: string
  city: string
  region: string
  country: string
  number: string
  apartmentNumber: string
  isShipping?: boolean
}
