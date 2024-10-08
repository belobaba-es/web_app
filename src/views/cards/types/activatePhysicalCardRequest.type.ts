import { QuestionRecoveryPassword } from '../enums/questionRecoveryPassword.enum'

export type SecurityQuestions = {
  question: QuestionRecoveryPassword | null
  answer: string
}

export type ActivatePhysicalCardRequest = {
  cardId: string
  clientId: string
  pin: string
  lastFourDigits: string
  securityQuestions: SecurityQuestions[]
}
