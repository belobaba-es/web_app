<template>
  <section class="section-main" >
    <CardWallet :carousel="true" v-show="useUser.isAccountActive()"/>

    <AccountValidationProcess v-show="!useUser.isAccountActive()" />
  </section>

</template>

<script setup lang="ts">
import CardWallet from '../../components/CardWallet.vue'
import { useUserStore } from '../../stores/user'
import AccountValidationProcess from '../../components/AccountValidationProcess.vue'

const useUser = useUserStore()
</script>
