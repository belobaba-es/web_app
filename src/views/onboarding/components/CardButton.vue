<template>
  <div class="card">
    <div class="flex">
      <img :src="icon" alt="" />
    </div>
    <p class="text-2xl font-normal">{{ label }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
defineProps({
  icon: String,
  label: String,
})
</script>

<style scoped>
.card {
  text-align: center;
  padding: 2rem 3rem;
  border: 1px solid #00beb0;
  background: #fff 0% 0% no-repeat padding-box;
  width: 288px;
}
.card > div {
  margin-bottom: 1rem;
}

.card > div > img {
  margin: auto;
}

.card:hover {
  color: #fff;
  cursor: pointer;
  background: #00beb0 0% 0% no-repeat padding-box;
  transition: background-color 0.5s ease;
}
.card:hover img {
  filter: grayscale(100%) contrast(60);
}
</style>
