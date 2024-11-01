<template>
  <Dialog
    :breakpoints="{ '2048px': '20vw', '1600': '30vw', '1199px': '37vw', '767px': '50vw', '575px': '80vw' }"
    :visible="props.show"
    class="dialog-confirm-withdrawal"
    :show-header="false"
    modal
    @update:visible="emit('update:visible', $event)"
  >
    <div class="w-full text-center text-color">
      <div
        class="p-dialog-header-icons w-full justify-content-end p-2 float-right"
        style="position: relative; top: 7px"
      >
        <button
          aria-label="Close"
          class="p-dialog-header-icon p-dialog-header-close p-link p-2"
          type="button"
          @click="closeModal"
        >
          <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
        </button>
      </div>
      <img :src="imagePath" alt="" style="height: 40px" />
      <h3 class="font-medium mb-0 mt-0 text-center text-color-green title-header">
        {{ t('ModalConfirmTitle') }}
      </h3>
      <h4 v-if="props.beneficiary?.isInternal == 'N'" class="m-0 font-medium font-family">
        {{ t('otherPlatformCrypto') }}
      </h4>
      <h4 v-else class="m-0 font-medium font-family">{{ t('betweenNOBACrypto') }}</h4>
    </div>
    <Divider type="dashed"></Divider>
    <div class="items-center bg-surface-0 dark:bg-surface-900 rounded">
      <div class="my-1 py-4 px-5 float-left w-full">
        <div class="col-12 p-0 float-left">
          <p class="m-0 text-general float-left">{{ t('textSend') }}:</p>
          <p class="m-0 text-general float-right">{{ t('wallets') }} {{ props.assetCodeSelected?.code }}</p>
        </div>
        <div class="col-12 p-0 float-left">
          <h3 class="m-0 font-medium float-left text-color-green font-amount">{{ t('amount') }}:</h3>
          <h3 class="m-0 font-medium float-right text-color-green font-amount">
            {{ currencyFormat(props.assetCodeSelected?.assetClassification, props.transactionData?.amount) }}
          </h3>
        </div>
        <div class="col-12 p-0 float-left">
          <p class="m-0 text-general float-left">{{ t('fee') }}:</p>
          currencyFormat(props.assetCodeSelected?.assetClassification, props.fee ?? 0) }} {{ assetsCode }}
        </div>
      </div>
      <Divider type="dashed"></Divider>
      <div class="mt-1 mb-3 col-12 py-4 px-5 float-left text-color" style="background: #eceff1">
        <div class="col-12 p-0 float-left">
          <p class="m-0 text-general float-left">{{ t('textReceives') }}:</p>
          <p class="m-0 text-general float-right shorten-text">{{ beneficiaryInformation.name }}</p>
        </div>
        <div class="col-12 p-0 float-left text-right">
          <p class="m-0 text-general font-light float-left">{{ t('wallets') }} {{ props.assetCodeSelected?.name }}:</p>
          <h4 class="m-0 text-general float-right shorten-text">{{ beneficiaryInformation.addressWallet }}</h4>
        </div>
      </div>
      <Divider type="dashed"></Divider>
      <div class="col-12 py-4 px-5 float-left">
        <p class="m-0 font-medium float-left font-amount">{{ t('ModalConfirmTotal') }}:</p>
        <p class="m-0 font-medium float-right text-color-green font-amount">
          {{ currencyFormat(props.assetCodeSelected?.assetClassification, props.transactionData?.amount) }}
        </p>
      </div>
      <div class="col-12 flex justify-content-around gap-2 mt-1 mb-4 float-left">
        <Button
          :label="t('confirm')"
          :loading="submitting"
          class="w-10rem"
          @click="showModalVeryCodeTwoFactorOrMakeTransaction"
        />
      </div>
    </div>
    <template>
      <Dialog
        v-model:visible="visibleModalVeryCodeTwoFactor"
        :draggable="false"
        :header="t('twoFactor')"
        :show-header="false"
        :modal="true"
        position="bottom"
      >
        <div class="flex justify-content-end text-2xl cursor-pointer">
          <button
            aria-label="Close"
            class="p-dialog-header-icon p-dialog-header-close p-link p-2 mt-3"
            type="button"
            @click="close()"
          >
            <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
          </button>
        </div>
        <VeryCodeTwoFactorAuth @codeIsValid="verifyCodeTwoFactorAuth" />
      </Dialog>
    </template>
  </Dialog>
</template>
<script lang="ts" setup>
import { useWithdrawalCrypto } from '../composable/useWithdrawalCrypto'
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import Divider from 'primevue/divider'
import { computed, PropType } from 'vue'
import { MakeAssetExternalTransfer, MakeAssetInternalTransfer } from '../../type/withdraw'
import { currencyFormat } from '../../../../shared/helpers/currencyFormat'
import VeryCodeTwoFactorAuth from '../../../../components/VeryCodeTwoFactorAuth.vue'
import { useTwoFactorAuth } from '../../../../composables/useTwoFactorAuth'

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
  show: Boolean,
  transactionData: {
    type: Object as PropType<MakeAssetExternalTransfer | MakeAssetInternalTransfer>,
    required: true,
  },
  beneficiary: Object,
  fee: Number,
  assetsCode: String,
  assetCodeSelected: Object,
})
const emit = defineEmits(['update:visible'])
const { makeTransaction, submitting, beneficiaryInformation, visibleModalVeryCodeTwoFactor } = useWithdrawalCrypto()
const { twoFactorIsActive, isEnabledButtonToProceedWithdrawal } = useTwoFactorAuth()
const closeModal = () => {
  emit('update:visible', false)
}
const imagePath = computed(() => {
  return props.assetCodeSelected?.icon
})
const openModal = () => {
  emit('update:visible', false)
}
const showModalVeryCodeTwoFactorOrMakeTransaction = () => {
  if (isEnabledButtonToProceedWithdrawal.value) {
    if (twoFactorIsActive()) {
      visibleModalVeryCodeTwoFactor.value = true
    } else {
      makeTransaction(props.transactionData)
    }
  } else {
    visibleModalVeryCodeTwoFactor.value = true
  }
}
const close = () => {
  visibleModalVeryCodeTwoFactor.value = false
}
const verifyCodeTwoFactorAuth = (isValidCode: boolean) => {
  if (isValidCode) {
    visibleModalVeryCodeTwoFactor.value = false
    makeTransaction(props.transactionData)
  } else {
    visibleModalVeryCodeTwoFactor.value = true
  }
}
</script>
<style lang="scss" scoped>
.text-color-green {
  color: var(--primary-color);
}

.shorten-text {
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
  max-width: 210px;
}

.text-color {
  color: #0b0b0b;
}

.title-header {
  font-size: 20px;
}

.font-amount {
  font-size: 18px;
}

.text-general {
  font-weight: 400;
  color: #0b0b0b;
}

@media (max-width: 991px) {
  .title-header {
    font-size: 18px;
  }
}
</style>
