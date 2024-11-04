<template>
  <Dialog
    :visible="display"
    @update:visible="emit('update:display', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
  >
    <template #header>
      <img src="../../../assets/icons/ewallet.svg" alt="" height="50" />
    </template>
    <div class="formgrid grid mt-3">
      <div class="col-12">
        <span class="text-xl txt-border-bottom mb-2 black-bold-text">{{ t('newWallet') }}</span>
        <div>
          <Divider></Divider>
        </div>
      </div>
      <div class="field col-12 mt-4">
        <SelectedAssets @selectedAsset="selectAsset" :asset-classification-filter="AssetClassificationFilter.ALL" />
      </div>
    </div>

    <template #footer>
      <Button
        class="mt-2"
        :label="t('createWallet')"
        autofocus
        @click="onCreate"
        icon="pi pi-angle-right"
        :loading="submitting"
      />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { Asset, AssetClassificationFilter } from '../types/asset.interface'
import SelectedAssets from '../../../components/SelectedAssets.vue'
import { AssetsService } from '../services/assets'
import { useToast } from 'primevue/usetoast'
import Divider from 'primevue/divider'
import { processException } from '../../../shared/processException'

defineProps<{
  display: boolean
  assetSelect: Asset | null
}>()

const toast = useToast()
const assetSelect = ref<Asset>()
const label = ref('')
const submitting = ref(false)
const emit = defineEmits(['update:asset-select', 'update:display', 'create'])
const { t } = useI18n({ useScope: 'global' })

const onCreate = () => {
  submitting.value = true
  new AssetsService()
    .paymentAddress({ label: '', assetCode: assetSelect.value?.code, assetId: assetSelect.value?.assetId! })
    .then(resp => {
      submitting.value = false

      emit('create', {})

      toast.add({
        severity: 'info',
        summary: '',
        detail: resp.message,
        life: 8000,
      })
    })
    .catch(e => {
      submitting.value = false
      processException(toast, t, e)
    })
}

const selectAsset = (asset: Asset) => {
  assetSelect.value = asset
}
</script>

<style lang="css" scoped>
.black-bold-text {
  font-weight: 800;
  color: black;
}

.p-divider-solid.p-divider-horizontal:before {
  border-color: var(--primary-color);
}
</style>
