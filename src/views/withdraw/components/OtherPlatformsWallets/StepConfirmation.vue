<template>
  <div class="formgrid grid mt-5">
    <div class="col-12">
      <span class="mt-4">{{ t('Confirm withdraw information') }}</span>
      <Divider></Divider>
    </div>
    <div class="col-12">
      <h5 class="text-base text-600">{{ t('description') }}</h5>
      <p class="text-base font-medium">{{ beneficiary.label }}</p>
    </div>
    <div class="col-12">
      <h5 class="text-base text-600">{{ t('walletAddress') }}</h5>
      <p class="text-base font-medium">{{ beneficiary.walletAddress }}</p>
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
      <p class="text-base">Your are sending to: {{ beneficiary.label }}</p>

    </div>

    <div class="col-12">
      <p class="font-medium green-color">
        {{ formData.total }} {{ assetSymbol }}
      </p>
    </div>
<!--    <div class="col-12 mb-3 mt-3">-->
<!--      <span>{{ t('The wire will take 24 hours.') }}</span>-->
<!--    </div>-->

    <Button class="w-50 p-button search-btn" iconPos="right" :label="t('confirmWithdraw')" @click="makeTransaction()"
      :loading="submitting" />
  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import { useI18n } from 'vue-i18n';
import { useRoute } from "vue-router";
import Button from 'primevue/button';
import { WithdrawService } from "../../services/withdraw";
import { ref } from "vue";
import { useToast } from "primevue/usetoast";
import { useBalanceWallet } from "../../../../composables/useBalanceWallet";

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const route = useRoute();
const { updateBlockedBalanceWalletByCode } = useBalanceWallet()

const submitting = ref(false);
const props = defineProps<{
  formData: any
}>()

const assetSymbol = props.formData.symbol

const beneficiary = props.formData.beneficiary

const emit = defineEmits(['complete']);

async function makeTransaction() {
  const withDrawService = WithdrawService.instance()
  submitting.value = true
  await withDrawService.makeAssetExternalTransfer({
    amount: props.formData.total,
    beneficiaryAssetId: props.formData.beneficiary.id,
    reference: props.formData.reference,
  });

  updateBlockedBalanceWalletByCode(props.formData.symbol, props.formData.total)

  emit('complete')
  submitting.value = false
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
