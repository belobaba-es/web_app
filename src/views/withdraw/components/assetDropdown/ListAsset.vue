<template>
  <Dropdown
    v-model="selectedAsset"
    :filter="false"
    :options="assetsPrepared"
    :placeholder="titleDropdown"
    class="w-full"
    filterBy="name, code"
    optionLabel="name"
    optionValue="code"
  >
    <template #value="slotProps">
      <div v-if="slotProps.value" class="flex align-items-center">
        <img :alt="slotProps.value.name" :src="slotProps.value.icon" class="mr-2" style="width: 24px" />
        <div>{{ slotProps.value.name }}</div>
      </div>
      <span v-else>{{ slotProps.placeholder }}</span>
    </template>

    <template #option="slotProps">
      <div class="flex align-items-center">
        <img :alt="slotProps.option.name" :src="slotProps.option.icon" class="mr-2" style="width: 24px" />
        <div>{{ slotProps.option.name }}</div>
      </div>
    </template>
  </Dropdown>
</template>

<script lang="ts" setup>
import { onMounted, ref } from 'vue'

import { Asset, AssetClassification, AssetClassificationFilter } from '../../../deposit/types/asset.interface'
import Dropdown from 'primevue/dropdown'
import { AssetsService } from '../../../deposit/services/assets'

const props = defineProps({
  assetClassificationFilter: {
    type: String,
    required: true,
  },
  titleDropdown: {
    type: String,
    required: false,
  },
})

const selectedAsset = ref(null)

const assetsPrepared = ref<Asset[]>([])

onMounted(async () => {
  const data = await new AssetsService().list()

  switch (props.assetClassificationFilter) {
    case AssetClassificationFilter.ALL:
      assetsPrepared.value = data
      break
    case AssetClassificationFilter.CRYPTO_STABLE_COIN:
      assetsPrepared.value = data.filter(asset => asset.assetClassification !== AssetClassification.FIAT)
      break
    case AssetClassificationFilter.FIAT:
      assetsPrepared.value = data.filter(asset => asset.assetClassification === AssetClassification.FIAT)
      break
  }
})
</script>

<style scoped></style>
