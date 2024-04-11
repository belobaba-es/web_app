<template>
  <div class="container-center">
    <img class="logo-noba" :src="logo" alt="logo" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <div v-if="!verifySuccess" class="grid w-100">
        <h1 class="font-extra-light text-center">
          {{ t('requestRecoveryTwoFactorAuthTitle') }}
        </h1>

        <h3>
          {{ t('requestRecoveryTwoFactorAuthRequirements') }}
        </h3>

        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[0]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[1]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[2]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[3]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[4]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[5]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[6]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[7]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[8]" />
        </div>
        <div class="col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
          <InputText class="w-80" v-model="codes[9]" />
        </div>

        <div v-if="verifySuccess">
          <Message :closable="false">
            <div class="pl-4">
              {{ t('requestRecoveryTwoFactorAuthMessageSuccess') }}
            </div>
          </Message>

          <div class="container-main w-30 mt-5">
            <Button
              type="submit"
              icon="pi pi-angle-left"
              :label="t('backButtonTitle')"
              class="font-light w-100 p-button-outlined"
              @click="router.push('/')"
            />
          </div>
        </div>
      </div>
      <div class="container-flex mt-5">
        <div class="float-left w-25">
          <Button
            type="button"
            icon="pi pi-angle-left"
            :label="t('backButtonTitle')"
            class="font-light w-100 border-300 p-button-outlined"
            @click="redirectToLogin()"
          />
        </div>
        <div class="float-right w-30">
          <Button
            type="button"
            icon="pi pi-angle-right"
            iconPos="right"
            :label="t('requestRecoveryTwoFactorAuthBtn')"
            class="font-light w-100"
            :loading="submitting"
            @click="makeRequestRecoveryTwoFactorAuth"
          />
        </div>
      </div>
    </div>
  </div>

  <div class="container-center">
    <div>
      <Lang />
    </div>
  </div>
</template>

<script setup lang="ts">
import logo from '../../assets/img/logo.svg'
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import Lang from '../../components/Lang.vue'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { TwoFactorService } from '../../shared/services/twoFactor'
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global' })

const codes = ref(['', '', '', '', '', '', '', '', '', ''])
const verifySuccess = ref(false)
const submitting = ref(false)

const toast = useToast()
const router = useRouter()

interface Props {
  accountId: string
}

const props = defineProps<Props>()

const makeRequestRecoveryTwoFactorAuth = () => {
  const allFull = codes.value.every(valor => valor.trim() !== '')
  if (!allFull) {
    toast.add({
      severity: 'warn',
      detail: 'Por favor escribe los 10 codigo de recuperacion.',
      life: 4000,
    })
  }

  new TwoFactorService()
    .requestRecoveryTwoFactorAuth(codes.value, props.accountId)
    .then(r => {
      verifySuccess.value = true
    })
    .catch(e => {
      toast.add({
        severity: 'warn',
        detail: e.response.data.error ?? e.response.data.message,
        life: 4000,
      })
    })
}

const redirectToLogin = () => {
  window.location.href = '/'
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

.logo-noba {
  width: 265px;
  height: 'auto';
}

.w-80 {
  width: 80%;
}

.w-30 {
  width: 30%;
}

.w-35 {
  width: 35%;
}
</style>
