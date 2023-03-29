import { defineStore } from 'pinia'
import { computed, ref } from 'vue'
import { CryptoService } from '../shared/services/crypto'
import { Account } from '../views/login/types/login.interface'

interface User {
  active: boolean
  accountId: string
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

    return user.account.status === 'opened'
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

  return { setUser, getUser, isAccountActive, swapModuleIsActive, getWarningKYC }
})
