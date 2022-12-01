<template>
  <div class="formgrid grid mt-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm wire information') }}</span>
      <Divider></Divider>
    </div>
    <div>
      <p class="title-beneficiary">{{ formData?.beneficiary?.realName }}</p>
      <p class="font-ligth text-base">{{ formData?.beneficiary?.accountNumber }}</p>
    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">

      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amountFee }} USD</p>
      </div>

      <div class="field col-12">
        <small>{{ t('fee') }}</small>
        <p class="green-color mt-0">
          <small>{{ formData.fee }} USD</small>
        </p>
      </div>
    </div>


    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ formData?.beneficiary?.realName }}</p>

    </div>

    <div class="col-12 mb-2">
      <p class="font-medium green-color">
        {{ formData.amount }} USD
      </p>
    </div>
    <div class="col-12 mb-3 mt-3">
      <span>{{ t('The wire will take 24 hours.') }}</span>
    </div>

    <Button
        class="w-50 p-button search-btn"
        :label="t('continue')"
        @click="makeTransaction()"
        :loading="submitting"
    />
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import {useI18n} from 'vue-i18n';
import {useRoute} from "vue-router";
import Button from 'primevue/button';
import {ref} from "vue";
import {WithdrawService} from "../../services/withdraw";
import {useBalanceWallet} from "../../../../composables/useBalanceWallet";
import {useToast} from "primevue/usetoast";

const toast = useToast()
const {updateBlockedBalanceWalletByCode} = useBalanceWallet()
const submitting = ref(false);
const {t} = useI18n({useScope: 'global'})
const route = useRoute();
const props = defineProps<{
  formData: any
}>()

const emit = defineEmits(['complete']);

function makeTransaction() {
  const withdraw = WithdrawService.instance()

  submitting.value = true

  withdraw.makeFiatExternalTransfer({
    amount: props.formData.amount,
    beneficiaryId: props.formData.beneficiary.id,
    reference: props.formData.reference,
  }).then(() => {
    submitting.value = false
    updateBlockedBalanceWalletByCode('USD', props.formData.amount)

    emit('complete')
  }).catch(e => {
    submitting.value = false

    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: e.response.data.message,
      life: 4000
    })

  })


}
</script>

<style scoped>

.green-color {
  color: var(--primary-color);
}
</style>
