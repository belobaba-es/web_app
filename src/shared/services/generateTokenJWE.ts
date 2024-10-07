import * as jose from 'jose'
import { importSPKI } from 'jose'

export default async function (payload: any, publicKey: string, issuer = 'webapp:nobaswap:issuer') {
  const decoder = new TextDecoder('utf-8')
  const publicKeyPEM = decoder.decode(
    new Uint8Array(
      atob(publicKey)
        .split('')
        .map(c => c.charCodeAt(0))
    )
  )
  const secretKey = await importSPKI(publicKeyPEM, 'RSA-OAEP-256')

  return await new jose.EncryptJWT(payload)
    .setProtectedHeader({ alg: 'RSA-OAEP-256', enc: 'A128CBC-HS256' })
    .setIssuer(issuer)
    .setExpirationTime(new Date().getTime() + 1000 * 60 * 0.5)
    .encrypt(secretKey)
}

export const getHeader = async (
  token: string,
  isFormData: boolean = false
): Promise<{
  headers: {
    'Content-Type': string
    Authorization: string
    'tenant-name': string
  }
}> => {
  const type = isFormData ? 'multipart/form-data' : 'application/json'

  return {
    headers: {
      'Content-Type': type,
      Authorization: `Bearer ${token}`,
      'tenant-name': import.meta.env.VITE_TENANT_NAME,
    },
  }
}
