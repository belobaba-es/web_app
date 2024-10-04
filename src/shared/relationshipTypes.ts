import { useI18n } from 'vue-i18n'

export const getRelationToBeneficiary = () => {
  const { t } = useI18n({ useScope: 'global' })

  return [
    { description: 'SELF', name: t('SELF') },
    { description: 'SPOUSE', name: t('SPOUSE') },
    { description: 'EX_SPOUSE', name: t('EX_SPOUSE') },
    { description: 'CHILDREN', name: t('CHILDREN') },
    { description: 'PARENT', name: t('PARENT') },
    { description: 'SIBLING', name: t('SIBLING') },
    { description: 'RELATIVE', name: t('RELATIVE') },
    { description: 'FRIEND', name: t('FRIEND') },
    { description: 'BUSINESS_PARTNER', name: t('BUSINESS_PARTNER') },
    { description: 'CUSTOMER', name: t('CUSTOMER') },
    { description: 'EMPLOYEE', name: t('EMPLOYEE') },
    { description: 'BRANCH_OFFICE', name: t('BRANCH_OFFICE') },
    { description: 'SUBSIDIARY_COMPANY', name: t('SUBSIDIARY_COMPANY') },
    { description: 'HOLDING_COMPANY', name: t('HOLDING_COMPANY') },
    { description: 'SUPPLIER', name: t('SUPPLIER') },
    { description: 'CREDITOR', name: t('CREDITOR') },
    { description: 'DEBTOR', name: t('DEBTOR') },
    { description: 'FRANCHISEE', name: t('FRANCHISEE') },
    { description: 'NOT_RELATED', name: t('NOT_RELATED') },
  ]
}
