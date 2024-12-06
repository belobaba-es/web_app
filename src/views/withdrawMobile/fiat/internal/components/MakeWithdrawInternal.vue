<template>
  <div class="grid p-4">
    <div class="pl-3 col-12">
      <BackButtonMobile :subtitle="t('WITHDRAWAL')" :title="t('fiat') + '/' + t('walletNob')" />
    </div>
    <div class="col-12">
      <div class="grid beneficiary-form">
        <div class="header-withdrawal col-12 p-4">
          <div class="grid">
            <div class="col-12 pb-0">
              <label class="float-left text-color" for="fullName">{{ t('beneficiary') }}:</label>
              <span class="float-left pl-2 text-color-green font-weight">{{
                dataBeneficiaryWithdrawal?.informationOwner.name
              }}</span>
            </div>
          </div>
        </div>
        <div class="col-12">
          <Dropdown
            v-model="assetCodeFiat"
            :options="assetsFiat"
            :placeholder="t('selectAsset')"
            class="w-full"
            optionLabel="name"
            optionValue="code"
            @change="selectAsset"
          >
            <template #option="slotProps">
              <div class="flex align-items-center">
                <img :alt="slotProps.option.name" :src="slotProps.option.icon" class="mr-2" style="width: 24px" />
                <div>{{ slotProps.option.name }}</div>
              </div>
            </template>
          </Dropdown>
        </div>
        <div class="col-12">
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
  <Dialog v-model:visible="visible" :draggable="false" :show-header="false" :modal="true" position="bottom">
    <div class="p-dialog-header-icons w-full justify-content-end p-2 float-right" style="position: relative; top: 7px">
      <button
        aria-label="Close"
        class="p-dialog-header-icon p-dialog-header-close p-link p-2"
        type="button"
        @click="close"
      >
        <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
      </button>
    </div>
    <ConfirmWithdrawUsa :makeTransaction="makeFiatInternalTransfer" :subtitle="t('betweenNOBA')" />
  </Dialog>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import MakeMobileWithdrawals from '../../../components/MakeMobileWithdrawals.vue'
import { useBalanceWallet } from '../../../../../composables/useBalanceWallet'
import { useMobileWithdrawalInternalFiat } from '../composable/useMobileWithdrawalInternalFiat'
import { useAssets } from '../../../../../composables/useAssets'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import BackButtonMobile from '../../../../../components/BackButtonMobile.vue'
import Dialog from 'primevue/dialog'
import ConfirmWithdrawUsa from '../../../../withdraw/components/modalWithdraw/ConfirmWithdrawUsa.vue'
import { useWithdraw } from '../../../../withdraw/composable/useWithdraw'
import { watch } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const {
  isValidFormWithdrawal,
  assetCodeSelected,
  visible,
  goBack,
  fee,
  balance,
  assetsFiat,
  makeFiatInternalTransfer,
  selectedAsset,
  assetCodeFiat,
} = useMobileWithdrawalInternalFiat()
const { dataBeneficiaryWithdrawal, transactionData } = useWithdraw()
const { getBalanceByCode } = useBalanceWallet()
const { getAssetByAssetCode } = useAssets()

watch(
  () => assetCodeFiat,
  newValue => {
    if ('assetCode' in transactionData.value) {
      transactionData.value.assetCode = String(newValue)
    }
  }
)
const validForm = () => {
  if (!isValidFormWithdrawal()) {
    toast.add({
      severity: 'warn',
      detail: t('completeForm'),
      life: 4000,
    })
    return
  }
  if (!assetCodeFiat.value) {
    toast.add({
      severity: 'warn',
      detail: t('completeForm'),
      life: 4000,
    })
    return
  }
  return (visible.value = true)
}

const selectAsset = (event: DropdownChangeEvent) => {
  const assetCode = event.value
  const asset = getAssetByAssetCode(assetCode)
  assetCodeSelected.value.code = asset!.code
  assetCodeSelected.value.icon = asset!.icon
  assetCodeSelected.value.name = asset!.name
  assetCodeSelected.value.assetClassification = asset!.assetClassification
  selectedAsset.value = asset!.code
  balance.value = getBalanceByCode(asset!.code)
}
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
  border-radius: 8px !important;
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
