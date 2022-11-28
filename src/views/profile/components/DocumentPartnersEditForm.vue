<template>
    <div class="px-3 pt-3 pb-0">
        <div>
            <p class="font-semibold">
                {{ getFullName(props.partner) }}
            </p>
        </div>
        <div class="grid">
            <div class="field col-12">
                <Dropdown
                    v-model="documentType"
                    :options="documentTypeOptions"
                    option-label="name"
                    option-value="value"
                    placeholder="Elija el tipo de documento"
                    class="w-full"
                />
            </div>
            <div class="field col-12 md:col-6">
                <template v-if="identityDocuments[0]">
                    <FileUploaded :identity-document="identityDocuments[0]"/>
                </template>
                <template v-else>
                    <FileInput 
                        :label="documentType+'_front_side'" 
                        side="front" 
                        :account-id="props.partner.contactId"
                        :document-country="props.partner.taxCountry"
                        :tax-id="props.partner.taxId"
                        :type="documentType"
                    />
                </template>
            </div>
            <div class="field col-12 md:col-6">
                <template v-if="identityDocuments[1]">
                    <FileUploaded :identity-document="identityDocuments[1]"/>
                </template>
                <template v-else>
                    <FileInput 
                        :label="documentType+'_back_side'" 
                        side="backside" 
                        :account-id="props.partner.contactId"
                        :document-country="props.partner.taxCountry"
                        :tax-id="props.partner.taxId"
                        :type="documentType"
                    />
                </template>
            </div>
            <div class="field col-12">
                <div class="mb-4">
                    <p class="font-semibold">Comprobante de domicilio fiscal</p>
                </div>
                <div class="field">
                    <p class="font-medium">Cargue el archivo del documento aqui (Formato admitido JPG, PNG o PDF)</p>
                    <div class="grid">
                        <div class="col-6">
                            <FileInput 
                                label="utility_bill" 
                                side="address" 
                                type="utility_bill"
                                :account-id="props.partner.contactId"
                                :document-country="props.partner.taxCountry"
                                :tax-id="props.partner.taxId"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <Divider />
</template>

<script setup lang="ts">
import { ref, defineProps, computed, onMounted } from 'vue';
import Dropdown from 'primevue/dropdown';
import Divider from "primevue/divider";
import { Document, Member } from '../types/account.interface';
import { useAccount } from '../../../composables/useAccount';
import { useI18n } from 'vue-i18n';
import FileInput from './FileInput.vue';
import FileUploaded from './FileUploaded.vue';
const { t } = useI18n({ useScope: 'global' });

interface Props {
    partner: Member
}

const props = defineProps<Props>()
const { getFullName } = useAccount();

const documentTypeOptions = ref([
  { value: "drivers_license", name: t('docTypeLabelDriversLicense') }, 
  { value: "government_id", name: t('docTypeLabelGovernmentId') },
  { value: "passport", name: t('docTypeLabelPassport') },
  { value: "residence_permit", name: t('docTypeLabelResidencePermit') },
]);

const documentType = ref('government_id');
const documents = ref<Document[]>([]);

onMounted(() => {
    fillDocuments();
});

const fillDocuments = () => {
    const documentsKeys = Object.keys(props.partner.documents);
    documentsKeys.forEach((value) => {
        if (!isNaN(parseInt(value))) {
            documents.value.push(props.partner.documents[parseInt(value)]);
        }
    });
}

const identityDocuments = computed(() => {
    const data = documents.value.filter((document) => {
        return document.documentType === documentType.value && document.documentType !== 'utility_bill';
    });

    return data.slice(0, 2);
});


</script>

<style scoped>

</style>