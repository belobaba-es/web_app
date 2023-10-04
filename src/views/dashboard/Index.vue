<template>
  <section class="section-main">
    <FinishRegisterWarningBar v-show="!areDocumentsUploaded()"></FinishRegisterWarningBar>

    <CardWallet :carousel="true" />

    <AccountValidationProcess />

    <TransactionHistoryTable :isDashboard="true"></TransactionHistoryTable>
  </section>
</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'
import { useUserStore } from '../../stores/user'
import AccountValidationProcess from '../../components/AccountValidationProcess.vue'
import TransactionHistoryTable from '../../components/TransactionHistoryTable.vue'
import FinishRegisterWarningBar from '../../components/FinishRegisterWarningBar.vue'
import { AccountStatus } from '../login/types/login.interface'

const useUser = useUserStore()

const areDocumentsUploaded = () => {
  if (useUser.getUser.client == undefined || useUser.getUser.client.status == undefined) {
    return false
  }

  return useUser.getUser.client.status === AccountStatus.APPROVED
}
</script>
