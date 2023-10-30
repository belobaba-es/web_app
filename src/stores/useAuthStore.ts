import { defineStore } from 'pinia'
import { FeeWire, UserAuth } from '../views/login/types/login.interface'
import { AccountStatus } from '../types/accountStatus.enum'
import { CryptoService } from '../shared/services/crypto'

export const useAuthStore = defineStore('useAuthStore', {
  state: (): UserAuth => {
    const storageUser = sessionStorage.getItem('user')
    if (storageUser) {
      return JSON.parse(new CryptoService().decrypt(storageUser)) as UserAuth
    }

    return {
      email: '',
      active: false,
      token: '',
      clientId: '',
      userId: '',
      client: {
        name: '',
        dateBirth: new Date(),

        postalCode: '',
        region: '',
        city: '',
        country: '',
        phoneNumber: '',
        phoneCountry: '',
        streetOne: '',

        dni: '',
        twoFactorActive: false,
        status: AccountStatus.REGISTERED,
        type: '',
        feeSwap: {
          swapBuy: 0,
          swapSell: 0,
        },
        feeWire: {
          domestic: {
            in: 0,
            out: 0,
          },
          international: {
            in: 0,
            out: 0,
          },
        },
      },
    }
  },
  actions: {
    setInitialUserAuth(userAuth: UserAuth) {
      this.email = userAuth.email
      this.active = userAuth.active
      this.token = userAuth.token
      this.clientId = userAuth.clientId
      this.userId = userAuth.userId
      this.client = userAuth.client

      const cryptoService = new CryptoService()
      sessionStorage.setItem('user', cryptoService.encrypt(JSON.stringify({ ...userAuth })))
    },
    getTwoFactorActive(): boolean {
      return this.client.twoFactorActive
    },
    getDateBirth(): Date {
      return this.client.dateBirth
    },
    getClientDni(): string {
      return this.client.dni
    },
    getAccountStatus(): AccountStatus {
      return this.client.status
    },
    getAccountType(): string {
      return this.client.type
    },
    getToken(): string {
      return this.token
    },
    getUserName(): string {
      return this.client.name
    },
    getUserFeeWire(): FeeWire {
      return this.client.feeWire
    },
    isUserActive(): boolean {
      return this.active
    },
    getClientId(): string {
      return this.clientId
    },
    getUserDni(): string {
      return this.client.dni
    },
    getUserAddress(): string {
      return `${this.client.streetOne || ''} ${this.client.region || ''} ${this.client.city || ''} ${
        this.client.country || ''
      } ${this.client.postalCode || ''}`
    },
    getCountry(): string {
      return this.client.country
    },
    getUserPhone(): string {
      return this.client.phoneNumber
    },
    getUserEmail(): string {
      return this.email
    },
    twoFactorActive() {
      const storageUser = sessionStorage.getItem('user')
      if (storageUser) {
        const user = JSON.parse(new CryptoService().decrypt(storageUser)) as UserAuth
        user.client.twoFactorActive = true

        sessionStorage.setItem('user', new CryptoService().encrypt(JSON.stringify({ ...user })))
      }
    },
    isTwoFactorActive(): boolean {
      return this.client.twoFactorActive
    },
    getUserId(): string {
      return this.userId
    },
    markDataSubmitted() {
      const storageUser = sessionStorage.getItem('user')
      if (storageUser) {
        const user = JSON.parse(new CryptoService().decrypt(storageUser)) as UserAuth
        user.client.status = AccountStatus.SUBMITTED

        sessionStorage.setItem('user', new CryptoService().encrypt(JSON.stringify({ ...user })))
      }
    },
  },
})
