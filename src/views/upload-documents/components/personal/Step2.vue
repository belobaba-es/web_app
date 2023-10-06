<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleNaturalPerson') }}</p>
    </div>

    <h1>This is the step 2</h1>
    <div class="p-panel p-component shareholders-panel col-8">
      <div class="p-panel-header">
        <span class="p-panel-title">CARGA DE DOCUMENTOS</span>
      </div>
      <div class="p-toggleable-content" role="region">
        <div class="p-panel-content">
          <div class="p-scrollpanel p-component custom" style="height: 400px;">
            <div class="p-scrollpanel-wrapper">
              <div class="p-scrollpanel-content">
                <div class="px-3 pt-3 pb-0">
                  <div class="field">
                    <div class="grid">
                      <div class="col-12">
                        <div class="field col-12">
                          
                          <div class="field">
                            <label>{{ t('Document Type') }}</label>
                            <div class="p-inputgroup">
                              <Dropdown :options="data" optionLabel="label" option-value="value" class="w-full" />
                            </div>
                          </div>
                        </div>

                        <div class="px-3 pb-0">
                          <div class="field">
                            <div class="grid">
                              <div class="col-6">
                                <label>{{ t('Front side') }}</label>
                                <FileInput label="other" side="front" type="other" :account-id="accountId ?? ''"
                                  :document-country="getOwner()?.taxCountry ?? 'US'" :tax-id="getOwner()?.taxId ?? ''"
                                  :is-company="true" />
                              </div>

                              <div class="col-6">
                                <label>{{ t('Back side') }}</label>
                                <FileInput label="other" side="front" type="other" :account-id="accountId ?? ''"
                                  :document-country="getOwner()?.taxCountry ?? 'US'" :tax-id="getOwner()?.taxId ?? ''"
                                  :is-company="true" />
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
                                  <Dropdown v-model="proofOfAddress" :options="documentTypeProofOfAddress"
                                    option-label="name" option-value="value" :placeholder="t('documentTypePlaceHolder')"
                                    class="w-full" @change="selectedProofOfAddress" />
                                </div>
                                <FileInput :label="getSelectedTypeDocumentProofOfAddress('0')" side="front"
                                  :type="getSelectedTypeDocumentProofOfAddress('0')" :account-id="accountId ?? ''"
                                  :document-country="getOwner()?.taxCountry ?? 'US'" :tax-id="getOwner()?.taxId ?? ''"
                                  :is-company="true" />
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
  </section>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, onBeforeMount } from 'vue'
import Divider from 'primevue/divider'
import { useAccount } from '../../../../composables/useAccount'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../profile/components/FileInput.vue'
import FileUpload from './FileUploaded.vue'
import { useDocuments } from '../../../../composables/useDocuments'

const { t } = useI18n({ useScope: 'global' })
const { getOwner, accountId } = useAccount()
const { addDocument, setSelectedTypeDocumentProofOfAddress, getSelectedTypeDocumentProofOfAddress } = useDocuments()

const documentTypeProofOfAddress = ref([
  { value: 'monthly_utility', name: t('documentProofOfAddress1') },
  { value: 'statements', name: t('documentProofOfAddress2') },
  { value: 'rental_lease_agreement', name: t('documentProofOfAddress3') },
  { value: 'vehicle_registration', name: t('documentProofOfAddress4') },
  { value: 'real_estate_property_title', name: t('documentProofOfAddress5') },
  { value: 'property_tax_bill', name: t('documentProofOfAddress6') },
  { value: 'w2', name: t('documentProofOfAddress7') },
])

const proofOfAddress = ref('')

onBeforeMount(() => {
  addDocument('0', {
    selectedTypeDocumentProofOfAddress: '',
    selectedTypeIdentificationDocument: '',
  })
})

const data = [
  { id: 1, name: 'Ram' },
  { id: 2, name: 'Shyam' },
  { id: 3, name: 'Hari' },
  { id: 4, name: 'Krishna' },
  { id: 5, name: 'Balram' },
  { id: 6, name: 'Arjun' },
]

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress('0', e.value)
}
</script>

<style scoped></style>

