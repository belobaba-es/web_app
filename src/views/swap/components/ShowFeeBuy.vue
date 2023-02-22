<template>
  <div class="text-center mt-3 mb-3">
    <span class="font-medium text-primary text-2xl">Fee:</span>
    <span class="text-2xl font-medium">{{ feeAmount }}%</span>
    /
    <span class="font-medium text-primary text-2xl">Total:</span>
    <span class="text-2xl font-medium">{{ total() }}</span>
  </div>
</template>

<script setup lang="ts">
import {defineProps} from "vue";

interface Props {
  feeAmount: number,
  totalAmount: number,
  feeNoba: number
}

const props = defineProps<Props>()

const total = () => {
  return (props.totalAmount + props.feeNoba).toFixed(2)
}
</script>