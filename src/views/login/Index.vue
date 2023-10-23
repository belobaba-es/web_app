<template>
  <Login v-if="!isNotTwoFactorActive" />

  <!--  <div v-if="userPayload !== undefined">-->
  <!--    <TwoFactorAuthentication v-if="isNotTwoFactorActive" :login-data="userPayload" />-->
  <!--  </div>-->
</template>

<script setup lang="ts">
import Login from './Login.vue'
import { ref } from 'vue'
import { UserAuth } from './types/login.interface'
import { AccountStatus } from '../../types/accountStatus.enum'

const isNotTwoFactorActive = ref<boolean>(false)

const userPayload = ref<any>()
</script>
