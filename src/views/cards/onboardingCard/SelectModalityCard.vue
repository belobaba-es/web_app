<template>
  <section>
    <div class="text-center">
      <h1 class="font-regular mb-0">{{ t('textRequestCard') }}</h1>
      <p class="mt-0 font-light">{{ t('selectTextRequestCard') }}</p>

      <div class="grid contenedor mt-5">
        <div class="col-2">
          <ButtonCardType :img="iconVirtual" :imgSelected="iconVirtualWhite" :typeCard="CardModality.VIRTUAL" />
        </div>
        <div class="col-2">
          <ButtonCardType :img="iconFisica" :imgSelected="iconFisicaWhite" :typeCard="CardModality.PHYSICAL" />
        </div>
      </div>
    </div>

    <div class="grid contenedor mt-4">
      <Button :label="t('next')" class="col-1" icon="pi pi-angle-right" icon-pos="right" @click="nextStepUserData()" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import iconFisica from '../../../assets/icons/fisica.png'
import iconVirtual from '../../../assets/icons/virtual.png'
import iconFisicaWhite from '../../../assets/icons/fiisica-white.png'
import iconVirtualWhite from '../../../assets/icons/virtual-white.png'
import { useOnboardingCard } from '../composables/useOnboardingCard'
import ButtonCardType from '../components/buttonCardType.vue'
import { CardModality } from '../enums/cardModality.enum'
import { onMounted, watch } from 'vue'
import { useCardCenter } from '../cardCenter/Composables/useCardCenter'

const { t } = useI18n({ useScope: 'global' })
const { nextStepUserData } = useOnboardingCard()
</script>
<style lang="scss" scoped>
h1 {
  font-size: clamp(1.5rem, 3vw, 2.5rem);
}

p {
  font-size: clamp(0.75rem, 3vw, 1.5rem);
}

.p-buttonset .p-button {
  margin-right: 55px !important;
}

.contenedor {
  display: flex;
  justify-content: center;
  align-items: center;
}
</style>
