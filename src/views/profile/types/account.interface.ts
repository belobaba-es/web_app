export enum ResidencyStatus {
  US_CITIZEN = 'US_CITIZEN',
  RESIDENT_ALIEN = 'RESIDENT_ALIEN',
  NON_RESIDENT_ALIEN = 'NON_RESIDENT_ALIEN',
}

export type Address = {
  streetOne: string
  streetTwo: string
  postalCode: string
  city: string
  region: string
  country: string
}

export type ContactInformation = {
  phoneCountry: string
  phoneNumber: string
  email: string
}

type individualType = {
  firstName: string
  dni: string
  middleName?: string
  lastName: string
  taxId?: string
  passport?: string
  dateBirth?: Date
  kyc?: {
    cipChecks: string

    kycRequiredActions: { [key: string]: string }
  }
  residencyStatus: ResidencyStatus
  documents: {
    patch: string
    documentType: DocumentType
  }[]
}

export type IndividualDTO = individualType & Address & ContactInformation

export interface Account {
  natureAccount: TypeAccount
  accountId: string
  members?: Member[]
  owner: Owner
  createdAt: CreatedAt
  agreement: Agreement
  questionnaire?: Questionnaire
  id: string
  status: string
}

export enum TypeAccount {
  NATURAL_PERSON = 'NATURAL_PERSON',
  COMPANY = 'COMPANY',
}

export interface Agreement {
  content: string
  id: string
}

export interface CreatedAt {
  _seconds: number
  _nanoseconds: number
}

export interface Member {
  phoneSMS: boolean
  streetTwo: string
  city: string
  dateBirth: string
  postalCode: string
  lastName: string
  label: string
  region: string
  contactId: string
  webhook: string
  contactType: string
  taxId: string
  documents: Document[]
  phoneNumber: string
  taxCountry: string
  country: string
  middleName: string
  firstName: string
  streetOne: string
  email: string
  phoneCountry: string
}

export interface Document {
  documentId: string
  documentCountry: string
  taxId: string
  documentType: string
  label: string
  description: string
  isBusinessMember: string
  documentSide?: string
  file: string
}

export interface Owner {
  contactType: string
  taxCountry: string
  contactId: string
  taxId: string
  name?: string
  phoneCountry: string
  city: string
  region: string
  phoneNumber: string
  regionFormation: string
  email: string
  webhook: string
  phoneSMS: boolean
  documents: Document[]
  streetTwo: string
  postalCode: string
  streetOne: string
  country: string
  firstName?: string
  lastName?: string
  middleName?: string
  dateBirth: string
}

export interface Questionnaire {
  anticipatedMonthlyTransactionsOutgoing: string
  anticipatedTradingPatterns: string
  intendedUseAccount: string
  associationsWithOtherAccounts: string
  purposeAccount: string
  anticipatedTypesAssets: string
  anticipatedMonthlyTransactionsIncoming: string
  sourceAssetsAndIncome: string
  natureBusinessCompany: string
  anticipatedMonthlyCashVolume: string
}
