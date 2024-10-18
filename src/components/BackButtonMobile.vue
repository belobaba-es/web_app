<template>
  <div class="flex md:align-items-center md:flex-row flex-column md:mb-0">
    <div class="flex flex-row align-items-center" style="margin-left: -1rem">
      <Button style="color: black" text icon="pi pi-angle-left" @click="toBack" />
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
import { useRouter } from 'vue-router'

const { t } = useI18n()

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    required: false,
  },
})

const toBack = () => {
  router.back()
}
</script>
<style scoped>
.text-color {
  color: #cecece !important;
}
</style>
