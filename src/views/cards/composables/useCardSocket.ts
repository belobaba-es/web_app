import generateTokenJWE from '../../../shared/services/generateTokenJWE'
import { useAuth } from '../../../composables/useAuth'
import { Ref, ref } from 'vue'
import { BalanceCard } from '../types/balanceCard.type'
import { TransactionCard } from '../types/transactionCard.type'
import { searchPublicKey } from '../services/nobaCardBase.service'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'
import { useTransactionHistoryStore } from '../stores/useTransactionHistory'

const isSubscribedCardTransactionResource = ref<boolean>(false)
const isSubscribedCardBalanceResource = ref<boolean>(false)

export const useCardSocket = () => {
  const { setNewTransaction } = useTransactionHistoryStore()
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
      `webapp:${import.meta.env.VITE_TENANT_NAME}`
    )

    const socket = new WebSocket(`${import.meta.env.VITE_NOBA_CARD_SOCKET}?token=${token}`)

    // Enviar pings periódicamente
    const pingInterval = setInterval(() => {
      if (socket.readyState === WebSocket.OPEN) {
        socket.send(JSON.stringify({ type: 'ping' }))
      }
    }, 30000)

    socket.addEventListener('open', function (event) {
      console.log('Connected to the WebSocket server')
      refSubscribed.value = true
    })

    socket.addEventListener('message', function (event) {
      functionProcessMessageSendBySocketServer(event.data)
    })

    socket.addEventListener('close', function (event) {
      console.log('Disconnected from the WebSocket server')
      refSubscribed.value = false

      clearInterval(pingInterval)
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

  const processNewTransactionMessageSendBySocketServer = (message: any) => {
    const parsedMessage: TransactionCard = JSON.parse(message)

    console.log('message', message)
    console.log('message ', 'cardId' in parsedMessage)

    if (!('cardId' in parsedMessage)) return

    setNewTransaction({ ...parsedMessage })
  }

  const processNewCardBalanceMessageSendBySocketServer = (message: BalanceCard) => {
    if (!selectedCard.value) return
    selectedCard.value.balance = message.balance
  }

  return { subscribeCardTransactionResource, subscribeBalanceCard }
}
