<template>
  <div v-if="isDomestic" class="flex mt-4 mb-6 flex-column justify-content-between align-items-center asset-item">
    <span class="mb-3 text-lg">
      {{ t('selectNetworkType') }}
    </span>

    <Dropdown
      v-model="typeNetworkBankBeneficiary"
      :highlightOnSelect="false"
      :options="networkBankOptions"
      checkmark
      class="w-full md:w-14rem"
      dataKey="code"
      optionLabel="name"
      optionValue="code"
      placeholder="Select a City"
      @change="loadMore(true)"
    />
  </div>
  <div class="container">
    <div class="flex justify-content-between align-items-center asset-item" v-for="item in listBeneficiary">
      <div class="col-8 sm:col-8 md:col-8 lg:col-8 xl:col-8">
        <span class="ml-4 mt-2 mb-2">{{ item.informationOwner.name }}</span>
        <span class="ml-4 mt-2 mb-2" :style="{ color: getBeneficiaryStatusColor(item.status) }">{{ item.status }}</span>
      </div>
      <div class="col-2 sm:col-2 md:col-2 lg:col-2 xl:col-2">
        <Button
          icon="pi pi-pencil"
          class="p-button-text p-button-primary"
          label=""
          v-tooltip.top="'Edit'"
          placeholder="Top"
          @click="setDataBeneficiary(item)"
        />
      </div>
      <div class="col-2 sm:col-2 md:col-2 lg:col-2 xl:col-2">
        <Button icon="pi pi-angle-right" label="" outlined @click="emit('select', item)" />
      </div>
    </div>

    <div class="mt-5" v-if="listNextPag > 0">
      <div class="grid flex justify-content-end">
        <div class="col-12 sm:col-12 md:col-12 lg:col-4 xl:col-4">
          <Button
            icon="pi pi-angle-right"
            iconPos="right"
            class="p-button load-more-btn w-100"
            :label="t('loadMore')"
            @click="loadMore(true)"
            :loading="submitting"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import Dropdown from 'primevue/dropdown'
import { BeneficiaryType, NetworkBank } from '../types/beneficiary.interface'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useBeneficiary } from '../composables/useBeneficiary'
import { useNewOrEditBeneficiary } from './composable/useNewOrEditBeneficiary'

const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const {
  submitting,
  listNextPag,
  listBeneficiary,
  fetchBeneficiaries,
  getBeneficiaryStatusColor,
  typeNetworkBankBeneficiary,
  networkBankOptions,
  isDomestic,
} = useBeneficiary()
const { setDataBeneficiary } = useNewOrEditBeneficiary()

const emit = defineEmits(['select'])

const loadMore = async (isFirstLoad: boolean = true) => {
  console.log(route.params.type)
  if (route.params.type === 'domestic') {
    await fetchBeneficiaries(BeneficiaryType.DOMESTIC, isFirstLoad)
    isDomestic.value = true
  } else {
    await fetchBeneficiaries(BeneficiaryType.INTERNATIONAL, isFirstLoad)
    isDomestic.value = false
  }
}

onMounted(async () => {
  typeNetworkBankBeneficiary.value = NetworkBank.WIRE

  const networkTypeParam = route.params['networkType']
  if (networkTypeParam && networkBankOptions.value.length > 0) {
    const selectedOption = networkBankOptions.value.find(option => option.code === networkTypeParam)

    if (selectedOption) {
      typeNetworkBankBeneficiary.value = selectedOption.code
      setTimeout(async () => {
        await loadMore(true)
      }, 100)
    }
    return
  }
  await loadMore(true)
})
</script>

<style lang="css" scoped>
.asset-item {
  cursor: pointer;
  border-top: 1px solid var(--surface-overlay);
  border-bottom: 1px solid var(--surface-overlay);
}

.asset-item:hover {
  background-color: var(--surface-overlay);
}
</style>
