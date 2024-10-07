import { ref } from 'vue'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { reportCardAsLostOrStolen } from '../services/nobaCard.service'
import { processException } from '../../../shared/processException'
import { ReasonLockingCard } from '../enums/cardBlock.enum'

export const useCardBlock = () => {
  const { cardInfo } = useCardCenter()
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const loading = ref(false)
  const visible = ref(false)
  const dataBlockCard = ref<{
    cardId: number
    reason: ReasonLockingCard
    note: string
  }>({
    cardId: cardInfo.value.cardId,
    reason: ReasonLockingCard.CARD_STOLEN,
    note: '',
  })
  const blockCard = () => {
    loading.value = true
    reportCardAsLostOrStolen(dataBlockCard.value.cardId, dataBlockCard.value.reason, dataBlockCard.value.note)
      .then(() => {
        visible.value = true
        loading.value = false
      })

      .catch(e => {
        loading.value = false
        processException(toast, t, e)
      })
  }

  return {
    blockCard,
    dataBlockCard,
    visible,
    loading,
  }
}
