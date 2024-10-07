<template>
  <div class="grid">
    <div class="mb-2 col-12">
      <p class="font-semi-bold m-0" style="font-size: 1.2rem">{{ t('VerifyBeneficiaryInformation') }}</p>
    </div>
    <div class="beneficiary-form col-12">
      <div class="header-withdrawal p-4">
        <div class="col-12 md:col-12 lg:col-12 xl:col-7 float-left p-0">
          <label class="float-left text-color font-family" for="fullName"
            ><b>{{ t('beneficiary') }}:</b></label
          >
          <span class="float-left px-2">{{ dataBeneficiaryWithdrawal?.informationOwner.name }}</span>
          <div class="divider"></div>
          <label class="float-left text-color font-family" for="fullName"
            ><b>{{ t('accountNumber') }}:</b></label
          >
          <span class="float-left px-2">{{ dataBeneficiaryWithdrawal?.informationBank.accountNumber }}</span>
        </div>
        <div class="col-12 md:col-12 lg:col-12 xl:col-5 p-0 float-left container-balance">
          <label class="text-color font-family">{{ t('balance') }}</label>
          <div class="divider"></div>
          <div class="float-right balanceOtherPlatforms">{{ balance }}</div>
        </div>
      </div>
      <div class="body-withdrawal float-left">
        <div class="col-12 xl:col-6 form-group pl-3 pr-5 my-3 float-left" style="border-right: 1px solid #0f655d">
          <div>
            <Dropdown
              v-model="selectedAsset"
              :filter="false"
              :options="assetsPrepared"
              :placeholder="t('textOption')"
              class="w-full"
              filterBy="name, code"
              option-value="code"
              optionLabel="name"
              @change="findBalance"
            >
            </Dropdown>
          </div>
          <div class="col-12 sm:col-12 md:col-12 lg:col-5 xl:col-5 float-left">
            <label class="font-regular text-color-green">{{ t('textSend') }}</label>
            <div class="p-inputgroup">
              <InputNumber
                v-model="transactionData.amount"
                :maxFractionDigits="6"
                :minFractionDigits="2"
                class="w-full text-center mt-3"
                placeholder="0.00"
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
            <label class="font-regular text-color-green">{{ t('textReceives') }}</label>
            <div class="p-inputgroup">
              <InputNumber
                v-model="transactionData.amount"
                :maxFractionDigits="6"
                :minFractionDigits="2"
                class="w-full text-center mt-3"
                placeholder="0.00"
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
              class="w-12 px-1 mt-3"
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
          <Button :label="t('continue')" class="w-full" @click="validateForm" />
        </div>
        <div class="col-12 xl:col-2 float-right">
          <Button :label="t('backButtonTitle')" class="mr-4 w-full" outlined severity="" @click="goBack()" />
        </div>
      </div>
    </div>

    <Dialog
      v-model:visible="visible"
      :draggable="false"
      :header="t('twoFactor')"
      :show-header="false"
      :modal="true"
      position="bottom"
    >
      <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
      <ConfirmWithdrawUsa :makeTransaction="makeFiatInternalTransfer" :subtitle="t('betweenNOBA')" />
    </Dialog>
  </div>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import InputNumber from 'primevue/inputnumber'
import { WithdrawalPurpose } from '../../../../shared/propuseWithdrawal'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import MessageAlertActiveTwoFactorAuth from '../../../../components/MessageAlertActiveTwoFactorAuth.vue'
import { useWithdrawInternal } from './composable/useWithdrawInternal'
import { onMounted, ref } from 'vue'
import { Asset, AssetClassification } from '../../../deposit/types/asset.interface'
import Dialog from 'primevue/dialog'
import ConfirmWithdrawUsa from '../../components/modalWithdraw/ConfirmWithdrawUsa.vue'
import { useWithdraw } from '../../composable/useWithdraw'
import { useToast } from 'primevue/usetoast'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { useAssets } from '../../../../composables/useAssets'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const { getBalanceByCode } = useBalanceWallet()
const { dataBeneficiaryWithdrawal, transactionData, isValidFormWithdrawal } = useWithdraw()
const visible = ref(false)
const { getAssetByAssetClassification } = useAssets()
const { makeFiatInternalTransfer, selectedAsset, balance, fee, goBack, isAccountSegregated } = useWithdrawInternal()

const assetsPrepared = ref<Asset[]>([])
const findBalance = (event: DropdownChangeEvent) => {
  balance.value = getBalanceByCode(event.value)
}
const validateForm = () => {
  if (!isValidFormWithdrawal()) {
    toast.add({
      severity: 'warn',
      detail: t('completeForm'),
      life: 4000,
    })
    return
  }

  if (!selectedAsset.value) {
    toast.add({
      severity: 'warn',
      detail: t('completeForm'),
      life: 4000,
    })
    return
  }
  visible.value = true
}

const close = () => {
  visible.value = false
}
onMounted(async () => {
  assetsPrepared.value = [getAssetByAssetClassification(AssetClassification.FIAT)]
})
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

.container-balance {
  text-align: right;
}

.font-size-balance {
  font-size: 18px;
}

.header-withdrawal {
  background-color: #eceff1;
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
