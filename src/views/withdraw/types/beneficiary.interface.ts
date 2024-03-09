import { Pagination } from '../../../types/pagination'

export enum BeneficiaryType {
  INTERNATIONAL = 'INTERNATIONAL',
  DOMESTIC = 'DOMESTIC',
  ACH_PAD = 'ACH_PAD',
}

export enum CounterpartyType {
  CRYPTO = 'CRYPTO',
  FIAT = 'FIAT',
}

export enum CounterpartyStatus {
  REGISTERED = 'REGISTERED',
  PENDING = 'PENDING',
  ACTIVE = 'ACTIVE',
  REJECTED = 'REJECTED',
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
    address: BankAdress
    bankName: string
    networkBank: string
  }
  informationOwner: {
    address: OwnerAddress
    name: string
    countery: string
  }
  status: CounterpartyStatus
}

export type BeneficiaryAchPanama = {
  achInstructions: {
    accountDestinationNumber: string
    bankName: string
    holderEmail: string
    holderId: string
    holderName: string
    productType: productType
  }
  status: CounterpartyStatus
  isInternal: string
}

export enum CounterpartyType {
  CRYPTO_BTC = 'CRYPTO',
  FIAT_US = 'FIAT_US',
}

export interface BankAdress {
  city: string
  country: string
  postalCode: number
  region: string
  streetOne: string
  streetTwo: string
}

export interface OwnerAddress {
  city: string
  country: string
  postalCode: number
  region: string
  streetOne: string
  streetTwo: string
}

export interface BeneficiaryAssetsResponse extends Pagination<Beneficiary> {}

export interface BeneficiariesInternalResponse extends Pagination<Beneficiary> {}

export interface BeneficiaryAsset {
  informationWallet: {
    assetId: string
    address: string
    relationshipConsumer: string
    originWallet: string
    institutionName: string
    institutionAddress: {
      streetOne: string
      postalCode: string
      city: string
      region: string
      country: string
    }
  }
  informationOwner: {
    name: string
    country: string
  }
}

export type NewBeneficiaryPanama = {
  achInstructions: RegisterCounterpartyAchPanama
  counterpartyId?: string
  isInternal: string
}

export type RegisterCounterpartyAchPanama = {
  accountDestinationNumber: string
  bankName: string
  holderEmail: string
  holderId: string
  holderName: string
  productType: productType
}

export type productType = {
  PACA: string
  PACC: string
  LOAN: string
  ICCP: string
}

export type NewBeneficiary = {
  counterpartyId?: string
  profileType: 'INDIVIDUAL' | 'CORPORATION'
  informationOwner: {
    name: string
    address: {
      streetOne: string
      streetTwo: string
      postalCode: string
      region: string
      city: string
      country: string
    }
  }
  informationIntermediaryBank?: {
    bankName: string
    swiftCode: string
    address: {
      streetOne: string
      streetTwo: string
      postalCode: string
      region: string
      city: string
      country: string
    }
  }

  informationBank: {
    typeBeneficiaryBankWithdrawal: string
    accountNumber: string
    bankName: string
    swiftCode?: string
    routingNumber: string
    iban?: string
    address: {
      streetOne: string
      streetTwo: string
      postalCode: string
      region: string
      city: string
      country: string
    }
  }
}
