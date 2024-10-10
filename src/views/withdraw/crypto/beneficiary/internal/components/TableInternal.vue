<template>
  <div class="col-12 float-left">
    <DataTable
      :loading="loading"
      :value="listInternalBeneficiary"
      dataKey="id"
      responsiveLayout="scroll"
      style="cursor: pointer"
    >
      <Column v-for="col of columnsInternalHeader" :key="col.field" :field="col.field" :header="col.header" />
      <template #empty> {{ t('thereAreNoResults') }}...</template>
      <Column>
        <template #body="slotProps">
          <div
            class="img-button"
            style="background: url('/ir_inactive.png')"
            @click="makeWithdrawalInternal(slotProps.data)"
          ></div>
        </template>
      </Column>
    </DataTable>
  </div>
  <div class="justify-content-center align-items-center flex mt-5" style="width: 100%">
    <GeneralPaginator
      :pagination="pagination"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @updateItemsPage="updateItemsPage"
    />
  </div>
</template>
<script lang="ts" setup>
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import GeneralPaginator from '../../../../../../components/GeneralPaginator.vue'
import { useInternalBeneficiary } from '../../../composable/useInternalBeneficiary'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const {
  listInternalBeneficiary,
  columnsInternalHeader,
  loading,
  pagination,
  nextPage,
  prevPage,
  updateItemsPage,
  makeWithdrawalInternal,
} = useInternalBeneficiary()
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
