import { defineStore } from 'pinia'
import { DataBeneficiary, NewBeneficiary } from '../views/withdraw/type/beneficiary.type'
import { NetworkBank, TypeBankDetails } from '../views/withdraw/enums/beneficiary.enum'

export const useBeneficiaryStore = defineStore('useBeneficiaryStore', {
  state: () => ({
    beneficiaries: {
      counterpartyId: '',
      profileType: 'INDIVIDUAL',
      relationshipConsumer: '',
      informationOwner: {
        name: '',
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: '',
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      },

      informationIntermediaryBank: {
        bankName: '',
        swiftCode: '',
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: '',
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      },

      informationBank: {
        accountNumber: '',
        bankName: '',
        swiftCode: '',
        typeBeneficiaryBankWithdrawal: TypeBankDetails.INTERNATIONAL || TypeBankDetails.NATIONAL,
        iban: '',
        networkBank: NetworkBank.SWIFT || NetworkBank.ACH || NetworkBank.WIRE,
        address: {
          streetOne: '',
          streetTwo: '',
          postalCode: '',
          city: '',
          region: '',
          country: '',
          number: '',
          apartmentNumber: '',
          isShipping: false,
        },
      },
    } as NewBeneficiary,
    clientId: '',
    name: '',
    addressWallet: '',
    isInternal: '',
  }),
  actions: {
    setBeneficiaries(beneficiaries: NewBeneficiary) {
      this.beneficiaries = beneficiaries
    },

    dataBeneficiary(): DataBeneficiary {
      return {
        name: this.name,
        addressWallet: this.addressWallet,
        isInternal: this.isInternal,
      }
    },
  },
})
