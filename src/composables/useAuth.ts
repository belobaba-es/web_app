import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchLogin } from '../views/login/services/fetchLogin'
import { UserAuth } from '../views/login/types/login.interface'
import { useAuthStore } from '../stores/useAuthStore'
import { AccountStatus } from '../types/accountStatus.enum'
import { twoFactorAuthenticationIsActiveRemotely } from '../shared/services/remoteConfig'

const showModalOfVerifyTwoFactorAuth = ref<boolean>(false)

export const useAuth = () => {
  const submitting = ref(false)

  const router = useRouter()
  const form = reactive({
    user: '',
    pass: '',
    remember: false,
  })

  const { setInitialUserAuth, getAccountType, getCountry, getClientId, getAccountStatus, isTwoFactorActive } =
    useAuthStore()

  const makeLogin = async (): Promise<string | undefined> => {
    try {
      submitting.value = true;

      const data: UserAuth = await fetchLogin(form.user.toLowerCase().trim(), form.pass.trim());
      sessionStorage.setItem('authData', JSON.stringify(data));

      submitting.value = false;
      setInitialUserAuth(data);
      return data
    } catch (error) {
      submitting.value = false;

      console.error('Error en el inicio de sesión:', error);
      return error.message || 'Error desconocido al iniciar sesión';
    }
  };

  const logout = async () => {
    sessionStorage.removeItem('belobaba')
    sessionStorage.removeItem('user')
    sessionStorage.removeItem('authData')
  }

  const redirectPage = () => {
    window.location.href = window.location.origin ?? 'https://noba.cash/'
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
    const message = await makeLogin();
    console.log(`Resultado del inicio de sesión:`, message);

    if (!message) {
      console.error('No se pudo procesar el inicio de sesión.');
      return;
    }

    if ((await twoFactorAuthenticationIsActiveRemotely()) && isTwoFactorActive()) {
      showModalOfVerifyTwoFactorAuth.value = true;
      console.log('Autenticación de dos factores requerida.');
    } else {
      processRedirectAfterLogin();
      console.log('Inicio de sesión exitoso, redirigiendo...');
    }
  };

  const processRedirectAfterLogin = () => {
    console.log(`processRedirectAfterLogin`)
    if (getClientId() == undefined || getAccountStatus() === AccountStatus.REGISTERED) {
     // window.location.href = '/onboarding'
      return
    }

    // if (getAccountStatus() === AccountStatus.SUBMITTED) {
    //   window.location.href = `/profile/${getClientId()}`
    //
    //   return
    // }
    //
    // window.location.href = '/dashboard'
  }

  return {
    ...useAuthStore(),
    isFromUnitedStates,
    form,
    submitting,
    showModalOfVerifyTwoFactorAuth,
    processRedirectAfterLogin,
    handleSubmit,
    isNaturalAccount,
    editProfile,
    makeLogin,
    redirectSigning,
    redirectPage,
    logout,
  }
}
