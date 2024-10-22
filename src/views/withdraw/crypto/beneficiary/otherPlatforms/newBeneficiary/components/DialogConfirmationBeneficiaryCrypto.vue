<template>
  <Dialog
    :show-header="false"
    :visible="isOpen"
    class="dialog-confirmation-beneficiary"
    style="border-radius: 20px"
    @update:visible="emit('update:display', $event)"
  >
    <div class="p-dialog-header-icons w-full justify-content-end p-2 float-right" style="position: relative; top: 7px">
      <button
        aria-label="Close"
        class="p-dialog-header-icon p-dialog-header-close p-link p-2"
        type="button"
        @click="closeModal"
      >
        <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
      </button>
    </div>
    <div class="items-center p-3 bg-surface-0 dark:bg-surface-900 rounded">
      <p
        class="font-semi-bold text-2xl block m-0 mt-6 text-center px-5"
        style="font-size: 20px; color: var(--primary-color)"
      >
        {{ t('beneficiaryCreated') }}
      </p>
      <p class="m-0 text-center px-5">{{ t('waitForEmail') }}</p>
      <div class="mt-4">
        <Message :closable="false" class="my-0" severity="warn">
          {{ t('warningSendAsset', { asset: assetName }) }}
        </Message>
      </div>

      <div class="flex justify-content-around gap-2 mt-6">
        <Button :label="t('accept')" :loading="submitting" class="w-10rem" @click="openModal()" />
      </div>
    </div>
  </Dialog>
</template>
<script setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import Dialog from 'primevue/dialog'
import Message from 'primevue/message'
import { useRouter } from 'vue-router'
import { useBeneficiaryCrypto } from '../../../../composable/useBeneficiaryCrypto'

const props = defineProps({
  isOpen: Boolean,
})
const router = useRouter()

const { t } = useI18n({ useScope: 'global' })
const { submitting, assetName } = useBeneficiaryCrypto()

const emit = defineEmits(['update:visible'])

const closeModal = () => {
  emit('update:visible', false)
}

const openModal = () => {
  emit('update:visible', false)
  router.push('/withdraw/crypto/other-platforms/beneficiary')
}
</script>

<style lang="scss" scoped>
.p-dialog .p-dialog-content:last-of-type {
  border-radius: 0 0 20px 20px !important;
}

.p-dialog.p-component.p-ripple-disabled.p-confirm-dialog > .p-dialog-header > #pv_id_4_header {
  font-size: 20px !important;
  color: var(--primary-color) !important;
  font-family: RedHatDisplayMedium, serif !important;
  justify-content: center;
  text-align: center;
}

.p-dialog.p-component.p-ripple-disabled.p-confirm-dialog > .p-dialog-content > .p-confirm-dialog-message {
  font-size: 16px;
  color: #000 !important;
  font-family: KanitRegular, serif !important;
  text-align: center;
  justify-content: center;
}

.p-message.p-message-warn {
  background: #ffee002b !important;
  border: medium solid #d3f3e5 !important;
  color: #000000;
  border-radius: 13px;
}
</style>
