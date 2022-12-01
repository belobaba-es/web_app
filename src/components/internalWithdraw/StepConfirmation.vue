<template>
  <div class="formgrid grid mt-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm wire information') }}</span>
      <Divider></Divider>
    </div>
    <div>
      <p class="title-beneficiary">{{ beneficiary.name }}</p>

    </div>
    <Divider></Divider>

    <div class="col-12 field p-fluid">

      <div class="field col-12">
        <label for="name1">{{ t('Amount') }}</label>
        <p class="green-color">{{ formData.amount }}</p>
      </div>
      <div class="field col-12">

        <small>{{ t('fee') }}</small>

        <p class="green-color mt-0">
          <small>{{ formData.fee }} {{ formData.symbol }}</small>
        </p>
      </div>
    </div>


    <div class="col-12 mb-2">
      <p class="text-base">Your are sending to {{ beneficiary.name }}</p>

    </div>

    <div class="col-12">
      <p class="font-medium green-color">
        {{ formData.amount }} {{ assetSymbol }}
      </p>
    </div>
    <div class="col-12 mb-3 mt-3">
      <span>{{ t('The wire will take 24 hours.') }}</span>
    </div>

    <Button
        class="p-button search-btn"
        iconPos="right"
        :label="t('confirmWithdraw')"
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
import {BeneficiaryInternal} from "../../views/withdraw/types/beneficiary.interface";
import {WithdrawService} from "../../views/withdraw/services/withdraw";
import {ref} from "vue";
import {useToast} from "primevue/usetoast";
import {useBalanceWallet} from "../../composables/useBalanceWallet";

const toast = useToast()
const {t} = useI18n({useScope: 'global'})
const route = useRoute();
const {updateBlockedBalanceWalletByCode} = useBalanceWallet()

const submitting = ref(false);
const props = defineProps<{
  formData: any
}>()

const assetSymbol = props.formData.symbol

const beneficiary = props.formData.beneficiary as BeneficiaryInternal

const emit = defineEmits(['complete']);

function makeTransaction() {
  const withDrawService = WithdrawService.instance()

  submitting.value = true

  switch (route.params.type) {
    case 'fiat':
      withDrawService.makeFiatInternalTransfer({
        amount: props.formData.amount,
        accountDestination: props.formData.beneficiary.accountId,
        reference: props.formData.reference
      }).then(() => {
        submitting.value = false

        updateBlockedBalanceWalletByCode(props.formData.symbol, props.formData.amount)

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
      break
    case 'crypto':
      withDrawService.makeAssetInternalTransfer({
        amount: props.formData.amount,
        accountDestination: props.formData.beneficiary.accountId,
        reference: props.formData.reference,
        assetId: props.formData.assetId
      });

      updateBlockedBalanceWalletByCode(props.formData.symbol, props.formData.amount)

      emit('complete')
      break
    default:
      submitting.value = false
  }
}

</script>

<style scoped>
.title-beneficiary {
  color: #14443F;
}

.green-color {
  color: var(--primary-color);
}
</style>
