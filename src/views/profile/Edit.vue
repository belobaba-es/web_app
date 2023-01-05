<template>
  <div class="mb-4">
    <h1 class="text-2xl">
      {{ formTitle }}
    </h1>
  </div>
  <FormProfile />
</template>

<script setup lang="ts">
import FormProfile from './components/FormProfile.vue'
import { useAccount } from '../../composables/useAccount'
const { formTitle } = useAccount()
</script>

<style scoped>
.p-button,
.p-button:hover {
  background: var(--primary-color);
  border: 1px solid var(--primary-color);
}
.p-checkbox .p-checkbox-box.p-highlight {
  border-color: var(--primary-color);
  background: var(--primary-color);
}
</style>
