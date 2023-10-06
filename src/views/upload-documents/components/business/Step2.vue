<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleBusinessAccount') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8"></div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from 'vue'
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import Calendar from 'primevue/calendar'
import Divider from 'primevue/divider'
import Checkbox from 'primevue/checkbox'

import { useToast } from 'primevue/usetoast'

import { useRoute } from 'vue-router'
import { useI18n } from 'vue-i18n'

import { useWorld } from '../../../../composables/useWorld'
import { useAccount } from '../../../../composables/useAccount'
import showExceptionError from '../../../../shared/showExceptionError'
import showMessage from '../../../../shared/showMessageArray'

import router from '../../../../router'


const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)



onMounted(async () => {
})



const saveData = () => {
  submitting.value = true

  if (true) {
    const formData = ref()

    formData.value = {
      
    }

    //set data to localstorage
    localStorage.setItem('companyData', JSON.stringify(formData.value))

    router.push('/upload-documents/business/step2')
  } else {
    submitting.value = false
    toast.add({
      severity: 'error',
      summary: t('warningAllFieldRequired'),
      detail: t('warningDetailAllFieldRequired'),
      life: 4000,
    })
  }
}
</script>
<style lang="scss">
.phone-input {
  margin-top: 7px;
}

.btn-submit {
  @media only screen and (max-width: 992px) {
    width: 100% !important;
  }
}

#phoneNumber {
  width: 97%;
}
</style>
