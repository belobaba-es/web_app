import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useEmployment = () => {
  const { t } = useI18n({ useScope: 'global' })

  const employmentStatusList = ref([
    { value: 'EMPLOYEE', name: t('employmentStatusEmployed') },
    { value: 'SELF_EMPLOYED', name: t('employmentStatusSelfEmployed') },
    { value: 'RETIRED', name: t('employmentStatusRetired') },
    { value: 'UNEMPLOYED', name: t('employmentStatusUnemployed') },
  ])

  return {
    employmentStatusList,
  }
}
