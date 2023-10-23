<template>
  <div class="mt-3 mb-3 container-fee">
    <div class="col-12 pt-0 pb-0 grid">
      <div class="col-5">
        <span class="font-medium text-primary text-2xl">Fee:</span>
      </div>
      <div class="col-7">
        <span class="text-2xl font-light ml-lg-4 text-lg-left">{{ feeAmount }}%</span>
      </div>

    </div>
    <div class="col-12 pt-0 pb-0 grid">
      <div class="col-5">
        <span class="font-medium text-primary text-2xl">Sub total:</span>
      </div>
      <div class="col-7">
        <span class="text-2xl font-light ml-lg-4 text-lg-left"><small>US$</small>  {{ totalAmount }}</span>
      </div>
    </div>
    <div class="col-12 pt-0 grid">
      <div class="col-5">
        <span class="font-medium text-primary text-2xl">Total:</span>
      </div>
      <div class="col-7">
        <span class="text-2xl font-light ml-lg-4 text-lg-right"><small>US$</small>  {{ total() }}</span>
      </div>
    </div>
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
  return (props.totalAmount - props.feeNoba).toFixed(2)
}
</script>

<style>
.container-fee {
  width: 300px;
  margin: 0 auto;
  position: relative;
}
small {
  font-size: 7.5pt;
  font-weight: normal;
}
</style>