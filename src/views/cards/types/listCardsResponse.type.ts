import { StatusCard } from '../enums/statusCard.enum'

export type ListCardsResponse = {
  cardId: number
  flagType: string
  cardNumber: string
  isPhysical: boolean
  balance: number
  status: StatusCard
  expirationDate: string
  cvv: string
}
