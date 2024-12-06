<template>
  <section class="card mt-4 pl-5 pr-5">
    <div class="flex md:flex-row full flex-column">
      <div class="border-round-2xl px-2">
        <h2 class="font-regular mb-0">{{ t('labelUploadDocument') }}</h2>
        <p class="font-regular m-0" style="font-size: 14px; color: #6d6d6d">
          {{ t('labelUploadDocumentText') }}
        </p>
      </div>
      <div class="md:ml-4 col"></div>
      <div class="md:w-3 mt-5">
        <p class="font-light">{{ t('labelUploadDocumentText2') }}</p>
      </div>
    </div>

    <div class="flex md:flex-row full flex-column mt-2 justify-content-center">
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
      <div class="md:w-4 pr-3">
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
    <div class="field col-12 flex align-items-center justify-content-end">
      <Button
        :label="t('backButtonText')"
        class="mb-4 mt-3 mr-2 w-8rem"
        outlined
        severity="secondary"
        style="color: #242731; display: flex; justify-content: center"
        @click="toBack"
      />
      <router-link v-slot="{ navigate }" custom to="/cards/onboarding/step/confirmation">
        <Button
          :disabled="disabled"
          :label="t('nextButtonText')"
          :loading="submitting"
          class="mb-4 mt-3 mr-2 w-8rem"
          @click="sendingTypeCard"
        />
      </router-link>
    </div>
    <ModalVerification :visible="showModal" display @close="showModal = false" />
  </section>
</template>
<style lang="scss" scoped></style>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import ButtomUpload from '../ButtomUpload.vue'
import imgUpload from '../../../../assets/icons/upload.svg'
import imgSelf from '../../../../assets/icons/Selfievector.svg'
import Button from 'primevue/button'
import ModalVerification from '../modalVerification.vue'
import { useOnboardingCard } from '../../composables/useOnboardingCard'
import { useUploadDocument } from '../../composables/useUploadDocument'

const showModal = ref(true)
const { sendingTypeCard, toBack, onboardingPersonal, submitting } = useOnboardingCard()

const { disabled } = useUploadDocument( '')

const { t } = useI18n({ useScope: 'global' })

const submissionTypeDocument = ref<{
  sideFront: boolean
  sideBack: boolean
  selfie: boolean
}>({
  sideFront: false,
  sideBack: false,
  selfie: false,
})

const handleFileUploader = (event: { side: string; type: string }) => {
  const { type, side } = event

  if (type === 'government_id' && side === 'front') {
    submissionTypeDocument.value.sideFront = true
    return
  }

  if (type === 'government_id' && side !== 'front') {
    submissionTypeDocument.value.sideBack = true
    return
  }

  submissionTypeDocument.value.selfie = true

  if(submissionTypeDocument.value.sideFront &&
    submissionTypeDocument.value.sideBack &&
    submissionTypeDocument.value.selfie){
    disabled.value = false
  }
}

</script>
