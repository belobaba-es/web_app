<template>
    <div class="flex justify-content-between align-items-center">
    <h1 class="text-2xl">{{ t('documents') }}</h1>
  </div>
  <div class="mb-4">
    <p class="font-medium text-sm uppercase">{{ t('documentsCompanyCardTitle') }}</p>
  </div>
  <div class="grid">
    <div class="col-12 md:col-6">
      <Panel :header="t('uploadFileDocumentCompanyText')" class="shareholders-panel">
        <ScrollPanel style="width: 100%; height: 400px" class="custom">
          <div class="px-3 pt-3 pb-0">
            <div class="field">
              <p class="font-medium">{{ t('uploadFileText') }}</p>
              <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Seleccionar archivo" />
            </div>
            <div class="grid px-2 gap-2">
              <div v-for="(document, idx) in owner?.documents" class="col-auto">
                <Chip 
                    :label="document.label" 
                    :key="idx"
                />
              </div>
            </div>
          </div>
          
          <Divider />
          <div class="px-3 py-3">
            <div class="mb-4">
              <p class="font-semibold">{{ t('utilityBillLabel') }}</p>
            </div>
            <div class="field">
              <p class="font-medium">{{ t('uploadFileText') }}</p>
              <FileUpload mode="basic" name="demo[]" url="./upload" chooseLabel="Seleccionar archivo" />
            </div>
            <div class="col-auto">
              <Chip label="Archivo_1.jpg" icon="pi pi-check" removable removeIconClass="pi pi-trash" />
            </div>
          </div>
        </ScrollPanel>
      </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel :header="t('uploadFileDocumentShareHolderText')" class="shareholders-panel">
        <ScrollPanel style="width: 100%; height: 400px" class="custom">
          <div v-for="(partner, idx) in members">
            <DocumentPartnersEditForm
              :tax-id="partner.taxId"
              :key="idx" />
          </div>
        </ScrollPanel>
      </Panel>
    </div>
  </div>
</template>

<script setup lang="ts">
import Panel from 'primevue/panel';
import FileUpload from 'primevue/fileupload';
import Divider from "primevue/divider";
import ScrollPanel from 'primevue/scrollpanel';
import Chip from 'primevue/chip';
import DocumentPartnersEditForm from './components/DocumentPartnersEditForm.vue';
import { useAccount } from '../../composables/useAccount';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
const { owner, members } = useAccount();

</script>

<style scoped lang="scss">
.p-chip {
  border-radius: 3px;
  padding: 10px 9px;
}
</style>