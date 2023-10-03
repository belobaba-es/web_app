import { useRoute, useRouter } from 'vue-router'
import { FormData, useAccountStore } from '../stores/account'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ProfileService } from '../views/profile/services/profile'
import { useUserStore } from '../stores/user'
import { Document, Member, Owner, TypeAccount } from '../views/profile/types/account.interface'
import { useToast } from 'primevue/usetoast'
import showMessage from '../shared/showMessageArray'

export const useAccount = () => {
  const router = useRouter()
  const route = useRoute()
  const accountStore = useAccountStore()
  const userStore = useUserStore()
  const account = storeToRefs(accountStore)
  const { t } = useI18n({ useScope: 'global' })
  const toast = useToast()
  const submitting = ref(false)

  const currentPassword = ref<string>('')
  const newPassword = ref<string>('')
  const confirmNewPassword = ref<string>('')
  const { getUser } = useUserStore()

  // const phoneNumberWithCountry = computed(() => {
  //   // return `${account.owner.value?.phoneCountry} ${account.owner.value?.phoneNumber}`
  //   if (isShowView.value && route.params.contactId) {
  //     const member = accountStore.members?.find(member => member.contactId === route.params.contactId)
  //     return `${member?.phoneCountry} ${member?.phoneNumber}`
  //   } else {
  //     return `${account.owner.value?.phoneCountry} ${account.owner.value?.phoneNumber}`
  //   }
  // })
  const phoneNumberWithCountry = getUser.client.phoneNumber

  // const address = computed(() => {
  //   if (isShowView.value && route.params.contactId) {
  //     const member = accountStore.members?.find(member => member.contactId === route.params.contactId)
  //     return member?.streetOne
  //   } else {
  //     return account.owner.value?.streetOne
  //   }
  // })
  const address = getUser.client.streetOne

  // const isNaturalAccount = computed<boolean>(() => account.natureAccount.value === 'natural_person')
  const isNaturalAccount = getUser.client.type === TypeAccount.COMPANY

  // const fullName = computed(() => {
  //   const naturalAccount = `${account.owner.value?.firstName} ${account.owner.value?.middleName} ${account.owner.value?.lastName}`
  //   const companyAccount = account.owner.value?.name
  //   const member = accountStore.members?.find(member => member.contactId === route.params.contactId)
  //   const memberFullName = `${member?.firstName} ${member?.middleName} ${member?.lastName}`
  //   // return isNaturalAccount.value ? naturalAccount : companyAccount
  //   if (isShowView.value && route.params.contactId) {
  //     return memberFullName
  //   }
  //
  //   if (isNaturalAccount) {
  //     return naturalAccount
  //   }
  //
  //   return companyAccount
  // })
  const fullName = getUser.client.name

  const dateBirth = computed(() => {
    if (isShowView.value && route.params.contactId) {
      return accountStore.members?.find(member => member.contactId === route.params.contactId)?.dateBirth
    } else {
      return account.owner.value?.dateBirth
    }
  })

  // const taxId = computed(() => {
  //   if (isShowView.value && route.params.contactId) {
  //     return accountStore.members?.find(member => member.contactId === route.params.contactId)?.taxId
  //   } else {
  //     return account.owner.value?.taxId
  //   }
  // })
  const taxId = getUser.client.taxId.length > 0 ? getUser.client.taxId.length : getUser.client.dni

  // const email = computed(() => {
  //   if (isShowView.value && route.params.contactId) {
  //     const member = accountStore.members?.find(member => member.contactId === route.params.contactId)
  //     return member?.email
  //   } else {
  //     return account.owner.value?.email
  //   }
  // })
  const email = getUser.client.email

  const labelNameProfile = computed(() => {
    // return isNaturalAccount.value ? t('fullName') : t('businessNameLabel')
    if ((isShowView.value && route.params.contactId) || isNaturalAccount) {
      return t('fullName')
    } else {
      return t('businessNameLabel')
    }
  })

  const formTitle = computed(() => {
    // return isNaturalAccount.value ? t('partnerTitle') : t('companyData');
    if (isCreateView.value) {
      return t('partnerTitle')
    }

    if (isNaturalAccount) {
      return t('naturalAccountTittle')
    }

    return t('companyData')
  })

  const isCreateView = computed(() => {
    if (route.fullPath.split('/').includes('partners') && route.fullPath.split('/').includes('create')) {
      return true
    }
    return false
  })

  const isEditView = computed(() => {
    if (
      route.fullPath.split('/').includes('partners') &&
      route.fullPath.split('/').includes('edit') &&
      !isEditPartnerAccount.value
    ) {
      return true
    }
    return false
  })

  const isEditPartnerAccount = computed(() => {
    if (
      route.fullPath.split('/').includes('partners') &&
      route.fullPath.split('/').includes('edit') &&
      route.params.contactId
    ) {
      return true
    }
    return false
  })

  const getPartnerToEdit = computed(() => {
    const member = accountStore.members?.find(member => member.contactId === route.params.contactId)
    return member
  })

  const isUpdateProfileView = computed(() => {
    if (route.fullPath.split('/').includes('edit') && !isEditPartnerAccount.value) {
      return true
    }
    return false
  })

  const isShowView = computed(() => {
    if (route.fullPath.split('/').includes('partners') && route.fullPath.split('/').includes('show')) {
      return true
    }
    return false
  })

  const isAccountBusinessComputed = computed(() => {
    return !isNaturalAccount
  })

  const submitProfileForm = () => {
    submitting.value = true
    const profileService = ProfileService.instance()

    let contactId = null
    let isNaturalAccountLet = null

    if (getPartnerToEdit.value) {
      contactId = route.params.contactId
      isNaturalAccountLet = true
    } else {
      contactId = account.owner.value?.contactId
      isNaturalAccountLet = false
    }

    if (isUpdateProfileView.value && isNaturalAccount) {
      isNaturalAccountLet = true
    }

    if (isNaturalAccount) {
      isNaturalAccountLet = true
    }

    profileService
      .updateContact(account.accountId.value!, contactId!, isNaturalAccountLet!, accountStore.form)
      .then(() => {
        submitting.value = false
        toast.add({
          severity: 'info',
          summary: t('successfulOperation'),
          detail: t('shareholderDataSuccessSend'),
          life: 6000,
        })
      })
      .catch(error => {
        submitting.value = false

        if (error.response.data.message) {
          toast.add({
            severity: 'error',
            summary: t('somethingWentWrong'),
            detail: error.response.data.message,
            life: 4000,
          })
          return
        }

        showMessage(toast, error.response.data)
      })
  }

  const getFullName = (payload: Owner | Member) => {
    return `${payload.firstName} ${payload.middleName} ${payload.lastName}`
  }

  const setDocumentResponseId = (documentResponseId: string | null) => {
    if (!documentResponseId) return
    accountStore.setDocumentResponseId(documentResponseId)
  }

  const setDeviceResponseId = (deviceResponseId: string | null) => {
    if (!deviceResponseId) return
    accountStore.setDeviceResponseId(deviceResponseId)
  }

  const editProfile = (): void => {
    if (isShowView.value && route.params.contactId) {
      const member = accountStore.members?.find(member => member.contactId === route.params.contactId)
      router.push(`/profile/${route.params.accountId}/partners/edit/${member?.contactId}`)
    } else {
      router.push(`/profile/${route.params.accountId}/edit`)
    }
  }

  const fetchAccount = async () => {
    await accountStore.getAccountByID(route.params.accountId).then(() => {
      if ((isEditView.value || isUpdateProfileView.value) && !isEditPartnerAccount.value) {
        setFormInitialInfo()
      }
    })
  }

  const submitUpdatePassword = async () => {
    submitting.value = true
    const profileService = ProfileService.instance()
    profileService
      .updatePassword(userStore.getUser.email, newPassword.value, currentPassword.value)
      .then(() => {
        submitting.value = false
        clearUpdatePasswordForm()
        toast.add({
          severity: 'info',
          summary: t('successfulOperation'),
          detail: t('updatePasswordSuccessMessage'),
          life: 6000,
        })
      })
      .catch(error => {
        submitting.value = false
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: error.response.data.message,
          life: 4000,
        })
      })
  }

  const clearUpdatePasswordForm = () => {
    newPassword.value = ''
    confirmNewPassword.value = ''
    currentPassword.value = ''
  }

  const getMembers = () => {
    return accountStore.members
  }

  const findMember = (taxId: string) => {
    return accountStore.members?.find(member => member.taxId === taxId)
  }

  const clearAccountFormData = () => accountStore.clearAccountFormData()
  const setFormInitialInfo = () => accountStore.setFormInitialInfo()
  const setAccountForm = (payload: FormData) => accountStore.setForm(payload)
  const setIsAccountBusiness = (payload: boolean) => accountStore.setIsAccountBusiness(payload)

  return {
    fetchAccount,
    editProfile,
    submitProfileForm,
    getFullName,
    setDocumentResponseId,
    setDeviceResponseId,
    submitUpdatePassword,
    clearAccountFormData,
    setFormInitialInfo,
    setAccountForm,
    ...account,
    fullName,
    phoneNumberWithCountry,
    formTitle,
    isNaturalAccount,
    submitting,
    labelNameProfile,
    newPassword,
    currentPassword,
    confirmNewPassword,
    isCreateView,
    isEditView,
    isUpdateProfileView,
    isShowView,
    dateBirth,
    taxId,
    email,
    address,
    isEditPartnerAccount,
    getPartnerToEdit,
    isAccountBusinessComputed,
    findMember,
    getMembers,
    setIsAccountBusiness,
    getAccountId: () => accountStore.getAccountId(),
    getOwner: () => accountStore.owner,
  }
}
