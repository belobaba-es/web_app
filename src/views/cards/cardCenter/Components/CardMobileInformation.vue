<template>
  <section>
    <div class="section-main">
      <CardCenterMobile />
    </div>
    <div class="mt-4 px-4 pb-8" style="color: #444444; background-color: white">
      <div v-if="loading">
        <Skeleton class="mb-2" width="10rem"></Skeleton>
        <Skeleton class="mb-3" height="2rem" width="15rem"></Skeleton>
        <Skeleton class="mb-2" width="5rem"></Skeleton>
        <Skeleton class="mb-3" height="2rem" width="10rem"></Skeleton>
        <Skeleton class="mb-2" width="5rem"></Skeleton>
        <Skeleton class="mb-3" height="2rem" width="4rem"></Skeleton>
        <Skeleton class="mb-3" height="2rem" width="8rem"></Skeleton>
      </div>
      <div v-else>
        <div class="flex justify-content-between">
          <div class="flex align-items-center mt-3">
            <div class="pr-2">
              <p class="m-0">{{ t('cardNumber') }}</p>
              <p class="m-0 font-semi-bold" style="font-size: 16px">{{ selectedCard?.cardNumber }}</p>
            </div>
            <i
              v-if="isCardInfoVisible"
              class="pi pi-clone pl-3 pt-3"
              style="font-size: 1.5rem; color: var(--primary-color)"
              @click="copyToClipboard(selectedCard?.cardNumber)"
            ></i>
          </div>
        </div>
        <div class="flex align-items-center mt-3">
          <div class="pr-2">
            <p class="m-0">{{ t('expirationDate') }}</p>
            <p class="m-0 font-semi-bold" style="font-size: 16px">
              {{ formattedExpirationDate }}
            </p>
          </div>
          <i
            v-if="isCardInfoVisible"
            class="pi pi-clone pl-3 pt-3"
            style="font-size: 1.5rem; color: var(--primary-color)"
            @click="copyToClipboard(selectedCard?.expirationDate)"
          ></i>
        </div>
        <div class="flex flex-column mt-3">
          <div class="flex align-items-center">
            <div class="pr-2">
              <p class="m-0">CVC</p>
              <p class="m-0 font-semi-bold">{{ isCardInfoVisible ? selectedCard?.cvv : '***' }}</p>
            </div>
            <i
              v-if="isCardInfoVisible"
              class="pi pi-clone pl-3 pt-3"
              style="font-size: 1.5rem; color: var(--primary-color)"
              @click="copyToClipboard(selectedCard?.cvv)"
            ></i>
          </div>
          <p
            v-if="listCards.length !== 0"
            :style="getStatusStyle(selectedCard?.status)"
            class="font-medium w-6rem text-center"
            style="padding: 0.25rem 1.25rem; border-radius: 1rem"
          >
            {{ t(`${selectedCard?.status}`) }}
          </p>
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useCardCenter } from '../Composables/useCardCenter'
import { useCardCenterValidation } from '../Composables/useCardCenterValidation'
import { useI18n } from 'vue-i18n'
import { computed } from 'vue'
import CardCenterMobile from '../../../cardsMobile/cardCenterMobile/CardCenterMobile.vue'
import Skeleton from 'primevue/skeleton'

const { t } = useI18n({ useScope: 'global' })
const { getStatusStyle, copyToClipboard, formatExpirationDate } = useCardCenterValidation()
const { listCards, selectedCard, loading, isCardInfoVisible, cardInfo, showModal } = useCardCenter()

const formattedExpirationDate = computed(() => {
  if (isCardInfoVisible.value && selectedCard.value?.expirationDate && selectedCard.value?.expirationDate !== '**/**') {
    return formatExpirationDate(selectedCard.value?.expirationDate)
  }
  return '**/**'
})
</script>
