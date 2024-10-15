import generateTokenJWE from '../../../shared/services/generateTokenJWE'
import { useAuth } from '../../../composables/useAuth'
import { Ref, ref } from 'vue'
import { BalanceCard } from '../types/balanceCard.type'
import { TransactionCard } from '../types/transactionCard.type'
import { searchPublicKey } from '../services/nobaCardBase.service'
import { useTransactionCard } from '../transactionsCard/composable/useTransactionCard'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'

const isSubscribedCardTransactionResource = ref<boolean>(false)
const isSubscribedCardBalanceResource = ref<boolean>(false)

export const useCardSocket = () => {
  const { transactionList } = useTransactionCard()
  const { selectedCard } = useCardCenter()

  async function makeConnectionSocket(
    resource: string,
    refSubscribed: Ref<boolean>,
    functionProcessMessageSendBySocketServer: Function
  ): Promise<void> {
    const { getClientId } = useAuth()

    const token = await generateTokenJWE(
      {
        resource: resource,
        clientId: getClientId(),
        CLIENT_ID: import.meta.env.VITE_NOBA_CARD_CLIENT_ID,
        CLIENT_SECRET: import.meta.env.VITE_NOBA_CARD_CLIENT_SECRET,
      },
      await searchPublicKey(),
      'webapp:noba'
    )

    const socket = new WebSocket(`${import.meta.env.VITE_NOBA_CARD_SOCKET}?token=${token}`)

    socket.addEventListener('open', function (event) {
      console.log('Connected to the WebSocket server')
      refSubscribed.value = true
    })

    socket.addEventListener('message', function (event) {
      console.log(event.data)
      functionProcessMessageSendBySocketServer(event.data)
    })

    socket.addEventListener('close', function (event) {
      console.log('Disconnected from the WebSocket server')
      refSubscribed.value = false
    })

    socket.addEventListener('error', function (event) {
      console.error('WebSocket error: ', event)
    })
  }

  const subscribeCardTransactionResource = async (): Promise<void> => {
    if (isSubscribedCardTransactionResource.value) {
      return
    }

    await makeConnectionSocket(
      'NEW_TRANSACTION',
      isSubscribedCardTransactionResource,
      processNewTransactionMessageSendBySocketServer
    )
  }

  const subscribeBalanceCard = async (): Promise<void> => {
    if (isSubscribedCardBalanceResource.value) {
      return
    }

    await makeConnectionSocket(
      'BALANCE',
      isSubscribedCardBalanceResource,
      processNewCardBalanceMessageSendBySocketServer
    )
  }

  const processNewTransactionMessageSendBySocketServer = (message: TransactionCard) => {
    transactionList.value = [...transactionList.value, message]
  }

  const processNewCardBalanceMessageSendBySocketServer = (message: BalanceCard) => {
    if (!selectedCard.value) return
    selectedCard.value.balance = message.balance
  }

  return { subscribeCardTransactionResource, subscribeBalanceCard }
}
