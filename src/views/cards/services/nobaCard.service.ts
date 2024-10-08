import { OnboardingRepositionCard, OnboardingRequest } from '../types/onboardingRequest.type'
import { useAuth } from '../../../composables/useAuth'
import { ListCardsResponse } from '../types/listCardsResponse.type'
import { CardDetailResponse } from '../types/cardDetailResponse'
import { ActivatePhysicalCardRequest, SecurityQuestions } from '../types/activatePhysicalCardRequest.type'
import { axiosInstanceNobaCard, headerRequestNobaCard } from './nobaCardBase.service'
import { Pagination } from '../../../types/pagination'
import { TransactionCard } from '../types/transactionCard.type'
import { ReasonLockingCard } from '../enums/cardBlock.enum'

const { getClientId } = useAuth()

/**
 * Solicitu de tarjeta, tanto fisica o virtual o ambas en el proceso de onboarding
 * Puede ser utilizado en la reposicion de tarjeta fisica.
 * @param request
 */
export const onboardingCard = async (request: OnboardingRequest) => {
  return await axiosInstanceNobaCard.post(
    '/customer/onboarding',
    {
      ...request,
      currency: 'EUR',
    },
    await headerRequestNobaCard()
  )
}

export const getListCards = async (): Promise<ListCardsResponse[]> => {
  const header = await headerRequestNobaCard()
  const response = await axiosInstanceNobaCard.get(`/management/cards/${getClientId()}`, {
    headers: header.headers,
  })

  return response.data.data
}

export const cardDetail = async (cardId: number): Promise<CardDetailResponse> => {
  const header = await headerRequestNobaCard()
  const response = await axiosInstanceNobaCard.get(`/management/card/${cardId}`, { headers: header.headers })

  return response.data.data
}

export const activatePhysicalCard = async (request: ActivatePhysicalCardRequest): Promise<{ message: string }> => {
  const response = await axiosInstanceNobaCard.post(
    '/management/activate-physical-card',
    request,
    await headerRequestNobaCard()
  )

  return response.data.message
}

export const reportCardAsLostOrStolen = async (
  cardId: number,
  reason: ReasonLockingCard,
  note: string
): Promise<{ message: string }> => {
  const payload = {
    cardId,
    clientId: getClientId(),
    wantToBlock: true,
    reason,
    note,
  }

  const response = await axiosInstanceNobaCard.put(
    `/management/block-or-unlock-card`,
    payload,
    await headerRequestNobaCard()
  )

  return response.data.message
}

export const pauseCard = async (cardId: number): Promise<{ message: string }> => {
  const payload = {
    clientId: getClientId(),
    cardId,
    wantToBlock: true,
    reason: 'SUSPECTED_FRAUD',
    note: 'SUSPECTED_FRAUD',
  }
  const response = await axiosInstanceNobaCard.put(
    `/management/block-or-unlock-card`,
    payload,
    await headerRequestNobaCard()
  )

  return response.data.message
}

export const unPauseCard = async (cardId: number): Promise<{ message: string }> => {
  const payload = {
    clientId: getClientId(),
    cardId,
    wantToBlock: false,
    note: 'ACTIVE',
  }
  const response = await axiosInstanceNobaCard.put(
    `/management/block-or-unlock-card`,
    payload,
    await headerRequestNobaCard()
  )

  return response.data.message
}

export const changePinCard = async (
  cardId: number,
  pin: string,
  securityQuestions: SecurityQuestions[]
): Promise<{ message: string }> => {
  const payload = {
    clientId: getClientId(),
    cardId,
    pin,
    securityQuestions,
  }
  const response = await axiosInstanceNobaCard.put(
    `/management/change/pin-card`,
    payload,
    await headerRequestNobaCard()
  )

  return response.data.message
}

export const createRepositionCard = async (
  request: OnboardingRepositionCard
): Promise<{
  message: string
}> => {
  const response = await axiosInstanceNobaCard.post('/management/request-card', request, await headerRequestNobaCard())

  return response.data.message
}

export const deleteVirtualCard = async (cardId: number): Promise<{ message: string }> => {
  const response = await axiosInstanceNobaCard.delete(`/management/card/${cardId}`, await headerRequestNobaCard())

  return response.data.message
}

export const historyTransaction = async (page: number, limit: number = 10): Promise<Pagination<TransactionCard>> => {
  const response = await axiosInstanceNobaCard.get(
    `/transaction-history/${page}&limit=${limit}`,
    await headerRequestNobaCard()
  )

  return response.data.data
}
