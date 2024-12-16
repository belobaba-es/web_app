<template>
  <div class="p-4">
    <div class="pl-3 col-12">
      <BackButtonMobile :subtitle="t('WITHDRAWAL')" :title="dataBeneficiaryWithdrawal.informationBank.networkBank" />
    </div>

    <div class="card col-12 p-0 mt-4">
      <div class="p-3 mt-1 ml-1 mr-1 mb-3" style="background: #eceff1; border-radius: 10px 10px 1px 1px">
        <div>
          <p class="font-regular text-16 m-0">
            {{ t('bankAccountHolder') }}:
            <span class="font-medium text-16 color-green">{{ dataBeneficiaryWithdrawal.informationOwner.name }}</span>
          </p>
        </div>

        <div>
          <p class="font-regular text-16 m-0">
            {{ t('accountNumber') }}:
            <span class="font-medium text-16 color-green">{{
              dataBeneficiaryWithdrawal.informationBank.accountNumber
            }}</span>
          </p>
        </div>

        <div class="card p-0 m-0 col-3 text-center" style="background: #01579b; color: white; border: none">
          {{ dataBeneficiaryWithdrawal.informationBank.networkBank }}
        </div>
      </div>

      <div class="p-3">
        <MakeMobileWithdrawals
          :balance="balance"
          :fee="fee"
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
    :show-header="false"
    :style="{ width: '30rem' }"
    modal
  >
    <div class="flex justify-content-end text-2xl cursor-pointer" @click="close()">x</div>
    <ConfirmWithdrawUsa :makeTransaction="makeTransaction" :subtitle="t('withdrawTransferLocal')" />
  </Dialog>
</template>
<script lang="ts" setup>
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import { useI18n } from 'vue-i18n'
import MakeMobileWithdrawals from '../../components/MakeMobileWithdrawals.vue'
import Dialog from 'primevue/dialog'
import ConfirmWithdrawUsa from '../../../withdraw/components/modalWithdraw/ConfirmWithdrawUsa.vue'
import { ref } from 'vue'
import { useWithdraw } from '../../../withdraw/composables/useWithdraw'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()

const { dataBeneficiaryWithdrawal, transactionData, fee, balance, toBack, makeTransaction } = useWithdraw()
const visible = ref(false)

const close = () => {
  visible.value = false
}

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
</script>

<style lang="scss" scoped>
.card {
  border: 1px solid var(--primary-color);
  margin: 0 auto;
}

.color-green {
  color: #0f655d;
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
