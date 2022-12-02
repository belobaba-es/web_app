<template>
    <div class="px-3 pt-3 pb-0">
        <div class="field">
            <p class="font-medium">{{ t('uploadFileText') }}</p>
            <template v-if="canEdit(otherDocument.documentId)">
                <FileInput
                    label="other"
                    side="front"
                    type="other"
                    :account-id="accountId!"
                    :document-country="owner?.taxCountry!"
                    :tax-id="owner?.taxId!"
                />
            </template>
            <template v-else>
                <FileUploaded :identity-document="utilityBill"/>
            </template>
        </div>
    </div>

    <Divider />
    <div class="px-3 py-3">
        <div class="mb-4">
            <p class="font-semibold">{{ t('utilityBillLabel') }}</p>
        </div>
        <div class="field">
            <p class="font-medium">{{ t('uploadFileText') }}</p>
            <template v-if="canEdit(utilityBill.documentId)">
                <FileInput
                    label="utility_bill"
                    side="front"
                    type="utility_bill"
                    :account-id="accountId!"
                    :document-country="owner?.taxCountry!"
                    :tax-id="owner?.taxId!"
                />
            </template>
            <template v-else>
                <FileUploaded :identity-document="utilityBill"/>
            </template>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import Divider from "primevue/divider";
import { useAccount } from '../../../composables/useAccount';
import { useI18n } from 'vue-i18n';
import FileInput from './FileInput.vue';
import FileUploaded from './FileUploaded.vue';
import { useAccountStore } from '../../../stores/account';

const { t } = useI18n({ useScope: 'global' });
const accountStore = useAccountStore();
const { documentToEdit, owner, accountId } = useAccount();

const utilityBill = ref();
const otherDocument = ref();

onBeforeMount(() => {
    utilityBill.value = accountStore.findUtilityBillCompany();
    otherDocument.value = accountStore.findOtherDocumentCompany();
    console.log('onBeforeMount DocumentCompanyEditForm');
});

const canEdit = (documentId: string) => {
    return documentId === documentToEdit.value?.documentId;
}
</script>

<style scoped>

</style>