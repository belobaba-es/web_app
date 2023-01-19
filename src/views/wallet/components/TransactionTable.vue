<template>
  <div class="container-data">
    <p class="title-historic">{{ t('historicTransactionsTitle') }}</p>

    <ScrollPanel style="width: 100%; max-height: 600px" class="mt-4">
      <div class="grid">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <ItemTransactionDepositFiat :item="item" v-if="getTransactionType(item) === 'deposit-fiat'" />

            <ItemTransactionFiatInternal :item="item" v-if="getTransactionType(item) === 'internal-fiat'" />

            <ItemTransactionFiatExternalDosmestic
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-domestic'"
            />

            <ItemTransactionFiatExternalInternational
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-international'"
            />

            <ItemTransactionDepositAsset :item="item" v-if="getTransactionType(item) === 'deposit-asset'" />
            
            <ItemTransactionAssetInternal :item="item" v-if="getTransactionType(item) === 'internal-asset'" />

            <ItemTransactionAssetExternal :item="item" v-if="getTransactionType(item) === 'external-asset'" />
          </div>
        </div>
      </div>
    </ScrollPanel>

    <div class="mt-5" v-if="nextPage.nextPage === true">
      <div class="grid flex justify-content-end">
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <Button class="p-button load-more-btn" :label="t('loadMore')" @click="loadMoreItems" :loading="submitting" />
        </div>
      </div>
    </div>
  </div>
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

import { useI18n } from 'vue-i18n'

import Button from 'primevue/button'

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

  if (transactionData.assetCode === 'USD' && transactionData.isInternal === true) {
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
</script>
<style lang="css" scoped>
.load-more-btn {
  width: 100% !important;
}
</style>
