<template>
  <div class="main-container"></div>

  <div class="container-data">
    <p>Historico de transacciones</p>

    <DataTable :value="data" scrollable scrollHeight="400px" :virtualScrollerOptions="{ itemSize: 46 }">
      <Column field="id" header="Id" style="min-width: 200px"></Column>
    </DataTable>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { HistoricService } from './services/historic'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'

import { ref } from 'vue'

const router = useRouter()
const route = useRoute()

const data = ref([
  {
    id: 'evacI0y0MMqWgA4WI0RD',
    accountId: 'e0548e36-180f-45fa-9fc0-18b1ca92a28b',
    transactionType: 'withdraw-funds',
    amount: 1,
    status: 'processed',
    createdAt: {
      _seconds: 1672394905,
      _nanoseconds: 471000000,
    },
    to: 's57P6jPOkbTJ9vuxMlsS',
    assetCode: 'BTC',
  },
])

const assetCode: string = route.params.assetCode.toString()
const getHistoric = HistoricService.instance()

async function getHistoricData(assetCode: string) {
  const historic = await getHistoric.historic(assetCode)
  console.log(data.value)
  historic.results.forEach(element => {
    console.log(element)
    data.value.push(element)
  })
}

getHistoricData(assetCode)
</script>

<style lang="scss">
.main-container {
  border: 1px solid #ebebeb;
  padding: 1rem;
  margin: 0.5rem;
  background-color: #fff;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%), 0px 1px 4px rgb(0 0 0 / 8%) !important;
  transition: box-shadow 0.2s ease-in-out;
  &:hover {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.container-data {
  font-family: KanitLight !important;
  padding: 1rem;
  margin: 0.5rem;
}
</style>
