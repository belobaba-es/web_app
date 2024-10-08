import { axiosInstanceNobaCard, headerRequestNobaCard } from './nobaCardBase.service'
import { useAuth } from '../../../composables/useAuth'
import { RechargeQuoteResponse } from '../types/rechargeQuoteResponse.type'

const { getClientId } = useAuth()

export const requestQuote = async (
  cardId: string,
  sourceAssetCode: string,
  amount: number
): Promise<RechargeQuoteResponse> => {
  const payload = {
    clientId: getClientId(),
    cardId,
    sourceAssetCode,
    amount,
  }

  const response = await axiosInstanceNobaCard.post(
    '/card-recharge/request-recharge-quote',
    payload,
    await headerRequestNobaCard()
  )

  return response.data.data
}

export const acceptQuote = async (quoteId: string): Promise<{ message: string }> => {
  const response = await axiosInstanceNobaCard.post(
    `/card-recharge/accept-quote`,
    {
      quoteId,
    },
    await headerRequestNobaCard()
  )

  return response.data.message
}

const MarkQuoteAsExpired = async (quoteId: string) => {
  const response = await axiosInstanceNobaCard.post(
    `/card-recharge/expire-quote`,
    {
      quoteId,
    },
    await headerRequestNobaCard()
  )

  return response.data.message
}
