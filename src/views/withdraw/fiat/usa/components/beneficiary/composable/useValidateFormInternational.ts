import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import countryCounterpartyType from '../../../../../../../shared/jsons/countryCounterpartyType.json'
import countrycounterpartytype from '../../../../../../../shared/jsons/countryCounterpartyType.json'
import { useWorld } from '../../../../../../../composables/useWorld'

export const useValidateFormInternational = () => {
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })

  const { findCountryByCodeCountry } = useWorld()
  const requiresIbanAndSwift = (countryType: string) => {
    return countryCounterpartyType.includes(countryType)
  }

  const validateAccountBeneficiaryForm = (formObject: any) => {
    const bankInfo = formObject.informationBank
    const isBankNameValid = bankInfo.bankName.trim() !== ''
    const isCityValid = bankInfo.address.city.trim() !== ''
    const isRegionValid = bankInfo.address.region.trim() !== ''
    const isPostalCodeValid = bankInfo.address.postalCode.trim() !== ''
    const isStreetValid = bankInfo.address.streetOne.trim() !== ''

    let isIbanValid = true
    let isSwiftCodeValid = true
    let isAccountNumberValid = true

    const countryAllowUsa = validatedIban(bankInfo.address.country)
    if (countryAllowUsa) {
      if (countrycounterpartytype.includes(countryAllowUsa.counterpartyType)) {
        isIbanValid = bankInfo.iban.trim() !== ''
        isSwiftCodeValid = bankInfo.swiftCode.trim() !== ''
      }
    }

    if (
      !isBankNameValid ||
      !isAccountNumberValid ||
      !isCityValid ||
      !isRegionValid ||
      !isPostalCodeValid ||
      !isStreetValid ||
      !isIbanValid ||
      !isSwiftCodeValid
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
  const validatedIban = (countryCode: string) => {
    return findCountryByCodeCountry(countryCode)
  }
  const validateDataInformationBankForm = (formObject: any) => {
    let isIbanValid = true
    let isSwiftCodeValid = true
    let isAccountNumberValid = true
    const isBankNameValid = formObject.informationBank.bankName.trim() !== ''
    const countryAllowUsa = validatedIban(formObject.informationBank.address.country)
    if (countryAllowUsa) {
      if (countrycounterpartytype.includes(countryAllowUsa.counterpartyType)) {
        isIbanValid = formObject.informationBank.iban.trim() !== ''
        isSwiftCodeValid = formObject.informationBank.swiftCode.trim() !== ''
      }
    }

    if (!isIbanValid) {
      messageError()
      return false
    }
    if (!isAccountNumberValid) {
      messageError()
      return false
    }

    if (!isSwiftCodeValid || !isBankNameValid) {
      messageError()
      return false
    }
    return true
  }
  const messageError = () => {
    toast.add({
      severity: 'warn',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
  const validateDataBeneficiaryForm = (formObject: any) => {
    const isBeneficiaryNameValid = formObject.informationOwner.name.trim() !== ''
    const isProfileTypeValid = formObject.profileType.trim() !== ''
    const isRelationToBeneficiaryValid =
      formObject?.relationshipConsumer.trim() !== '' || formObject.relationshipConsumer === null

    const isCountryValid = formObject.informationOwner.address.country.trim() !== ''
    const isRegionValid = formObject.informationOwner.address.region.trim() !== ''
    const isCityValid = formObject.informationOwner.address.city.trim() !== ''
    const isPostalCodeValid = formObject.informationOwner.address.postalCode.trim() !== ''
    const isStreetValid = formObject.informationOwner.address.streetOne.trim() !== ''

    if (
      !isBeneficiaryNameValid ||
      !isProfileTypeValid ||
      !isRelationToBeneficiaryValid ||
      !isCountryValid ||
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

  const validateIntermediaryBankForm = (formObject: any) => {
    const isBankNameValid = formObject.informationIntermediaryBank?.bankName?.trim() !== ''
    const isSwiftCodeValid = formObject.informationIntermediaryBank?.swiftCode?.trim() !== ''
    const isCountryValid = formObject.informationIntermediaryBank?.address?.country?.trim() !== ''
    const isCityValid = formObject.informationIntermediaryBank?.address?.city?.trim() !== ''
    const isRegionValid = formObject.informationIntermediaryBank?.address?.region?.trim() !== ''
    const isPostalCodeValid = formObject.informationIntermediaryBank?.address?.postalCode?.trim() !== ''
    const isStreetValid = formObject.informationIntermediaryBank?.address?.streetOne?.trim() !== ''

    if (
      !isBankNameValid ||
      !isSwiftCodeValid ||
      !isCountryValid ||
      !isCityValid ||
      !isRegionValid ||
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
    validateAccountBeneficiaryForm,
    validateDataBeneficiaryForm,
    validateIntermediaryBankForm,
    validateDataInformationBankForm,
  }
}
