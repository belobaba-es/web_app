<template>
  <footer>
    <div class="layout-footer hidden sm:hidden md:hidden lg:flex xl:flex mb-3">
      <div class="flex justify-content-start">
        <div class="flex align-items-center justify-content-center">
          <span>&copy; </span>
          <span class="text"> Noba.Cash {{ getYear() }} - All rights reserved. </span>
        </div>
      </div>
    </div>
  </footer>
</template>

<script lang="ts" setup>
const getYear = () => {
  const d = new Date()
  return d.getFullYear()
}
</script>
