import { defineStore } from 'pinia'
import { ListCardsResponse } from '../types/listCardsResponse.type'
import { CardDetailResponse } from '../types/cardDetailResponse'

type CardStore = {
  card: CardDetailResponse
  listCard: ListCardsResponse[]
}
export const useCardStore = defineStore('card', {
  state: (): CardStore => ({
    card: {
      cardNo: '',
      expirationDate: '',
      cvv: '',
    },
    listCard: [],
  }),
  actions: {
    setCard(card: CardDetailResponse) {
      this.card = card
    },
    getCard() {
      return this.card
    },
    setListCard(payload: ListCardsResponse[]) {
      this.listCard = payload
    },
  },
})
