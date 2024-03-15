import { Pagination } from '../../../types/pagination'

export enum AssetClassification {
  'FIAT' = 'FIAT',
  'STABLE' = 'STABLE',
  'CRYPTO' = 'CRYPTO',
}

export enum AssetClassificationFilter {
  ALL = 'ALL',
  CRYPTO_STABLE_COIN = 'CRYPT_STABLE_COIN',
  FIAT = 'FIAT',
}

export interface Asset {
  id: string
  icon: string
  assetId: string
  active: boolean
  updatedAt: string
  code: string
  name: string
  createdAt: string
  minimumWithdrawal: number
  fee: number
  qr?: string
  paymentAddress: string
  networkName?: string
  network?: string
  assetClassification: AssetClassification
}

export interface EventCreatePaymentAddress extends CreatePaymentAddress {
  asset: Asset
}

export interface CreatePaymentAddress {
  assetCode?: string
  label: string
  asset?: Asset
}

export interface CreatePaymentAddressResponse {
  paymentAddress: string
  qr: string
}

export interface PaymentAddressResponse extends Pagination<PaymentAddress> {
  address: string
  assetId: string
  assetCode: string
  icon: string
  name: string
  label: string
  networkName: string
  network: string
  qr: string
}

export interface PaymentAddress {
  label: string
  accountId: string
  address: string
  assetsId: string
  qr: string
  networkName: string
}

export type BalanceWallet = {
  assetCode: string
  balance: number
  blockedBalance?: number
  icon?: string
  name: string
}
