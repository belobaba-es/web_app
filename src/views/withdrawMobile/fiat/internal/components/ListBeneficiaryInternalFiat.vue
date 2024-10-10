<template>
  <section class="p-4">
    <BackButtonMobile :title="t('fiat') + '/' + t('walletNob')" :subtitle="t('withdrawWireListBeneficiary')" />
    <BeneficiaryListingTable
      :pagination="pagination"
      :data="dataTable"
      :placeholder="t('searchBeneficiaryByEmail')"
      @searchNextPage="searchNextPage"
      @searchPrevPage="searchPrevPage"
      @searchUpdatePageRange="searchUpdatePageRange"
      @onSearch="handleSearch"
      @onChange="handleChange"
      @editBeneficiary="null"
      @makeWithdrawal="makeWithdrawalInternal"
    />
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import BeneficiaryListingTable from '../../../components/BeneficiaryListingTable.vue'
import BackButtonMobile from '../../../../../components/BackButtonMobile.vue'
import { useListBeneficiaryInternalFiat } from '../composable/useListBeneficiaryInternalFiat'

const { t } = useI18n({ useScope: 'global' })
const {
  pagination,
  dataTable,
  handleSearch,
  handleChange,
  searchNextPage,
  searchPrevPage,
  searchUpdatePageRange,
  makeWithdrawalInternal,
} = useListBeneficiaryInternalFiat()
</script>
<style scoped lang="scss"></style>
