<template>
  <h3 class="font-regular m-0">
    <BackButtonMobile
      :title="
        beneficiaryInformation.isInternal === 'N'
          ? t('crypto') + '/' + t('otherPlatforms')
          : t('crypto') + '/' + t('walletNob')
      "
      :subtitle="t('WITHDRAWAL')"
    />
  </h3>
  <div class="grid">
    <div class="mb-2 col-12">
      <p class="font-semi-bold m-0" style="font-size: 1.2rem">{{ t('VerifyBeneficiaryInformation') }}</p>
    </div>
    <div class="beneficiary-form col-12 p-3">
      <div class="header-withdrawal p-4">
        <div class="col-12 md:col-12 lg:col-12 xl:col-7 float-left p-0">
          <label class="float-left text-white font-family" for="fullName"
            ><b>{{ t('beneficiary') }}:</b></label
          >
          <span class="float-left px-2">{{ beneficiaryInformation.name }}</span>
          <div class="divider"></div>
          <label class="float-left text-white font-family" for="fullName"
            ><b>{{ t('walletAddress') }}:</b></label
          >
          <span class="float-left px-2">{{ beneficiaryInformation.addressWallet }}</span>
        </div>
        <div class="col-12 md:col-12 lg:col-12 xl:col-5 p-0 float-left container-balance">
          <label class="text-white font-family">{{ t('balance') }}</label>
          <div class="divider"></div>
          <div class="float-right balanceOtherPlatforms">{{ balance }} {{ assetCodeSelected.code }}</div>
        </div>
      </div>
      <div class="body-withdrawal float-left">
        <div class="col-12 xl:col-6 form-group pl-3 pr-5 my-3 float-left" style="border-right: 1px solid #0f655d">
          <SelectAssetsWithdraw @selectedAsset="selectAsset" />
          <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5 float-left">
            <label class="font-regular">{{ t('textSend') }}</label>
            <div class="p-inputgroup">
              <InputNumber
                v-model="transactionData.amount"
                :maxFractionDigits="getMaxFractionDigits()"
                :minFractionDigits="getMaxFractionDigits()"
                class="w-full text-center mt-3"
                :placeholder="getMaxPlaceholderDigits()"
                required
                type="number"
              />
            </div>
          </div>
          <div class="col-12 sm:col-12 md:col-12 lg:col-2 xl:col-2 float-left">
            <div class="circle-bottom text-center">
              <i class="pi pi-arrow-right-arrow-left text-16 text-1xl text-white" style="line-height: 2"></i>
            </div>
          </div>
          <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5 float-left">
            <label class="font-regular">{{ t('textReceives') }}</label>
            <div class="p-inputgroup">
              <InputNumber
                v-model="transactionData.amount"
                :maxFractionDigits="getMaxFractionDigits()"
                :minFractionDigits="getMaxFractionDigits()"
                class="w-full text-center mt-3"
                :placeholder="getMaxPlaceholderDigits()"
                required
                type="number"
              />
            </div>
          </div>
          <div class="col-12 float-left">
            <span class="fee flex justify-content-start font-medium text-color-green">{{ t('fee') }} {{ fee }}</span>
          </div>
        </div>
        <div class="col-12 xl:col-6 float-left form-group pl-4 pr-5 my-3">
          <div class="col-12">
            <label>{{ t('purposeWithdrawal') }}</label>
            <Dropdown
              v-model="transactionData.purpose"
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
                v-model="transactionData.reference"
                :placeholder="t('reference')"
                class="w-full p-2 mt-3"
                type="text"
              />
            </div>
          </div>
        </div>
        <MessageAlertActiveTwoFactorAuth />
      </div>

      <div class="col-12 footer-withdrawal float-left">
        <div class="col-12 xl:col-8 float-left">
          {{ t('informationCorrectContinue') }}<b class="font-semi-bold"> {{ t('continue') }}</b> <br />
          {{ t('reviewDataAgain') }}<b class="font-semi-bold"> {{ t('backButtonTitle') }}</b>
        </div>
        <div class="col-12 xl:col-2 float-right">
          <Button :label="t('continue')" class="w-full" @click="validForm" />
        </div>
        <div class="col-12 xl:col-2 float-right">
          <Button :label="t('backButtonTitle')" class="mr-4 w-full" outlined severity="" @click="goBack()" />
        </div>
      </div>
    </div>
  </div>
  <DialogConfirmationWithdrawal
    :assetCodeSelected="assetCodeSelected"
    :beneficiary="beneficiaryInformation"
    :fee="fee"
    :show="visible"
    :transactionData="transactionData"
    @update:visible="close"
  />
