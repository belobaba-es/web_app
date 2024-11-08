import { ref, watch } from 'vue'
import { useRechargeCardStore } from '../../stores/useRechargeCardStore'
import { RechargeState } from '../../types/rechargeState'
import { acceptQuote, requestQuote } from '../../services/nobaCardRecharge.service'
import { useCardCenter } from '../../cardCenter/Composables/useCardCenter'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { processException } from '../../../../shared/processException'
import { useMediaQuery } from '../../../../composables/useMediaQuery'

export const useRechargeCard = () => {
  const toast = useToast()
  const router = useRouter()
  const { t } = useI18n({ useScope: 'global' })
  const { dataRechargeCard, setStateRechargeCard } = useRechargeCardStore()
  const { cardInfo } = useCardCenter()
  const { isMobile } = useMediaQuery()

  const rechargeState = ref<RechargeState>(dataRechargeCard())
  const rechargeStore = useRechargeCardStore()

  rechargeStore.$subscribe((mutation: any, state: RechargeState) => {
    rechargeState.value = state
  })

  watch(rechargeState.value, () => {
    setStateRechargeCard(rechargeState.value)
  })

  const openModalSelector = () => {
    rechargeState.value.showModalAssetSelector = true
  }

  const openModal = (b: boolean) => {
    rechargeState.value.showModalResume = b
  }

  const handleRequestQuote = async () => {
    rechargeState.value.loading = true

    return requestQuote(cardInfo.value.cardId, rechargeState.value.assetCode, rechargeState.value.amount)
      .then(response => {
        rechargeState.value.unitCount = parseFloat(response.totalReceived)
        rechargeState.value.quoteId = response.quoteId
        rechargeState.value.loading = false
      })
      .catch(error => {
        rechargeState.value.loading = false
        processException(toast, t, error)
      })
  }

  const handleAcceptQuote = async () => {
    rechargeState.value.loading = true
    return acceptQuote(rechargeState.value.quoteId)
      .then(response => {
        openModal(false)
        if (isMobile) {
          router.push('/cards')
        } else {
          router.push('/cards/transactions-card')
        }

        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: response.message,
          life: 5000,
        })

        rechargeState.value.loading = false
        rechargeState.value.assetId = ''
        rechargeState.value.assetName = ''
        rechargeState.value.assetIcon = ''
        rechargeState.value.assetCode = ''
        rechargeState.value.amount = 0
        rechargeState.value.unitCount = 0
        rechargeState.value.quoteId = ''
      })
      .catch(error => {
        rechargeState.value.loading = false
        processException(toast, t, error)
      })
  }

  return {
    openModalSelector,
    rechargeState,
    handleRequestQuote,
    handleAcceptQuote,
    openModal,
  }
}
