<template>
  <div class="container-center">
    <img class="logo-noba" :src="logo" alt="logo" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <h1 class="text-center font-semi-bold mb-0">{{ t('createAccount') }}</h1>
      <h2 class="text-center mb-0">{{ t('subtitleCreateAccount') }}</h2>
      <div class="pt-5">
        <form @submit.prevent="handleSubmit" class="checkout-form">
          <div class="field">
            <label class="font-light">{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.email" required :placeholder="t('emailPlaceholder')" />
            </div>
          </div>
          <div class="field">
            <label>{{ t('passwordLabel') }}</label>
            <div class="p-inputgroup">
              <Password v-model="form.password" toggleMask required :feedback="false" placeholder="**********" />
            </div>
            <div>
              <span class="help-text">{{ t('registerHelpTextPassword') }}</span>
            </div>
          </div>
          <div class="field">
            <label>{{ t('passwordConfirmLabel') }}</label>
            <div class="p-inputgroup">
              <Password
                v-model="form.passwordConfirmation"
                toggleMask
                required
                :feedback="false"
                placeholder="**********"
              />
            </div>
            <div>
              <span class="help-text">{{ t('registerHelpTextPassword') }}</span>
            </div>
          </div>
          <div class="flex justify-content-between align-items-center">
            <div class="field-checkbox mt-2">
              <Checkbox inputId="binary" v-model="form.terms" :binary="true" />
              <label for="binary">
                <span>
                  {{ t('iAcceptConditions') }}
                  <strong>
                    <a :href="getTheLinkToTermsAndConditions()" target="_blank">{{
                      t('termsAndConditions')
                    }}</a></strong
                  >
                  {{ t('andThe') }}
                  <strong>
                    <a :href="getTheLinkToPoliticsAndPrivacy()">{{ t('privacyPolicy') }}</a>
                  </strong>
                </span>
              </label>
            </div>
          </div>

          <div class="flex justify-content-between align-items-center">
            <div class="field-checkbox mt-2">
              <Checkbox inputId="patriot" v-model="form.patriot" :binary="true" />
              <label for="patriot">
                {{ t('iAcceptPatriot') }} <a href="#" @click="visible = true">{{ t('patrioticLaw') }}</a></label
              >
            </div>
          </div>

          <Dialog
            v-model:visible="visible"
            modal
            :style="{ width: '40vw' }"
            :breakpoints="{ '1560px': '75vh', '960px': '75vw', '641px': '90vw' }"
          >
            <template style="background-color: black" #header>
              <p class="text-4xl font-medium">Patriot Act</p>
            </template>

            <patriotEn v-if="lang === 'en'" />
            <patriotEs v-if="lang === 'es'" />

            <template #footer>
              <div class="flex justify-content-between mt-5">
                <Button
                  :label="t('deny')"
                  icon="pi pi-times"
                  @click="
                    () => {
                      form.patriot = false
                      visible = false
                    }
                  "
                  text
                  class="font-light p-button-outlined border-300"
                />
                <Button
                  :label="t('accept')"
                  icon="pi pi-check"
                  @click="
                    () => {
                      form.patriot = true
                      visible = false
                    }
                  "
                  autofocus
                />
              </div>
            </template>
          </Dialog>
          <br />
          <div class="container-flex w-100">
            <div class="float-left w-50">
              <Button
                type="button"
                :label="t('alreadyAccount')"
                icon="pi pi-angle-left"
                class="font-light mt-3 with-buttons p-button-outlined border-300"
                @click="redirectLogin()"
              />
            </div>
            <div class="float-right w-25">
              <Button
                type="submit"
                icon="pi pi-angle-right"
                iconPos="right"
                :label="t('save')"
                class="font-light with-buttons mt-3"
                :loading="submitting"
              />
            </div>
          </div>
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
import Password from 'primevue/password'
import Button from 'primevue/button'

import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo-login.png'
import Lang from '../../components/Lang.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Checkbox from 'primevue/checkbox'

import patriotEs from './components/patriotEs.vue'
import patriotEn from './components/patriotEn.vue'
import { RegisterService } from './services/register'
import { processException } from '../../shared/processException'
import showExceptionError from '../../shared/showExceptionError'

const submitting = ref(false)
const visible = ref(false)
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const didLoginEmit = defineEmits(['didLogin'])

const form = reactive({
  email: '',
  password: '',
  passwordConfirmation: '',
  terms: false,
  patriot: false,
})

const router = useRouter()

const lang = localStorage.getItem('noba@lang')

const redirectLogin = () => {
  router.push('/')
}

const getTheLinkToTermsAndConditions = () => {
  let linkSpanish = 'https://belobaba.io/terms-of-use'

  let linkEnglish = 'https://belobaba.io/terms-of-use'

  if (lang === 'es') {
    return linkSpanish
  }

  if (lang === 'en') {
    return linkEnglish
  }

  return linkEnglish
}

const getTheLinkToPoliticsAndPrivacy = () => {
  let linkSpanish = 'https://belobaba.io/privacy-policy'

  let linkEnglish = 'https://belobaba.io/privacy-policy'

  if (lang === 'es') {
    return linkSpanish
  }

  if (lang === 'en') {
    return linkEnglish
  }

  return linkEnglish
}

const handleSubmit = () => {
  if (form.password.length < 8) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), t('passwordLength'))
    return
  }

  if (!/[A-Z]/.test(form.password)) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), t('passwordOneCapitalLetter'))
    return
  }

  if (!/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(form.email)) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), t('invalidFormatEmail'))
    return
  }

  if (form.password !== form.passwordConfirmation) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), t('passwordsDontMatch'))
    return
  }

  if (form.terms === false) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), t('acceptTermsAndConditions'))
    return
  }

  if (form.patriot === false) {
    showExceptionError(toast, 'error', t('somethingWentWrong'), t('acceptPatriot'))
    return
  }

  submitting.value = true
  let email = form.email.toLowerCase().trim()
  let password = form.password.trim()
  new RegisterService()
    .register(email, password)
    .then(data => {
      submitting.value = false

      toast.add({
        severity: 'success',
        summary: t('successfulOperation'),
        detail: data.message,
        life: 5000,
      })

      localStorage.setItem('noba@user-email', form.email.toLowerCase().trim())

      alreadyRegisteredSendCodeVerifyEmail()
    })
    .catch(e => {
      submitting.value = false
      processException(toast, t, e)
    })
}

const alreadyRegisteredSendCodeVerifyEmail = () => {
  router.push('/confirm-email/create-user')
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
  box-shadow: 0 0 60px rgb(0 0 0 / 5%);
}

.with-buttons {
  width: 100% !important;
}

.logo-noba {
  width: 265px;
  height: auto;
}
</style>
