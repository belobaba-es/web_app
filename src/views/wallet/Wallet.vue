<template>
  <section v-show="useUser.isAccountActive()">
    <CardWallet :carousel="false" />
  </section>

  <AccountValidationProcess v-show="!useUser.isAccountActive()" />
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'
import { useUserStore } from '../../stores/user'
import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

const useUser = useUserStore()
</script>
