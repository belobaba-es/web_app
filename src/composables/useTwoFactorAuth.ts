import { computed, ref } from 'vue'
import { CryptoService } from '../shared/services/crypto'
import { useAccount } from './useAccount'
import { TwoFactorService } from '../views/profile/services/twoFactor'
import { useToast } from 'primevue/usetoast'
import { TwoFactor } from '../views/profile/types/TwoFactorReponse'
import { useI18n } from 'vue-i18n'
import showMessage from '../shared/showMessageArray'
import { useUserStore } from '../stores/user'

export const useTwoFactorAuth = () => {
  const isShowView = ref(false)
  const isShowViewDownloadCodeRecovery = ref(false)
  const submitting = ref(false)
  const twoFactorData = ref<TwoFactor>()
  const codeForVerify = ref<string>('')
  const userStore = useUserStore()

  const { fullName, email, accountId } = useAccount()

  const toast = useToast()

  const { t } = useI18n({
    useScope: 'global',
  })

  const lookQRTwoFactor = async (): Promise<void> => {
    const payload = {
      accountId: accountId.value,
      email: email.value,
      name: fullName.value,
    }

    TwoFactorService.instance()
      .request(payload)
      .then((r: TwoFactor) => {
        twoFactorData.value = r

        isShowView.value = true
      })
      .catch(e => {
        isShowView.value = true
        toast.add({
          severity: 'error',
          summary: t('somethingWentWrong'),
          detail: e.response.data.message,
          life: 4000,
        })
      })
  }

  const getQR = computed(() => {
    if (twoFactorData.value?.qr != undefined) {
      return twoFactorData.value.qr
    }
  })

  const getSecret = computed(() => {
    if (twoFactorData.value?.secret != undefined) {
      return twoFactorData.value.secret
    }
  })

  const getCodeRecovery = (): string[] => {
    if (twoFactorData.value?.code_recovery != undefined) {
      return twoFactorData.value.code_recovery
    }

    return []
  }

  const activeTwoFactor = async (): Promise<void> => {
    const payload = {
      accountId: accountId.value,
      code: codeForVerify.value,
    }

    submitting.value = true

    TwoFactorService.instance()
      .active(payload)
      .then(r => {
        submitting.value = false

        toast.add({
          severity: 'info',
          detail: r.message,
          life: 4000,
        })

        setTwoFactorActive()

        isShowViewDownloadCodeRecovery.value = true
      })
      .catch(e => {
        console.log(e)
        submitting.value = false

        if (e.response.data.message) {
          toast.add({
            severity: 'error',
            summary: t('somethingWentWrong'),
            detail: e.response.data.message,
            life: 4000,
          })
          return
        }
      })
  }

  const setTwoFactorActive = () => {
    const user = userStore.getUser

    user.account.twoFactorActive = true

    userStore.setUser(user)
  }

  const twoFactorIsActive = (): boolean => {
    const user = userStore.getUser
    return user.account.twoFactorActive === true
  }

  return {
    getQR,
    getSecret,
    isShowView,
    submitting,
    codeForVerify,
    getCodeRecovery,
    twoFactorIsActive,
    activeTwoFactor,
    lookQRTwoFactor,
  }
}
