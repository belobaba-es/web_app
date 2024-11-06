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
import { useAssets } from '../../composables/useAssets'
import { onMounted } from 'vue'

const { listAssets, getAssets } = useAssets()

onMounted(() => {
  if (listAssets.value.length === 0) {
    getAssets()
  }
})

</script>
