<template>
  <div class="flex">
    <div class="col flex" style="cursor: pointer">
      <h3 class="font-regular m-0">
        <BackButtonMobile :subtitle="t('withdrawWireListBeneficiary')" :title="t('uniteState')" />
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

  <div class="card ml-4 float-left w-full border">
    <div class="flex flex-wrap">
      <div class="flex-auto">
        <p class="font-regular text-2xl m-0">{{ t('withdrawWireLocalText2') }}</p>
      </div>

      <div class="flex justify-content-between">
        <InputSearch :onSearch="handleSearch" :placeholder="t('searchBeneficiary')" />
      </div>
    </div>
    <ListBeneficiaryUsa v-if="!submitting" @select="onSelect($event)" />
    <TableOtherPlatformsListSkeleton v-if="submitting" />
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'
import router from '../../../../router/router'
import ListBeneficiaryUsa from './components/ListBeneficiaryUsa.vue'
import { Beneficiary } from '../../type/beneficiary.type'
import { CounterpartyStatus } from '../../enums/beneficiary.enum'
import InputSearch from '../../components/inputSearch/InputSearch.vue'
import { useListBeneficiaryUsa } from './composable/useListBeneficiaryUsa'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import TableOtherPlatformsListSkeleton from '../../crypto/beneficiary/otherPlatforms/beneficiaryList/components/TableOtherPlatformsListSkeleton.vue'
import { onMounted } from 'vue'
import { useWithdraw } from '../../composable/useWithdraw'
import { useWorld } from '../../../../composables/useWorld'

const { t } = useI18n({ useScope: 'global' })
const { beneficiaryUsaSearch, submitting, listBeneficiaryUsa, fetchBeneficiariesUsa } = useListBeneficiaryUsa()
const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])
const toast = useToast()
const { clearTransactionData } = useWithdraw()

const { countryAllowedForUSA, fetchCountryAllowUsa } = useWorld()

onMounted(() => {
  if (listBeneficiaryUsa.value.length === 0) {
    fetchBeneficiariesUsa(true)
  }
  if (countryAllowedForUSA.value.length === 0) fetchCountryAllowUsa()
  clearTransactionData()
})

const toBack = () => {
  router.back()
}

const newBeneficiary = () => {
  return router.push(`/withdraw/fiat/usa/withdraw-type`)
}
const handleSearch = (searchText: string) => {
  beneficiaryUsaSearch(searchText)
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
  font-family: KanitMedium, serif;
}

.border {
  border: 1px solid var(--primary-color);
}
</style>
