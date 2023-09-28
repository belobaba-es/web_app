<template>
  <div class="flex justify-content-between align-items-center">
    <h1 class="text-2xl">{{ t('documents') }}</h1>
  </div>
  <div class="mb-4"></div>
  <div class="grid iframe-container">
    <ProgressSpinner
      v-if="isLoadingFrame"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />

    <iframe :src="url" id="iregister" width="800" height="600" frameborder="0"></iframe>
  </div>
</template>

<script setup lang="ts">
import { useAccount } from '../../composables/useAccount'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'

const { t } = useI18n({ useScope: 'global' })
const { locale } = useI18n()
const { getMembers } = useAccount()
const iFrameRegister = ref()
const isLoadingFrame = ref(true)

const url = `${import.meta.env.VITE_BASE_NOBA_REGISTER}/register`

onMounted(() => {
  setTimeout(async () => {
    const iframe: any = document.getElementById('iregister')
    iFrameRegister.value = iframe

    setTimeout(async () => {
      await sendUserDataToIframe()
      isLoadingFrame.value = false
    }, 3000)
  }, 1)
})

const sendUserDataToIframe = () => {
  const ramNum = Math.random()
  iFrameRegister.value.contentWindow.postMessage(
    {
      type: 'np',
      step: 1,
      content: 'Hello from Vue!',
      randomNumber: ramNum,
      email: 'mccarol@arcond.com',
      locale: locale.value,
    },
    '*'
  )
}
//send data to
</script>

<style scoped lang="scss">
.p-chip {
  border-radius: 3px;
  padding: 10px 9px;
}

.iframe-container {
  width: 100%;
  height: 0;
  padding-bottom: 75%; /* Adjust the aspect ratio as needed */
  position: relative;
}

.iframe-container iframe {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
}
</style>
