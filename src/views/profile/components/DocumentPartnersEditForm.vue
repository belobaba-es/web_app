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
                    v-model="companyDocumentType"
                    :options="companyDocumentTypeOptions"
                    placeholder="Elija el tipo de documento"
                    class="w-full"
                />
            </div>
            <div class="field col-12 md:col-6">
                <template v-if="props.partner.documents[0]">
                    <Chip
                        class="edit-document-chip w-full"
                        :label="props.partner.documents[0].label"
                        icon="pi pi-check"
                        removable
                        removeIconClass="pi pi-trash"
                    />
                </template>
                <template v-else>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        url="./upload"
                        chooseLabel="Seleccionar archivo" 
                        class="w-full"
                    />
                </template>
            </div>
            <div class="field col-12 md:col-6">
                <template v-if="props.partner.documents[1]">
                    <Chip
                        class="edit-document-chip w-full"
                        :label="props.partner.documents[1].label"
                        icon="pi pi-check"
                        removable
                        removeIconClass="pi pi-trash"
                    />
                </template>
                <template v-else>
                    <FileUpload
                        mode="basic"
                        name="demo[]"
                        url="./upload"
                        chooseLabel="Seleccionar archivo" 
                        class="w-full"
                    />
                </template>
            </div>
            <div class="field col-12">
                <div class="mb-4">
                    <p class="font-semibold">Comprobante de domicilio fiscal</p>
                </div>
                <div class="field">
                    <p class="font-medium">Cargue el archivo del documento aqui (Formato admitido JPG, PNG o PDF)</p>
                    <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Seleccionar archivo" />
                </div>
            </div>
        </div>
    </div>
    <Divider />
</template>

<script setup lang="ts">
import { ref, defineProps } from 'vue';
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Divider from "primevue/divider";
import Chip from 'primevue/chip';
import { Member } from '../types/account.interface';
import { useAccount } from '../../../composables/useAccount';

interface Props {
    partner: Member
}

const companyDocumentTypeOptions = ref(['DNI', 'Pasaporte']);
const companyDocumentType = ref('');

const props = defineProps<Props>()
const { getFullName } = useAccount();

</script>

<style scoped>

</style>