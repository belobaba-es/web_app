<template>
  <div
    class="flex md:align-items-center md:flex-row flex-column md:mb-0 mb-3 px-4 pt-3 w-full pb-5"
    style="background-color: #f7fdfd"
  >
    <div class="flex flex-row align-items-center" style="margin-left: -1rem">
      <Button icon="pi pi-angle-left" style="color: black" text @click="toBack" />
      <h1 class="pr-4 font-semi-bold m-0" style="font-size: 17px">{{ t('title') }}</h1>
    </div>
    <div>
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

const { listCards, cardInfo } = useCardCenter()
const { t } = useI18n()

const router = useRouter()
const props = defineProps({
  title: String,
})

const toBack = () => {
  router.back()
}
</script>
<style scoped></style>
