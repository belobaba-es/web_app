<template>
  <Dialog
    :visible="visible"
    @update:visible="emit('update:visible', $event)"
    :modal="true"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    :style="{ width: '35vw' }"
  >
    <template #header>
      <h3></h3>
    </template>
    <div class="grid" style="padding: 0 3rem">
      <div class="col-6 mt-3">
        <img width="140" :src="asset?.icon" alt="" />
        <p class="text-base mt-3">{{ asset?.name }}</p>
        <p class="text-base font-bold">{{ paymentAddress?.label }}</p>
        <small class="font-medium">{{ asset?.code }}</small>
      </div>
      <div class="col-6 justify-content-end flex">
        <img height="150" :src="paymentAddress?.qr" alt="" />
      </div>
      <div class="col-12">
        <Message severity="warn" :closable="false">
          {{ t('warningSendAsset', { asset: asset?.name }) }}
        </Message>
      </div>
      <div class="col-12">
        <div class="p-inputgroup">
          <InputText readonly="true" :placeholder="t('walletAddress')" :value="paymentAddress?.address" />
          <span
            @click="copyToClipboardWalletAddress(paymentAddress?.address)"
            class="p-inputgroup-addon btn-copy-to-clipboard"
          >
            <i class="pi pi-copy"></i>
          </span>
        </div>
      </div>
    </div>

    <template #footer>
      <Button class="mt-2" :label="t('done')" icon="pi pi-check" autofocus @click="emit('update:visible', false)" />
    </template>
  </Dialog>
</template>

<script lang="ts" setup>
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import { useToast } from 'primevue/usetoast'
import { Asset, PaymentAddress } from '../types/asset.interface'

defineProps<{
  visible: boolean
  walletAddress?: string
  asset: Asset | null
  paymentAddress: PaymentAddress | null
}>()

const emit = defineEmits(['update:visible'])
const { t } = useI18n({ useScope: 'global' })

const value = ref('')
const toast = useToast()

const copyToClipboardWalletAddress = (walletAddress: string | undefined) => {
  if (walletAddress) {
    navigator.clipboard.writeText(walletAddress)
    toast.add({
      severity: 'success',
      summary: t('successfulOperation'),
      detail: t('textCopySuccessful'),
      life: 3000,
    })
  }
}
</script>

<style lang="css" scoped>
.p-message.p-message-warn {
  background: #ffee002b;
  border: solid #ffcd00;
  border-top-width: medium;
  border-right-width: medium;
  border-bottom-width: medium;
  border-left-width: medium;
  border-width: 1px 1px 1px 1px;
  color: #000000;
  border-radius: 13px;
}

.btn-copy-to-clipboard {
  cursor: pointer;
}
</style>
