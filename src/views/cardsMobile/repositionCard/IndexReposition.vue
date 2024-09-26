<template>
  <SelectCardHeader title="rechargeCard" />
  <section class="card">
    <div class="text-center">
      <h1 class="font-regular mb-0">{{ t('textRequestCard') }}</h1>
      <p class="mt-0 font-light">{{ t('selectTextRequestCard') }}</p>

      <div class="flex flex-column containerCard mt-5">
        <div style="width: 251px">
          <ButtonCardType
            :img="iconVirtual"
            :imgSelected="iconVirtualWhite"
            :typeCard="CardModality.VIRTUAL"
            @click="handleRepositionVirtualCard"
          />
        </div>
        <div style="width: 251px">
          <ButtonCardType
            :img="iconFisica"
            :imgSelected="iconFisicaWhite"
            :typeCard="CardModality.PHYSICAL"
            @click="handleRepositionPhysicalCard"
          />
        </div>
      </div>
    </div>
  </section>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import iconVirtual from '../../../assets/icons/virtual.png'
import iconVirtualWhite from '../../../assets/icons/virtual-white.png'
import { CardModality } from '../../cards/enums/cardModality.enum'
import iconFisica from '../../../assets/icons/fisica.png'
import iconFisicaWhite from '../../../assets/icons/fiisica-white.png'
import ButtonCardType from '../../cards/components/buttonCardType.vue'
import { useCardReposition } from '../../cards/repositionCard/composable/useCardReposition'
import SelectCardHeader from '../components/SelectCardHeader.vue'

const { t } = useI18n({ useScope: 'global' })

const { handleRepositionVirtualCard, handleRepositionPhysicalCard } = useCardReposition()
</script>
<style lang="scss" scoped>
Button {
  background: #00beb0 !important;
}

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
