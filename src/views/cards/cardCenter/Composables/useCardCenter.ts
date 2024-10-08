import { computed, ref, watch } from 'vue'
import { ListCardsResponse } from '../../types/listCardsResponse.type'
import { cardDetail, deleteVirtualCard, getListCards, pauseCard, unPauseCard } from '../../services/nobaCard.service'
import { cardSelectedWithDetails } from '../../types/cardSelectedWithDetails'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { processException } from '../../../../shared/processException'
import { StatusCard } from '../../enums/statusCard.enum'
import { useMediaQuery } from '../../../../composables/useMediaQuery'

const cardInfo = ref()
const selectedCard = ref<cardSelectedWithDetails>()
const listCards = ref<ListCardsResponse[]>([])
const isDeleteCardModalShow = ref(false)
const isCardInfoVisible = ref(false)

export const useCardCenter = () => {
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const { isMobile } = useMediaQuery()

  let oldInfoCard = ref<ListCardsResponse>()
  const loading = ref(false)
  const showModal = ref(false)
  const checkInputLoad = ref<boolean>(false)

  const checkedPausaCard = ref(false)
  const showPauseModal = ref(false)

  const router = useRouter()

  const fetchListCard = async () => {
    const response = await getListCards()

    response.forEach(card => {
      card.expirationDate = '**/**'
      card.cvv = '***'
    })

    listCards.value = response
    if (isMobile.value) {
      redirectValidationMobile()
      return
    }

    redirectValidation()
  }

  const redirectValidation = () => {
    if (listCards.value && listCards.value.length !== 0) {
      cardInfo.value = listCards.value[0]

      if (
        router.currentRoute.value.path !== '/cards/transactions-card' ||
        cardInfo.value.status !== StatusCard.WAITING_ACTIVATION
      ) {
        router.push('/cards/transactions-card')
        return
      }
      router.push('/cards/activation-card/wait')
    } else {
      router.push('/cards/onboarding')
    }
  }

  const redirectValidationMobile = () => {
    if (listCards.value && listCards.value.length !== 0) {
      cardInfo.value = listCards.value[0]

      if (
        router.currentRoute.value.path !== '/cards/card-center/' ||
        cardInfo.value.status !== StatusCard.WAITING_ACTIVATION
      ) {
        router.push('/cards/card-center/')
        return
      }
    } else {
      router.push('/cards/request-card')
    }
  }

  const showCardDetails = async (card: cardSelectedWithDetails | undefined) => {
    if (!card || !card.cardId) return

    oldInfoCard.value = listCards.value?.find(c => c.cardId === card.cardId)
    loading.value = true

    try {
      const cardinfo = await cardDetail(card.cardId)
      if (selectedCard.value) {
        Object.assign(selectedCard.value, {
          cardId: card.cardId,
          balance: card.balance,
          status: card.status,
          isPhysical: card.isPhysical,
          cardNumber: cardinfo.cardNo,
          expirationDate: cardinfo.expirationDate,
          cvv: cardinfo.cvv,
          flagType: card.flagType,
        })
      }
    } catch (err: any) {
      loading.value = false
      processException(toast, t, err)
    }
  }

  const handleDeleteCardModal = (b: boolean) => {
    isDeleteCardModalShow.value = b
  }

  const handleDeleteCard = async () => {
    loading.value = true
    if (!selectedCard.value) return

    try {
      await deleteVirtualCard(selectedCard.value.cardId)
      await fetchListCard()
      await handleDeleteCardModal(false)
      loading.value = false
      toast.add({ severity: 'success', summary: t('success'), detail: t('cardDeleted') })
    } catch (error) {
      processException(toast, t, error)

      loading.value = false
    }
  }

  const pauseCardRequest = async () => {
    loading.value = true
    try {
      if (checkedPausaCard.value) {
        const response = await pauseCard(selectedCard.value!.cardId)
        showModal.value = true
        checkInputLoad.value = false
        toast.add({ severity: 'success', summary: t('success'), detail: response })
        cardInfo.value.status = StatusCard.LOCKED
        checkedPausaCard.value = true
        showPauseModal.value = true
        return
      }

      const response = await unPauseCard(selectedCard.value!.cardId)
      toast.add({ severity: 'success', summary: t('success'), detail: response })
      checkInputLoad.value = false
      cardInfo.value.status = StatusCard.ACTIVE
      checkedPausaCard.value = false
      showPauseModal.value = true
    } catch (e: string | any) {
      processException(toast, t, e)
      checkedPausaCard.value = false
      showPauseModal.value = false
    } finally {
      loading.value = false
    }
  }

  const hideCardDetails = (card: cardSelectedWithDetails | undefined) => {
    if (!card || !listCards.value) return

    const foundCard = listCards.value.find(c => c.cardId === card.cardId)
    if (foundCard && selectedCard.value) {
      Object.assign(selectedCard.value, {
        cardId: card.cardId,
        balance: card.balance,
        status: card.status,
        isPhysical: card.isPhysical,
        cardNumber: foundCard.cardNumber,
        expirationDate: foundCard.expirationDate,
        cvv: foundCard.cvv,
        flagType: card.flagType,
      })
    }
  }

  const toggleVisibility = async () => {
    if (selectedCard.value === undefined) return

    if (isCardInfoVisible.value) {
      hideCardDetails(selectedCard.value!)
      isCardInfoVisible.value = false

      return
    }

    await showCardDetails(selectedCard.value!)
    isCardInfoVisible.value = true
  }

  const pauseCardText = computed(() => {
    return selectedCard.value?.status === StatusCard.LOCKED ? t('textUnblockCard') : t('textBlockCard')
  })

  watch(
    () => selectedCard.value,
    newValue => {
      if (newValue) {
        checkedPausaCard.value = newValue.status === StatusCard.LOCKED
      }
      if (newValue && newValue.status === StatusCard.WAITING_ACTIVATION) {
        router.push('/cards/activation-card/wait')
      }
      isCardInfoVisible.value = false
    }
  )

  return {
    toggleVisibility,
    fetchListCard,
    listCards,
    selectedCard,
    loading,
    isCardInfoVisible,
    cardInfo,
    handleDeleteCard,
    handleDeleteCardModal,
    isDeleteCardModalShow,
    checkedPausaCard,
    pauseCardRequest,
    showModal,
    checkInputLoad,
    pauseCardText,
    showPauseModal,
  }
}
