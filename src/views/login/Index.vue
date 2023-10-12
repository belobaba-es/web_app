<template>
  <Login v-if="!isNotTwoFactorActive" @did-login="didLogin" />

  <!--  <div v-if="userPayload !== undefined">-->
  <!--    <TwoFactorAuthentication v-if="isNotTwoFactorActive" :login-data="userPayload" />-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import Login from './Login.vue'
import TwoFactorAuthentication from './TwoFactorAuthentication.vue'
import { ref } from 'vue'
import { AccountStatus, LoginData } from './types/login.interface'
import { User, useUserStore } from '../../stores/user'
import { twoFactorAuthenticationIsActiveRemotely } from '../../shared/services/remoteConfig'

const isNotTwoFactorActive = ref<boolean>(false)

const userStore = useUserStore()

const userPayload = ref<any>()

const didLogin = async (payload: any) => {
  userPayload.value = payload

  userStore.setUser(userPayload.value as User)

  if (userPayload.value?.client.status !== AccountStatus.REGISTERED) {
    window.location.href = '/dashboard'
    return
  }
  // console.log("userPayload.value",userPayload.value)
  if (userPayload.value.clientId === null) {
    window.location.href = '/onboarding'
    return
  }

  window.location.href = `/profile/${userPayload.value.clientId}`
}
</script>
