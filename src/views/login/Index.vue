<template>
  <Login v-if="!isNotTwoFactorActive" @did-login="didLogin" />

  <div v-if="userPayload !== undefined">
    <TwoFactorAuthentication v-if="isNotTwoFactorActive" :login-data="userPayload" />
  </div>
</template>

<script setup lang="ts">
import Login from './Login.vue'
import TwoFactorAuthentication from './TwoFactorAuthentication.vue'
import { ref } from 'vue'
import { LoginData } from './types/login.interface'
import {User, useUserStore} from '../../stores/user'
import { twoFactorAuthenticationIsActiveRemotely } from '../../shared/services/remoteConfig'

const isNotTwoFactorActive = ref<boolean>(false)

const userStore = useUserStore()

const userPayload = ref<LoginData>()

const didLogin = async (payload: LoginData) => {
  userPayload.value = payload

  if (await twoFactorAuthenticationIsActiveRemotely()) {
    if (userPayload.value?.account.twoFactorActive) {
      isNotTwoFactorActive.value = true
      return
    }
  }

  userStore.setUser(userPayload.value as User)

  if (userPayload.value.account.status !== 'pending') {
    window.location.href = '/dashboard'
  } else {
    window.location.href = `/profile/${userPayload.value.accountId}`
  }
}
</script>
