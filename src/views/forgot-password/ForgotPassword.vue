<template>
  <div class="container-center">
    <img :src="logo" alt="logo" class="logo-noba" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <h1 class="font-extra-light text-center">{{ t('forgotPasswordTitle') }}</h1>
      <p class="font-extra-light text-center">{{ t('forgotPasswordSubtitle') }}</p>
      <div class="pt-5">
        <form class="checkout-form" @submit.prevent="handleSubmit">
          <div class="field">
            <label class="font-light">{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText v-model="form.email" :placeholder="t('emailPlaceholder')" type="text" />
            </div>
          </div>
          <div class="container-flex mt-lg-2">
            <div class="float-left w-25">
              <Button
                :label="t('backButtonTitle')"
                class="font-light w-100 border-300 p-button-outlined"
                icon="pi pi-angle-left"
                type="button"
                @click="router.push('/')"
              />
            </div>
            <div class="float-right w-25">
              <Button
                :label="t('forgotPasswordButton')"
                :loading="submitting"
                class="font-light w-100"
                icon="pi pi-angle-right"
                iconPos="right"
                type="submit"
              />
            </div>
          </div>
        </form>
      </div>
      <Button
        :label="t('alreadyAccount')"
        class="font-light mt-4 p-button-outlined border-300"
        type="button"
        @click="router.push('/')"
      />
    </div>
    <div class="container-center">
      <div>
        <Lang />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo-login.png'
import Lang from '../../components/Lang.vue'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { ForgotPasswordService } from './services/forgot-password'
import { processException } from '../../shared/processException'

const submitting = ref(false)
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const form = reactive({
  email: '',
})

const router = useRouter()

const handleSubmit = () => {
  submitting.value = true
  new ForgotPasswordService()
    .sendEmail(form.email.toLowerCase().trim())
    .then(response => {
      submitting.value = false
      toast.add({
        severity: 'success',
        summary: t('successfulOperation'),
        life: 4000,
        detail: response.message,
      })
      router.push('/')
    })
    .catch(e => {
      submitting.value = false
      processException(toast, t, e)
    })
}
</script>

<style lang="css" scoped>
.container-main {
  max-width: 668px;
  margin: 0 auto;
  padding: 0 3rem 3rem;
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

.logo-noba {
  max-width: 10%;
}

@media only screen and (max-width: 992px) {
  .logo-noba {
    max-width: 60%;
  }
}
</style>
