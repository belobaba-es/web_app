<template>
  <div class="container-center pb-5 gray-container">
    <div class="grid mt-6 pt-6 w-75 sm:w-100">
      <div class="lg:col-6 sm:col-12 p-hide-xs p-hide-sm">
        <div class="flex justify-content-center align-content-center w-100">
          <img class="" alt="business-alli-image" :src="BusinessPartnersImg" />
        </div>
      </div>

      <div class="container-center xs:col-12 lg:col-6 sm:col-12">
        <div class="w-75">
          <h1 class="text-center mb-0">
            {{ t('beABusinessAllie1') }} <span class="span-partner">{{ t('beABusinessAllie2') }}</span>
          </h1>

          <div class="field text-center">
            <label class="required-label text-center mt-1 mb-5">{{ t('requiredInformation') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="referredBy" :placeholder="t('referringName')" />
            </div>
          </div>

          <div class="mt-6 text-center justify-content-end">
            <Button :label="t('send')" class="px-5" :loading="submitting" @click="signUpAsBusinessAllie()" />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import BusinessPartnersImg from '../../../../assets/img/business_opportunities.png'
import { ref } from 'vue'
import { useI18n } from 'vue-i18n'
import { BusinessAllieService } from '../../services/businessAllieService'
import { useToast } from 'primevue/usetoast'

const referredBy = ref('')
const { t } = useI18n({ useScope: 'global' })
const businessAllieService = new BusinessAllieService()
const submitting = ref(false)
const toast = useToast()
const emit = defineEmits(['create'])

const signUpAsBusinessAllie = () => {
  submitting.value = true

  businessAllieService
    .registerAsBusinessPartner({ referredBy: referredBy.value })
    .then(() => {
      submitting.value = false
      showSuccessMessage(t('registeredSuccessfully'))
      emit('create', null)
    })
    .catch(e => {
      submitting.value = false
      toast.add({
        severity: 'error',
        summary: 'Something went wrong',
        detail: 'Try again.',
        life: 4000,
      })
    })
}

const showSuccessMessage = (msg: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: msg,
    life: 4000,
  })
}
</script>
