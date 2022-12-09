import {Pagination} from '../../../shared/types/pagination'

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

export interface PaymentAddressResponse extends Pagination<PaymentAddress> {}

export interface PaymentAddress {
  label: string
  accountId: string
  address: string
  assetsId: string
  qr?: string
}

export type BalanceWallet = {
  assetCode: string
  balance: number
  blockedBalance?: number
  icon?: string
}
