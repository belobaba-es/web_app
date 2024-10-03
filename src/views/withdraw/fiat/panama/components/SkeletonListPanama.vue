<template>
  <DataTable :value="products">
    <Column :header="t('beneficiaryName')" field="code" style="color: #00beb0">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column :header="t('withdrawTableStatus')" field="name" style="color: #00beb0">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column :header="t('typeNetwork')" field="category" style="color: #00beb0">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column :header="t('countryLabel')" field="category" style="color: #00beb0">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
    <Column :header="t('edit')" field="category" style="color: #00beb0">
      <template #body>
        <Skeleton></Skeleton>
      </template>
    </Column>
  </DataTable>
</template>
<script lang="ts" setup>
import Column from 'primevue/column'
import Skeleton from 'primevue/skeleton'
import DataTable from 'primevue/datatable'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const products = ref(new Array(4))
</script>
