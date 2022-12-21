<template>

  <section class="col-12 m-0 p-0">
    <label>{{ t('selectCrypto') }}</label>
    <div class="grid selectCypto mt-3" @click="modal(true)">
      <div class="col-2">
        <img width="26" :src="iconAsset" />
      </div>
      <div class="col-8 pt-2">
        {{ nameAsset }}
      </div>
      <div class="col-2 text-right">
        <i class="pi pi-chevron-down mt-2"></i>
      </div>
    </div>
  </section>

  <ModalAssetSelector
      :show-modal="showModal"
      @update:visible="modal($event)"
      closeIcon="pi pi-times-circle"
      @selected-asset="selectedAsset"
  />
</template>

<script setup lang="ts">
import {ref} from "vue"
import {Asset} from "../views/deposit/types/asset.interface"
import {useI18n} from "vue-i18n"
import ModalAssetSelector from "./ModalAssetSelector.vue";

const showModal = ref(false)
const nameAsset = ref('')
// const iconAsset = ref('https://storage.googleapis.com/noba-dev/798debbc-ec84-43ea-8096-13e2ebcf4749.svg')
const iconAsset = ref('')

const { t } = useI18n({ useScope: 'global' })

const emit = defineEmits(['selectedAsset']);

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