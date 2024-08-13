<template>
  <div>
    <div class="table-container">
      <table class="table">
        <thead>
          <tr>
            <th class="col-descripcion">Descripción</th>
            <th class="col-id-transaccion">ID Transacción</th>
            <th class="col-tipo">Tipo</th>
            <th class="col-fecha">Fecha</th>
            <th class="col-monto">Monto</th>
            <th class="col-recibo">Recibo</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="(transaction, index) in transactionList" :key="index">
            <td class="col-descripcion flex">
              <div style="color: #00beb0" class="pr-2">
                <i
                  v-if="!isPositiveAmount(transaction.amount)"
                  class="pi pi-arrow-circle-down"
                  style="font-size: 1.5rem"
                ></i>
                <i v-else class="pi pi-arrow-circle-up" style="font-size: 1.5rem"></i>
              </div>
              {{ transaction.reasonRejectingTransaction ? transaction.reasonRejectingTransaction : '--' }}
            </td>
            <td class="col-id-transaccion">#{{ getLastSixDigits(transaction.transactionId) }}</td>
            <td class="col-tipo">{{ t(transaction.operationType) }}</td>
            <td class="col-fecha">{{ formatDate(transaction.createdAt) }}</td>
            <td class="col-monto" :style="{ color: !isPositiveAmount(transaction.amount) ? '#FE5C73' : '#00beb0' }">
              $
              {{ transaction.amount }}
            </td>
            <td class="col-recibo">
              <Button class="buttonColor" label="Descargar" outlined />
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="nextPage" class="mt-5">
        <div class="flex justify-content-end mr-3">
          <Button
            icon="pi pi-angle-right"
            iconPos="right"
            class="p-button load-more-btn w-13rem"
            :label="t('loadMore')"
            @click="loadMoreTransactions"
            :loading="loadingTransactions"
          />
        </div>
      </div>
    </div>

    <template>
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
    </template>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import Skeleton from 'primevue/skeleton'
import { useTransactionCard } from './composable/useTransactionCard'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const { getHistoryTransaction, transactionList, getLastSixDigits, formatDate, loadMoreTransactions, loadingTransactions, nextPage } = useTransactionCard()
const isPositiveAmount = (amount: number) => {
  const formatedAmount = amount.toString()
  const numericAmount = Number(formatedAmount.replace(/[$,]/g, ''))
  return numericAmount >= 0
}

onMounted(async () => {
  await getHistoryTransaction(1, 10)
})

</script>
<style scoped lang="scss">
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
