<template>
  <div class="completion-view">
    <div class="center-content">
      <img src="../../../assets/icons/check.svg" alt="Imagen de finalización" />
      <p class="title-text">{{ t('titleFinishOnboarding') }}</p>
      <p class="sub-title">
        {{ t('descriptionFinishOnboarding') }}
      </p>

      <Button
        :label="t('continue')"
        icon="pi pi-angle-right"
        icon-pos="right"
        class="px-5 mt-5 btn-submit"
        @click="redirectToHome()"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import router from '../../../router/router'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const redirectToHome = () => {
  router.push('/')
}
</script>

<style lang="scss" scoped>
.completion-view {
  margin-top: 10rem;
  display: flex;
  justify-content: center;
  align-items: center;

  .center-content {
    text-align: center;

    .title-text {
      font-size: 38px;
      margin-top: 20px;
    }

    .sub-title {
      font-size: 28px;
    }
  }
}
</style>