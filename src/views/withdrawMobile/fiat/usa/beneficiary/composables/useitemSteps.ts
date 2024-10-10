import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useItemSteps = () => {
  const { t } = useI18n({ useScope: 'global' })

  const itemStepsInternational = ref<Array<{ label: string; to: string }>>([])
  itemStepsInternational.value.push(
    {
      label: t('modalTextAccount'),
      to: `/withdraw/fiat/usa/swift/new-beneficiary`,
    },
    {
      label: t('labelDataBeneficiary'),
      to: `/withdraw/fiat/usa/swift/new-beneficiary/step-data-beneficiary`,
    },
    {
      label: t('intermediaryBank'),
      to: `/withdraw/fiat/usa/swift/new-beneficiary/bank-intermediary`,
    }
  )
  return {
    itemStepsInternational,
  }
}
