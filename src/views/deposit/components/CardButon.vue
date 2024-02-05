<template>
  <div class="card">
    <div class="flex">
      <img :src="icon" alt="" />
    </div>
    <p class="text-2xl font-medium">{{ label }}</p>
  </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue'
defineProps({
  icon: String,
  label: String,
})
</script>

<style lang="scss">
.card {
  text-align: center;
  padding: 2rem 3rem;
  border: 1px solid #aa9872;
  background: #fff0d7 0% 0% no-repeat padding-box;
  width: 288px;
  height: 180px;
}
.card:hover {
  background: #dca854;
  box-shadow: 0px 3px 30px #ecb95663;
  img, p{
    filter: invert(50%) sepia(90%) brightness(200%) contrast(100%);
  }
}
.card > div {
  height: 80px;
  margin-bottom: 1rem;
}

.card > div > img {
  margin: auto;
}
</style>
