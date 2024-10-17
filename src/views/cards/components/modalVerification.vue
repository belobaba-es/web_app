<template>
  <Dialog v-model:visible="props.visible" :modal="true" :show-header="false" class="modal-validation m-3">
    <h2 class="text-center font-bold dialog-title-document pt-4">
      <span v-if="step === 1">
        {{ t('verifyID1') }} <span class="text-primary">{{ t('verifyID2') }}</span>
      </span>
      <span v-else>
        {{ t('document') }} <span class="text-primary">{{ t('selfie') }}</span>
      </span>
    </h2>
    <div v-if="step === 1">
      <div class="verification-step">
        <p id="text1" class="text-center font-light mt-0 dialog-text-document">
          {{ t('textVerifyID1') }} <br />
          {{ t('textVerifyID2') }}
        </p>
        <ul class="grid">
          <li><img alt="Correcto" src="../../../assets/img/DocumentoEscaneado.png" /> {{ t('photoDocument') }}</li>
          <li><img alt="Borroso" src="../../../assets/img/DocumentoBorroso.png" /> {{ t('documentBorroso') }}</li>
          <li><img alt="Con flash" src="../../../assets/img/DocumentoBorroso.png" /> {{ t('documentFlash') }}</li>
          <li><img alt="Imagen Cortada" src="../../../assets/img/DocumentoBorroso.png" /> {{ t('imgCortada') }}</li>
        </ul>
        <p id="text2" class="text-center dialog-text-document">
          {{ t('textPhotoDocument') }}
          {{ t('textPhotoDocument1') }} <span class="font-bold">{{ t('textPhotoDocument2') }}</span>
          {{ t('textPhotoDocument3') }} <br />
          {{ t('textPhotoDocument4') }}
        </p>
        <p id="text3" class="text-center font-semi-bold mb-0">{{ t('textAdmite') }}</p>
      </div>
    </div>
    <div v-else-if="step === 2">
      <div class="selfie-step">
        <p id="text1" class="text-center mt-0 dialog-text-document">
          {{ t('txtRecomendation1') }} <br />
          {{ t('txtRecomendation2') }}
        </p>
        <div class="flex md:flex-row flex-column align-items-center md:justify-content-start">
          <div class="md:col-4">
            <img alt="" src="../../../assets/img/celular.png" />
          </div>
          <div class="md:col-8 listText">
            <ul>
              <li>* {{ t('txtList1') }}</li>
              <li>* {{ t('txtList2') }}</li>
              <li>* {{ t('txtList3') }}</li>
              <li>* {{ t('txtList4') }}</li>
              <li>
                * {{ t('txtList5') }} <br />
                {{ t('txtList51') }}
              </li>
              <li>*{{ t('txtList6') }} <br />{{ t('txtList61') }}</li>
            </ul>
          </div>
        </div>
        <p id="text3" class="text-center font-semi-bold">{{ t('textAdmite') }}</p>
      </div>
    </div>
    <div class="text-center">
      <Button class="mt-4" label="Siguiente" @click="nextStep" />
    </div>
  </Dialog>
</template>

<script lang="ts" setup>
import { defineProps, ref } from 'vue'
import Dialog from 'primevue/dialog'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits()
const props = defineProps<{
  display: boolean
  visible: boolean
}>()
const step = ref(1)

const nextStep = () => {
  if (step.value < 2) {
    step.value++
  } else {
    emit('close')
  }
  return { step, nextStep }
}
</script>

<style lang="scss">
.modal-validation .p-dialog-content {
  border-radius: 13px !important;
}

.p-dialog-header-close-icon {
  display: none !important;
}

.verification-step,
.selfie-step {
  padding: 0rem;
}

#text1 {
  font-size: 23px;
}

.p-list {
  font-size: 16px;
}

.listText ul {
  display: flow !important;
}

.listText ul li {
  align-items: normal !important;
  margin-left: 0 !important;
  list-style-type: circle !important;
}

#text2 {
  font-size: 20px;
}

#text2 span {
  font-weight: bold;
}

#text3 {
  font-size: 20px;
  font-weight: bold;
}

.verification-step ul,
.selfie-step ul {
  list-style-type: none;
  padding: 0;
  display: flex;
}

.verification-step li,
.selfie-step li {
  display: flex;
  margin-left: 3.5rem;
  flex-direction: column;
  align-items: center;
  margin-bottom: 0.5rem;
}

.verification-step li img,
.selfie-step li img {
  margin-right: 0.5rem;
}

.dialog-title-document {
  line-height: 30px;
  @media only screen and (max-width: 991px) {
    font-size: 30px;
    margin-bottom: 0;
  }
}

.dialog-text-document {
  @media only screen and (max-width: 991px) {
    font-size: 17px !important;
  }
}
</style>
