<template>
  <div class="container-data">
    <p class="title-historic">{{t('historicTransactionsTitle')}}</p>

    <ScrollPanel style="width: 100%; height: 400px" class="mt-4">
      <div class="grid">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <ItemTransactionFiatInternal :item="item" v-if="getTransactionType(item) === 'internal-fiat'" />

            <ItemTransactionFiatExternalDosmestic
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-domestic'"
            />

            <ItemTransactionFiatExternalInternational
              :item="item"
              v-if="getTransactionType(item) === 'external-fiat-international'"
            />

            <ItemTransactionAssetExternal :item="item" v-if="getTransactionType(item) === 'external-asset'" />

            <ItemTransactionAssetInternal :item="item" v-if="getTransactionType(item) === 'internal-asset'" />
          </div>
        </div>
      </div>
    </ScrollPanel>
  </div>
</template>

<script setup lang="ts">
import ScrollPanel from 'primevue/scrollpanel'
import { defineProps, onMounted, ref } from 'vue'

import ItemTransactionFiatInternal from './ItemTransactionFiatInternal.vue'
import ItemTransactionFiatExternalDosmestic from './ItemTransactionFiatExternalDosmestic.vue'
import ItemTransactionFiatExternalInternational from './ItemTransactionFiatExternalInternational.vue'
import ItemTransactionAssetInternal from './ItemTransactionAssetInternal.vue'
import ItemTransactionAssetExternal from './ItemTransactionAssetExternal.vue'

import { HistoricService } from '../services/historic'
import { LisTransaction } from '../types/historic-transactions-response.interface'

import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });

const props = defineProps<{
  assetCode: string | undefined
}>()

const getHistoric = HistoricService.instance()
const listTransaction = ref<LisTransaction[]>([])

onMounted(async () => {
  await getHistoric.historic(props.assetCode).then(data => {
    data.results.forEach(element => {
      listTransaction.value.push(element)
    })
  })
})

const getTransactionType = (transactionData: any) => {
  console.log('TTTTT', transactionData)
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

  if (transactionData.isInternal && transactionData.assetCode !== 'USD') {
    return 'internal-asset'
  }

  if (!transactionData.isInternal && transactionData.assetCode !== 'USD') {
    return 'external-asset'
  }
}
</script>
