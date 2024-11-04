<template>
  <div class="body-withdrawal grid">
    <div class="col-12 float-left">
      <div class="col-12">
        <label class="font-regular text-color-green">{{ t('textSend') }}</label>
        <div class="p-inputgroup">
          <InputNumber
            v-model="props.withdrawForm.amount as number"
            :maxFractionDigits="6"
            :minFractionDigits="props.assetClassification?.assetClassification === AssetClassification.CRYPTO ? 6 : 2"
            class="w-full text-center mt-3"
            :placeholder="placeholderAmount"
            required
            type="number"
          />
        </div>
        <div class="grid">
          <div class="col-7">
            <span class="font-medium float-left"> {{ t('textBalance') }}:</span>
            <span class="float-left font-medium text-color-green pl-2">{{ balance }} {{ assetCodeSelected }}</span>
          </div>
          <div class="col-5">
            <span class="float-right font-medium text-color-green pl-2">{{ fee }} {{ assetsCode }}</span>
            <span class="font-medium float-right"> {{ t('fee') }}:</span>
          </div>
        </div>
      </div>
      <div class="col-12 p-0">
        <div class="circle-bottom text-center">
          <i class="pi pi-arrow-right-arrow-left text-16 text-1xl text-white" style="line-height: 2"></i>
        </div>
      </div>
      <div class="col-12 pt-0">
        <label class="font-regular text-color-green">{{ t('textReceives') }}</label>
        <div class="p-inputgroup">
          <InputNumber
            v-model="props.withdrawForm.amount as number"
            :maxFractionDigits="6"
            :minFractionDigits="props.assetClassification?.assetClassification === AssetClassification.CRYPTO ? 6 : 2"
            class="w-full text-center mt-3"
            :placeholder="placeholderAmount"
            required
            type="number"
            readonly
          />
        </div>
      </div>
    </div>
    <div class="col-12">
      <div class="col-12">
        <label>{{ t('purposeWithdrawal') }}</label>
        <Dropdown
          v-model="props.withdrawForm.purpose"
          :options="WithdrawalPurpose(isAccountSegregated())"
          :placeholder="t('textOption')"
          class="w-12 px-1 mt-3 custom-dropdown"
          option-value="value"
          optionLabel="name"
          required
        />
      </div>

      <div class="col-12">
        <label>{{ t('Note') }}</label>
        <div class="p-inputgroup">
          <InputText
            v-model="props.withdrawForm.reference"
            :placeholder="t('reference')"
            class="w-full p-2 mt-3"
            type="text"
          />
        </div>
      </div>
    </div>
    <MessageAlertActiveTwoFactorAuth />
  </div>
  <div class="col-12 footer-withdrawal text-center">
    <Button
      :loading="submitting"
      :label="t('backButtonTitle')"
      class="w-8rem mr-3"
      outlined
      severity=""
      @click="goBack()"
    />
    <Button :label="t('continue')" class="w-8rem" @click="validForm" />
  </div>
</template>
<script lang="ts" setup>
import InputNumber from 'primevue/inputnumber'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { defineEmits, defineProps, ref, watchEffect } from 'vue'
import {
  MakeAssetExternalTransfer,
  MakeAssetInternalTransfer,
  MakeFiatExternalTransfer,
  MakeFiatInternalTransfer,
} from '../../withdraw/type/withdraw'

import { WithdrawalPurpose } from '../../../shared/propuseWithdrawal'
import { useAuth } from '../../../composables/useAuth'
import MessageAlertActiveTwoFactorAuth from '../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { AssetClassification } from '../../deposit/types/asset.interface'

const { t } = useI18n({ useScope: 'global' })
const { isAccountSegregated } = useAuth()
const props = defineProps({
  withdrawForm: {
    type: Object as () =>
      | MakeAssetExternalTransfer
      | MakeAssetInternalTransfer
      | MakeFiatExternalTransfer
      | MakeFiatInternalTransfer,
    required: true,
  },
  fee: {
    type: Number,
    required: true,
  },
  assetsCode: {
    type: String,
  },
  submitting: {
    type: Boolean,
  },
  balance: {
    type: Number,
    required: true,
  },
  assetCodeSelected: {
    type: String,
    required: true,
  },
  assetClassification: Object,
})

const placeholderAmount = ref('')
watchEffect(() => {
  placeholderAmount.value =
    props.assetClassification?.assetClassification === AssetClassification.CRYPTO ? '0.000000' : '0.00'
})

const emit = defineEmits(['goBack', 'validForm'])
const validForm = () => {
  emit('validForm')
}
const goBack = () => {
  emit('goBack')
}
</script>

<style lang="scss" scoped>
.circle-bottom {
  background: var(--primary-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  color: white;
  position: relative;
  top: 10px;
  padding: 3px;
}

.custom-dropdown {
  border-radius: 12px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  box-sizing: inherit !important;
}

.text-color-green {
  color: var(--primary-color);
}
</style>
