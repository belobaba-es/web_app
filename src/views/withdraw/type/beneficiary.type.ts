import { CounterpartyStatus, CounterpartyType, NetworkBank, TypeBankDetails } from '../enums/beneficiary.enum'

export type TableFilter = {
  page: number
  limit: number
}
export type DataBeneficiary = {
  name: string
  addressWallet: string
  isInternal: string
}
export type BankAddress = {
  city: string
  country: string
  postalCode: number
  region: string
  streetOne: string
  streetTwo: string
}

export type OwnerAddress = {
  city: string
  country: string
  postalCode: number
  region: string
  streetOne: string
  streetTwo: string
}

export type Beneficiary = {
  accountId: string
  assetCode: string
  assetIcon: string
  assetId: string
  clientId: string
  counterpartyId: string
  counterpartyType: CounterpartyType
  createdAt: string
  informationBank: {
    accountNumber: string
    address: BankAddress
    bankName: string
    networkBank: NetworkBank
  }
  informationOwner: {
    address: OwnerAddress
    name: string
    counterpartyId: string
    email: string
    country: string
  }
  informationWallet: {
    assetId: string
    address: string
    relationshipConsumer: string
    originWallet: string
    institutionName: string
    label?: string
    institutionAddress: {
      streetOne: string
      postalCode: string
      city: string
      region: string
      country: string
    }
  }
  status: CounterpartyStatus
  networkBank: NetworkBank[]
  isInternal: string
}
export type productType = {
  PACA: string
  PACC: string
  LOAN: string
  ICCP: string
}
export type BeneficiaryAchPanama = {
  accountDestinationNumber: string
  bankName: string
  counterpartyId: string
  holderEmail: string
  holderId: string
  holderName: string
  productType?: productType
  status?: CounterpartyStatus
  isInternal: string
}
export type NewBeneficiaryPanama = {
  achInstructions: RegisterCounterpartyAchPanama
  counterpartyId?: string
  isInternal: string
}

export type RegisterCounterpartyAchPanama = {
  accountDestinationNumber: string
  counterpartyId?: string
  bankName: string
  holderName: string
  productType: productType
  holderId?: string
  holderEmail?: string
}

export type NewBeneficiary = {
  counterpartyId?: string
  status?: CounterpartyStatus
  profileType: 'INDIVIDUAL' | 'CORPORATION'
  relationshipConsumer: string
  informationBank: BankingInternational | BankingDomestic
  informationOwner: {
    name: string
    address: Address
  }
  informationIntermediaryBank?: informationIntermediaryBank
}

export type informationIntermediaryBank = {
  swiftCode: string
  bankName: string
  address: Address
}

export type BankingDomestic = {
  typeBeneficiaryBankWithdrawal: TypeBankDetails
  bankName: string
  accountNumber: string
  networkBank: NetworkBank
  address: Address
  routingNumber: string
}

export type BankingInternational = {
  accountNumber: string
  bankName: string
  swiftCode: string
  iban: string
  address: Address
  networkBank: NetworkBank
  typeBeneficiaryBankWithdrawal: TypeBankDetails
}

export type Address = {
  streetOne: string
  streetTwo: string
  postalCode: string
  region: string
  city: string
  country: string
  number?: string
  apartmentNumber?: string
  isShipping?: boolean
}
export type DataAsset = {
  nameAsset: string
  iconAsset: string
  assetName: string
  networkAddress?: string
}
