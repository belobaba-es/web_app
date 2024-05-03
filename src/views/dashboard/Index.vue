<template>
  <section class="section-main">
    <FinishRegisterWarningBar />

    <CardWallet :carousel="true" />

    <AccountValidationProcess />

    <TransactionHistoryTable :isDashboard="true"></TransactionHistoryTable>
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'
import AccountValidationProcess from '../../components/AccountValidationProcess.vue'
import TransactionHistoryTable from '../../components/TransactionHistoryTable.vue'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'
</script>

<style lang="scss">
.background-wallet {
  background: #efe4ce;
}
</style>
