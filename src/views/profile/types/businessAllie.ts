import { BusinessAllieStatusEnum } from './businessAllieStatusEnum'
import { BusinessOpportunity } from './businessOpportunity'

export interface BusinessAllieType {
  id?: string
  accountId: string
  name: string
  email: string
  referredBy?: string
  businessOpportunities?: BusinessOpportunity[]
  status: BusinessAllieStatusEnum
  createdAt?: Date
  updatedAt?: Date
}
