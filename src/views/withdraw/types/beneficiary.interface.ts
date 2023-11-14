import { Pagination } from '../../../types/pagination'

export enum BeneficiaryType {
  INTERNATIONAL = 'INTERNATIONAL',
  DOMESTIC = 'DOMESTIC',
}

export interface BeneficiaryAssets {
  id: string
  assetId: string
  assetTransferMethod: string
  label: string
  walletAddress: string
  accountId: string
}

export enum CounterpartyType {
  CRYPTO = 'CRYPTO',
  FIAT = 'FIAT',
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

interface IntermediaryBank {
  bankCity: string
  intermediaryBankCountry: string
  intermediaryBankCity: string
  bankPostalCode: string
  intermediaryBankPostalCode: string

  intermediaryBankState: string

  intermediaryBankName: string
  intermediaryBankStreetTwo: string
  intermediaryBankAccountNumber: string
  intermediaryBankStreetOne: string
  bankCountry: string
  intermediaryNumber: string
  bankState: string
  bankStreetTwo: string
  bankStreetOne: string
  intermediaryNumberType: string
}

export interface BeneficiaryFiat {
  id?: string
  city: string
  state: string
  country: string
  realName: string
  streetTwo: string
  streetOne: string
  postalCode: string
  accountId?: string
  accountNumber: string
  routingNumber?: string
  swiftCode?: string
  bankName: string
  typeBeneficiaryBankWithdrawal: string
}

export interface BeneficiaryFiatInternacional extends BeneficiaryFiat {
  intermediaryBank: IntermediaryBank
  iban: string
  typeBeneficiaryBankWithdrawal: string
}

export interface BeneficiaryFiatDomestic extends BeneficiaryFiat {
  fundsTransferMethods?: string
}

export interface BeneficiaryFiatInternacionalResp extends Pagination<BeneficiaryFiatInternacional> {}

export interface BeneficiaryFiatDomesticResp extends Pagination<BeneficiaryFiatDomestic> {}

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

export type NewBeneficiary = {
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
  informationIntermediaryBank: {
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
    swiftCode: string
    routingNumber: string
    iban: string
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
