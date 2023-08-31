<template>
  <section class="section-main">
    <FinishRegisterWarningBar v-show="!areDocumentsUPloaded()"></FinishRegisterWarningBar>
    <CardWallet :carousel="true" v-show="useUser.isAccountActive()" />

    <AccountValidationProcess v-show="!useUser.isAccountActive()" />

    <TransactionHistoryTable :isDashboard="true"></TransactionHistoryTable>
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'
import { useUserStore } from '../../stores/user'
import AccountValidationProcess from '../../components/AccountValidationProcess.vue'
import TransactionHistoryTable from '../../components/TransactionHistoryTable.vue'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'

const useUser = useUserStore()

const areDocumentsUPloaded = () => {
  return useUser.getUser.accountId !== null
}
</script>
