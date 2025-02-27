<template>
  <div class="container-data mb-0 pb-0">
    <p class="font-bold text-xl">{{ t('historicTransactionsTitle') }}</p>

    <ProgressSpinner
      v-if="isLoadingTransactionDetails"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />

    <ScrollPanel style="width: 100%; max-height: 500px; overflow: auto" class="mt-4">
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
              :item="prepareTransactionName(item)"
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
import ModalTransactionDetails from '../../../components/ModalTransactionDetails.vue'
import { formatDate } from '../../../shared/formatDate'
import { TransactionModalPayload } from '../../../types/transactionModal.interface'
import { processException } from '../../../shared/processException'
import { useToast } from 'primevue/usetoast'
import { useAssets } from '../../../composables/useAssets'
import { AssetClassification } from '../../deposit/types/asset.interface'

const emit = defineEmits(['modal-transaction-detail-load-data'])
const displayModalTransactionDetail = ref(false)
const isLoadingTransactionDetails = ref(false)
const modalTransactionDetail: any = ref({})
const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const { getAssetByAssetCode } = useAssets()
const props = defineProps<{
  assetCode: string | undefined
}>()
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
  isLoadingTransactionDetails.value = true
  await new HistoricService()
    .historic(props.assetCode)
    .then(data => {
      data.results.forEach(element => {
        listTransaction.value.push(element)
      })
      if (data.nextPag) {
        nextPage.value.nextPage = true
        nextPage.value.data = data.nextPag
      }
      isLoadingTransactionDetails.value = false
    })
    .catch(e => {
      isLoadingTransactionDetails.value = false
      processException(toast, t, e)
    })
})

const getTransactionType = (transactionData: any) => {
  if (!props.assetCode) {
    return
  }
  const assetClassification = getAssetByAssetCode(props.assetCode).assetClassification

  if (assetClassification === AssetClassification.FIAT && transactionData.transactionType === 'deposit') {
    return 'deposit-fiat'
  }

  if (assetClassification === AssetClassification.FIAT && transactionData.isInternal) {
    return 'internal-fiat'
  }

  if (
    !transactionData.isInternal &&
    assetClassification === AssetClassification.FIAT &&
    transactionData.to?.typeBeneficiaryBankWithdrawal === 'DOMESTIC'
  ) {
    return 'external-fiat-domestic'
  }

  if (
    !transactionData.isInternal &&
    assetClassification === AssetClassification.FIAT &&
    transactionData.to?.typeBeneficiaryBankWithdrawal === 'INTERNATIONAL'
  ) {
    return 'external-fiat-international'
  }

  if (transactionData.transactionType === 'deposit' && assetClassification !== AssetClassification.FIAT) {
    return 'deposit-asset'
  }

  if (transactionData.isInternal && assetClassification !== AssetClassification.FIAT) {
    return 'internal-asset'
  }

  if (!transactionData.isInternal && assetClassification !== AssetClassification.FIAT) {
    return 'external-asset'
  }
}

const loadMoreItems = async () => {
  submitting.value = true

  await new HistoricService()
    .historicNextPage(props.assetCode, nextPage.value.data)
    .then(data => {
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
    .catch(e => {
      processException(toast, t, e)
    })
}

const prepareTransactionName = (transaction: any) => {
  return {
    ...transaction,
    nameTo: `${transaction.beneficiary?.name ?? transaction?.nameTo ?? transaction.to?.label ?? ''}`,
  }
}
const openModalTransactionDetails = (event: any, transaction: any) => {
  isLoadingTransactionDetails.value = true
  transaction.specificType = getTransactionType(transaction)

  transaction.formatedDate = formatDate(transaction.createdAt)

  modalTransactionDetail.value = transaction

  loadTransactionDetail(transaction)
}

const loadTransactionDetail = async (transaction: any) => {
  await new HistoricService()
    .findTransactionByTransactionId(transaction.transactionId, transaction.isInternal, transaction.assetCode)
    .then(data => {
      const nameTo = `${transaction.beneficiary?.name ?? transaction?.nameTo ?? transaction.to?.label ?? ''}`
      displayModalTransactionDetail.value = true
      isLoadingTransactionDetails.value = false
      modalTransactionDetail.value = {
        ...modalTransactionDetail.value,
        ...(data as TransactionModalPayload),
        nameTo,
      } as TransactionModalPayload
    })
    .catch(e => {
      processException(toast, t, e)
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
