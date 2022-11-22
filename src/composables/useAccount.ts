import { useRouter, useRoute } from 'vue-router'
import { useAccountStore } from '../stores/account'
import { storeToRefs } from 'pinia'
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { ProfileService } from '../views/profile/services/profile'
import { useUserStore } from '../stores/user'
import { Member, Owner } from '../views/profile/types/account.interface'

export const useAccount = () => {
  const router = useRouter()
  const route = useRoute()
  const accountStore = useAccountStore()
  const userStore = useUserStore()
  const account = storeToRefs(accountStore)
  const { t } = useI18n({
    useScope: 'global',
  })

  const submitting = ref(false)

  const phoneNumberWithCountry = computed(() => {
    return `${account.owner.value?.phoneCountry} ${account.owner.value?.phoneNumber}`
  })

  const isNaturalAccount = computed<boolean>(() => account.natureAccount.value === 'natural_person')

  const fullName = computed(() => {
    const naturalAccount = `${account.owner.value?.firstName} ${account.owner.value?.middleName} ${account.owner.value?.lastName}`
    const companyAccount = account.owner.value?.name
    return isNaturalAccount.value ? naturalAccount : companyAccount
  })

  const labelNameProfile = computed(() => {
    return isNaturalAccount.value ? t('fullName') : t('businessNameLabel')
  })

  const formTitle = computed(() => (isNaturalAccount.value ? t('partnerTitle') : t('companyData')))

  const submitProfileForm = () => {
    submitting.value = true
    const profileService = ProfileService.instance()
    profileService.updateContact(account.accountId.value!, userStore.getUser.contactId, accountStore.form).then(() => {
      submitting.value = false
    })
  }

  const getFullName = (payload: Owner | Member) => {
    return `${payload.firstName} ${payload.middleName} ${payload.lastName}`
  }

  const setDocumentResponseId = (documentResponseId: string | null) => {
    if (!documentResponseId) return
    accountStore.setDocumentResponseId(documentResponseId)
  }

  const editProfile = (): void => {
    router.push(`/profile/${route.params.accountId}/edit`)
  }

  const fetchAccount = async () => {
    await accountStore.getAccountByID(route.params.accountId)
  }

  return {
    fetchAccount,
    editProfile,
    submitProfileForm,
    getFullName,
    setDocumentResponseId,
    ...account,
    fullName,
    phoneNumberWithCountry,
    formTitle,
    isNaturalAccount,
    submitting,
    labelNameProfile,
  }
}
