import { AccountStatus } from '../../../types/accountStatus.enum'

interface FeeSwap {
  swapBuy: number
  swapSell: number
}

export interface FeeACH {
  in: number
  out: number
}

export interface FeeWire {
  domestic: {
    in: number
    out: number
  }
  international: {
    in: number
    out: number
  }
}

export enum WalletProvider {
  PINTTOSOFT = 'PINTTOSOFT',
  LAYER2 = 'LAYER2',
}

interface Client {
  dateBirth: Date
  dni: string
  feeSwap: FeeSwap
  feeWire: FeeWire
  feeACHPAB: FeeACH
  status: AccountStatus
  twoFactorActive: boolean
  phoneNumber: string
  phoneCountry: string
  type: string
  name: string
  postalCode: string
  region: string
  city: string
  country: string
  streetOne: string
  isSegregated: boolean
  walletProvider: WalletProvider
}

export interface UserAuth {
  email: string
  token: string
  clientId: string
  active: boolean
  userId: string
  client: Client
}
