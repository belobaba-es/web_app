import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { NewBeneficiary } from '../../../../../type/beneficiary.type'

export const useValidateFormDomestic = () => {
  const toast = useToast()

  const { t } = useI18n({ useScope: 'global' })

  const validateDomesticBankForm = (formObject: NewBeneficiary) => {
    const bankInfo = formObject.informationBank

    const isBankNameValid = bankInfo.bankName.trim() !== ''
    const isAccountNumberValid = bankInfo.accountNumber.trim() !== ''
    const isCountryValid = bankInfo.address.country !== ''
    const isRegionValid = bankInfo.address.region.trim() !== ''
    const isCityValid = bankInfo.address.city.trim() !== ''
    const isPostalCodeValid = bankInfo.address.postalCode.trim() !== ''

    let isRoutingNumberValid
    if ('routingNumber' in bankInfo) {
      isRoutingNumberValid = bankInfo.routingNumber.trim() !== ''
    }

    if (
      !isBankNameValid ||
      !isAccountNumberValid ||
      !isRoutingNumberValid ||
      !isCountryValid ||
      !isRegionValid ||
      !isCityValid ||
      !isPostalCodeValid
    ) {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningDetailAllFieldRequired'),
        life: 4000,
      })
      return false
    }

    return true
  }

  const validateDomesticBeneficiaryForm = (formObject: any) => {
    const ownerInfo = formObject.informationOwner

    const isNameValid = ownerInfo.name.trim() !== ''
    const isProfileTypeValid = formObject.profileType !== null
    const isRelationToBeneficiaryValid =
      formObject.relationshipConsumer.trim() !== '' || formObject.relationshipConsumer === null
    const isRegionValid = ownerInfo.address.region.trim() !== ''
    const isCityValid = ownerInfo.address.city.trim() !== ''
    const isPostalCodeValid = ownerInfo.address.postalCode.trim() !== ''
    const isStreetValid = ownerInfo.address.streetOne.trim() !== ''

    if (
      !isNameValid ||
      !isProfileTypeValid ||
      !isRelationToBeneficiaryValid ||
      !isRegionValid ||
      !isCityValid ||
      !isPostalCodeValid ||
      !isStreetValid
    ) {
      toast.add({
        severity: 'warn',
        summary: t('warningAllFieldRequired'),
        detail: t('warningDetailAllFieldRequired'),
        life: 4000,
      })
      return false
    }

    return true
  }

  return {
    validateDomesticBankForm,
    validateDomesticBeneficiaryForm,
  }
}
