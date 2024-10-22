export type cardSelectedWithDetails = {
  cardId: number
  balance: number
  status: string
  isPhysical: boolean
  cardNumber: string
  expirationDate: string
  cvv: string
  flagType: string
  currency?: string
}
