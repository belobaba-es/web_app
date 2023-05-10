export interface LoginResponse {
  message: string
  data: LoginData
}

export interface LoginData {
  active: boolean
  accountId: string
  name: string
  email: string
  token: string
  country: string
  postalCode: string
  region: string
  middleName: string
  firstName: string
  contactId: string
  phoneCountry: string
  city: string
  taxId: string
  label: string
  streetOne: string
  phoneNumber: string
  phoneSMS: boolean
  contactType: string
  lastName: string
  dateBirth: string
  taxCountry: string
  streetTwo: string
  account: Account
  kyc: {
    cipChecks: string
    kycRequiredActions: { [key: string]: string }
  }
}

export interface Account {
  accountId: string
  swapEnable: boolean
  twoFactorActive: boolean
  status: string
  kycMembers: {
    contactId: string
    kyc: {
      cipChecks: string
      kycRequiredActions: { [key: string]: string }
    }[]
  }
  feeWire?: FeeWireContent
}

export type FeeWireContent = {
  domestic: {
    in: number
    out: number
  }
  international: {
    in: number
    out: number
  }
}
