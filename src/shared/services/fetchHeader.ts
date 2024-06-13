import { useAuth } from '../../composables/useAuth'
import router from '../../router/router'

export default async (isFormData: boolean = false) => {
  const { getToken } = useAuth()
  if (getToken() === '') {
    await router.push('/')
    return
  }
  const type = isFormData ? 'multipart/form-data' : 'application/json'
  return {
    headers: {
      'Content-Type': type,
      Authorization: 'Bearer ' + getToken(),
      'tenant-name': import.meta.env.VITE_TENANT_NAME,
    },
  }
}
