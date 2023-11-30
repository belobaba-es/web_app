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
            <label class="font-light">{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText size="large" type="text"  `${view}` v-model="form.email" required />
            </div>
          </div>

          <div class="field">
            <label class="font-light">{{ t('codeEmailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText
                class="center-text font-size-code"
                type="text"
                maxlength="6"
                v-model="form.code"
                required
                :placeholder="t('confirmEmailCodePlaceholder')"
              />
            </div>
          </div>

          <div class="container-flex">
            <div class="float-right w-50">
              <Button
                type="submit"
                icon="pi pi-angle-right"
                iconPos="right"
                :label="t('confirmTextEmailCode')"
                class="font-light with-buttons mt-3"
                :loading="submitting"
              />
            </div>

            <div class="float-left w-25">
              <Button
                type="button"
                :label="t('resendCode')"
                class="font-light mt-3 with-buttons p-button-outlined border-300"
                @click="resendCode()"
                :loading="submittingResendTheCode"
              />
            </div>
          </div>
          <Button
            type="button"
            :label="t('alreadyAccount')"
            icon="pi pi-angle-left"
            class="font-light mt-3 with-buttons p-button-outlined border-300 mt-5"
            @click="redirectLogin()"
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
import {useRoute, useRouter} from 'vue-router'
import { useToast } from 'primevue/usetoast'

const submitting = ref(false)
const submittingResendTheCode = ref(false)
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const inputValueFormat = ref('')
const email = localStorage.getItem('noba@user-email')

const form = reactive({
  code: '',
  email: localStorage.getItem('noba@user-email'),
})

const router = useRouter()
const route = useRoute()
const view = route.params.view === 'create-user' ? 'readonly': ''

const resendCode = () => {
  submittingResendTheCode.value = true

  let typeValidation = 'email'

  new RegisterService()
    .resendEmailCode(form.email ?? '', typeValidation)
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
      submittingResendTheCode.value = false
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
    .confirmCode(form.code, form.email || '')
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

const redirectLogin = () => {
  router.push('/')
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

.p-dialog {
  background-color: black !important;
}

.center-text {
  text-align: center;
}

.font-size-code {
  font-size: 1.2rem;
}
</style>