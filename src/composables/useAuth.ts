import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { fetchLogin } from '../views/login/services/fetchLogin'
import { UserAuth } from '../views/login/types/login.interface'
import { useAuthStore } from '../stores/useAuthStore'

export const useAuth = () => {
  const submitting = ref(false)
  const router = useRouter()
  const form = reactive({
    user: '',
    pass: '',
    remember: false,
  })

  const { setInitialUserAuth } = useAuthStore()

  const makeLogin = async (): Promise<UserAuth | undefined> => {
    submitting.value = true

    const data: UserAuth = await fetchLogin(form.user.toLowerCase(), form.pass)
    setInitialUserAuth(data)
    submitting.value = false

    return data
  }

  const logout = async () => {
    sessionStorage.removeItem('noba')
    sessionStorage.removeItem('user')
  }

  const redirectPage = () => {
    window.location.href = window.location.origin ?? 'https://noba.cash/'
  }

  const redirectSigning = () => {
    router.push('/create-user')
  }

  return {
    ...useAuthStore(),
    form,
    submitting,
    makeLogin,
    redirectSigning,
    redirectPage,
    logout,
  }
}
