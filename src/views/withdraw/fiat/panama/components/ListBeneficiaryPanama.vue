<template>
  <div class="container">
    <SkeletonListPanama v-if="submitting" />

    <DataTable v-if="!submitting" :value="listBeneficiaryAchPanama" tableStyle="min-width: 50rem">
      <template #empty>
        <div class="text-center mt-4 flex flex-column align-items-center" style="position: relative; bottom: 40%">
          <p class="font-semi-bold m-0">{{ t('dontHaveBeneficiary') }}</p>
          <p class="font-extra-light m-0">{{ t('doClickInNewBeneficiary') }}</p>
        </div>
      </template>

      <Column :header="t('beneficiaryName')" class="cursor-pointer" field="holderName">
        <template #body="slotProps">
          <p @click="beneficiary(slotProps.data)">{{ slotProps.data.holderName }}</p>
        </template>
      </Column>
      <Column :header="t('withdrawTableStatus')" field="status">
        <template #body="slotProps">
          <div>
            <span :style="getBeneficiaryStatusColor(slotProps.data.status)" class="status">
              {{ slotProps.data.status }}
            </span>
          </div>
        </template>
      </Column>
      <Column :header="t('typeNetwork')" field="label" />
      <Column :header="t('countryLabel')" field="category" />
      <Column :header="t('edit')" field="category">
        <template #body="slotProps">
          <div>
            <Button
              v-tooltip.top="'Edit'"
              class="p-button-text p-button-secondary"
              icon="pi pi-pencil"
              label=""
              placeholder="Top"
              @click="setDataBeneficiary(slotProps.data)"
            />
          </div>
        </template>
      </Column>
      <Column :header="t('withdraw')" field="withdraw">
        <template #body="{ data }">
          <div class="img-button" @click="data.status !== CounterpartyStatus.REJECTED ? beneficiary(data) : null"></div>
        </template>
      </Column>
    </DataTable>

    <GeneralPaginator
      v-if="listBeneficiaryAchPanama.length !== 0"
      :pagination="pagination"
      class="mt-4"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @updateItemsPage="updateItemsPage"
    />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { useBeneficiaryPanama } from '../composable/useBeneficiaryPanama'
import { useNewBeneficiaryPanama } from '../composable/useNewBeneficiaryPanama'
import Column from 'primevue/column'
import DataTable from 'primevue/datatable'
import { onMounted } from 'vue'
import router from '../../../../../router/router'
import GeneralPaginator from '../../../../../components/GeneralPaginator.vue'
import { BeneficiaryAchPanama } from '../../../type/beneficiary.type'
import { useWithdraw } from '../../../composable/useWithdraw'
import SkeletonListPanama from './SkeletonListPanama.vue'
import { CounterpartyStatus } from '../../../enums/beneficiary.enum'

const { t } = useI18n({ useScope: 'global' })

const {
  submitting,
  listBeneficiaryAchPanama,
  nextPage,
  prevPage,
  pagination,
  updateItemsPage,
  getBeneficiaryStatusColor,
  fetchBeneficiariesAchPanama,
} = useBeneficiaryPanama()
const { setDataBeneficiary } = useNewBeneficiaryPanama()
const { prepareFormDataPanama } = useWithdraw()

const beneficiary = (item: BeneficiaryAchPanama) => {
  prepareFormDataPanama(item)
  router.push('/withdraw/fiat/panama/withdraw-local')
}

onMounted(async () => {
  if (listBeneficiaryAchPanama.value.length === 0) {
    await fetchBeneficiariesAchPanama(true)
  }
})
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
