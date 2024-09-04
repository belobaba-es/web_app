import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { useOnboardingPersonal } from './useOnboardingPersonal'

export const useDocuments = () => {
  const { isHaveDocumentUS } = useOnboardingPersonal()
  const { t } = useI18n({ useScope: 'global' })

  const documentTypeProofOfAddress = ref([
    { value: 'monthly_utility', name: t('documentProofOfAddress1') },
    { value: 'bank_statement', name: t('documentProofOfAddress2') },
    { value: 'rental_lease_agreement', name: t('documentProofOfAddress3') },
  ])

  const documentTypeOptions = computed(() => {
    if (isHaveDocumentUS.value) {
      return [{ value: 'drivers_license', name: t('docTypeLabelDriversLicense') }]
    } else {
      return [
        { value: 'passport', name: t('docTypeLabelPassport') },
        { value: 'drivers_license', name: t('docTypeLabelDriversLicense') },
        { value: 'government_id', name: t('docTypeLabelGovernmentId') },
      ]
    }
  })

  const documentTypeIncomeDeclaration = ref([
    { value: 'payslip', name: t('documentPayslip') },
    { value: 'bank_statement', name: t('documentBankStatement') },
  ])

  return {
    documentTypeProofOfAddress,
    documentTypeOptions,
    documentTypeIncomeDeclaration,
  }
}
