<template>
  <div class="tap-bar-container block sm:block md:block lg:hidden xl:hidden" style="z-index: 5">
    <MenuWithCard :items="model" />
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import MenuWithCard from './MenuWithCard.vue'

defineProps<{
  model: Array<any>
}>()
</script>

<style lang="scss">
.tap-bar-container {
  background-color: #fff;
  border: 1px solid #e7e6e7;
  padding: 10px;
  position: fixed;
  width: 100%;
  bottom: 0rem;
  left: 0;
}
</style>
