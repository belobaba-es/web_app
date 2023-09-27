<template>
  <div class="container-center">&nbsp;</div>
  <div class="container-main">
    <div class="grid col-12">
      <div class="col-4">
        <img class="logo-noba" :src="logo" alt="logo" />
      </div>
      <div class="col-4">
        <Lang />
      </div>
      <div class="col-4"></div>
    </div>
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
                I accept the Patriot Act
              </label>
            </div>

            <!-- <div class="text-right">
              <RouterLink to="/forgot-password">
                {{ t('recoveryPassword') }}
              </RouterLink>
            </div> -->
          </div>

          <div class="flex justify-content-between align-items-center">
            <div class="field-checkbox mt-2">
              <Checkbox inputId="binary" v-model="form.terms" :binary="true" />
              <label for="binary">
                <span>
                  I accept the <strong>Terms and Conditions</strong> and the <strong>Privacy Policy</strong>
                </span>
              </label>
            </div>
          </div>

          <div class="container-flex mt-lg-2">
            <div class="float-left w-25">
              <Button
                type="button"
                icon="pi pi-angle-left"
                :label="t('backButtonTitle')"
                class="font-light w-100 border-300 p-button-outlined"
                @click="redirectPage"
              />
            </div>
            <div class="float-right w-25">
              <Button
                type="submit"
                icon="pi pi-angle-right"
                iconPos="right"
                label="Login"
                class="font-light w-100"
                :loading="submitting"
              />
            </div>
          </div>

          <Button
            type="button"
            :label="t('noAccount')"
            class="font-light mt-lg-5 with-buttons p-button-outlined border-300 sm: mt-5"
            @click="redirectSignin()"
          />
        </form>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo.svg'
import Lang from '../../components/Lang.vue'
import { LoginService } from '../login/services/login'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Checkbox from 'primevue/checkbox'

const submitting = ref(false)
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const didLoginEmit = defineEmits(['didLogin'])

const loginService = LoginService.instance()

const form = reactive({
  email: '',
  password: '',
  passwordConfirmation: '',
  terms: false,
  patriotic: false,
})

const router = useRouter()

const redirectSignin = () => {
  router.push('/create-user')
}

const redirectPage = () => {
  window.location.href = window.location.origin ?? 'https://noba.cash/'
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
</style>
