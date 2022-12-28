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
  </template>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
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

const { setDocumentResponseId, setFormInitialInfo, form, submitProfileForm, setDeviceResponseId } = useAccount()
const documentIdRef = toRef(form.value, 'documentId')

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

<style scoped></style>
