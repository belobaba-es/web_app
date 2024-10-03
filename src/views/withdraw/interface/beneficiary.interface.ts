import { Pagination } from '../../../types/pagination'
import { Beneficiary } from '../type/beneficiary.type'

export interface BeneficiaryAssetsResponse extends Pagination<Beneficiary> {}

export interface BeneficiariesInternalResponse extends Pagination<Beneficiary> {}

export interface BeneficiaryAsset {
  counterpartyId?: string
  clientId?: string
  isInternal: string
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
  informationOwner: {
    name: string
    country: string
  }
}
