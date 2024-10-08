<template>
  <section class="section-main pb-8">
    <div class="card-mobile">
      <CardCenterMobile />
    </div>
    <div class="text-center mt-8">
      <h2 style="font-size: 19px" class="font-regular mb-0">{{ t('textRequestCard') }}</h2>
      <p class="mt-0 font-light">{{ t('dontHaveCard') }}</p>
    </div>
    <div class="flex flex-row justify-content-center w-full mt-3">
      <Button class="btn btn-primary text-center" @click="routerNewCard"
        ><i class="pi pi-plus pr-2" style="font-size: 1rem"></i> {{ t('requestNewCard') }}
      </Button>
    </div>
  </section>
</template>

<script setup>
import { useI18n } from 'vue-i18n'
import CardCenterMobile from '../cardCenterMobile/CardCenterMobile.vue'
import Button from 'primevue/button'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const routerNewCard = () => {
  router.push('/cards/onboarding')
}
</script>

<style></style>
