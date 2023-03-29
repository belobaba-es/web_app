<template>
  <div v-if="!isCompleted" class="formgrid grid mt-5 mb-5">
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
<!--    <div class="col-12 mb-3 mt-3">-->
<!--      <span>{{ t('The wire will take 24 hours.') }}</span>-->
<!--    </div>-->

    <Button
        class="w-50 p-button search-btn"
        iconPos="right"
        :label="t('continue')"
        @click="makeTransaction()"
        :loading="submitting"
    />
  </div>

  <!-- Completed transfer resume and download PDF Receipt -->
  <div v-if="isCompleted" class="formgrid grid mt-5 mb-5">
    <p class="text-3xl font-medium mb-4">
      <span class="text-primary">Your transfer has been successful</span>
    </p>

    <!--      transaction summary-->
    <div class="col-12">
      <span class="mt-4">transaction summary</span>
    <Divider></Divider>
    </div>

<!--    <div class="col-12">-->
<!--      <div class="col-6">-->
<!--        <p class="font-medium text-sm">{{ t('bankAccountHolder') }}</p>-->
<!--        <p class="font-medium text-sm">{{ t('emailLabel') }}</p>-->
<!--        <p class="font-medium text-sm">{{ t('walletAddress') }}</p>-->
<!--      </div>-->

<!--      <div class="col-6">-->
<!--        <p>Alberto Rodriguez</p>-->
<!--        <p>albertorodriguez@gmail.com</p>-->
<!--        <p>asdfjasdkfyads^*3HD893459&HD*$</p>-->
<!--      </div>-->

<!--      <Divider type="dashed"></Divider>-->

<!--      <div class="col-6">-->
<!--        <p class="font-medium text-sm">{{ t('emailLabel') }}</p>-->
<!--        <p class="font-medium text-sm">{{ t('ourFee') }}</p>-->
<!--        <p class="font-medium text-sm">{{ props.formData.realName }} {{ t('hasReceived') }}</p>-->
<!--      </div>-->

<!--      <div class="col-6">-->
<!--        <p>{{ props.formData.amount }}</p>-->
<!--        <p>{{ props.formData.amountFee }} USD</p>-->
<!--        <p>{{ t('Amount') }}</p>-->
<!--      </div>-->

<!--      <Divider type="dashed"></Divider>-->

<!--      <div class="col-6">-->
<!--        <p class="font-medium text-sm">{{ t('transactionNumber') }}</p>-->
<!--      </div>-->

<!--      <div class="col-6">-->
<!--        <p>{{ transactionId }}</p>-->
<!--      </div>-->
<!--    </div>-->
    <InternationalTransferDetail
      :realName="'Alberto perez'"
      :email="'alb erto@gmail.com'"
      :account="'hajsdfhas hasjdfhas'"
      :amount="'12340'"
      :amountFee="'25'"
      :transactionId="'7814574hf478fh2948'"
    ></InternationalTransferDetail>

    <div class="col-12 btn-container">
      <Button
        class="w-50 p-button mt-5 btn-routing"
        :label="t('newTransfer')"
        @click="goToWithdrawIndex()"
      />

      <Button
        class="w-50 p-button mt-5"
        :label="t('downloadPdf')"
        @click="makeTransaction()"
        :loading="isGeneratingTransactionPDF"
      />
    </div>

  </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import {useI18n} from 'vue-i18n';
import {useRoute, useRouter} from "vue-router";
import Button from 'primevue/button';
import {ref} from "vue";
import {WithdrawService} from "../../services/withdraw";
import InternationalTransferDetail from "../../../../components/InternationalTransferDetail.vue";
import {useBalanceWallet} from "../../../../composables/useBalanceWallet";
import {useToast} from "primevue/usetoast";

const toast = useToast()
const {updateBlockedBalanceWalletByCode} = useBalanceWallet()
const submitting = ref(false);
const isCompleted = ref(false);
const isGeneratingTransactionPDF = ref(false);
const transactionId = ref(null);
const {t} = useI18n({useScope: 'global'})
const route = useRoute();
const router = useRouter();
const props = defineProps<{
  formData: any
}>()

const emit = defineEmits(['complete']);

const goToWithdrawIndex = () => {
  router.push(`/withdraw`)
}

function makeTransaction() {
  isCompleted.value = true;
  const withdraw = WithdrawService.instance()

  submitting.value = true

  console.log("isCompleted", isCompleted.value)
  console.log("isCompleted", props.formData)
  // return;

  withdraw.makeFiatExternalTransfer({
    amount: props.formData.amount,
    beneficiaryId: props.formData.beneficiary.id,
    reference: props.formData.reference,
  }).then((res: any) => {
    console.log('confirmation res', res.data.transactionId)
    submitting.value = false
    // updateBlockedBalanceWalletByCode('USD', props.formData.amount)
    //
    // emit('complete')
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
.mt-5 {
  margin-top: 22px!important;
}

.mt-10 {
  margin-top: 42px;
}

.btn-container {
  display: flex;
  flex-direction: column;
}

.btn-routing {
  background-color: white;
  color: black;
  border: 1px solid #E7E6E7;
  border-radius: 5px;
  opacity: 1;
}
</style>
