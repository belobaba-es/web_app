<template>
  <div class="p-panel p-component shareholders-panel col-6">
    <div class="p-panel-header">
      <span class="p-panel-title">{{ t('uploadDocumentsTitle') }}</span>
    </div>
    <div class="p-toggleable-content" role="region">
      <div class="p-panel-content">
        <div class="p-scrollpanel p-component custom" style="height: 400px">
          <div class="p-scrollpanel-wrapper">
            <div class="p-scrollpanel-content">
              <div class="px-3 pt-3 pb-0">
                <div class="field">
                  <div class="grid">
                    <div class="col-12">
                      <div class="px-3 pb-0">
                        <div class="field">
                          <div class="grid">
                            <div class="col-6">
                              <label> {{ t('businessDocumentLabel') }}</label>
                              <div class="mt-2">
                                <FileInput
                                  side="front"
                                  type="other"
                                  :isPartner="false"
                                  :registerNumber="props.registerNumber"
                                />
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="px-3 py-3">
                        <div class="field">
                          <div class="grid">
                            <div class="col-6">
                              <label>{{ t('utilityBillLabel') }}</label>
                              <div class="mt-2 mb-4">
                                <Dropdown
                                  :options="documentTypeProofOfAddress"
                                  option-label="name"
                                  option-value="value"
                                  :placeholder="t('documentTypePlaceHolder')"
                                  class="w-full"
                                  @change="selectedProofOfAddress"
                                  v-model="typeDocumentAddress"
                                />
                              </div>
                              <FileInput
                                :label="getSelectedTypeDocumentProofOfAddress('0')"
                                side="front"
                                :isPartner="false"
                                :type="typeDocumentAddress"
                                :registerNumber="props.registerNumber"
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, onBeforeMount, defineProps } from 'vue'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../../components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const { addDocument, setSelectedTypeDocumentProofOfAddress, getSelectedTypeDocumentProofOfAddress } = useDocuments()

const typeDocumentAddress = ref<string>('')

const documentTypeProofOfAddress = ref([
  { value: 'monthly_utility', name: t('documentProofOfAddress1') },
  { value: 'statements', name: t('documentProofOfAddress2') },
  { value: 'rental_lease_agreement', name: t('documentProofOfAddress3') },
  { value: 'vehicle_registration', name: t('documentProofOfAddress4') },
  { value: 'real_estate_property_title', name: t('documentProofOfAddress5') },
  { value: 'property_tax_bill', name: t('documentProofOfAddress6') },
  { value: 'w2', name: t('documentProofOfAddress7') },
])

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress('0', e.value)
}

const props = defineProps({
  registerNumber: {
    type: String,
    required: true,
  },
})
</script>
