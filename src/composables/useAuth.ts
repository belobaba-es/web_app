import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchLogin } from '../views/login/services/fetchLogin'
import { UserAuth } from '../views/login/types/login.interface'
import { useAuthStore } from '../stores/useAuthStore'
import { AccountStatus } from '../types/accountStatus.enum'
import { twoFactorAuthenticationIsActiveRemotely } from '../shared/services/remoteConfig'

const showModalOfVerifyTwoFactorAuth = ref<boolean>(false)
const userAuth = ref<UserAuth | undefined>(undefined)

export const useAuth = () => {
  const submitting = ref(false)
  const router = useRouter()
  const form = reactive({
    user: '',
    pass: '',
    remember: false,
  })

  const { setInitialUserAuth, getAccountType, getCountry, getAccountStatus } = useAuthStore()

  useAuthStore().$subscribe((mutation, state) => {
    userAuth.value = state
  })

  const logout = async () => {
    sessionStorage.removeItem('belobaba')
    sessionStorage.removeItem('user')
  }

  const redirectPage = () => {
    window.location.href = window.location.origin ?? 'https://belobaba.io/'
  }

  const redirectSigning = () => {
    router.push('/create-user')
  }

  const editProfile = () => {
    if (getAccountType() === 'NATURAL_PERSON') {
      router.push(`/onboarding/personal/personal-data`)
    } else {
      router.push(`/onboarding/business/company-information`)
    }
  }

  const isNaturalAccount = () => {
    return getAccountType() === 'NATURAL_PERSON'
  }

  const isFromUnitedStates = () => {
    return getCountry() === 'US'
  }

  const handleSubmit = async () => {
    userAuth.value = await fetchLogin(form.user.toLowerCase().trim(), form.pass.trim())

    if (!userAuth.value) {
      return
    }

    if ((await twoFactorAuthenticationIsActiveRemotely()) && userAuth.value.client.twoFactorActive) {
      showModalOfVerifyTwoFactorAuth.value = true
    }

    if (!showModalOfVerifyTwoFactorAuth.value) {
      processRedirectAfterLogin()
    }
  }

  const processRedirectAfterLogin = () => {
    if (userAuth.value) setInitialUserAuth(userAuth.value)

    if (getClientId() == undefined || getAccountStatus() === AccountStatus.REGISTERED) {
      window.location.href = '/onboarding'
      return
    }

    if (getAccountStatus() === AccountStatus.SUBMITTED) {
      window.location.href = `/profile/${getClientId()}`

      return
    }

    window.location.href = '/dashboard'
  }

  const getClientId = () => {
    if (userAuth.value === undefined) {
      return useAuthStore().clientId
    }

    return userAuth.value?.clientId ?? ''
  }

  return {
    ...useAuthStore(),
    isFromUnitedStates,
    getClientId,
    form,
    submitting,
    showModalOfVerifyTwoFactorAuth,
    processRedirectAfterLogin,
    handleSubmit,
    isNaturalAccount,
    editProfile,
    redirectSigning,
    redirectPage,
    logout,
  }
}
