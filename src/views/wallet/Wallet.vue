<template>
  <section class="section-main" style="height: 100%; paddingbottom: 2rem">
    <FinishRegisterWarningBar />

    <CardWallet :carousel="false" />

    <AccountValidationProcess />
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'

import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'
</script>
