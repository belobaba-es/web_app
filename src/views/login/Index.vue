<template>

  <Login v-if="!isNotTwoFactorActive" @did-login="didLogin" />

  <TwoFactorAuthentication v-if="isNotTwoFactorActive" :login-data="userPayload" />

</template>

<script setup lang="ts">
import Login from "./Login.vue";
import TwoFactorAuthentication from "./TwoFactorAuthentication.vue";
import {ref} from "vue";
import {LoginData} from "./types/login.interface";
import {useUserStore} from "../../stores/user";


const isNotTwoFactorActive = ref<boolean>(false)

const userStore = useUserStore()

const  userPayload = ref<LoginData>();

const didLogin = (payload: LoginData) => {
  userPayload.value = payload

  console.log(userPayload.value)

  if (userPayload.value.account.twoFactorActive) {
    isNotTwoFactorActive.value = true
    return
  }

  userStore.setUser(userPayload.value)

  if (userPayload.value.account.status !== 'pending') {
    window.location.href = '/dashboard'
  } else {
    window.location.href = `/profile/${userPayload.value.accountId}`
  }
}

</script>

