<template>
    <PageLayout :title="t('swap')">
        <div class="flex align-items-center my-3">
            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
            <span class="text-xl"> {{ t('swapHistory') }}</span>
        </div>
        <DataTable :value="history" responsiveLayout="scroll">
            <Column field="swap" :header="t('Swap')">
                <template #body>
                    asdsa
                </template>
            </Column>
            <Column field="move_done" :header="t('Move done')"></Column>
            <Column field="move_done" :header="t('To your balance in')"></Column>
            <Column field="createdAt" :header="t('Operation date')"></Column>
            <Column field="status" :header="t('Status')"></Column>
            <Column field="move_done" :header="t('Settlement date')"></Column>
            <Column field="move_done" :header="t('Quote / Price')"></Column>
            <Column field="quoteId" :header="t('Number of order')"></Column>
        </DataTable>
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue';
import { useI18n } from "vue-i18n";
import { useRouter } from 'vue-router';
import Button from 'primevue/button';
import DataTable from 'primevue/datatable';
import Column from 'primevue/column';
import { ref, onMounted } from 'vue';

const { t } = useI18n({ useScope: 'global' });
const router = useRouter();
const history = ref<any[]>([]);

onMounted(() => {
    history.value = [
        {
            accountId: "53a1fd04-a8d5-47ba-a7ff-c7f12739ed2d",
            amount: "1",
            amountIsUnitCount: false,
            assetId: "798debbc-ec84-43ea-8096-13e2ebcf4749",
            createdAt: "7 de diciembre de 2022",
            quoteId: "951305d2-e0a6-4790-bb3b-48723cb1874f",
            status: "pending",
            tradeId: null,
            transactionType: "sell",
        },
    ]
});
</script>

<style scoped>

</style>