<template>
  <ConfettiExplosion :particleCount="300" :force="0.3" />
  <ConfettiExplosion :particleCount="1000" :force="3.3" />

  <section class="container-center mt-5">
    <h1 class="font-bold">Two-factor authentication (2FA) is now enabled for your account noba.cash</h1>
  </section>
</template>

<script setup lang="ts">
  import ConfettiExplosion from "vue-confetti-explosion"
</script>
