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
        <ScrollPanel style="width: 100%; height: 200px">
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
            <FileUpload mode="basic" name="demo[]" url="./upload"  />
          </div>
          <Divider />
          <div class="mb-4">
            <p class="font-semibold">Comprobante de domicilio fiscal</p>
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
const companyDocumentTypeOptions = ref(['DNI', 'Pasaporte']);
const companyDocumentType = ref('');
</script>

<style scoped>

</style>