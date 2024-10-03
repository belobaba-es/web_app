<template>
  <section class="p-3">
    <BackButtonMobile :title="t('otherPlatforms')" :subtitle="t('withdrawWireListBeneficiary')" />
    <div class="grid">
      <div class="col-12">
        <p class="text-center" style="font-size: 14px">{{ t('selectBeneficiary') }}</p>
      </div>
      <div class="col-12">
        <Button
          class="btn btn-primary text-center w-full font-semi-bold"
          style="font-size: 14px"
          @click="goToCreateBeneficiary()"
          ><i class="pi pi-plus pr-2" style="font-size: 1rem"></i> {{ t('addNewBeneficiaryText') }}
        </Button>
      </div>
    </div>

    <div class="mt-3 container-crypto-mobil">
      <BeneficiaryListingTable
        :pagination="pagination"
        :data="dataTable"
        :placeholder="t('searchBeneficiary')"
        @searchNextPage="searchNextPage"
        @searchPrevPage="searchPrevPage"
        @searchUpdatePageRange="searchUpdatePageRange"
        @onSearch="handleSearch"
        @onChange="handleChange"
        @editBeneficiary="setDataBeneficiary"
        @makeWithdrawal="makeWithdrawalOtherPlatforms"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import BeneficiaryListingTable from '../../../../components/BeneficiaryListingTable.vue'
import { useListBeneficiariesOtherPlatforms } from '../../composables/useListBeneficiariesOtherPlatforms'
import BackButtonMobile from '../../../../../../components/BackButtonMobile.vue'

const { t } = useI18n({ useScope: 'global' })
const {
  pagination,
  dataTable,
  handleSearch,
  handleChange,
  searchNextPage,
  searchPrevPage,
  searchUpdatePageRange,
  goToCreateBeneficiary,
  setDataBeneficiary,
  makeWithdrawalOtherPlatforms,
} = useListBeneficiariesOtherPlatforms()
</script>
<style scoped lang="scss">
.p-button {
  display: inline !important;
}
</style>
