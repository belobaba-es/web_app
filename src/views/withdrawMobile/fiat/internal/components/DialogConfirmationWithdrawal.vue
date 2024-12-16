<template>
  <div>
    <Dialog
      :visible="props.show"
      class="dialog-confirm-withdrawal"
      style="padding: 0"
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
        <h4 class="m-0 font-bold font-family">{{ t('walletNob') }} {{ t('fiat') }}</h4>
      </div>
      <Divider type="dashed"></Divider>
      <div class="items-center bg-surface-0 dark:bg-surface-900 rounded">
        <div class="my-1 py-4 px-5 float-left w-full">
          <div class="col-12 p-0 float-left">
            <p class="m-0 font-medium float-left">{{ t('textSend') }}:</p>
            <p class="m-0 font-medium float-right">{{ t('wallets') }} {{ props.assetCodeSelected?.code }}</p>
          </div>
          <div class="col-12 p-0 float-left">
            <h3 class="m-0 font-medium float-left text-color-green font-amount">{{ t('amount') }}:</h3>
            <h3 class="m-0 font-medium float-right text-color-green font-amount">
              {{ currencyFormat(props.assetCodeSelected?.assetClassification, props.transactionData?.amount) }}
            </h3>
          </div>
          <div class="col-12 p-0 float-left">
            <p class="m-0 font-medium float-left">{{ t('fee') }}:</p>
            <p class="m-0 font-medium float-right">
              {{ currencyFormat(props.assetCodeSelected?.assetClassification, props.fee ?? 0) }}
            </p>
          </div>
        </div>
        <Divider type="dashed"></Divider>
        <div class="mt-1 mb-3 col-12 py-4 px-5 float-left text-color" style="background: #eceff1">
          <div class="col-12 p-0 float-left">
            <p class="m-0 font-medium float-left" style="color: #0b0b0b">{{ t('textReceives') }}:</p>
            <p class="m-0 font-medium float-right">{{ dataBeneficiaryWithdrawal?.informationOwner.name }}</p>
          </div>
          <div class="col-12 p-0">
            <p class="m-0 font-medium float-left" style="color: #0b0b0b">
              {{ t('wallets') }} {{ props.assetCodeSelected?.name }}:
            </p>
            <h4 class="m-0 font-medium float-right">
              {{ dataBeneficiaryWithdrawal?.informationBank.accountNumber }}
            </h4>
          </div>
        </div>
        <Divider type="dashed"></Divider>
        <div class="col-12 py-4 px-5 float-left">
          <p class="m-0 font-bold float-left font-amount">{{ t('ModalConfirmTotal') }}:</p>
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
          :modal="true"
          position="bottom"
        >
          <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
          <VeryCodeTwoFactorAuth @codeIsValid="verifyCodeTwoFactorAuth" />
        </Dialog>
      </template>
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import Divider from 'primevue/divider'
import { computed, PropType } from 'vue'
import VeryCodeTwoFactorAuth from '../../../../../components/VeryCodeTwoFactorAuth.vue'
import { MakeAssetExternalTransfer, MakeAssetInternalTransfer } from '../../../../withdraw/type/withdraw'
import { currencyFormat } from '../../../../../shared/helpers/currencyFormat'
import { useMobileWithdrawalInternalFiat } from '../composable/useMobileWithdrawalInternalFiat'
import { useWithdraw } from '../../../../withdraw/composables/useWithdraw'

const { t } = useI18n({ useScope: 'global' })
const props = defineProps({
  show: Boolean,
  transactionData: {
    type: Object as PropType<MakeAssetExternalTransfer | MakeAssetInternalTransfer>,
    required: true,
  },
  beneficiary: Object,
  fee: Number,
  assetCodeSelected: Object,
})
const emit = defineEmits(['update:visible'])
const { makeFiatInternalTransfer, submitting } = useMobileWithdrawalInternalFiat()
const { dataBeneficiaryWithdrawal, visibleModalVeryCodeTwoFactor } = useWithdraw()

const closeModal = () => {
  emit('update:visible', false)
}
const imagePath = computed(() => {
  return props.assetCodeSelected?.icon
})

const showModalVeryCodeTwoFactorOrMakeTransaction = () => {
  visibleModalVeryCodeTwoFactor.value = true
}
const close = () => {
  visibleModalVeryCodeTwoFactor.value = false
}
const verifyCodeTwoFactorAuth = (isValidCode: boolean) => {
  if (isValidCode) {
    visibleModalVeryCodeTwoFactor.value = false
    makeFiatInternalTransfer()
  } else {
    visibleModalVeryCodeTwoFactor.value = true
  }
}
</script>
<style lang="scss" scoped>
.text-color-green {
  color: var(--primary-color);
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

@media (max-width: 991px) {
  .title-header {
    font-size: 18px;
  }
}
</style>
