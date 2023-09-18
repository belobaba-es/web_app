<template>
  <div v-if="!isRecoveryTwoFactorAuth">
    <div class="container-center">
      <img class="logo-noba" :src="logo" alt="logo" />
    </div>

    <div class="container-main">
      <VeryCodeTwoFactorAuth
        :account-id="props.loginData.accountId"
        :recovery-link="true"
        @code-is-valid="isTwoFactorAuthCodeIsValid"
        @recovery-two-factor-auth="recoveryTwoFactorAuth"
      />

      <Lang />
    </div>
  </div>

  <TwoFactorAuthRecovery v-if="isRecoveryTwoFactorAuth" :account-id="props.loginData.accountId" />
</template>
<script setup lang="ts">
import logo from '../../assets/img/logo.svg'
import VeryCodeTwoFactorAuth from '../../components/VeryCodeTwoFactorAuth.vue'
import Lang from '../../components/Lang.vue'
import { AccountStatus, LoginData } from './types/login.interface'
import {User, useUserStore} from '../../stores/user'
import { ref } from 'vue'
import TwoFactorAuthRecovery from './TwoFactorAuthRecovery.vue'
import { useI18n } from 'vue-i18n'

const userStore = useUserStore()
const isRecoveryTwoFactorAuth = ref(false)

const { t } = useI18n({
  useScope: 'global',
})

interface Props {
  loginData: LoginData
}

const props = defineProps<Props>()

const isTwoFactorAuthCodeIsValid = (isValid: boolean) => {
  if (isValid) {
    userStore.setUser(props.loginData as User)

    if (props.loginData.account.status !== AccountStatus.PROCESSING) {
      window.location.href = '/dashboard'
    } else {
      window.location.href = `/profile/${props.loginData.accountId}`
    }
  }
}

const recoveryTwoFactorAuth = (res: boolean) => {
  if (res) {
    isRecoveryTwoFactorAuth.value = true
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
  width: 142px;
  height: 64px;
}

.help-text {
  color: rgb(135, 135, 135);
  font-size: 0.7rem;
}
</style>
