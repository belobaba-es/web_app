<template>
  <div class="pt-5 flex justify-content-between align-items-center">
    <h1 class="text-2xl">Documents</h1>
  </div>
  <div class="mb-4">
    <p class="font-medium text-sm uppercase">COMPANY - OWNERSHIP STRUCTURE</p>
  </div>
  <div class="grid">
    <div class="col-12 md:col-6">
      <Panel header="EMPRESA - CARGA DE DOCUMENTOS">
        <ScrollPanel style="width: 100%; height: 285px" class="custom">
          <div class="mb-4">
            <p class="font-semibold">Tipo de documento empresa que indiquen la estructura de propiedad</p>
          </div>
          <div class="field">
            <Dropdown
                v-model="companyDocumentType"
                :options="companyDocumentTypeOptions"
                placeholder="Elija el tipo de documento"
                class="w-full"
            />
          </div>
          <div class="field">
            <p class="font-medium">Cargue el archivo del documento aqui (Formato admitido JPG, PNG o PDF)</p>
            <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Seleccionar archivo" />
          </div>
          <div class="grid px-2 gap-2">
            <div class="col-auto">
              <Chip
                label="Archivo_1.jpg"
                icon="pi pi-check"
                removable 
                removeIconClass="pi pi-trash"
              />
            </div>
            <div class="col-auto">
              <Chip
                label="Archivo_1.jpg"
                icon="pi pi-check"
                removable 
                removeIconClass="pi pi-trash"
              />
            </div>
            <div class="col-auto">
              <Chip
                label="Archivo_1.jpg"
                icon="pi pi-check"
                removable 
                removeIconClass="pi pi-trash"
              />
            </div>
            <div class="col-auto">
              <Chip
                label="Archivo_1.jpg"
                icon="pi pi-check"
                removable 
                removeIconClass="pi pi-trash"
              />
            </div>
          </div>
          <Divider />
          <div class="mb-4">
            <p class="font-semibold">Comprobante de domicilio fiscal</p>
          </div>
          <div class="field">
            <p class="font-medium">Cargue el archivo del documento aqui (Formato admitido JPG, PNG o PDF)</p>
            <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Seleccionar archivo" />
          </div>
          <div class="col-auto">
            <Chip
              label="Archivo_1.jpg"
              icon="pi pi-check"
              removable 
              removeIconClass="pi pi-trash"
            />
          </div>
        </ScrollPanel>

      </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel header="ACCIONISTAS - CARGA DE DOCUMENTOS">

      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel';
import Dropdown from 'primevue/dropdown';
import { ref } from "vue";
import FileUpload from 'primevue/fileupload';
import Divider from "primevue/divider";
import ScrollPanel from 'primevue/scrollpanel';
import Chip from 'primevue/chip';

const companyDocumentTypeOptions = ref(['DNI', 'Pasaporte']);
const companyDocumentType = ref('');
</script>

<style scoped lang="scss">
.p-chip {
  border-radius: 3px;
  padding: 10px 9px;
}
</style>