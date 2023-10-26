<template>
  <div>
    <h1 class="text-2xl">{{ t('documents') }}</h1>
  </div>
  <template v-if="isInitFileLoader">
    <div id="websdk"></div>
    <div class="mt-5 flex justify-content-center" v-if="documentIdRef">
      <Button
        :label="t('backToDocuments')"
        class="p-button-raised py-3 px-6 font-medium"
        icon="pi pi-angle-right"
        icon-pos="right"
        @click="backToDocuments"
      />
    </div>
  </template>
  <template v-else>
    <TabView ref="tabview1">
      <TabPanel header="Documentos de identidad">
        <div class="grid">
          <div class="col-12 md:col-5 flex align-items-center">
            <div>
              <h2 class="text-5xl mb-5 font-light">{{ t('documentsPersonTitle') }}</h2>
              <p class="text-3xl">
                {{ t('documentsPersonText') }}
              </p>
              <div class="mt-5">
                <Button
                  :label="t('updateDocuments')"
                  class="p-button-raised py-3 px-6 font-medium"
                  icon="pi pi-angle-right"
                  icon-pos="right"
                  @click="initFileLoader"
                  :loading="loadingBtn"
                />
              </div>
            </div>
          </div>
          <div class="col-12 md:col-7">
            <img src="../../assets/img/ilustracion@2x.png" class="w-full" />
          </div>
        </div>
      </TabPanel>
      <TabPanel header="Proof of address">
        <h3>
          {{ t('warningProofOfAddress') }}
        </h3>

        <div class="grid mt-3">
          <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-8">
            <div class="container-yellow">
              <h4 class="text-left text-1xl">
                {{ t('proofOfAddress1') }}
              </h4>
              <h4 class="text-left text-1xl">
                {{ t('proofOfAddress2') }}
              </h4>

              <div class="container-form">
                <div>
                  <h4 class="font-medium">{{ t('labelSelectProofOfAddress') }}</h4>
                  <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-4">
                    <Dropdown
                      class="select-type-of-document"
                      v-model="documentType"
                      :options="listTypeDocuments"
                      optionLabel="name"
                      optionValue="code"
                      :placeholder="t('dropdownSelectProofOfAddress')"
                    />
                  </div>
                </div>
                <div class="mt-4 col-12 sm:col-12 md:col-12 lg:col-6 xl:col-4">
                  <FileInput
                    :is-proof-of-address="true"
                    :tax-id="''"
                    :dni="''"
                    :document-country="getOwner()?.taxCountry ?? ''"
                    :accountId="accountId ?? ''"
                    :is-company="false"
                    :type="documentType"
                    :is-account-business="false"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </TabPanel>
    </TabView>
  </template>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import TabView from 'primevue/tabview'
import TabPanel from 'primevue/tabpanel'
import Dropdown from 'primevue/dropdown'
import FileInput from '../../components/FileInput.vue'

import { onMounted, ref, toRef, watch } from 'vue'
import { useAccount } from '../../composables/useAccount'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const isInitFileLoader = ref(false)
const loadingBtn = ref(false)

const initFileLoader = () => {
  loadingBtn.value = true
  isInitFileLoader.value = true

  setTimeout(() => {
    loadingBtn.value = false
  }, 5000)
  ;(globalThis as any).start()
  setFormInitialInfo()
}

const { getOwner, accountId, setDocumentResponseId, setFormInitialInfo, form, submitProfileForm, setDeviceResponseId } =
  useAccount()
const documentIdRef = toRef(form.value, 'documentId')

const documentType = ref()
const documentCountry = ref()

const listTypeDocuments = ref([
  { name: t('documentProofOfAddress1'), code: 'monthly_utility' },
  { name: t('documentProofOfAddress2'), code: 'statements' },
  { name: t('documentProofOfAddress3'), code: 'rental_lease_agreement' },
  { name: t('documentProofOfAddress4'), code: 'vehicle_registration' },
  { name: t('documentProofOfAddress5'), code: 'real_estate_property_title' },
  { name: t('documentProofOfAddress6'), code: 'property_tax_bill' },
  { name: t('documentProofOfAddress7'), code: 'w2' },
])

onMounted(async () => {
  ;(window as any).SDK_ID = import.meta.env.VITE_PUBLIC_SDK_ID

  const socureWebSdk = document.createElement('script')
  const socureWebSdkDevicer = document.createElement('script')
  const socureScript = document.createElement('script')

  socureWebSdk.setAttribute('src', 'https://websdk.socure.com/bundle.js')
  socureWebSdk.setAttribute('type', 'text/javascript')
  document.head.appendChild(socureWebSdk)

  socureWebSdkDevicer.setAttribute('src', 'https://js.dvnfo.com/devicer.min.js')
  socureWebSdkDevicer.setAttribute('type', 'text/javascript')
  document.head.appendChild(socureWebSdkDevicer)

  socureScript.setAttribute('src', '/documents.js')
  socureScript.setAttribute('type', 'text/javascript')
  document.head.appendChild(socureScript)

  if (typeof window !== undefined) {
    setInterval(() => {
      const documentID = sessionStorage.getItem('noba@documentUuid')
      const deviceId = sessionStorage.getItem('noba@deviceId')

      setDocumentResponseId(documentID)
      setDeviceResponseId(deviceId)
    }, 10000)
  }
})

const backToDocuments = () => {
  isInitFileLoader.value = false
  documentIdRef.value = null
  clearEnv()
}

const clearEnv = () => {
  sessionStorage.removeItem('noba@deviceId')
  sessionStorage.removeItem('noba@documentUuid')
  sessionStorage.removeItem('documentVerificationToken')
  sessionStorage.removeItem('publicApiKey')
  localStorage.removeItem('devicer_id')
}

watch(documentIdRef, (value, old) => {
  if (!old && value && isInitFileLoader.value === true) submitProfileForm()
})
</script>

<style scoped>
.container-yellow {
  padding: 3rem 2rem;
  border: 2px solid rgb(255, 144, 17);
  background-color: rgb(249, 248, 229);
}

.container-form {
  padding: 1rem;
  margin-top: 2rem;
  background-color: rgb(255, 255, 255);
  border: 1px solid rgb(231, 230, 231);
}

.select-type-of-document {
  width: 100%;
}
</style>
