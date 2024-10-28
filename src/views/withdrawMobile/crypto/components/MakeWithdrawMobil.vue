<template>
  <div class="grid p-4">
    <div class="pl-3 col-12">
      <BackButtonMobile
        :subtitle="t('WITHDRAWAL')"
        :title="form.isInternal == 'N' ? t('otherPlatforms') : t('walletNob')"
      />
    </div>
    <div class="col-12">
      <div class="grid beneficiary-form">
        <div class="header-withdrawal col-12 p-4">
          <div class="grid">
            <div class="col-12 pb-0">
              <label class="float-left text-color" for="fullName">{{ t('beneficiary') }}:</label>
              <span class="float-left pl-2 text-color-green font-weight">{{ beneficiaryInformation.name }}</span>
            </div>
            <div class="col-12 pb-0">
              <label class="float-left" for="fullName">{{ t('walletAddress') }}:</label>
              <span class="float-left pl-2 text-color-green font-weight address-wallet">{{
                beneficiaryInformation.addressWallet
              }}</span>
            </div>
          </div>
        </div>

        <div class="col-12">
          <SelectAssetsWithdraw @selectedAsset="selectAsset" />
          <MakeMobileWithdrawals
            :assetClassification="assetCodeSelected"
            :assetCodeSelected="assetCodeSelected.code"
            :balance="balance"
            :fee="fee"
            :withdrawForm="transactionData"
            @goBack="goBack"
            @validForm="validForm"
          />
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
import { useI18n } from 'vue-i18n'
import { watch } from 'vue'
import { useToast } from 'primevue/usetoast'
import MakeMobileWithdrawals from '../../components/MakeMobileWithdrawals.vue'
import { useWithdrawalCrypto } from '../../../withdraw/crypto/composable/useWithdrawalCrypto'
import { useBalanceWallet } from '../../../../composables/useBalanceWallet'
import { Asset } from '../../../deposit/types/asset.interface'
import SelectAssetsWithdraw from '../../../withdraw/crypto/components/SelectAssetsWithdraw.vue'
import DialogConfirmationWithdrawal from '../../../withdraw/crypto/components/DialogConfirmationWithdrawal.vue'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const {
  transactionData,
  balance,
  fee,
  goBack,
  beneficiaryInformation,
  isValidFormWithdrawal,
  assetCodeSelected,
  visible,
  form,
} = useWithdrawalCrypto()

const { getBalanceByCode } = useBalanceWallet()

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
watch(assetCodeSelected, newValue => {
  assetCodeSelected.value.assetClassification = newValue.assetClassification
})
const close = () => {
  visible.value = false
}
</script>
<style lang="scss" scoped>
.beneficiary-form {
  max-width: 100%;
  margin: 0 auto;
  padding: 7px;
  border-radius: 12px;
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

.address-wallet {
  word-break: break-all;
  text-align: left;
}

.header-withdrawal {
  background-color: #eceff1;
  min-height: 70px;
  border-radius: 12px 12px 0 0;
  font-family: RedHatDisplayMedium, serif;
  font-size: 14px;
}

.text-color-green {
  color: var(--primary-color);
}

.font-weight {
  font-weight: 600;
}

.p-dialog .p-dialog-header {
  background-color: #ffffff !important;
}

.text-color {
  color: #232323;
}
</style>
