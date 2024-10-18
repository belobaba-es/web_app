<template>
  <div class="flex">
    <div class="col flex" style="cursor: pointer">
      <h3 class="font-regular m-0">
        <BackButtonMobile :subtitle="t('withdrawWireListBeneficiary')" :title="t('Panama')" />
      </h3>
    </div>
    <div class="col flex justify-content-end">
      <div>
        <Button :label="t('newBeneficiary')" icon="pi pi-plus" @click="newBeneficiary" />
      </div>
    </div>
  </div>

  <div class="ml-4 mt-4">
    <h3>{{ t('withdrawWireLocalText') }}</h3>
  </div>

  <div class="card ml-4" style="border: 1px solid var(--primary-color)">
    <div class="flex flex-wrap">
      <div class="flex-auto">
        <p class="font-regular text-2xl m-0">{{ t('withdrawWireLocalText2') }}</p>
      </div>

      <div class="flex justify-content-between">
        <InputSearch :onChange="handleChange" :onSearch="handleSearch" :placeholder="t('searchBeneficiary')" />
      </div>
    </div>

    <div class="mt-5">
      <ListBeneficiaryPanama @select="onSelect($event)" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import router from '../../../../router/router'
import { Beneficiary } from '../../type/beneficiary.type'
import { CounterpartyStatus } from '../../enums/beneficiary.enum'
import InputSearch from '../../components/inputSearch/InputSearch.vue'
import { useBeneficiaryPanama } from './composable/useBeneficiaryPanama'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import { useNewBeneficiaryPanama } from './composable/useNewBeneficiaryPanama'
import ListBeneficiaryPanama from './components/ListBeneficiaryPanama.vue'

const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])
const toast = useToast()
const { beneficiaryPanamaSearch, handleChange, submitting, fetchBeneficiariesAchPanama, listBeneficiaryAchPanama } =
  useBeneficiaryPanama()
const { resetFormPanama } = useNewBeneficiaryPanama()
const toBack = () => {
  router.back()
}

const newBeneficiary = () => {
  resetFormPanama()
  return router.push(`panama/wire-local`)
}

const handleSearch = (searchText: string) => {
  beneficiaryPanamaSearch(searchText)
}
const onSelect = (item: Beneficiary) => {
  if (item.status === CounterpartyStatus.PENDING) {
    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: t('beneficiaryPending'),
      life: 8000,
    })

    return
  }

  if (item.status === CounterpartyStatus.REJECTED) {
    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: t('beneficiaryRejected'),
      life: 8000,
    })

    return
  }

  if (item.status === CounterpartyStatus.ACTIVE) {
    const page = 0
    const formData = {
      beneficiary: item,
    }
    emit('update:beneficiary', item)
    emit('nextPage', {
      pageIndex: page,
      formData: formData,
    })
  }
}
</script>

<style lang="scss" scoped>
.p-datatable .p-datatable-thead > tr > th {
  color: var(--primary-color);
  font-family: RedHatDisplayMedium, serif;
}
</style>
