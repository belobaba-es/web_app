<template>
  <Dialog
    v-model:visible="showModalOfVerifyTwoFactorAuth"
    @update:visible="logout()"
    :modal="true"
    header="Two Factor Authentication"
    closeIcon="pi pi-times-circle"
    :breakpoints="{ '960px': '75vw', '640px': '100vw' }"
    class="modal-asset-selector"
    :style="{ width: '55rem' }"
  >
    <div v-if="!isRecoveryTwoFactorAuth">
      <div class="container-main">
        <VeryCodeTwoFactorAuth
          :recovery-link="true"
          @code-is-valid="codeValid"
          @recovery-two-factor-auth="recoveryTwoFactorAuth"
        />
      </div>
    </div>

    <TwoFactorAuthRecovery v-if="isRecoveryTwoFactorAuth" />
  </Dialog>
</template>
<script setup lang="ts">
import Dialog from 'primevue/dialog'
import VeryCodeTwoFactorAuth from '../../components/VeryCodeTwoFactorAuth.vue'

import { ref } from 'vue'
import TwoFactorAuthRecovery from './TwoFactorAuthRecovery.vue'

import { useAuth } from '../../composables/useAuth'

const { logout, showModalOfVerifyTwoFactorAuth, processRedirectAfterLogin } = useAuth()
const isRecoveryTwoFactorAuth = ref(false)

const recoveryTwoFactorAuth = (res: boolean) => {
  if (res) {
    isRecoveryTwoFactorAuth.value = true
  }
}

const codeValid = (res: boolean) => {
  if (res) {
    showModalOfVerifyTwoFactorAuth.value = false
    processRedirectAfterLogin()
  }
}
</script>

<style lang="css" scoped>
.container-main {
  max-width: 668px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
}
</style>
