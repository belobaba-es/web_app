<template>
  <div class="col-12 float-left">
    <div class="card">
      <DataTable :value="products" tableStyle="min-width: 50rem">
        <Column :header="t('nameAndLastName')" field="informationOwner.name">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>

        <Column :header="t('typeBeneficiary')" field="informationOwner.originWallet">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
        <Column :header="t('platform')" field="assetIcon">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
        <Column :header="'status'" field="status">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
        <Column field="code" header="">
          <template #body>
            <Skeleton></Skeleton>
          </template>
        </Column>
      </DataTable>
    </div>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import DataTable from 'primevue/datatable'
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const products = ref(new Array(4))
</script>
