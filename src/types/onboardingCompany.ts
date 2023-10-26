export type Partner = {
  firstName: string
  middleName: string
  lastName: string
  otherLastName: string
  email: string
  dateBirth: Date
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
  naics: string
  naicsDescription: string
  establishedDate: Date
  webSite: string
  phoneCountry: string
  phoneNumber: string
  registeredAddress: Address
  physicalAddress: Address
}

export type AccountQuestionnaire = {
  purposeAccount: string
  sourceAssetsAndIncome: string
  intendedUseAccount: string
  anticipatedTypesAssets: string
  anticipatedMonthlyCashVolume: string
  anticipatedTradingPatterns: string
  anticipatedMonthlyTransactionsIncoming: string
  anticipatedMonthlyTransactionsOutgoing: string
  natureBusinessCompany: string
}

export type OnboardingCompany = {
  email: string
  informationCompany: informationCompany
  partners: Partner[]
  accountQuestionnaire: AccountQuestionnaire
}
