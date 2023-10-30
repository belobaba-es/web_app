<template>
  <div class="p-panel p-component shareholders-panel col-6">
    <div class="p-panel-header">
      <span class="p-panel-title">{{ t('businessTitle') }}</span>
    </div>
    <div class="p-toggleable-content" role="region">
      <div class="p-panel-content">
        <div class="p-scrollpanel p-component custom">
          <div class="p-scrollpanel-content pl-4 pt-3">
            <div class="col-10 p-0 pt-4">
              <label> {{ t('businessDocumentLabel') }}</label>
              <div class="mt-2">
                <FileInput
                  side="front"
                  type="incorporation_document"
                  :isPartner="false"
                  :registerNumber="onboardingCompany.informationCompany.registerNumber"
                />
              </div>
            </div>

            <div class="col-10 p-0 pt-4">
              <label>{{ t('utilityBillLabel') }}</label>
              <div class="mt-2 mb-4">
                <Dropdown
                  :options="documentTypeProofOfAddress"
                  option-label="name"
                  option-value="value"
                  :placeholder="t('documentTypePlaceHolder')"
                  class="w-full"
                  v-model="typeDocumentAddress"
                />
              </div>
              <FileInput
                side="front"
                :isPartner="false"
                :type="typeDocumentAddress"
                :registerNumber="onboardingCompany.informationCompany.registerNumber"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../../components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import { useOnboardingCompany } from '../../../../composables/useOnboardingCompany'

const { t } = useI18n({ useScope: 'global' })
const { documentTypeProofOfAddress } = useDocuments()

const { onboardingCompany } = useOnboardingCompany()

const typeDocumentAddress = ref<string>('')
</script>
