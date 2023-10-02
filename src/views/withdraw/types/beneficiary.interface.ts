import { Pagination } from '../../../shared/types/pagination'

export enum BeneficiaryType {
  INTERNATIONAL = 'INTERNATIONAL',
  DOMESTIC = 'DOMESTIC',
}

export interface Beneficiary {
  name: string
  email: string
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

export type BeneficiaryInternal = {
  clientId: string
  counterpartyId: string
  counterpartyType: CounterpartyType
  informationOwner : {
    name: string
    countery: string
  }
}

export interface Beneficiary {
  id: string
  assetId: string
  assetTransferMethod: string
  label: string
  walletAddress: string
  accountId: string
}

export interface BeneficiaryAssetsResponse extends Pagination<Beneficiary> {}

export interface BeneficiariesInternalResponse extends Pagination<BeneficiaryInternal> {}

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
    assetId: string;
    address: string;
    relationshipConsumer: string;
    originWallet: string;
    institutionName: string;
    institutionAddress: {
      streetOne: string;
      postalCode: string;
      city: string;
      region: string;
      country: string;
    };
  };
  informationOwner: {
    name: string;
    country: string;
  };
}
