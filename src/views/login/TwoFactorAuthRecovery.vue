<template>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <div v-if="!verifySuccess" class="grid w-100">
        <h1 class="font-extra-light text-center">
          {{ t('requestRecoveryTwoFactorAuthTitle') }}
        </h1>

        <h3>
          {{ t('requestRecoveryTwoFactorAuthRequirements') }}
        </h3>

        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <InputText class="w-80" v-model="codes[0]" />
        </div>
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <InputText class="w-80" v-model="codes[1]" />
        </div>
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <InputText class="w-80" v-model="codes[2]" />
        </div>
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <InputText class="w-80" v-model="codes[3]" />
        </div>

        <Button
          type="button"
          icon="pi pi-angle-right"
          iconPos="right"
          :label="t('requestRecoveryTwoFactorAuthBtn')"
          class="font-light w-100 mt-5"
          :loading="submitting"
          @click="makeRequestRecoveryTwoFactorAuth"
        />
      </div>

      <div v-if="verifySuccess">
        <Message :closable="false">
          <div class="pl-4">
            {{ t('requestRecoveryTwoFactorAuthMessageSuccess') }}
          </div>
        </Message>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { TwoFactorService } from '../../shared/services/twoFactor'
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../../composables/useAuth'
import { processException } from '../../shared/processException'

const { t } = useI18n({ useScope: 'global' })

const codes = ref(['', '', '', ''])
const verifySuccess = ref(false)
const submitting = ref(false)

const toast = useToast()
const { getClientId } = useAuth()

const makeRequestRecoveryTwoFactorAuth = () => {
  const allFull = codes.value.every(valor => valor.trim() !== '')
  if (!allFull) {
    toast.add({
      severity: 'warn',
      detail: 'Please write the 4 recovery codes.',
      life: 8000,
    })
  }

  new TwoFactorService()
    .requestRecoveryTwoFactorAuth(codes.value, getClientId())
    .then(r => {
      verifySuccess.value = true
    })
    .catch(e => {
      processException(toast, t, e)
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
