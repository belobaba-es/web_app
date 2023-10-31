<template>
  <div class="container-center">
    <img class="logo-noba" :src="logo" alt="logo" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <h1 class="font-extra-light text-center">{{ t('confirmEmail') }}</h1>
      <h2 class="font-extra-light text-center">{{ t('confirmEmailCodeText') }}</h2>
      <div class="pt-5">
        <form @submit.prevent="handleSubmit" class="checkout-form">
          <div class="field">
            <label class="font-light">{{ t('codeEmailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText
                class="center-text font-size-code"
                size="large"
                type="text"
                v-model="inputValueFormat"
                required
                @input="updateValue"
                :placeholder="t('confirmEmailCodePlaceholder')"
              />
            </div>
          </div>

          <div class="container-flex">
            <div class="mt-3 w-100">
              <Button
                type="submit"
                icon="pi pi-angle-right"
                :label="t('confirmTextEmailCode')"
                class="font-light with-buttons"
                :loading="submitting"
              />
            </div>
          </div>

          <Button
            type="button"
            :label="t('resendCode')"
            class="font-light mt-3 with-buttons p-button-outlined border-300"
            @click="resendCode()"
            :loading="submittingResendTheCode"
          />
        </form>
      </div>
    </div>

    <div class="container-center">
      <div>
        <Lang />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'

import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo.svg'
import Lang from '../../components/Lang.vue'
import { RegisterService } from './services/register'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'

const submitting = ref(false)
const submittingResendTheCode = ref(false)
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const inputValueFormat = ref('')
const email = localStorage.getItem('noba@user-email')

const form = reactive({
  code: '',
})

const router = useRouter()

const updateValue = (event: Event) => {
  const input = event.target as HTMLInputElement | null
  if (input) {
    const value = input.value

    form.code = value
    // Elimina guiones actuales del valor antes de dar formato
    const cleanedValue = value.replace(/-/g, '')

    // Agrega un guión cada 3 caracteres
    const newValue = cleanedValue.match(/.{1,3}/g)?.join('-') || ''

    // Actualiza la referencia reactiva con el valor formateado
    inputValueFormat.value = newValue
  }
}

const resendCode = () => {
  submittingResendTheCode.value = true

  let typeValidation = 'email'

  new RegisterService()
    .resendEmailCode(email || '', typeValidation)
    .then(data => {
      submittingResendTheCode.value = false

      toast.add({
        severity: 'success',
        summary: t('successfulOperation'),
        detail: data.message,
        life: 5000,
      })
    })
    .catch(e => {
      submitting.value = false
      toast.add({
        severity: 'error',
        summary: t('somethingWentWrong'),
        detail: e.response.data.message,
        life: 4000,
      })
    })
}

const handleSubmit = () => {
  submitting.value = true

  new RegisterService()
    .confirmCode(form.code, email || '')
    .then(data => {
      submitting.value = false

      toast.add({
        severity: 'success',
        summary: t('successfulOperation'),
        detail: data.message,
        life: 5000,
      })

      localStorage.removeItem('noba@user-email')
      router.push('/')
    })
    .catch(e => {
      submitting.value = false
      toast.add({
        severity: 'error',
        summary: t('somethingWentWrong'),
        detail: e.response.data.message,
        life: 4000,
      })
    })
}
</script>

<style lang="css" scoped>
.container-main {
  max-width: 668px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
}

.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0px 0px 60px rgb(0 0 0 / 5%);
}

.with-buttons {
  width: 100% !important;
}

.logo-noba {
  width: 142px;
  height: 64px;
}
.p-dialog .p-dialog-header {
  background-color: black !important;
}

.center-text {
  text-align: center;
}

.font-size-code {
  font-size: 1.5rem;
}
</style>