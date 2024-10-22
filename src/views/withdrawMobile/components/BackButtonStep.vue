<template>
  <div class="flex md:align-items-center md:flex-row flex-column md:mb-0">
    <div class="flex flex-row align-items-center" style="margin-left: -1rem">
      <Button icon="pi pi-angle-left" style="color: black" text @click="toBack" />
      <h1 v-if="!subtitle" class="pr-4 font-semi-bold m-0" style="font-size: 17px">{{ t(title) }}</h1>
      <div v-else>
        <h3 class="pr-4 font-semi-bold m-0">
          <div class="text-color float-left mr-1">{{ t(title) }}</div>
          <div class="float-left">/ {{ t(subtitle) }}</div>
        </h3>
      </div>
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'

const { t } = useI18n()

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
  showSecondsPart: {
    type: Boolean,
    required: false,
  },
})

const emit = defineEmits(['goBack'])

const toBack = () => {
  emit('goBack')
}
</script>

<style scoped>
.text-color {
  color: #cecece !important;
}
</style>
