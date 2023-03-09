<template>
  <section class="kyc mb-3 mt-3" v-show="!userStore.isAccountActive()">
    <transition-group name="p-message" tag="div">
      <Message v-for="msg of messages" severity="warn">{{ msg.content }}</Message>
    </transition-group>
  </section>
</template>
<script setup lang="ts">
import Message from 'primevue/message'
import { useUserStore } from '../../../stores/user'
import { onMounted, ref } from 'vue'

const userStore = useUserStore()

const messages = ref<any>([])

import { toRefs } from 'vue';
import router from "../../../router";


onMounted(() => {
  const { contactId } = toRefs(router.currentRoute.value.params);

  const kyc = userStore.getWarningKYC(
      contactId === undefined ? undefined : String(contactId.value)
  )
  if (!kyc) {
    return
  }

  for (let kycRequiredActionsKey in kyc.kycRequiredActions) {
    messages.value.push({ content: kyc.kycRequiredActions[kycRequiredActionsKey] })
  }

  if (kyc.cipChecks !== "") {
    messages.value.push({ content: kyc.cipChecks })
  }

})
</script>

<style scoped>
.kyc {
  padding: 0.3rem;
}
</style>
