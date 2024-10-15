<template>
  <div class="flex md:align-items-center md:flex-row flex-column md:mb-0 mb-3 px-4 pt-3 w-full pb-3 px-4">
    <div class="flex flex-row align-items-center" style="margin-left: -1rem">
      <Button icon="pi pi-angle-left" style="color: black" text @click="toBack" />

      <h1 class="pr-4 font-semi-bold m-0" style="font-size: 17px">{{ t(props.title ?? '') }}</h1>
    </div>
    <div class="mt-3">
      <h3 class="pr-4 m-1" style="font-size: 15px">{{ t('cardCenter') }}</h3>
      <div class="md:w-3rem">
        <SelectCard v-model="cardInfo" :listCards="listCards" />
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'
import SelectCard from '../../cards/components/selectCard/SelectCard.vue'
import { useI18n } from 'vue-i18n'
import { useRouter } from 'vue-router'
import { useCardCenterValidation } from '../../cards/cardCenter/Composables/useCardCenterValidation'
import { watch } from 'vue'

const { listCards, cardInfo, selectedCard } = useCardCenter()
const { maskCardNumber } = useCardCenterValidation()
const { t } = useI18n()

const router = useRouter()
const props = defineProps({
  title: {
    type: String,
    default: '',
  },
})

const toBack = () => {
  router.back()
}

watch(cardInfo, () => {
  selectedCard.value = {
    ...cardInfo.value,
    cardNumber: cardInfo.value.cardNumber,
  }
})
</script>
<style scoped></style>
