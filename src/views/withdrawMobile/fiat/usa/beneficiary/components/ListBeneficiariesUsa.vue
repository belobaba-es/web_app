<template>
  <section class="p-4">
    <BackButtonMobile :subtitle="t('withdrawWireListBeneficiary')" :title="t('typeWithdrawUsa')" />
    <div class="grid mt-3">
      <div class="col-12">
        <p class="mb-0" style="font-size: 14px">{{ t('withdrawWireLocalText') }}</p>
      </div>
      <div class="col-12 mb-4">
        <Button
          class="btn btn-primary text-center w-full font-semi-bold"
          style="font-size: 14px"
          @click="newBeneficiary()"
          ><i class="pi pi-plus pr-2" style="font-size: 1rem"></i> {{ t('newBeneficiary') }}
        </Button>
      </div>
    </div>

    <div class="mt-3 container-crypto-mobil">
      <BeneficiaryListingTable
        :data="dataTable"
        :pagination="pagination"
        :placeholder="t('searchBeneficiary')"
        @editBeneficiary="editBeneficiaryMobile"
        @makeWithdrawal="makeWithdrawalUsa"
        @onSearch="beneficiaryUsaSearch"
        @searchNextPage="nextPage"
        @searchPrevPage="prevPage"
        @searchUpdatePageRange="null"
      />
    </div>
  </section>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import BeneficiaryListingTable from '../../../../components/BeneficiaryListingTable.vue'
import BackButtonMobile from '../../../../../../components/BackButtonMobile.vue'
import { useListBeneficiaryUsa } from '../../../../../withdraw/fiat/usa/composable/useListBeneficiaryUsa'
import { useListBeneficiaryUsaMobile } from '../composables/useListBeneficiaryUsaMobile'
import router from '../../../../../../router/router'
import { Beneficiary, NewBeneficiary } from '../../../../../withdraw/type/beneficiary.type'
import { useWithdraw } from '../../../../../withdraw/composables/useWithdraw'
import { useBeneficiary } from '../../../../composables/useBeneficiary'
import { onMounted } from 'vue'
import { useWorld } from '../../../../../../composables/useWorld'
import { useNewBeneficiaryDomestic } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryDomestic'
import { CounterpartyStatus, NetworkBank } from '../../../../../withdraw/enums/beneficiary.enum'
import { useNewBeneficiaryInternational } from '../../../../../withdraw/fiat/usa/components/beneficiary/composable/useNewBeneficiaryInternational'

const { t } = useI18n({ useScope: 'global' })

const { pagination, nextPage, prevPage, beneficiaryUsaSearch } = useListBeneficiaryUsa()
const { clearTransactionData } = useWithdraw()
const { editBeneficiaryUsa } = useNewBeneficiaryDomestic()
const { editBeneficiaryUsaSwift } = useNewBeneficiaryInternational()

const { dataBeneficiaryWithdrawal, prepareFormData } = useWithdraw()
const { dataTable } = useListBeneficiaryUsaMobile()
const { showsStepTwoFirstPart, isShowRestFormBankData, isShowRestFormIntermediary } = useBeneficiary()
const { countryAllowedForUSA, fetchCountryAllowUsa } = useWorld()
const newBeneficiary = () => {
  return router.push(`/withdraw/fiat/usa/withdraw-type`)
}

const makeWithdrawalUsa = (beneficiaryUsa: Beneficiary) => {
  if (beneficiaryUsa.status !== CounterpartyStatus.ACTIVE) return

  dataBeneficiaryWithdrawal.value = beneficiaryUsa
  prepareFormData(beneficiaryUsa)
  return router.push(`/withdraw/fiat/usa/withdraw`)
}

const editBeneficiaryMobile = (item: NewBeneficiary) => {
  if (item.status !== CounterpartyStatus.ACTIVE) return

  if (item.informationBank.networkBank === NetworkBank.SWIFT) {
    editBeneficiaryUsaSwift(item)
  } else {
    editBeneficiaryUsa(item)
  }
}

showsStepTwoFirstPart.value = true
isShowRestFormBankData.value = false
isShowRestFormIntermediary.value = false

onMounted(async () => {
  if (countryAllowedForUSA.value.length === 0) await fetchCountryAllowUsa()
  clearTransactionData()
})
</script>
<style lang="scss" scoped>
.p-button {
  display: inline !important;
}
</style>
