import { computed, onMounted, ref } from 'vue'
import { useAccount } from './useAccount'
import { TwoFactorService } from '../shared/services/twoFactor'
import { useToast } from 'primevue/usetoast'
import { TwoFactor } from '../views/profile/types/TwoFactorReponse'
import { useI18n } from 'vue-i18n'
import {User, useUserStore} from '../stores/user'
import { AccountService } from '../shared/services/account'
import { twoFactorAuthenticationIsActiveRemotely } from '../shared/services/remoteConfig'

export const useTwoFactorAuth = () => {
  const isShowView = ref(false)
  const isEnabledButtonToProceedWithdrawal = ref(true)
  const submitting = ref(false)
  const twoFactorData = ref<TwoFactor>()
  const codeForVerify = ref<number>()
  const userStore = useUserStore()

  const { fullName, email, accountId } = useAccount()

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
    } catch (e) {

    }

  })

  const lookQRTwoFactor = async (): Promise<void> => {
    const user = userStore.getUser as User

    const naturalAccount = `${user.firstName} ${user.middleName} ${user.lastName}`
    const accountType = user.contactType
    const companyAccount = user.name


    const payload = {
      accountId: user.account.accountId,
      email: user.email,
      name: accountType === 'company' ? companyAccount : naturalAccount,
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
    console.log(twoFactorData.value?.code_recovery)
    if (twoFactorData.value?.code_recovery != undefined) {
      return twoFactorData.value.code_recovery
    }

    return []
  }

  /**
   *
   * @param account Es el accountId
   */
  const verifyCode = (account?: string): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      if (String(codeForVerify.value).length < 6) {
        toast.add({
          severity: 'warn',
          detail: t('validVerifyCode'),
          life: 6000,
        })

        resolve(false)
        return
      }

      const payload = {
        accountId: account ?? userStore.getUser.account.accountId,
        code: String(codeForVerify.value),
      }

      submitting.value = true

      TwoFactorService.instance()
        .verifyCode(payload)
        .then(r => {
          submitting.value = false

          resolve(true)
        })
        .catch(e => {
          submitting.value = false

          resolve(false)

          if (e.response.data.error) {
            toast.add({
              severity: 'error',
              summary: t('somethingWentWrong'),
              detail: e.response.data.error,
              life: 6000,
            })
            return
          }

          if (e.response.data.message) {
            toast.add({
              severity: 'error',
              summary: t('somethingWentWrong'),
              detail: e.response.data.message,
              life: 6000,
            })
            return
          }
        })
    })
  }

  const activeTwoFactor = async (): Promise<boolean> => {
    return new Promise((resolve, reject) => {
      const payload = {
        accountId: accountId.value,
        code: codeForVerify.value,
      }

      submitting.value = true

      TwoFactorService.instance()
        .active(payload)
        .then(async r => {
          toast.add({
            severity: 'info',
            detail: r.message,
            life: 4000,
          })

          await AccountService.instance().enableTwoFactorAuthentication()

          submitting.value = false

          setTwoFactorActive()

          resolve(true)
        })
        .catch(e => {
          resolve(false)
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
    })
  }

  const setTwoFactorActive = () => {
    const user = userStore.getUser

    user.account.twoFactorActive = true

    userStore.setUser(user)
  }

  const twoFactorIsActive = (): boolean => {
    const user = userStore.getUser
    console.log(user.account.twoFactorActive === true)
    return user.account.twoFactorActive === true
  }

  const downloadCodeRecoveryTxtFile = (codes: string[]) => {
    const text = codes.join('\n')
    const blob = new Blob([text], { type: 'text/plain' })
    const url = URL.createObjectURL(blob)
    const link = document.createElement('a')
    link.download = 'codesRecoveryTwoFactorAuth-NOBACASH.txt'
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
