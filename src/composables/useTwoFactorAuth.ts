import { computed, onMounted, ref } from 'vue'
import { TwoFactorService } from '../shared/services/twoFactor'
import { useToast } from 'primevue/usetoast'
import { TwoFactor } from '../views/profile/types/TwoFactorReponse'
import { useI18n } from 'vue-i18n'
import { AccountService } from '../shared/services/account'
import { twoFactorAuthenticationIsActiveRemotely } from '../shared/services/remoteConfig'
import { useAuth } from './useAuth'
import { processException } from '../shared/processException'

export const useTwoFactorAuth = () => {
  const isShowView = ref(false)
  const isEnabledButtonToProceedWithdrawal = ref(true)
  const submitting = ref(false)
  const twoFactorData = ref<TwoFactor>()
  const codeForVerify = ref<string>('')

  const { getUserName, getUserEmail, getClientId, twoFactorActive, isTwoFactorActive } = useAuth()

  const toast = useToast()

  const { t } = useI18n({
    useScope: 'global',
  })

  onMounted(async () => {
    try {
      const isActiveRemotely = await twoFactorAuthenticationIsActiveRemotely()

      if (isActiveRemotely && !twoFactorIsActive()) {
        isEnabledButtonToProceedWithdrawal.value = false
      }

      if (isActiveRemotely && twoFactorIsActive()) {
        isEnabledButtonToProceedWithdrawal.value = true
      }
    } catch (e) {}
  })

  const lookQRTwoFactor = async (): Promise<void> => {
    const payload = {
      clientId: getClientId(),
      email: getUserEmail(),
      name: getUserName(),
    }

    new TwoFactorService()
      .request(payload)
      .then((r: TwoFactor) => {
        twoFactorData.value = r

        isShowView.value = true
      })
      .catch(e => {
        isShowView.value = true
        processException(toast, t, e)
      })
  }

  const getQR = computed(() => {
    if (twoFactorData.value?.qr != undefined) {
      return twoFactorData.value!.qr
    }
  })

  const getSecret = computed(() => {
    if (twoFactorData.value?.secret != undefined) {
      return twoFactorData.value!.secret
    }
  })

  const getCodeRecovery = (): string[] => {
    console.log(twoFactorData.value?.code_recovery)
    return twoFactorData.value?.code_recovery ?? []
  }

  const verifyCode = (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (codeForVerify.value.length < 6) {
        toast.add({
          severity: 'warn',
          detail: t('validVerifyCode'),
          life: 6000,
        })

        resolve(false)
        return
      }

      const payload = {
        clientId: getClientId(),
        code: codeForVerify.value.replace('-', ''),
      }

      submitting.value = true

      new TwoFactorService()
        .verifyCode(payload)
        .then(r => {
          submitting.value = false

          resolve(true)
        })
        .catch(e => {
          submitting.value = false
          resolve(false)
          processException(toast, t, e)
        })
    })
  }

  const activeTwoFactor = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const payload = {
        clientId: getClientId(),
        code: codeForVerify.value,
      }

      submitting.value = true

      new TwoFactorService()
        .active(payload)
        .then(async r => {
          toast.add({
            severity: 'info',
            detail: r.message,
            life: 4000,
          })

          await new AccountService().enableTwoFactorAuthentication()

          submitting.value = false

          twoFactorActive()

          resolve(true)
        })
        .catch(e => {
          resolve(false)
          submitting.value = false
          processException(toast, t, e)
        })
    })
  }

  const twoFactorIsActive = (): boolean => {
    return isTwoFactorActive()
  }

  const downloadCodeRecoveryTxtFile = (codes: string[]) => {
    const text = codes.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'codesRecoveryTwoFactorAuth-BELOBABA.txt'
    link.href = url
    link.click()
  }

  return {
    getQR,
    getSecret,
    isShowView,
    submitting,
    codeForVerify,
    isEnabledButtonToProceedWithdrawal,
    downloadCodeRecoveryTxtFile,
    verifyCode,
    getCodeRecovery,
    twoFactorIsActive,
    activeTwoFactor,
    lookQRTwoFactor,
  }
}
