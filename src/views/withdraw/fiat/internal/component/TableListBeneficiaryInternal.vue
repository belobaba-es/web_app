<template>
  <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left mb-3 container-search-text">
    <InputSearch :onChange="handleChange" :onSearch="onSearch" :placeholder="t('searchBeneficiaryByEmail')" />
  </div>
  <div class="col-12 float-left w-full">
    <DataTable :loading="loading" :value="listInternalBeneficiary" dataKey="id" style="cursor: pointer">
      <Column v-for="col of columnsInternalHeader" :key="col.field" :field="col.field" :header="col.header" />
      <template #empty> Sin datos...</template>
      <Column>
        <template #body="slotProps">
          <div
            class="img-button"
            style="background: url('/ir_inactive.png'); float: right"
            @click="makeWithdrawalInternal(slotProps.data)"
          ></div>
        </template>
      </Column>
    </DataTable>
    <div class="justify-content-center align-items-center flex mt-5" style="width: 100%">
      <GeneralPaginator
        :pagination="pagination"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @updateItemsPage="updateItemsPage"
      />
    </div>
  </div>
</template>
<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import { useI18n } from 'vue-i18n'
import { useListBeneficiaryInternal } from '../composable/useListBeneficiaryInternal'
import GeneralPaginator from '../../../../../components/GeneralPaginator.vue'
import InputSearch from '../../../components/inputSearch/InputSearch.vue'
import { watch } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const {
  listInternalBeneficiary,
  columnsInternalHeader,
  loading,
  makeWithdrawalInternal,
  onSearch,
  handleChange,
  updateItemsPage,
  prevPage,
  nextPage,
  pagination,
} = useListBeneficiaryInternal()

watch(listInternalBeneficiary, newVal => {
  console.log('listInternalBeneficiary', newVal)
  listInternalBeneficiary.value = newVal
})
</script>
<style lang="scss" scoped>
.border-radius {
  border-radius: 20px;
  padding: 2px 16px 2px 16px;
}

.img-button {
  width: 23px;
  height: 23px;
  background-size: cover;
}

.img-button:hover,
.img-button:active,
.img-button:focus {
  background: url('/ir_active.png') !important;
}

.p-datatable .p-datatable-tbody > tr:hover {
  background-color: #d32f2f !important;
}

.hover {
  background-color: #d32f2f;
}
</style>
