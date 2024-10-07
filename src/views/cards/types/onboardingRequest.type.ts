import { CardModality } from '../enums/cardModality.enum'

export type OnboardingRequest = {
  clientId: string
  requestCardModality: CardModality[]
}

export type OnboardingRepositionCard = {
  clientId: string
  cardModality: CardModality[]
  currency: string
}
