import { defineStore } from 'pinia'
import {
  Account,
  Agreement,
  CreatedAt,
  Document,
  Member,
  Owner,
  Questionnaire,
  TypeAccount,
} from '../views/profile/types/account.interface'
import { ProfileService } from '../views/profile/services/profile'

interface AccountState {
  members: Member[] | null
  questionnaire: Questionnaire | null
  createdAt: CreatedAt | null
  natureAccount: TypeAccount
  accountId: string | null
  owner: Owner | null
  agreement: Agreement | null
  id: string | null
  status: string | null
  loading: boolean
  form: FormData
  documentType: string
  documentToEdit: Document | undefined
}

interface FormGeneralData {
  email: string | undefined
  name: string | undefined
  lastName: string | undefined
  middleName: string | undefined
  firstName: string | undefined
}

interface FormAddressData {
  streetOne: string | undefined
  streetTwo: string | undefined
  city: string | undefined
  country: string | undefined
  postalCode: string | undefined
  region: string | undefined
}

interface FormPhoneData {
  phoneNumber: string | undefined
  phoneCountry: string | undefined
}

export interface FormData {
  generalData: FormGeneralData
  address: FormAddressData
  phone: FormPhoneData
  documentId: string | null
  deviceId: string | null
  isAccountBusiness: boolean
}

export const useAccountStore = defineStore('account', {
  state: (): AccountState => ({
    members: [],
    questionnaire: null,
    createdAt: null,
    natureAccount: TypeAccount.NATURAL_PERSON,
    accountId: null,
    owner: null,
    agreement: null,
    id: '',
    status: '',
    loading: false,
    form: {
      generalData: {
        email: '',
        name: '',
        lastName: '',
        middleName: '',
        firstName: '',
      },
      address: {
        streetOne: '',
        streetTwo: '',
        city: '',
        country: '',
        postalCode: '',
        region: '',
      },
      phone: {
        phoneNumber: '',
        phoneCountry: '',
      },
      documentId: null,
      deviceId: null,
      isAccountBusiness: false,
    },
    documentType: 'government_id',
    documentToEdit: undefined,
  }),
  actions: {
    getAccountId() {
      console.log(this.id)
      return this.accountId ?? ''
    },
    setAccount(payload: Account) {
      this.members = payload.members || null
      this.owner = payload.owner || null
      this.accountId = payload.accountId || null
      this.status = payload.status || null
      this.questionnaire = payload.questionnaire || null
      this.id = payload.id || null
      this.createdAt = payload.createdAt || null
      this.agreement = payload.agreement || null
      this.natureAccount = payload.natureAccount
    },
    async getAccountByID(accountId: string | string[]) {
      this.loading = true
      await new ProfileService().getAccountByID(accountId).then(data => {
        this.setAccount(data)
        this.loading = false
      })
    },
    setFormInitialInfo() {
      this.form.generalData.email = this.owner?.email
      this.form.generalData.firstName = this.owner?.firstName
      this.form.generalData.middleName = this.owner?.middleName
      this.form.generalData.lastName = this.owner?.lastName
      this.form.generalData.name = this.owner?.name
      this.form.phone.phoneCountry = this.owner?.phoneCountry
      this.form.phone.phoneNumber = this.owner?.phoneNumber
      this.form.address.city = this.owner?.city
      this.form.address.streetOne = this.owner?.streetOne
      this.form.address.streetTwo = this.owner?.streetTwo
      this.form.address.country = this.owner?.country
      this.form.address.postalCode = this.owner?.postalCode
      this.form.address.region = this.owner?.region
    },
    setDocumentResponseId(documentResponseId: string) {
      this.form.documentId = documentResponseId
    },
    setDeviceResponseId(deviceResponseId: string) {
      this.form.deviceId = deviceResponseId
    },
    clearAccountFormData() {
      this.form.generalData.email = ''
      this.form.generalData.firstName = ''
      this.form.generalData.middleName = ''
      this.form.generalData.lastName = ''
      this.form.generalData.name = ''
      this.form.phone.phoneCountry = ''
      this.form.phone.phoneNumber = ''
      this.form.address.city = ''
      this.form.address.streetOne = ''
      this.form.address.streetTwo = ''
      this.form.address.country = ''
      this.form.address.postalCode = ''
      this.form.address.region = ''
    },
    setForm(payload: FormData) {
      this.form = payload
    },
    setIsAccountBusiness(payload: boolean) {
      this.form.isAccountBusiness = payload
    },
  },
})
