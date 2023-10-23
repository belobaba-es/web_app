<template>
  <section class="kyc mb-3 mt-3">
    <transition-group name="p-message" tag="div">
      <Message v-for="msg of messages" severity="warn">{{ msg.content }}</Message>
    </transition-group>
  </section>
</template>
<script setup lang="ts">
import Message from 'primevue/message'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
const route = useRoute()

const messages = ref<any>([])

onMounted(() => {
  //TODO implementar KYC noba
  // const kyc = userStore.getWarningKYC(route.params.contactId === undefined ? undefined : String(route.params.contactId))
  // if (!kyc) {
  //   return
  // }
  //
  // for (let kycRequiredActionsKey in kyc.kycRequiredActions) {
  //   messages.value.push({ content: kyc.kycRequiredActions[kycRequiredActionsKey] })
  // }
  //
  // if (kyc.cipChecks !== '') {
  //   messages.value.push({ content: kyc.cipChecks })
  // }
})
</script>

<style scoped>
.kyc {
  padding: 0.3rem;
}
</style>
