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

onMounted(() => {
  const kyc = userStore.getWarningKYC()
  if (kyc) {
    for (const kycElement of kyc) {
      if (kycElement.kyc_required_actions) {
        kycElement.kyc_required_actions.forEach((e: any) => {
          for (const eKey in e) {
            messages.value.push({ content: e[eKey] })
          }
        })
      }
    }
  }
})
</script>

<style scoped>
.kyc {
  padding: 0.3rem;
}
</style>
