<template>
  <div class="container-data mb-0 pb-0">
    <p class="title-historic">{{ t('historicTransactionsTitle') }}</p>

    <ProgressSpinner
      v-if="isLoadingTransactionDetails"
     style="width: 50px; height: 50px" strokeWidth="8" fill="var(--surface-ground)"
     animationDuration=".5s" aria-label="Custom ProgressSpinner"
    />

    <ScrollPanel style="width: 100%; max-height: 580px; overflow: auto" class="mt-4">
      <div class="grid">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12" @click="modal(true)">
            <ItemTransactionDepositFiat
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'deposit-fiat'"
            />

            <ItemTransactionFiatInternal
              :loading="isLoadingTransactionDetails"
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'internal-fiat'"
            />

            <ItemTransactionFiatExternalDosmestic
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-domestic'"
            />

            <ItemTransactionFiatExternalInternational
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-international'"
            />

            <ItemTransactionDepositAsset
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'deposit-asset'"
            />

            <ItemTransactionAssetInternal
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'internal-asset'"
            />

            <ItemTransactionAssetExternal
              @click="openModalTransactionDetails($event, item)"
              :item="item"
              v-if="getTransactionType(item) === 'external-asset'"
            />
          </div>
        </div>
      </div>
    </ScrollPanel>

    <div class="mt-2" v-if="nextPage.nextPage === true">
      <div class="grid flex justify-content-end">
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <Button class="p-button load-more-btn" :label="t('loadMore')" @click="loadMoreItems" :loading="submitting" />
        </div>
      </div>
    </div>
  </div>

  <ModalTransactionDetails
    v-model:display="displayModalTransactionDetail"
    :transaction="modalTransactionDetail"
  ></ModalTransactionDetails>
</template>

<script setup lang="ts">
import ScrollPanel from 'primevue/scrollpanel'
import { defineProps, onMounted, ref } from 'vue'
import ItemTransactionDepositFiat from './ItemTransactionDepositFiat.vue'
import ItemTransactionFiatInternal from './ItemTransactionFiatInternal.vue'
import ItemTransactionFiatExternalDosmestic from './ItemTransactionFiatExternalDosmestic.vue'
import ItemTransactionFiatExternalInternational from './ItemTransactionFiatExternalInternational.vue'
import ItemTransactionDepositAsset from './ItemTransactionDepositAsset.vue'
import ItemTransactionAssetInternal from './ItemTransactionAssetInternal.vue'
import ItemTransactionAssetExternal from './ItemTransactionAssetExternal.vue'
import { HistoricService } from '../services/historic'
import { LisTransaction } from '../types/historic-transactions-response.interface'
import ProgressSpinner from 'primevue/progressspinner'
import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'
import ModalTransactionDetails, {TransactionModalPayload} from '../../../components/ModalTransactionDetails.vue'

const emit = defineEmits(['modal-transaction-detail-load-data'])
const displayModalTransactionDetail = ref(false)
const isLoadingTransactionDetails = ref(false)
const modalTransactionDetail: any = ref({})
const { t } = useI18n({ useScope: 'global' })
const props = defineProps<{
  assetCode: string | undefined
}>()
const getHistoric = HistoricService.instance()
const listTransaction = ref<LisTransaction[]>([])
const submitting = ref(false)
const nextPage = ref({
  nextPage: false,
  data: '',
})
const showModal = ref(false)
const modal = (b: boolean) => {
  showModal.value = b
}

onMounted(async () => {
  await getHistoric.historic(props.assetCode).then(data => {
    data.results.forEach(element => {
      listTransaction.value.push(element)
    })
    if (data.nextPag) {
      nextPage.value.nextPage = true
      nextPage.value.data = data.nextPag
    }
  })
})

const getTransactionType = (transactionData: any) => {
  if (transactionData.assetCode === 'USD' && transactionData.transactionType === 'deposit') {
    return 'deposit-fiat'
  }

  if (transactionData.assetCode === 'USD' && transactionData.isInternal) {
    return 'internal-fiat'
  }

  if (
    !transactionData.isInternal &&
    transactionData.assetCode === 'USD' &&
    transactionData.to.typeBeneficiaryBankWithdrawal === 'DOMESTIC'
  ) {
    return 'external-fiat-domestic'
  }

  if (
    !transactionData.isInternal &&
    transactionData.assetCode === 'USD' &&
    transactionData.to.typeBeneficiaryBankWithdrawal === 'INTERNATIONAL'
  ) {
    return 'external-fiat-international'
  }

  if (transactionData.transactionType === 'deposit' && transactionData.assetCode !== 'USD') {
    return 'deposit-asset'
  }

  if (transactionData.isInternal && transactionData.assetCode !== 'USD') {
    return 'internal-asset'
  }

  if (!transactionData.isInternal && transactionData.assetCode !== 'USD') {
    return 'external-asset'
  }
}

const loadMoreItems = async () => {
  submitting.value = true

  await getHistoric.historicNextPage(props.assetCode, nextPage.value.data).then(data => {
    data.results.forEach(element => {
      listTransaction.value.push(element)
    })

    nextPage.value.data = data.nextPag
    nextPage.value.nextPage = false
    submitting.value = false

    if (data.nextPag) {
      nextPage.value.nextPage = true
    }
  })
}
const openModalTransactionDetails = (event: any, transaction: any) => {
  isLoadingTransactionDetails.value = true
  transaction.specificType = getTransactionType(transaction)

  const txDate = new Date(transaction.createdAt._seconds * 1000)
  const formatter = new Intl.DateTimeFormat('en-US', { year: 'numeric', month: 'long', day: 'numeric' })
  transaction.formatedDate = formatter.format(txDate)

  modalTransactionDetail.value = transaction

  loadTransactionDetail(transaction)
}

const loadTransactionDetail = async (transaction: any) => {
  await getHistoric
    .findTransactionByTransactionId(transaction.transactionId, transaction.isInternal, transaction.assetCode)
    .then(data => {
      const nameTo = `${(transaction.beneficiary?.name ?? transaction.nameTo ?? transaction.to.label)}`

      displayModalTransactionDetail.value = true
      isLoadingTransactionDetails.value = false
      modalTransactionDetail.value = { ...modalTransactionDetail.value, ...(data as TransactionModalPayload), nameTo } as TransactionModalPayload
    })
}
</script>
<style lang="css" scoped>
.p-progress-spinner {
  position: fixed;
  margin-left: 33%;
  z-index: 999;
}
.load-more-btn {
  width: 100% !important;
}
</style>
