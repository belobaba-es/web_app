<template>

  <section class="col-12 mb-4">
    <div class="col-8">
      <label>{{ t('selectCrypto') }}</label>
      <div class="grid selectCypto mt-3" @click="modal(true)">
        <div class="col-2">
          <img width="26" :src="iconAsset"/>
        </div>
        <div class="col-8 pt-2">
          {{ nameAsset }}
        </div>
        <div class="col-2 text-right">
          <i class="pi pi-chevron-down mt-2"></i>
        </div>
      </div>
    </div>
  </section>

  <Dialog
      :visible="showModal"
      @update:visible="modal($event)"
      :modal="true"
      closeIcon="pi pi-times-circle"
      :breakpoints="{'960px': '75vw', '640px': '100vw'}" :style="{width: '50vw'}"
  >
    <template #header>
      <h3 class="font-medium">{{ t('selectCrypto') }}</h3>
    </template>
    <div class="grid">
      <div
          v-for="(item) in listAsset"
          class="col-12 grid selectCypto"
          @click="selectedAsset(item)"
      >
        <div class="col-2">
          <img width="26" :src="item.icon"/>
        </div>
        <div class="col-10 text-uppercase">
          <strong class="font-medium">{{ item.code }}</strong> {{ item.name }}
        </div>
      </div>
    </div>
  </Dialog>

</template>

<script setup lang="ts">
import {ref} from "vue"
import Dialog from 'primevue/dialog'
import {AssetsService} from "../views/deposit/services/assets"
import {Asset} from "../views/deposit/types/asset.interface"
import {useI18n} from "vue-i18n"

const showModal = ref(false)
const nameAsset = ref('Bitcoin')
const iconAsset = ref('https://storage.googleapis.com/noba-dev/798debbc-ec84-43ea-8096-13e2ebcf4749.svg')

const {t} = useI18n({useScope: 'global'})

let listAsset: Asset[]

const emit = defineEmits(['selectedAsset']);

const assetService = AssetsService.instance()
assetService.list().then(data => {
  listAsset = data as Asset[]

  for (const asset of listAsset) {
    if (asset.code === 'bitcoin') {
      selectedAsset(asset)
    }
  }
})

const modal = (b: boolean) => {
  showModal.value = b
}

const selectedAsset = (asset: Asset) => {
  emit('selectedAsset', asset)
  nameAsset.value = asset.name
  iconAsset.value = asset.icon

  showModal.value = false
}

</script>

<style scoped>
.selectCypto {
  cursor: pointer;
  border: 1px solid #ccc;
  margin-left: 0.1rem;
  padding: 6px;
  background: #F9F9F9 0% 0% no-repeat padding-box;
  border: 1px solid #ECECEC;
}

</style>