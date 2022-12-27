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
          <DocumentCompanyEditForm />
        </ScrollPanel>
      </Panel>
    </div>
    <div class="col-12 md:col-6">
      <Panel :header="t('uploadFileDocumentShareHolderText')" class="shareholders-panel">
        <ScrollPanel style="width: 100%; height: 400px" class="custom">
          <div v-for="(partner, idx) in getMembers()">
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
import ScrollPanel from 'primevue/scrollpanel';
import DocumentPartnersEditForm from './components/DocumentPartnersEditForm.vue';
import DocumentCompanyEditForm from './components/DocumentCompanyEditForm.vue';
import { useAccount } from '../../composables/useAccount';
import { useI18n } from 'vue-i18n';

const { t } = useI18n({ useScope: 'global' });
const { getMembers } = useAccount();


</script>

<style scoped lang="scss">
.p-chip {
  border-radius: 3px;
  padding: 10px 9px;
}
</style>