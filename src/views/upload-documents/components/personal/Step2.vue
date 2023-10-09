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
                              <Dropdown
                                  :options="DocumentType"
                                  option-label="name"
                                  option-value="value"
                                  :placeholder="t('documentTypePlaceHolder')"
                                  class="w-full"
                                  v-model="documentType"
                                  @change="selectedProofOfAddress" />
                            </div>
                          </div>
                        </div>

                        <div class="px-3 pb-0">
                          <div class="field">
                            <div class="grid">
                              <div class="col-6">
                                <label>  {{ t('Front side') }}</label>
                                <FileInput label="other" side="front" type="other" :account-id="accountId ?? ''"
                                  :document-country="getOwner()?.taxCountry ?? 'US'" :tax-id="getOwner()?.taxId ?? ''"
                                  :is-company="true" v-model="front"/>
                              </div>

                              <div class="col-6">
                                <label>{{ t('Back side') }}</label>
                                <FileInput label="other" side="front" type="other" :account-id="accountId ?? ''"
                                  :document-country="getOwner()?.taxCountry ?? 'US'" :tax-id="getOwner()?.taxId ?? ''"
                                  :is-company="true" v-model="backside" />
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
                                  <Dropdown :options="documentTypeProofOfAddress"
                                    option-label="name" option-value="value" :placeholder="t('documentTypePlaceHolder')"
                                    class="w-full" @change="selectedProofOfAddress" v-model="typeDocumentAddress" />
                                </div>
                                <FileInput :label="getSelectedTypeDocumentProofOfAddress('0')" side="front"
                                  :type="getSelectedTypeDocumentProofOfAddress('0')" :account-id="accountId ?? ''"
                                  :document-country="getOwner()?.taxCountry ?? 'US'" :tax-id="getOwner()?.taxId ?? ''"
                                  :is-company="true" v-model="documentFiscal"/>
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
        <div class="field col-12 flex align-items-center justify-content-end">
          <Button :label="t('save')" class="px-5 mt-2 btn-submit" @click="saveData()" :loading="submitting" />
        </div>
      </div>
    </div>
  </section>
</template>

<script setup lang="ts">
import Dropdown from 'primevue/dropdown'
import { ref, onBeforeMount } from 'vue'
import { useAccount } from '../../../../composables/useAccount'
import { useI18n } from 'vue-i18n'
import FileInput from '../../../profile/components/FileInput.vue'
import { useDocuments } from '../../../../composables/useDocuments'
import {ProfileService} from "../../../profile/services/profile";
import router from "../../../../router";
import showExceptionError from "../../../../shared/showExceptionError";
import showMessage from "../../../../shared/showMessageArray";
import {useToast} from "primevue/usetoast";
import Button from "primevue/button";

const { t } = useI18n({ useScope: 'global' })
const { getOwner, accountId } = useAccount()
const toast = useToast()
const { addDocument, setSelectedTypeDocumentProofOfAddress, getSelectedTypeDocumentProofOfAddress } = useDocuments()

const documentType = ref<string>('')
const front = ref<string>('')
const backside = ref<string>('')
const documentFiscal = ref<string>('')
const typeDocumentAddress = ref<string>('')
const submitting = ref(false)

const documentTypeProofOfAddress = ref([
  { value: 'monthly_utility', name: t('documentProofOfAddress1') },
  { value: 'statements', name: t('documentProofOfAddress2') },
  { value: 'rental_lease_agreement', name: t('documentProofOfAddress3') },
  { value: 'vehicle_registration', name: t('documentProofOfAddress4') },
  { value: 'real_estate_property_title', name: t('documentProofOfAddress5') },
  { value: 'property_tax_bill', name: t('documentProofOfAddress6') },
  { value: 'w2', name: t('documentProofOfAddress7') },
])

const DocumentType = ref( [
  {value: "PASSPORT", name: "Passport"},
  {value: 'DRIVERS_LICENSE', name: "Drivers License"},
  {value: "GOVERNMENT_ID", name: "Government Id"},
  {value: "RESIDENCE_PERMIT", name: "Residence Permit"},
  {value: "UTILITY_BILL", name: "Utility Bill"},
  {value: "STATEMENT", name: "Statements"},
  {value: "OTHER", name: "Other"},
  {value: "MONTHLY_UTILITY", name: "Monthly Utility"},
  {value: "RENTAL_LEASE_AGREEMENT", name: "Rental Lease Agreement"},
  {value: "VEHICLE_REGISTRATION", name: "Vehicle Registration"},
  {value: "REAL_ESTATE_PROPERTY_TITLE", name: "Real Estate Property Title"},
  {value: "PROPERTY_TAX_BILL", name: "Property Tax Bill"},
  {value: "INCOPORATION_DOCUMENT", name: "Incorporation Document"},
  {value: "ACCOUNT_AGREEMENT", name: "Account Agreement"},
  {value: "BENEFICIAL_OWNERSHIP_CERTIFICATE", name: "Beneficial Ownership Certificate"},
  {value: "W2", name: "w2"},
])
const proofOfAddress = ref('')

onBeforeMount(() => {
  addDocument('0', {
    selectedTypeDocumentProofOfAddress: '',
    selectedTypeIdentificationDocument: '',
  })
})

const selectedProofOfAddress = (e: any) => {
  setSelectedTypeDocumentProofOfAddress('0', e.value)
}

const saveData = () => {
  submitting.value = true
  const formData = ref()

  formData.value = {
    documentType: documentType.value,
    dni: localStorage.getItem('dni'),
    file: typeDocumentAddress.value,
    front: front.value,
    backside: backside.value,
    isPartner: false
  }
  console.log(formData.value)
  
  const uploadDocumentsService = ProfileService.instance()
  uploadDocumentsService
      .updateDocuments(formData.value)
      .then(resp => {
        submitting.value = false
        toast.add({
          severity: 'success',
          detail: resp.message,
          life: 4000,
        })

        router.push('/personal/completed')
      })
      .catch(e => {
        submitting.value = false

        if (e.response.data.data?.warning) {
          e.response.data.data.warning.forEach((element: any) => {
            showExceptionError(toast, 'error', t('somethingWentWrong'), `${element.field} ${element.message}`, 4000)
          })
          return
        }

        if (e.response.data.message) {
          showExceptionError(toast, 'error', t('somethingWentWrong'), e.response.data.message, 4000)
          return
        }

        showMessage(toast, e.response.data)
      })
}
</script>

<style scoped></style>

