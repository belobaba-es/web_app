import axios, { AxiosInstance } from 'axios'
import { UserAuth } from '../types/login.interface'

export const fetchLogin = async (email: string, password: string): Promise<UserAuth> => {
  const client = axios.create({
    baseURL: import.meta.env.VITE_BASE_ENDPOINT,
  })

  const response = await client.post(`user/login/`, { email, password })
  return response.data.data as UserAuth
}
