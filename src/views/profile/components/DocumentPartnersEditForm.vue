<template>
    <div class="px-3 pt-3 pb-0">
        <div>
            <p class="font-semibold">
                {{ getFullName(member) }}
            </p>
        </div>
        <div class="grid">
            <div class="field col-12">
                <Dropdown
                    v-model="accountStore.documentType"
                    :options="documentTypeOptions"
                    option-label="name"
                    option-value="value"
                    :placeholder="t('documentTypePlaceHolder')"
                    class="w-full"
                />
            </div>
            <div class="field col-12 md:col-6">
                <template v-if="canEdit(identityDocuments.frontSide.documentId)">
                    <FileInput 
                        :label="accountStore.documentType+'_front_side'"
                        side="front" 
                        :account-id="accountId!"
                        :document-country="member.taxCountry"
                        :tax-id="member.taxId"
                        :type="accountStore.documentType"
                    />
                </template>
                <template v-else>
                    <FileUploaded :identity-document="identityDocuments.frontSide"/>
                </template>
            </div>
            <div class="field col-12 md:col-6">
                <template v-if="canEdit(identityDocuments.backSide.documentId)">
                    <FileInput
                        :label="accountStore.documentType+'_back_side'"
                        side="backside"
                        :account-id="accountId!"
                        :document-country="member.taxCountry"
                        :tax-id="member.taxId"
                        :type="accountStore.documentType"
                    />
                </template>
                <template v-else>
                    <FileUploaded :identity-document="identityDocuments.backSide"/>
                </template>
            </div>
            <div class="field col-12">
                <div class="mb-4">
                    <p class="font-semibold">{{ t('utilityBillLabel') }}</p>
                </div>
                <div class="field">
                    <p class="font-medium">{{ t('uploadFileText') }}</p>
                    <div class="grid">
                        <div class="col-6">
                            <template v-if="canEdit(utilityBill.documentId)">
                                <FileInput 
                                    label="utility_bill"
                                    side="front"
                                    type="utility_bill"
                                    :account-id="accountId!"
                                    :document-country="member.taxCountry"
                                    :tax-id="member.taxId"
                                />
                            </template>
                            <template v-else>
                                <FileUploaded :identity-document="utilityBill"/>
                            </template>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Divider />
</template>

<script setup lang="ts">
import { ref, defineProps, onBeforeMount, watch } from 'vue';
import Dropdown from 'primevue/dropdown';
import Divider from "primevue/divider";
import { useAccount } from '../../../composables/useAccount';
import { useI18n } from 'vue-i18n';
import FileInput from './FileInput.vue';
import FileUploaded from './FileUploaded.vue';
import { useAccountStore } from '../../../stores/account';

const { t } = useI18n({ useScope: 'global' });
const accountStore = useAccountStore();

interface Props {
    taxId: string
}

const props = defineProps<Props>()
const { getFullName, accountId, documentType, members, documentToEdit } = useAccount();

const documentTypeOptions = ref([
  { value: "drivers_license", name: t('docTypeLabelDriversLicense') }, 
  { value: "government_id", name: t('docTypeLabelGovernmentId') },
  { value: "passport", name: t('docTypeLabelPassport') },
]);

const member = ref();
const identityDocuments = ref();
const utilityBill = ref();

onBeforeMount(() => {
    member.value = accountStore.findMember(props.taxId);
    identityDocuments.value = accountStore.findDocumentsToMember(props.taxId);
    utilityBill.value = accountStore.findUtilityBill(props.taxId);
    console.log('onBeforeMount DocumentPartnersEditForm');
});

watch(documentType, () => {
    identityDocuments.value = accountStore.findDocumentsToMember(props.taxId);
})

watch(members?.value!, () => {
    identityDocuments.value = accountStore.findDocumentsToMember(props.taxId);
    utilityBill.value = accountStore.findUtilityBill(props.taxId);
})

const canEdit = (documentId: string) => {
    return documentId === documentToEdit.value?.documentId;
}

</script>

<style scoped>

</style>