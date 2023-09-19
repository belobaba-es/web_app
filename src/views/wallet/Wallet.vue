<template>
  <section class="section-main">
    <CardWallet :carousel="false" />

    <AccountValidationProcess />
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'

import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

import { useUserStore } from '../../stores/user'

const useUser = useUserStore()
</script>
