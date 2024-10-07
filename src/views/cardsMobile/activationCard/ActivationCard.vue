<template>
  <div>
    <SelectCardHeader title="activation" />
    <div class="flex flex-column justify-content-center align-items-center m-4 pb-8 pt-6">
      <div class="circle mt-4 flex justify-content-center align-items-center">
        <img :src="waitCard" />
      </div>
      <h2 class="m-0 font-medium mb-0 mt-4">{{ t('redirectActivationCard') }}</h2>
      <p class="m-0 font-normal text-center">{{ t('redirectActivationCardSubTitle') }}</p>
      <Button class="w-14rem mt-6 mb-8" @click="activationCardRedirect()" :label="t('active')" />
    </div>
  </div>
</template>

<script setup>
import Button from 'primevue/button'
import waitCard from '../../../assets/icons/wait-card.svg'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { useActivationCard } from '../../cards/activationCard/composables/useActivationCard'
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { t } = useI18n()
const router = useRouter()
const { listCards, cardInfo } = useCardCenter()
const { resetCardValues } = useActivationCard()
const activationCardRedirect = () => {
  resetCardValues()
  router.push('/cards/activation-card/code')
}
</script>

<style scoped>
.circle {
  width: 100px;
  height: 100px;
  border-radius: 50%;
  background-color: #3b67e9;
}
</style>
