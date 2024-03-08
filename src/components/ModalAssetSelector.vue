<template>
  <Dialog
    v-model:visible="props.showModal"
    :modal="true"
    closeIcon="pi pi-times-circle"
    class="modal-asset-selector"
    :style="{ width: '50rem' }"
  >
    <template #header>
      <h3 class="font-medium">{{ t('selectCrypto') }}</h3>
    </template>
    <div class="grid mt-2">
      <div class="col-8">
        <InputText type="text" v-model="search" placeholder="Search" class="w-full" />
      </div>
      <div class="col-4">
        <Button :label="'search'" class="w-full border-noround-left" @click="onSearch" />
      </div>
    </div>
    <ScrollPanel style="width: 100%; height: 400px" class="custom">
      <div class="grid py-3 mt-2">
        <div v-for="item in filteredListAsset" class="col-12 grid selectCypto" @click="selectedAsset(item)">
          <div class="col-2">
            <img width="30" :src="item.icon" />
          </div>
          <div class="col-10 text-uppercase">
            <strong class="font-medium">{{ item.code }}</strong> {{ item.name }}
          </div>
        </div>
      </div>
    </ScrollPanel>
  </Dialog>
</template>

<script setup lang="ts">
import Dialog from 'primevue/dialog'
import { defineProps, onMounted, ref, watch } from 'vue'
import { Asset, AssetClassification, AssetClassificationFilter } from '../views/deposit/types/asset.interface'
import { useI18n } from 'vue-i18n'
import ScrollPanel from 'primevue/scrollpanel'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { AssetsService } from '../views/deposit/services/assets'

interface Props {
  showModal: boolean
  assetClassificationFilter: AssetClassificationFilter
}

const { t } = useI18n({ useScope: 'global' })
const props = defineProps<Props>()
const emit = defineEmits(['selectedAsset'])

const assets = ref<Asset[]>([])
const assetsPrepared = ref<Asset[]>([])
const search = ref('')

const filteredListAsset = ref<Asset[]>([])

onMounted(async () => {
  await new AssetsService().list().then(data => {
    switch (props.assetClassificationFilter) {
      case AssetClassificationFilter.ALL:
        filteredListAsset.value = data
        break
      case AssetClassificationFilter.CRYPTO_STABLE_COIN:
        filteredListAsset.value = data.filter(asset => asset.assetClassification !== AssetClassification.FIAT)
        break
      default:
        filteredListAsset.value = data.filter(asset => asset.assetClassification === AssetClassification.FIAT)
        break
    }
  })

  watchSearchChange()
})

const selectedAsset = (asset: Asset) => {
  emit('selectedAsset', asset)
}

const watchSearchChange = () => {
  watch(search, newVal => {
    newVal.trim().length === 0 ? (assetsPrepared.value = assets.value) : null
  })
}

const onSearch = () => {
  const searchAsset = search.value.trim().toLowerCase()
  if (searchAsset.length === 0) {
    assetsPrepared.value = [...assets.value]
    return
  }

  const newArray: Asset[] = assets.value.filter(asset => asset.code.toLowerCase().includes(searchAsset))
  assetsPrepared.value = []

  if (!newArray) return

  assetsPrepared.value = [...newArray]
}
</script>

<style scoped>
.selectCypto {
  cursor: pointer;
  border: 1px solid #ccc;
  margin-left: 0.1rem;
  padding: 6px;
  background: #f9f9f9 0% 0% no-repeat padding-box;
  border: 1px solid #ececec;
}

.p-dialog.p-component.p-ripple-disabled.modal-asset-selector .p-dialog-content {
  overflow-y: visible !important;
}
</style>
