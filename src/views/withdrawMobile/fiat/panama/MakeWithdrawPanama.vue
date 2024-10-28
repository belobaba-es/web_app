<template>
  <div class="body-withdrawal p-4">
    <BackButtonMobile :subtitle="t('typeWithdrawText')" :title="t('newBeneficiary')" />
    <div class="card col-12 p-0 mt-4">
      <div class="p-3 mt-1 ml-1 mr-1 mb-3" style="background: #eceff1; border-radius: 10px 10px 1px 1px">
        <div>
          <p class="font-regular text-16 m-0">
            {{ t('bankAccountHolder') }}:
            <span class="font-medium text-16 color-green">{{ dataBeneficiaryWithdrawalPanama.holderName }}</span>
          </p>
        </div>

        <div>
          <p class="font-regular text-16 m-0">
            {{ t('accountNumber') }}:
            <span class="font-medium text-16 color-green">{{
              dataBeneficiaryWithdrawalPanama.accountDestinationNumber
            }}</span>
          </p>
        </div>

        <div class="card p-0 m-0 col-3 text-center" style="background: #01579b; color: white; border: none">
          {{ t('panama') }}
        </div>
      </div>

      <div class="p-3">
        <MakeMobileWithdrawals
          :balance="balance"
          :fee="feePanama"
          :withdrawForm="transactionData"
          assetCodeSelected="$"
          @goBack="toBack"
          @validForm="validForm"
        />
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="visible"
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '30rem' }"
    :show-header="false"
    modal
  >
    <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
    <DialogConfirmWithdrawPanama />
  </Dialog>
</template>
<script lang="ts" setup>
import { useWithdraw } from '../../../withdraw/composable/useWithdraw'
import { useI18n } from 'vue-i18n'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import Dialog from 'primevue/dialog'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import MakeMobileWithdrawals from '../../components/MakeMobileWithdrawals.vue'
import DialogConfirmWithdrawPanama from '../../../withdraw/components/modalWithdraw/DialogConfirmWithdrawPanama.vue'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const { transactionData, feePanama, balance, toBack, dataBeneficiaryWithdrawalPanama } = useWithdraw()

const visible = ref(false)

const validForm = () => {
  if (!transactionData.value.amount || !transactionData.value.purpose || !transactionData.value.reference) {
    toast.add({
      severity: 'info',
      summary: t('somethingWentWrong'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
    return
  }
  visible.value = true
}

const close = () => {
  visible.value = false
}
</script>
<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
}

.color-green {
  color: var(--primary-color);
}

.text-16 {
  font-size: 14px;
}

.circle-bottom {
  background: var(--primary-color);
  border-radius: 50%;
  width: 32px;
  height: 32px;
  margin: 0 auto;
  color: white;
}
</style>
