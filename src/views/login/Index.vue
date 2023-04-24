<template>

  <Login v-if="!isNotTwoFactorActive" @accessIsValid="accessMade" />

  <TwoFactorAuthentication v-if="isNotTwoFactorActive" />

</template>

<script setup lang="ts">
import Login from "./Login.vue";
import TwoFactorAuthentication from "./TwoFactorAuthentication.vue";
import {ref} from "vue";
import {useTwoFactorAuth} from "../../composables/useTwoFactorAuth";


const isNotTwoFactorActive = ref<boolean>(false)
const {twoFactorIsActive} = useTwoFactorAuth()

const accessMade = (r: boolean) => {
  if (r && !twoFactorIsActive()) {
    isNotTwoFactorActive.value = true
  }
}

</script>

