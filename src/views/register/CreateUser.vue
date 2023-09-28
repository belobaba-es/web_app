<template>
  <div class="container-center">
    <img class="logo-noba" :src="logo" alt="logo" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <h1 class="font-extra-light text-center">{{ t('createAccount') }}</h1>
      <h2 class="font-extra-light text-center">{{ t('subtitleCreateAccount') }}</h2>
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
              <label for="patriot"> {{t('iAcceptPatriot')}} <a href="#" @click="visible = true">{{ t('patrioticLaw') }}</a></label>
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

            <usPatriot />

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
                  "                  text
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

          <div class="container-flex">
            <div class="mt-3 w-100">
              <Button
                type="submit"
                icon="pi pi-angle-right"
                :label="t('save')"
                class="font-light with-buttons"
                :loading="submitting"
              />
            </div>
          </div>

          <Button
            type="button"
            :label="t('alreadyAccount')"
            class="font-light mt-lg-3 with-buttons p-button-outlined border-300"
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
import Password from 'primevue/password'
import Button from 'primevue/button'

import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo.svg'
import Lang from '../../components/Lang.vue'
import { LoginService } from '../login/services/login'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Checkbox from 'primevue/checkbox'

//import a usPatriot component
import usPatriot from './components/usPatriotEs.vue'

const submitting = ref(false)
const visible = ref(false)
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const didLoginEmit = defineEmits(['didLogin'])

const loginService = LoginService.instance()

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
  let linkSpanish = 'https://noba.cash/es/termino-de-uso/'

  let linkEnglish = 'https://noba.cash/en/termino-de-uso/'

  if (lang === 'es') {
    return linkSpanish
  }

  if (lang === 'en') {
    return linkEnglish
  }

  return linkEnglish
}

const getTheLinkToPoliticsAndPrivacy = () => {
  let linkSpanish = 'https://noba.cash/es/politicas-de-privacidad/'

  let linkEnglish = 'https://noba.cash/en/politicas-de-privacidad/'

  if (lang === 'es') {
    return linkSpanish
  }

  if (lang === 'en') {
    return linkEnglish
  }

  return linkEnglish
}

const handleSubmit = () => {
  submitting.value = true
  loginService
    .login(form.email.toLowerCase(), form.password)
    .then(data => {
      const { data: userPayload } = data

      submitting.value = false

      didLoginEmit('didLogin', userPayload)
    })
    .catch(e => {
      submitting.value = false
      toast.add({
        severity: 'info',
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
</style>
