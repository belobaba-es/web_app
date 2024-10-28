<template>
  <div class="container-center">
    <img :src="logo" alt="logo" class="logo-noba" />
  </div>

  <div class="container-main">
    <div class="lg:bg-contain container">
      <div v-if="submitting">
        <div style="position: relative; margin: 0 auto; width: 50px">
          <ProgressSpinner
            v-if="submitting"
            animationDuration=".5s"
            aria-label="Custom ProgressSpinner"
            fill="var(--surface-ground)"
            strokeWidth="8"
            style="width: 50px; height: 50px"
          />
        </div>

        <h1 class="text-center">{{ t('verificationToken') }}</h1>
      </div>

      <Message v-if="verifySuccess" :closable="false">
        <div class="pl-4">
          <h3 class="font-bold">{{ t('verificationTokenForRecoveryTwoFactorSuccess') }}</h3>
          {{ t('verificationTokenForRecoveryTwoFactorSuccessMessage') }}

          <ol>
            <li>{{ t('verificationTokenForRecoveryTwoFactorStep1') }}</li>
            <li>{{ t('verificationTokenForRecoveryTwoFactorStep2') }}</li>
            <li>{{ t('verificationTokenForRecoveryTwoFactorStep3') }}</li>
            <li>{{ t('verificationTokenForRecoveryTwoFactorStep4') }}</li>
          </ol>
        </div>
      </Message>

      <Message v-if="showMessageInvalidToken" :closable="false" severity="warn">
        <div class="pl-4">
          <h3 class="font-bold">
            {{ t('verificationTokenForRecoveryTwoFactorFail') }}
          </h3>
        </div>
      </Message>

      <div class="container-main w-25 mt-5">
        <Button
          class="font-light w-100"
          icon="pi pi-angle-right"
          iconPos="right"
          label="Login"
          type="submit"
          @click="redirectLogin"
        />
      </div>
    </div>
  </div>
  <Lang />
</template>

<script lang="ts" setup>
import logo from '../../assets/img/logo.png'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import Message from 'primevue/message'
import { useI18n } from 'vue-i18n'
import ProgressSpinner from 'primevue/progressspinner'
import Lang from '../../components/Lang.vue'
import Button from 'primevue/button'
import { TwoFactorService } from '../../shared/services/twoFactor'
import { AccountService } from '../../shared/services/account'
import { processException } from '../../shared/processException'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const toast = useToast()
const submitting = ref(false)
const verifySuccess = ref(false)

const showMessageInvalidToken = ref(false)

const route = useRoute()

onMounted(() => {
  const queryString = window.location.search

  const token = decodeURIComponent(queryString).match(/_token=([^&]*)/)?.[1]

  if (!token) {
    showMessageInvalidToken.value = true
    return
  }
  submitting.value = true

  new TwoFactorService()
    .verifyTokenToRecoveryTwoFactorAuth(String(token))
    .then(async r => {
      await new AccountService().disableTwoFactorAuthentication(r.data.accountId)

      submitting.value = false
      verifySuccess.value = true
    })
    .catch(e => {
      submitting.value = false
      showMessageInvalidToken.value = true
      processException(toast, t, e)
    })
})

const redirectLogin = () => {
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
  height: auto;
}
</style>
