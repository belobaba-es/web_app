<script setup lang="ts">
import Toast from 'primevue/toast'
</script>

<template>
  <Toast />
  <!-- <nav>
    <router-link to="/">Home</router-link>  | <router-link to="/contact">Contact</router-link>
  </nav> -->
  <main>
    <router-view />
  </main>
</template>

<style scoped></style>
