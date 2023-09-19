import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { CryptoService } from '../shared/services/crypto'
import { Account, AccountStatus } from '../views/login/types/login.interface'

export interface User {
  active: boolean
  accountId: string
  name: string
  country: string
  email: string
  token: string
  taxId: string
  firstName: string
  label: string
  phoneCountry: string
  phoneSMS: boolean
  contactId: string
  contactType: string
  phoneNumber: string
  lastName: string
  postalCode: string
  middleName: string
  dateBirth: string
  streetTwo: string
  taxCountry: string
  streetOne: string
  city: string
  region: string
  account: Account
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

    return user.client.status === AccountStatus.APPROVED
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

    if (user.contactType === 'natural_person') {
      return `${user.firstName} ${user.middleName} ${user.lastName}`
    }

    return user.name
  }

  return { setUser, getUser, getUserName, isAccountActive, swapModuleIsActive, getWarningKYC, getUserFeeWire }
})
