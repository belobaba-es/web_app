<template>
  <section class="pt-2 bg-white">
    <div v-for="item in itemsMenuLayoutMobile" :key="item.label" class="px-4 py-2">
      <router-link :to="item.to">
        <div class="flex justify-between items-center">
          <img :src="item.icon" alt="card" />
          <div class="ml-2 text-lg font-semibold" style="color: #060f27">{{ item.label }}</div>
        </div>
      </router-link>
    </div>
  </section>
</template>

<script lang="ts" setup>
import { useLayoutCardMobile } from '../composables/useLayoutCardMobile'

const { itemsMenuLayoutMobile } = useLayoutCardMobile()
</script>
