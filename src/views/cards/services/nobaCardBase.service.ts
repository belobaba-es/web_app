import { useAuth } from '../../../composables/useAuth'
import axios from 'axios'
import generateToken, { getHeader } from '../../../shared/services/generateTokenJWE'

export const axiosInstanceNobaCard = axios.create({
  baseURL: import.meta.env.VITE_NOBA_CARD_API,
})

export const searchPublicKey = async (): Promise<string> => {
  const response = await axiosInstanceNobaCard.get('/public-key')
  return response.data.publicKey
}

export const headerRequestNobaCard = async (): Promise<{
  headers: {
    'Content-Type': string
    Authorization: string
    'tenant-name': string
  }
}> => {
  const { getClientId } = useAuth()

  const pubKey = await searchPublicKey()

  return await getHeader(
    await generateToken(
      {
        clientId: getClientId(),
        CLIENT_ID: import.meta.env.VITE_NOBA_CARD_CLIENT_ID,
        CLIENT_SECRET: import.meta.env.VITE_NOBA_CARD_CLIENT_SECRET,
      },
      pubKey,
      'webapp:belobaba'
    )
  )
}
