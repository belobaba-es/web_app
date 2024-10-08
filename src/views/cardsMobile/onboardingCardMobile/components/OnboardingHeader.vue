<template>
  <div class="flex flex-row align-items-center">
    <Button style="color: black" text icon="pi pi-angle-left" @click="toBack" />
    <h1 class="pr-4 font-semi-bold m-0" style="font-size: 17px">{{ t('requestCard') }}</h1>
  </div>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'

const router = useRouter()
const { t } = useI18n({ useScope: 'global' })
const toBack = () => {
  router.back()
}
</script>
