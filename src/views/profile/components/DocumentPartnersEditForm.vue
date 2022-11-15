<template>
    <div>
        <p class="font-semibold">
            Pedro Gonzalez
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
            <Chip
                class="w-full"
                label="Archivo_1.jpg"
                icon="pi pi-check"
                removable 
                removeIconClass="pi pi-trash"
              />
        </div>
        <div class="field col-12 md:col-6">
            <FileUpload 
                mode="basic" 
                name="demo[]" 
                url="./upload" 
                chooseLabel="Seleccionar archivo" 
                class="w-full"
            />
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
    <Divider />
</template>

<script setup lang="ts">
import { ref } from "vue";
import Dropdown from 'primevue/dropdown';
import FileUpload from 'primevue/fileupload';
import Divider from "primevue/divider";
import Chip from 'primevue/chip';

const companyDocumentTypeOptions = ref(['DNI', 'Pasaporte']);
const companyDocumentType = ref('');

</script>

<style scoped>
.p-chip {
  border-radius: 3px;
  padding: 10px 9px;
}
</style>