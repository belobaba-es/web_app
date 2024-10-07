<template>
  <div class="container-center">
    <img :src="logo" alt="logo" class="logo-noba" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <h1 class="font-extra-light text-center">{{ t('loginTitle') }}</h1>
      <h2 class="font-extra-light text-center">{{ t('loginSubtitle') }}</h2>
      <div class="pt-5">
        <form class="checkout-form" @submit.prevent="makeLogin">
          <div class="field">
            <label class="font-light">{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText v-model="form.user" :placeholder="t('emailPlaceholder')" required type="text" />
            </div>
          </div>
          <div class="field">
            <label>{{ t('passwordLabel') }}</label>
            <div class="p-inputgroup">
              <Password v-model="form.pass" :feedback="false" placeholder="**********" required toggleMask />
            </div>
            <div>
              <span class="help-text">{{ t('passwordHelpText') }}</span>
            </div>
          </div>
          <div class="flex justify-content-between align-items-center">
            <div class="field-checkbox mt-2">
              <Checkbox v-model="form.remember" :binary="true" inputId="binary" />
              <label for="binary">
                {{ t('rememberMe') }}
              </label>
            </div>
            <div class="text-right">
              <RouterLink to="/forgot-password">
                {{ t('recoveryPassword') }}
              </RouterLink>
            </div>
          </div>

          <div class="container-flex mt-lg-2">
            <div class="float-right w-25">
              <Button
                :loading="submitting"
                class="font-light w-100"
                icon="pi pi-angle-right"
                iconPos="right"
                label="Login"
                type="submit"
              />
            </div>
          </div>
          <Button
            :label="t('noAccount')"
            class="font-light mt-lg-5 with-buttons p-button-outlined border-300 sm: mt-5"
            type="button"
            @click="redirectSigning()"
          />
          <Button
            :label="t('alreadyRegistered')"
            class="font-light mt-3 with-buttons p-button-outlined border-300"
            type="button"
            @click="alreadyRegisteredSendCodeVerifyEmail()"
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
<script lang="ts" setup>
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'
import logo from '../../assets/img/logo-login.png'
import Lang from '../../components/Lang.vue'
import { useRouter } from 'vue-router'
import Checkbox from 'primevue/checkbox'
import { useAuth } from '../../composables/useAuth'
import { useI18n } from 'vue-i18n'
import { useToast } from 'primevue/usetoast'
import { processException } from '../../shared/processException'

const { form, submitting, handleSubmit, redirectSigning } = useAuth()

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const router = useRouter()

const alreadyRegisteredSendCodeVerifyEmail = () => {
  router.push('/confirm-email/enable-user')
}

const makeLogin = async () => {
  try {
    submitting.value = true
    await handleSubmit()
  } catch (e: any) {
    submitting.value = false

    processException(toast, t, e)
  }
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
  max-width: 10%;
}
@media only screen and (max-width: 992px) {
  .logo-noba {
    max-width: 60%;
  }
}
</style>
