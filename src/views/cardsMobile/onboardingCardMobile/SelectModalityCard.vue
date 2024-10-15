<template>
  <section>
    <OnboardingHeader />
    <div class="text-center">
      <h1 class="font-regular mb-0" style="font-size: 18px">{{ t('textRequestCard') }}</h1>
      <p class="mt-0 font-light">{{ t('selectTextRequestCard') }}</p>

      <div class="flex flex-column containerCard mt-5">
        <div style="width: 251px">
          <ButtonCardType :img="iconVirtual" :imgSelected="iconVirtualWhite" :typeCard="CardModality.VIRTUAL" />
        </div>
        <div style="width: 251px">
          <ButtonCardType :img="iconFisica" :imgSelected="iconFisicaWhite" :typeCard="CardModality.PHYSICAL" />
        </div>
      </div>
    </div>

    <div class="containerCard mt-4">
      <Button
        :label="t('next')"
        @click="nextStepUserData()"
        icon-pos="right"
        icon="pi pi-angle-right"
        style="background: var(--primary-color)"
      />
    </div>
  </section>
</template>
<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import iconFisica from '../../../assets/icons/fisica.png'
import iconVirtual from '../../../assets/icons/virtual.png'
import iconFisicaWhite from '../../../assets/icons/fiisica-white.png'
import iconVirtualWhite from '../../../assets/icons/virtual-white.png'
import { useOnboardingCard } from '../../cards/composables/useOnboardingCard'
import ButtonCardType from '../../cards/components/buttonCardType.vue'
import { CardModality } from '../../cards/enums/cardModality.enum'
import OnboardingHeader from './components/OnboardingHeader.vue'

const { t } = useI18n({ useScope: 'global' })
const { nextStepUserData } = useOnboardingCard()
</script>
<style scoped lang="scss">
h1 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}

p {
  font-size: clamp(0.75rem, 3vw, 1.5rem);
}

.p-buttonset .p-button {
  margin-right: 55px !important;
}

.containerCard {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
