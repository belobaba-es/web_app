<template>
  <div>
    <SelectCardHeader title="transactionHistory" />
    <div v-if="transactionList.length === 0" class="flex flex-column align-items-center justify-content-center h-30rem">
      <div class="p-4" style="background: var(--primary-color); border-radius: 50%">
        <i class="pi pi-list" style="font-size: 2rem; color: white"></i>
      </div>
      <p class="text-center font-semi-bold mb-0" style="font-size: 16px">{{ t('dontHaveTransactions') }}</p>
      <p class="text-center mb-0">{{ t('firstBuy') }}</p>
    </div>
    <div class="px-5 pb-5 pt-2">
      <div v-for="(transaction, index) in transactionList" :key="index" class="mb-4">
        <div class="flex justify-content-between">
          <div class="font-semi-bold pr-2 flex align-items-center" style="font-size: 16px">
            <i
              v-if="!isPositiveAmount(transaction.amount)"
              class="pi pi-arrow-circle-down"
              style="font-size: 1.5rem; color: #fe5c73"
            ></i>
            <i v-else class="pi pi-arrow-circle-up" style="font-size: 1.5rem; color: #00beb0"></i>
            <span class="ml-3" style="font-size: 1rem">
              {{ getDescriptions(transaction) }}
            </span>
          </div>

          <p class="align-items-center" style="color: var(--primary-color); width: 10rem">
            {{ formatDateMobile(transaction.createdAt.toString()) }}
          </p>

          <div
            :style="{ color: !isPositiveAmount(transaction.amount) ? '#FE5C73' : 'var(--primary-color)' }"
            class="mt-2 font-semi-bold"
            style="font-size: 1.2rem"
          >
            {{ transaction.amount }}
            {{ transaction.currency }}
          </div>

          <div>
            <Button
              :loading="isGeneratingTransactionPDF"
              class="buttonColor"
              icon="pi pi-download"
              outlined
              size="large"
              style="border: none; font-size: 1rem"
              text
              @click="generatePdfTransactionCard(transaction)"
            />
          </div>
        </div>
        <Divider type="solid" />
      </div>
    </div>

    <template>
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
    </template>
  </div>

  <div class="justify-content-center align-items-center flex mt-4">
    <GeneralPaginator
      v-if="transactionList.length !== 0"
      :pagination="pagination"
      class="mt-4"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @updateItemsPage="updateItemsPage"
    />
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import Divider from 'primevue/divider'
import { useI18n } from 'vue-i18n'
import { useTransactionCard } from '../../cards/transactionsCard/composable/useTransactionCard'
import SelectCardHeader from '../components/SelectCardHeader.vue'
import GeneralPaginator from '../../../components/GeneralPaginator.vue'

const { t } = useI18n({ useScope: 'global' })
const {
  transactionList,
  formatDateMobile,
  getDescriptions,
  nextPage,
  generatePdfTransactionCard,
  isGeneratingTransactionPDF,
  pagination,
  prevPage,
  updateItemsPage,
} = useTransactionCard()
const isPositiveAmount = (amount: number) => {
  const formatedAmount = amount.toString()
  const numericAmount = Number(formatedAmount.replace(/[$,]/g, ''))
  return numericAmount >= 0
}
</script>
<style lang="scss" scoped>
.table-container {
  background-color: #f8f9fa;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
  padding: 20px;
  width: 100%;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table thead {
  background-color: #fff;
  text-align: left;
  font-weight: bold;
}

.table th {
  color: #00beb0;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
  font-weight: bold;
}

.table tbody {
  /* Estilos para el cuerpo de la tabla */
}

.table tr {
  background-color: #fff;
  color: #343a40;
  border-bottom: 1px solid #ddd;
}

.table td {
  padding: 12px 16px;
  vertical-align: middle;
}

.col-descripcion {
  width: 200px;
}

.col-id-transaccion {
  width: 120px;
}

.col-tipo {
  width: 150px;
}

.col-tarjeta-nro {
  width: 150px;
}

.col-fecha {
  width: 150px;
}

.col-monto {
  width: 120px;
  text-align: right;
}

.col-recibo {
  width: 100px;
  text-align: center;
  color: #00beb0;
}

.table tr:nth-child(even) {
  background-color: #f5f5f5;
}

.buttonColor {
  color: #00beb0;
}

.buttonColor:hover {
  color: #fff;
}
</style>
