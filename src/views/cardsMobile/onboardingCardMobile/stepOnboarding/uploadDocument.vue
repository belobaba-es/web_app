<template>
  <section class="mt-4 pl-3 pr-3">
    <div class="flex md:flex-row full flex-column">
      <div class="border-round-2xl">
        <h2 class="font-regular mb-0">{{ t('labelUploadDocument') }}</h2>
        <p class="font-regular m-0" style="font-size: 14px; color: #6d6d6d">
          {{ t('labelUploadDocumentText') }}
        </p>
      </div>
      <div class="md:ml-4 col"></div>
      <div class="md:w-3 mt-3">
        <p class="font-light">{{ t('labelUploadDocumentText2') }}</p>
      </div>
    </div>

    <div class="flex md:flex-row full flex-column mt-2 justify-content-center">
      <div v-if="!showLastUploadDocumentButton">
        <div class="md:w-4 pr-3">
          <ButtomUpload
            :dni="onboardingPersonal.dni"
            :img="imgUpload"
            :is-proof-of-address="true"
            :isPartner="false"
            :label="t('labelDocumentFront')"
            side="front"
            type="government_id"
            @fileUploaded="handleFileUploader"
          />
        </div>
        <div class="md:w-4 pr-3">
          <ButtomUpload
            :dni="onboardingPersonal.dni"
            :img="imgUpload"
            :is-proof-of-address="true"
            :isPartner="false"
            :label="t('labelDocumentBack')"
            side="back"
            type="government_id"
            @fileUploaded="handleFileUploader"
          />
        </div>
      </div>

      <div v-else class="md:w-4 pr-3">
        <ButtomUpload
          :dni="onboardingPersonal.dni"
          :img="imgSelf"
          :is-proof-of-address="true"
          :isPartner="false"
          :label="t('labelSelfieDocument')"
          side="front"
          type="selfie"
          @fileUploaded="handleFileUploader"
        />
      </div>
    </div>
    <div>
      <div class="field col-12 flex align-items-center justify-content-end" v-if="showLastUploadDocumentButton">
        <Button
          :label="t('backButtonText')"
          class="px-5 mt-2 mr-5"
          severity="secondary"
          outlined
          @click="() => (showLastUploadDocumentButton = !showLastUploadDocumentButton)"
        />
        <router-link v-slot="{ navigate }" custom to="/cards/onboarding/step/confirmation">
          <Button
            :disabled="buttonToSendIsdisabled"
            :label="t('nextButtonText')"
            class="px-5 mt-2 btn-submit"
            @click="sendingTypeCard"
          />
        </router-link>
      </div>

      <div class="field col-12 flex align-items-center justify-content-center" v-else>
        <router-link v-slot="{ navigate }" custom to="/cards/onboarding/step/user-data">
          <Button
            :label="t('backButtonText')"
            class="px-5 mt-2 mr-5"
            severity="secondary"
            outlined
            @click="() => router.push('/cards/onboarding/step/user-data')"
          />
        </router-link>
        <Button
          :label="t('next')"
          class="px-5 mt-2 btn-submit ml-2"
          @click="() => (showLastUploadDocumentButton = !showLastUploadDocumentButton)"
          icon-pos="right"
          icon="pi pi-angle-right"
        />
      </div>
    </div>
    <ModalVerification :visible="showModal" display @close="showModal = false" />
  </section>
</template>
<style lang="scss" scoped></style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import ButtomUpload from '../../../cards/components/ButtomUpload.vue'
import imgUpload from '../../../../assets/icons/upload.svg'
import imgSelf from '../../../../assets/icons/Selfievector.svg'
import Button from 'primevue/button'
import ModalVerification from '../../../cards/components/modalVerification.vue'
import { ref } from 'vue'
import { useOnboardingPersonal } from '../../../../composables/useOnboardingPersonal'
import { useOnboardingCard } from '../../../cards/composables/useOnboardingCard'
import { useRouter } from 'vue-router'
import { DocumentSide, DocumentType } from '../../../../types/onboardingCompany'

const showModal = ref(true)
const { onboardingPersonal } = useOnboardingPersonal()
const { sendingTypeCard, toBack } = useOnboardingCard()

const buttonToSendIsdisabled = ref<boolean>(true)

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const submissionTypeDocument = ref<{
  sideFront: boolean
  sideBack: boolean
  selfie: boolean
}>({
  sideFront: false,
  sideBack: false,
  selfie: false,
})
const showLastUploadDocumentButton = ref(false)
const handleFileUploader = (event: { side: string; type: string }) => {
  const { type, side } = event

  if (type === DocumentType.GOVERNMENT_ID && side === DocumentSide.FRONT) {
    submissionTypeDocument.value.sideFront = true
    return
  }

  if (type === DocumentType.GOVERNMENT_ID && side !== DocumentSide.FRONT) {
    submissionTypeDocument.value.sideBack = true
    return
  }

  submissionTypeDocument.value.selfie = true

  if (
    submissionTypeDocument.value.sideFront &&
    submissionTypeDocument.value.sideBack &&
    submissionTypeDocument.value.selfie
  ) {
    console.log('habil')
    buttonToSendIsdisabled.value = false
  }
}
</script>