</template>
<script lang="ts" setup>
import { useBeneficiaryCrypto } from '../composable/useBeneficiaryCrypto'
import { useI18n } from 'vue-i18n'
import InputNumber from 'primevue/inputnumber'

import { onMounted } from 'vue'
import { WithdrawalPurpose } from '../../../../shared/propuseWithdrawal'
import Dropdown from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import SelectAssetsWithdraw from './SelectAssetsWithdraw.vue'
import { useWithdrawalCrypto } from '../composable/useWithdrawalCrypto'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { Asset } from '../../../deposit/types/asset.interface'
import MessageAlertActiveTwoFactorAuth from '../../../../components/MessageAlertActiveTwoFactorAuth.vue'
import DialogConfirmationWithdrawal from './DialogConfirmationWithdrawal.vue'
import { useToast } from 'primevue/usetoast'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'

const { t } = useI18n({ useScope: 'global' })
const { isAssetEdit, form } = useBeneficiaryCrypto()
const toast = useToast()
const {
  transactionData,
  balance,
  fee,
  goBack,
  beneficiaryInformation,
  isWithdrawal,
  isValidFormWithdrawal,
  assetCodeSelected,
  visible,
  isAccountSegregated,
} = useWithdrawalCrypto()

const { getBalanceByCode } = useBalanceWallet()

onMounted(() => {
  isAssetEdit.value = false
  isWithdrawal.value = true
})
const validForm = () => {
  if (!isValidFormWithdrawal()) {
    toast.add({
      severity: 'warn',
      detail: t('completeForm'),
      life: 4000,
    })
    return
  }
  return (visible.value = true)
}

const selectAsset = (asset: Asset) => {
  assetCodeSelected.value.code = asset.code
  assetCodeSelected.value.icon = asset.icon
  assetCodeSelected.value.name = asset.name
  assetCodeSelected.value.assetClassification = asset.assetClassification
  transactionData.value = {
    ...transactionData.value,
    assetCode: asset.code,
  }

  balance.value = getBalanceByCode(asset.code)
}

function getMaxFractionDigits(): number {
  return assetCodeSelected?.value.assetClassification === 'CRYPTO' ? 6 : 2
}

function getMaxPlaceholderDigits(): string {
  return assetCodeSelected?.value.assetClassification === 'CRYPTO' ? '0.000000' : '0.00'
}

const close = () => {
  visible.value = false
}
</script>
<style lang="scss" scoped>
.beneficiary-form {
  max-width: 100%;
  margin: 0 auto;
  padding: 20px;
  border-radius: 8px;
  border: 1px solid var(--primary-color);
  float: left;
}

.p-dropdown.p-component.p-inputwrapper {
  border: 1px solid var(--primary-color) !important;
  border-radius: 12px !important;
  height: 38px;
}

.custom-dropdown {
  border-radius: 12px !important;
  padding-top: 0 !important;
  padding-bottom: 0 !important;
  box-sizing: inherit;
}

.container-balance {
  text-align: right;
}

.font-size-balance {
  font-size: 18px;
}

.header-withdrawal {
  background-color: #000;
  height: 90px;
  border-radius: 8px 8px 0 0;
  color: var(--primary-color);
  font-family: RedHatDisplayMedium, serif;
  font-size: 16px;
}

.text-color-green {
  color: var(--primary-color);
}

.p-dialog .p-dialog-header {
  background-color: #ffffff !important;
}

.text-color {
  color: #232323;
}

.font-family {
  font-family: RedHatDisplayMedium, serif;
}

.circle-bottom {
  background: var(--primary-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  color: white;
  position: relative;
  top: 36px;
  padding: 3px;
}

.divider {
  float: left;
  width: 100%;
  height: 1px;
}

@media (max-width: 1700px) {
  .header-withdrawal {
    height: 110px !important;
  }
}

@media (max-width: 1200px) {
  .header-withdrawal {
    height: 150px !important;
  }
  .container-balance {
    text-align: left;
  }
  .balanceOtherPlatforms {
    float: left !important;
  }
}

@media (min-width: 768px) {
  .beneficiary-form {
    flex-direction: row;
    justify-content: space-between;
  }
}

@media (max-width: 767px) {
  .beneficiary-form {
    flex-direction: column;
    padding: 10px;
  }
}
</style>
