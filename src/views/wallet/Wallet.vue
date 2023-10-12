<template>
  <section class="section-main">
    <FinishRegisterWarningBar></FinishRegisterWarningBar>

    <CardWallet :carousel="false" />

    <AccountValidationProcess />
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'

import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

import { useUserStore } from '../../stores/user'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'

const useUser = useUserStore()
</script>
