<template>
  <section class="section-main">
    <div class="mb-4">
      <h1 class="text-2xl">
        {{ t('accountRegistration') }}
      </h1>
      <p class="text-3xl font-medium">{{ t('titleBusinessAccount') }}</p>
    </div>

    <div class="formgrid grid col-12 sm:col-12 md:col-12 lg:col-8 xl:col-8">
      <div v-for="(shareholder, idx) in partners" class="col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" :key="idx">
        <div class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer">
          <div class="mb-2">
            <img src="../../../../assets/icons/icon-user.svg" />
          </div>
          <div>
            <p class="text-lg">{{ shareholder.firstName + ' ' + shareholder.lastName }}</p>
          </div>
          <span class="text-base">{{ shareholder.email }}</span>

          <div class="flex justify-content-between align-items-center">
            <span class="text-base">{{ shareholder.dni }}</span>

            <Button
              label="Remove"
              @click="deleteShareholder(idx)"
              class="p-button-text"
              icon="pi pi-trash"
              icon-pos="right"
            />
          </div>
        </div>
      </div>
      <div class="col-5 sm:col-5 md:col-5 lg:col-3 xl:col-3">
        <div
          class="p-3 border-1 border-cyan-500 border-round-2xl flex-column bg-gray-100 cursor-pointer"
          @click="onCreateNewShareholder"
        >
          <div>
            <img src="../../../../assets/icons/user-add.svg" />
          </div>
          <div>
            <p class="text-lg">{{ t('addNewShareHolder') }}</p>
          </div>
        </div>
      </div>

      <div class="field col-12 flex align-items-center justify-content-end">
        <Button :label="t('save')" class="px-5 mt-3 btn-submit" @click="saveData()" :loading="submitting" />
      </div>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { onMounted, onUnmounted, watch, ref } from 'vue'

import Button from 'primevue/button'
import { useToast } from 'primevue/usetoast'

import { useI18n } from 'vue-i18n'

import router from '../../../../router'

const { t } = useI18n({ useScope: 'global' })

const toast = useToast()

const submitting = ref(false)

const formData = ref()
const partners = ref()

onMounted(() => {
  const data = localStorage.getItem('companyData') || '{}'

  if (data) {
    formData.value = JSON.parse(data)
    partners.value = formData.value.partners
    console.log(partners.value)
  }
})

const onCreateNewShareholder = () => {
  router.push('/upload-documents/business/new-shareholder')
}
const deleteShareholder = (idx: number) => {
  partners.value.splice(idx, 1)
  formData.value.shareholders = partners.value
  localStorage.setItem('companyData', JSON.stringify(formData.value))
}

const saveData = () => {
  submitting.value = true

  if (true) {
    const formData = ref()

    formData.value = {}

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
