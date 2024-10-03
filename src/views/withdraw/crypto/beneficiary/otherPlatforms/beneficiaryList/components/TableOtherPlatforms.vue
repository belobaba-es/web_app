<template>
  <div class="col-12 float-left">
    <DataTable
      :loading="submitting"
      :value="listBeneficiary"
      dataKey="id"
      responsiveLayout="scroll"
      style="cursor: pointer"
    >
      <Column v-for="col of columnsHeader" :key="col.field" :field="col.field" :header="col.header" />
      <template #empty>{{ t('thereAreNoResults') }}...</template>
      <Column field="assetIcon" :header="t('platform')">
        <template #body="{ data }">
          <div class="img-assets" :style="getIcon(data.assetIcon)"></div>
        </template>
      </Column>
      <Column
        :filterMenuStyle="{ width: '14rem' }"
        :showFilterMenu="false"
        field="status"
        header="Status"
        style="cursor: pointer"
      >
        <template #body="{ data }">
          <Tag :severity="colorStatusBeneficiary(data.status)" :value="data.status" class="border-radius" />
        </template>
      </Column>
      <Column>
        <template #body="slotProps">
          <div
            class="img-button"
            style="background: url('/ir_inactive.png')"
            @click="makeWithdrawalOtherPlatforms(slotProps.data)"
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
import Tag from 'primevue/tag'
import GeneralPaginator from '../../../../../../../components/GeneralPaginator.vue'
import { useI18n } from 'vue-i18n'
import { useBeneficiaryCrypto } from '../../../../composable/useBeneficiaryCrypto'
import colorStatusBeneficiary from '../../../../../helpers/colorStatusBeneficiary'

const { t } = useI18n({ useScope: 'global' })
const {
  listBeneficiary,
  columnsHeader,
  submitting,
  nextPage,
  prevPage,
  updateItemsPage,
  getIcon,
  pagination,
  makeWithdrawalOtherPlatforms,
} = useBeneficiaryCrypto()
</script>
<style scoped lang="scss">
.border-radius {
  border-radius: 20px;
  padding: 2px 16px 2px 16px;
}

.img-button {
  width: 23px;
  height: 23px;
  background-size: cover;
}

.img-assets {
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
