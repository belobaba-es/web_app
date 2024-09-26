<template>
  <section class="section-main">
    <FinishRegisterWarningBar />

    <CardWallet :carousel="getAllWallets().length >= 3" />

    <AccountValidationProcess />

    <TransactionHistoryTable :isDashboard="true"></TransactionHistoryTable>
  </section>
</template>

<script lang="ts" setup>
import CardWallet from '../../components/CardWallet.vue'
import AccountValidationProcess from '../../components/AccountValidationProcess.vue'
import TransactionHistoryTable from '../../components/TransactionHistoryTable.vue'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'
import { useBalanceWallet } from '../../composables/useBalanceWallet'

const { getAllWallets } = useBalanceWallet()
</script>

<style lang="scss">
.background-wallet {
  background: #efe4ce;
}
</style>
