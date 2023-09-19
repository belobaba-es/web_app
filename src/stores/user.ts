import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { CryptoService } from '../shared/services/crypto'
import { Account } from '../views/login/types/login.interface'

export interface Domestic {
  in: number
  out: number
}

export interface International {
  in: number
  out: number
}

export interface FeeSwap {
  swapBuy: number
  swapSell: number
}

export interface FeeWire {
  domestic: Domestic
  international: International
}

export interface User {
  clientId: string
  accountId: string
  city: string
  country: string
  dateBirth: string
  dni: string
  email: string
  feeSwap: FeeSwap
  feeWire: FeeWire
  passport: string
  phoneCountry: string
  phoneNumber: string
  postalCode: string
  referredByAccountId: string
  region: string
  status: string
  streetOne: string
  streetTwo: string
  taxId: string
  type: string
  name: string
  kyc: {
    cipChecks: string
    kycRequiredActions: { [key: string]: string }
  }
}

export const useUserStore = defineStore('user', () => {
  const setUser = (payload: User) => {
    const cryptoService = new CryptoService()
    sessionStorage.setItem('user', cryptoService.encrypt(JSON.stringify({ ...payload })))
  }

  const isAccountActive = (): boolean => {
    const storageUser = sessionStorage.getItem('user')

    if (!storageUser) return true

    const user = JSON.parse(new CryptoService().decrypt(storageUser))

    return user.client.status === 'opened'
  }

  const swapModuleIsActive = (): boolean => {
    const storageUser = sessionStorage.getItem('user')

    if (!storageUser) return false

    const user = JSON.parse(new CryptoService().decrypt(storageUser))

    return user.account.swapEnable ?? false
  }

  const getWarningKYC = (
    contactId?: string
  ): {
    cipChecks: string
    kycRequiredActions: { [key: string]: string }
  } | null => {
    const storageUser = sessionStorage.getItem('user')
    if (!storageUser) return null

    if (!contactId) {
      return JSON.parse(new CryptoService().decrypt(storageUser)).kyc
    }

    return JSON.parse(new CryptoService().decrypt(storageUser)).account.kycMembers[contactId]
  }

  const getUser = computed(() => {
    const cryptoService = new CryptoService()
    const storageUser = sessionStorage.getItem('user')

    if (!storageUser) return

    return JSON.parse(cryptoService.decrypt(storageUser))
  })

  const getUserFeeWire = () => {
    const storageUser = sessionStorage.getItem('user')

    if (!storageUser) return

    return JSON.parse(new CryptoService().decrypt(storageUser)).account.feeWire
  }

  const getUserName = (): string => {
    const storageUser = sessionStorage.getItem('user')
    const cryptoService = new CryptoService()

    if (!storageUser) return ''
    const user: User = JSON.parse(cryptoService.decrypt(storageUser))

    return `${user.name}`
  }

  return { setUser, getUser, getUserName, isAccountActive, swapModuleIsActive, getWarningKYC, getUserFeeWire }
})
