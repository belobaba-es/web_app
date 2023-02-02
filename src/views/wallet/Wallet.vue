<template>
  <section class="section-main">
    <CardWallet :carousel="false" v-show="useUser.isAccountActive()" />

    <AccountValidationProcess v-show="!useUser.isAccountActive()" />
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'

import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

import { useUserStore } from '../../stores/user'

const useUser = useUserStore()
</script>
