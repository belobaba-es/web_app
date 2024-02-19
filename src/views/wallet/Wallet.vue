<template>
  <section class="section-main">
    <CreditCardBanner />
    <FinishRegisterWarningBar />

    <CardWallet :carousel="false" />

    <AccountValidationProcess />
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'

import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'
import CreditCardBanner from '../../components/CreditCardBanner.vue'
</script>