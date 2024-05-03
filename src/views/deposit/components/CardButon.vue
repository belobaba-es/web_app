<template>
  <div class="card-deposit card">
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
.card-deposit {
  text-align: center;
  padding: 2rem 3rem;
  border: 1px solid #e4b574;
  background: #e4cea1 0% 0% no-repeat padding-box;
  width: 288px;
  height: 180px;
  border-radius: 12px;
  color: #000;
  font-weight: 700;
}
.card-deposit:hover {
  background: #dca854;
  box-shadow: 0px 3px 30px #ecb95663;
  img,
  p {
    filter: invert(50%) sepia(90%) brightness(200%) contrast(100%);
  }
}
.card-deposit > div {
  height: 80px;
  margin-bottom: 1rem;
}

.card-deposit > div > img {
  margin: auto;
}
</style>
