import axios from 'axios'
import { UserAuth } from '../types/login.interface'

export const fetchLogin = async (email: string, password: string): Promise<UserAuth> => {
  const client = axios.create({
    baseURL: `${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`,
  })

  const response = await client.post(
    `user/login/`,
    { email, password },
    {
      headers: {
        'Content-Type': 'application/json',
        'tenant-name': import.meta.env.VITE_TENANT_NAME,
      },
    }
  )
  return response.data.data as UserAuth
}
