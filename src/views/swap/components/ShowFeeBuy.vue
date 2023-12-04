<template>
  <div class="text-center mt-3 mb-3 text-center">
    <span class="font-medium text-primary text-2xl">Fee:</span>
    <span class="text-2xl font-light ml-lg-2">{{ feeAmount }}%</span>
    <span class="text-2xl ml-2 mr-2">/</span>
    <span class="font-medium text-primary text-2xl">Total: </span>
    <span class="text-2xl font-light"><small>US$</small>{{ total() }}</span>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

interface Props {
  feeAmount: number
  totalAmount: number
  feeNoba: number
}

const props = defineProps<Props>()

const total = () => {
  return (props.totalAmount + props.feeNoba).toFixed(2)
}
</script>
