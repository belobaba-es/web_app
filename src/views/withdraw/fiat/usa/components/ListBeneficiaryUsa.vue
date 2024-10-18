<template>
  <div class="container">
    <DataTable :value="listBeneficiaryUsa" tableStyle="min-width: 50rem">
      <template #empty>
        <div class="text-center mt-4 flex flex-column align-items-center" style="position: relative; bottom: 40%">
          <p class="font-semi-bold m-0">{{ t('dontHaveBeneficiary') }}</p>
          <p class="font-extra-light m-0">{{ t('doClickInNewBeneficiary') }}</p>
        </div>
      </template>

      <Column :header="t('beneficiaryName')" class="cursor-pointer" field="holderName">
        <template #body="{ data }">
          {{ data.informationOwner.name }}
        </template>
      </Column>
      <Column :header="t('withdrawTableStatus')" field="status" style="min-width: 12rem">
        <template #body="{ data }">
          <span :style="getBeneficiaryStatusColor(data.status)" class="status">
            {{ data.status }}
          </span>
        </template>
      </Column>
      <Column v-for="col of columnsHeader" :key="col.field" :field="col.field" :header="col.header" />
      <column :header="t('edit')" field="edit">
        <template #body="{ data }">
          <Button
            v-tooltip.top="t('edit')"
            class="p-button-text p-button-secondary"
            icon="pi pi-pencil"
            @click="edit(data)"
          />
        </template>
      </column>
      <Column :header="t('withdraw')" field="withdraw">
        <template #body="{ data }">
          <div class="img-button" @click="makeWithdraw(data)"></div>
        </template>
      </Column>
    </DataTable>
    <div class="justify-content-center align-items-center flex mt-4">
      <GeneralPaginator
        v-if="listBeneficiaryUsa.length !== 0"
        :pagination="pagination"
        class="mt-4"
        @nextPage="nextPage"
        @prevPage="prevPage"
        @updateItemsPage="updateItemsPage"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Column from 'primevue/column'
import Button from 'primevue/button'
import DataTable from 'primevue/datatable'
import router from '../../../../../router/router'
import { useListBeneficiaryUsa } from '../composable/useListBeneficiaryUsa'
import { Beneficiary, NewBeneficiary } from '../../../type/beneficiary.type'
import GeneralPaginator from '../../../../../components/GeneralPaginator.vue'
import { useWithdraw } from '../../../composable/useWithdraw'
import { CounterpartyStatus, NetworkBank } from '../../../enums/beneficiary.enum'
import { useNewBeneficiaryDomestic } from './beneficiary/composable/useNewBeneficiaryDomestic'
import { useNewBeneficiaryInternational } from './beneficiary/composable/useNewBeneficiaryInternational'

const { t } = useI18n({ useScope: 'global' })

const {
  columnsHeader,
  updateItemsPage,
  pagination,
  listBeneficiaryUsa,
  getBeneficiaryStatusColor,
  nextPage,
  prevPage,
} = useListBeneficiaryUsa()

const { editBeneficiaryUsa } = useNewBeneficiaryDomestic()
const { editBeneficiaryUsaSwift } = useNewBeneficiaryInternational()

const { prepareFormData, resetFormWithdrawal } = useWithdraw()

const makeWithdraw = (item: Beneficiary) => {
  if (item.status !== CounterpartyStatus.ACTIVE) return
  resetFormWithdrawal()
  prepareFormData(item)
  router.push(`/withdraw/fiat/usa/make-withdraw/${item.informationBank.networkBank}`)
}

const edit = (item: NewBeneficiary) => {
  if (item.status !== CounterpartyStatus.ACTIVE) return
  if (item.informationBank.networkBank === NetworkBank.SWIFT) {
    editBeneficiaryUsaSwift(item)
  } else {
    editBeneficiaryUsa(item)
  }
}
</script>

<style lang="scss" scoped>
.asset-item {
  cursor: pointer;
  border-top: 1px solid var(--surface-overlay);
  border-bottom: 1px solid var(--surface-overlay);
}

.asset-item:hover {
  background-color: var(--surface-overlay);
}

.header-tablet {
  color: var(--primary-color);
  font-size: 14px;
}

.img-button {
  width: 23px;
  height: 23px;
  background: url('/ir_inactive.png') !important;
  background-size: cover;
  cursor: pointer;
}

.img-button:hover,
.img-button:active,
.img-button:focus {
  background: url('/ir_active.png') !important;
}

.status {
  color: #1b1b19;
  padding: 2px 16px 2px 16px;
  border-radius: 25px;
  font-size: 12px;
}
</style>
