export enum DocumentSide {
  BACK = 'BACK',
  FRONT = 'FRONT',
}

export enum DocumentType {
  PASSPORT = 'passport',
  DRIVERS_LICENSE = 'drivers_license',
  GOVERNMENT_ID = 'government_id',
  RESIDENCE_PERMIT = 'residence_permit',
  UTILITY_BILL = 'utility_bill',
  STATEMENT = 'statements',
  OTHER = 'other',
  MONTHLY_UTILITY = 'monthly_utility',
  RENTAL_LEASE_AGREEMENT = 'rental_lease_agreement',
  VEHICLE_REGISTRATION = 'vehicle_registration',
  REAL_ESTATE_PROPERTY_TITLE = 'real_estate_property_title',
  PROPERTY_TAX_BILL = 'property_tax_bill',
  ACCOUNT_AGREEMENT = 'account_agreement',
  BENEFICIAL_OWNERSHIP_CERTIFICATE = 'beneficial_ownership_certificate',
  INCORPORATION_DOCUMENT = 'incorporation_document',
  W2 = 'w2',
}

export type Documents = {
  documentId: string
  documentSide: DocumentSide
  documentType: DocumentType
  patch: string
}
export type Partner = {
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
  documents: Documents[]
  streetOne: string
  streetTwo: string
  postalCode: string
  city: string
  region: string
  country: string
}

export type Address = {
  streetOne: string
  streetTwo: string
  postalCode: string
  city: string
  region: string
  country: string
}

export type informationCompany = {
  name: string
  registerNumber: string
  companyType: string
  naics: string
  naicsDescription: string
  establishedDate: string
  webSite: string
  phoneCountry: string
  phoneNumber: string
  registeredAddress: Address
  physicalAddress: Address
}

export type InvestmentProfile = {
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
}

export type KycProfile = {
  businessJurisdictions: string[]
  fundsSendReceiveJurisdictions: string[]
  engageInActivities: string[]
  regulatedStatus: string
}

export type OnboardingCompany = {
  email: string
  informationCompany: informationCompany
  partners: Partner[]
  investmentProfile: InvestmentProfile
  kycProfile: KycProfile
}
