<template>
    <PageLayout :title="t('swap')">
        <div class="flex align-items-center my-3">
            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
            <span class="text-xl"> {{ t('swapHistory') }}</span>
        </div>
        <DataTable :value="quotes.results" responsiveLayout="scroll">
            <Column field="unitCount" :header="t('Move done')"></Column>
            <Column field="status" :header="t('Status')"></Column>
            <Column field="feeAmount" :header="t('Quote / Price')"></Column>
            <Column field="createdAt" :header="t('Operation date')"></Column>
            <Column field="quoteId" :header="t('Number of order')"></Column>
        </DataTable>
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue';
import { useI18n } from "vue-i18n";
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';
import { useSwap } from '../../composables/useSwap';
import { useSwapStore } from '../../stores/swap';

const { t } = useI18n({ useScope: 'global' });
const { quotes } = useSwap()
const { fetchQuotes } = useSwapStore()
onMounted(async () => {
    await fetchQuotes()
});
</script>

<style scoped>

</style>