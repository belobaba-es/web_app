<template>
  <div class="card-button" @click="toRoute">
    <p class="text-lg font-medium">{{ label }}</p>
  </div>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import { useRouter } from 'vue-router'

const props = defineProps({
  icon: String,
  label: String,
  to: String,
})

const router = useRouter()

const toRoute = () => {
  if (props.to) {
    router.push({ path: props.to })
  }
}
</script>

<style scoped>
.card-button {
  display: flex;
  color: #000;
  font-weight: 700;
  justify-content: center;
  align-items: center;
  text-align: center;
  padding: 0.5rem;
  border: 1px solid #e4b574;
  background: #e4cea1 0% 0% no-repeat padding-box;
  min-width: 280px;
  min-height: 60px;
  border-radius: 20px;
  cursor: pointer;
}

.card-button:hover {
  background: #fff;
  box-shadow: 0px 3px 30px #ecb95663;;
}
.card-button > div {
  height: 80px;
  margin-bottom: 1rem;
}

.card-button > div > img {
  margin: auto;
}
</style>
