<template>
  <div class="col-12 float-left">
    <div class="card">
      <DataTable :value="products">
        <Column field="informationOwner.name" :header="t('nameAndLastName')">
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
