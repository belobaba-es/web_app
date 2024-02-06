<template>
  <div class="layout-footer hidden sm:hidden md:hidden lg:flex xl:flex">
    <div class="flex justify-content-start">
      <div class="flex align-items-center justify-content-center">
        <span class="text"> BELOBABA <sup>TM</sup> {{ getYear() }} - All rights reserved. </span>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const getYear = () => {
  const d = new Date()
  return d.getFullYear()
}
</script>
