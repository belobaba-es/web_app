<template>
  <div>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th class="col-descripcion">{{ t('description') }}</th>
            <th class="col-id-transaccion">{{ t('transactionId') }}</th>
            <th class="col-tipo">{{ t('transactionType') }}</th>
            <th class="col-fecha">{{ t('date') }}</th>
            <th class="col-monto">{{ t('amount') }}</th>
            <th class="col-monto">{{ t('status') }}</th>
            <th class="col-recibo"></th>
          </tr>
        </thead>
        <tbody v-if="!loadingTransactions">
          <tr v-for="(transaction, index) in transactionList" :key="index">
            <td class="col-descripcion flex">
              <div class="pr-2" style="color: var(--primary-color)">
                <i
                  v-if="!isPositiveAmount(transaction.amount)"
                  class="pi pi-arrow-circle-down"
                  style="font-size: 1.5rem; color: #fe5c73"
                ></i>
                <i v-else class="pi pi-arrow-circle-up" style="font-size: 1.5rem"></i>
              </div>
              {{ getDescriptions(transaction) }}
            </td>
            <td class="col-id-transaccion">#{{ getLastSixDigits(transaction.transactionId) }}</td>
            <td class="col-tipo">{{ t(transaction.operationType) }}</td>
            <td class="col-fecha">{{ formatDate(transaction.createdAt) }}</td>
            <td class="col-fecha">{{ transaction.status }}</td>
            <td
              :style="{ color: !isPositiveAmount(transaction.amount) ? '#FE5C73' : 'var(--primary-color)' }"
              class="col-monto font-semi-bold"
            >
              {{ transaction.amount }}
              {{ transaction.currency }}
            </td>
            <td class="col-recibo">
              <Button
                :label="t('download')"
                :loading="isGeneratingTransactionPDF"
                class="font-semi-bold buttonColor"
                outlined
                @click="generatePdfTransactionCard(transaction)"
              />
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <template v-if="loadingTransactions">
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
import { useTransactionCard } from './composable/useTransactionCard'
import GeneralPaginator from '../../../components/GeneralPaginator.vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const {
  transactionList,
  getLastSixDigits,
  formatDate,
  nextPage,
  loadingTransactions,
  getDescriptions,
  generatePdfTransactionCard,
  isGeneratingTransactionPDF,
  pagination,
  prevPage,
  updateItemsPage,
} = useTransactionCard()

const isPositiveAmount = (amount: number) => {
  const formatedAmount = amount?.toString()
  const numericAmount = Number(formatedAmount?.replace(/[$,]/g, ''))
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
}

.table th {
  color: var(--primary-color);
  font-weight: bold;
  font-family: RedHatDisplaySemiBold, serif !important;
  padding: 12px 16px;
  border-bottom: 1px solid #ddd;
  white-space: nowrap;
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
  width: 290px;
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
  color: var(--primary-color);
}

.table tr:nth-child(even) {
  background-color: #f5f5f5;
}

.buttonColor {
  color: var(--primary-color);
}

.buttonColor:hover {
  color: #fff;
}
</style>
