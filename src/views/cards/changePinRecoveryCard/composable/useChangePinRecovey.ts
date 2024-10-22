import { ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import { useCardCenter } from '../../cardCenter/Composables/useCardCenter'
import { useToast } from 'primevue/usetoast'
import router from '../../../../router/router'
import { useActivationCard } from '../../activationCard/composables/useActivationCard'
import { changePinCard } from '../../services/nobaCard.service'
import { processException } from '../../../../shared/processException'

export const useChangePin = () => {
  const { t } = useI18n()
  const { cardInfo } = useCardCenter()

  const showModal = ref(false)
  const toast = useToast()
  const { pin, questions, questionAnswerPairs, addToast } = useActivationCard()
  const isQuestionAnswerPairsValid = ref(false)

  const steps = ref([
    { label: t('step1'), to: '/cards/change-pin' },
    { label: t('step2'), to: '/cards/change-pin/pin' },
  ])

  const activeStep = ref(0)
  const goToQuetionsChangePin = () => {
    if (questionAnswerPairs.some(pair => !pair.answer.value)) {
      addToast('warn', t('somethingWentWrong'), t('mustAnswerAllQuestions'))
      return
    }
    activeStep.value = 1
  }

  const goToBack = () => {
    activeStep.value--
  }

  const handleChangesPin = async () => {
    try {
      const response = await changePinCard(cardInfo.value.cardId, pin.value, questions.value)

      showModal.value = true

      addToast('success', t('success'), response.message)
    } catch (error: any) {
      processException(toast, t, error)
    }
  }

  watch(
    () => activeStep.value,
    pageIndex => {
      router.push(steps.value[pageIndex].to)
    }
  )
  watch(pin, () => {
    if (pin.value.length > 4) {
      toast.add({
        severity: 'warn',
        summary: t('somethingWentWrong'),
        detail: t('pinLength'),
        life: 5000,
      })
    }
  })

  return {
    steps,
    activeStep,
    goToBack,
    goToQuetionsChangePin,
    showModal,
    handleChangesPin,
    isQuestionAnswerPairsValid,
  }
}
