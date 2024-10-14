import { ref, watch } from 'vue'
import { useRouter } from 'vue-router'
import { activatePhysicalCard } from '../../services/nobaCard.service'
import { ActivatePhysicalCardRequest, SecurityQuestions } from '../../types/activatePhysicalCardRequest.type'
import { useCardCenter } from '../../cardCenter/Composables/useCardCenter'
import { useAuth } from '../../../../composables/useAuth'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { processException } from '../../../../shared/processException'

const lastFourDigits = ref('')
const pin = ref('')
const confirmPin = ref('')
const questions = ref<SecurityQuestions[]>([])
const questionAnswerPairs = [
  { question: ref(null), answer: ref('') },
  { question: ref(null), answer: ref('') },
  { question: ref(null), answer: ref('') },
]
const openConfirmationModal = ref(false)
const loading = ref(false)
const isQuestionAnswerPairsValid = ref(false)

export const useActivationCard = () => {
  const { t } = useI18n({ useScope: 'global' })
  const router = useRouter()
  const { getClientId } = useAuth()
  const toast = useToast()
  const { selectedCard } = useCardCenter()
  const goToPin = () => {
    if (lastFourDigits.value.length === 4) {
      router.push('/cards/activation-card/pin')
    }
  }

  const goToQuestions = () => {
    if (pin.value !== confirmPin.value && confirmPin.value.length === 4 && pin.value.length === 4) {
      addToast('warn', t('somethingWentWrong'), t('pinNotMatch'))
      return
    }
    router.push('/cards/activation-card/questions')
  }

  const resetCardValues = () => {
    lastFourDigits.value = ''
    pin.value = ''
    confirmPin.value = ''
    questions.value = []
    questionAnswerPairs.forEach(pair => {
      pair.question.value = null
      pair.answer.value = ''
    })
  }

  const addToast = (severity: string, summary: string, detail: string) => {
    toast.add({
      severity,
      summary,
      detail,
      life: 5000,
    })
  }

  const handleConfirmationModal = (b = true) => {
    openConfirmationModal.value = b
  }

  const handleActivationCard = () => {
    if (questionAnswerPairs.some(pair => !pair.answer.value)) {
      addToast('warn', t('somethingWentWrong'), t('mustAnswerAllQuestions'))
      return
    }
    loading.value = true
    if (
      selectedCard.value &&
      questions.value.length === 3 &&
      lastFourDigits.value.length === 4 &&
      pin.value.length === 4 &&
      confirmPin.value === pin.value
    ) {
      const request: ActivatePhysicalCardRequest = {
        cardId: selectedCard.value.cardId.toString(),
        clientId: getClientId(),
        pin: pin.value,
        lastFourDigits: lastFourDigits.value,
        securityQuestions: questions.value,
      }
      activatePhysicalCard(request)
        .then(response => {
          handleConfirmationModal()
          resetCardValues()
          loading.value = false
        })
        .catch(error => {
          loading.value = false
          processException(toast, t, error)
        })
    }
  }

  const handleGoToTransation = () => {
    router.push('/cards/transactions-card')
  }

  watch(
    questionAnswerPairs.map(pair => pair.answer),
    () => {
      questions.value = questionAnswerPairs
        .filter(pair => pair.question.value)
        .map(pair => ({ question: pair.question.value, answer: pair.answer.value }))
      isQuestionAnswerPairsValid.value = questions.value.length === 3
    }
  )

  watch(
    questionAnswerPairs.map(pair => pair.question),
    () => {
      const nonEmptyPairs = questionAnswerPairs.filter(
        pair => pair.question.value !== '' && pair.question.value !== null
      )

      const hasDuplicateQuestions = nonEmptyPairs.some((pair, i, arr) =>
        arr.some((otherPair, j) => i !== j && pair.question.value === otherPair.question.value)
      )

      if (hasDuplicateQuestions) {
        addToast('warn', t('somethingWentWrong'), t('questionCannotBeTheSame'))
      }
    }
  )

  watch(pin, () => {
    if (pin.value.length > 4) {
      addToast('warn', t('somethingWentWrong'), t('pinLength'))
    }
  })

  return {
    lastFourDigits,
    goToPin,
    pin,
    confirmPin,
    addToast,
    questions,
    openConfirmationModal,
    handleConfirmationModal,
    handleActivationCard,
    goToQuestions,
    handleGoToTransation,
    questionAnswerPairs,
    loading,
    resetCardValues,
    isQuestionAnswerPairsValid,
  }
}
