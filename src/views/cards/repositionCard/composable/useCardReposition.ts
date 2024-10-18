import { createRepositionCard } from '../../services/nobaCard.service'
import { useToast } from 'primevue/usetoast'
import router from '../../../../router/router'
import { processException } from '../../../../shared/processException'
import { useI18n } from 'vue-i18n'
import { useOnboardingCard } from '../../composables/useOnboardingCard'
import { ref } from 'vue'
import { OnboardingRepositionCard } from '../../types/onboardingRequest.type'
import { useAuth } from '../../../../composables/useAuth'

const loading = ref<boolean>(false)
export const useCardReposition = () => {
  const { typeCardSelect } = useOnboardingCard()

  const { getClientId } = useAuth()

  const sendingDataCard = ref<OnboardingRepositionCard>({
    clientId: getClientId(),
    cardModality: typeCardSelect.value,
    currency: 'EUR',
  })
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const handleRepositionVirtualCard = async () => {
    loading.value = true
    try {
      const response = await createRepositionCard(sendingDataCard.value)
      useToast().add({ severity: 'success', summary: 'Success', detail: response })
      await router.push('/cards/onboarding/reposition/confirmation')
      loading.value = false
    } catch (e: any) {
      processException(toast, t, e)
      await router.push('/cards/onboarding/reposition/denied')
      loading.value = false
    }
  }

  const handleRepositionPhysicalCard = () => {
    router.push('/cards/onboarding/reposition/pysical')
  }

  return {
    handleRepositionVirtualCard,
    handleRepositionPhysicalCard,
    loading,
  }
}
