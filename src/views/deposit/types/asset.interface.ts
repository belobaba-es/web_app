import { Pagination } from '../../../shared/types/pagination'

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
  qr?: string
  networkName?: string
}

export type BalanceWallet = {
  assetCode: string
  balance: number
  blockedBalance?: number
  icon?: string
  name: string
}
