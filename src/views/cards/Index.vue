<template>
  <section v-if="!isMobile" class="section-main">
    <CardCenter />
  </section>

  <section class="md:bg-gray-100">
    <Menubar v-if="!isMobile" :model="itemsMenuLayout" class="font-semi-bold" />

    <div class="pb-5">
      <router-view />
    </div>
  </section>
</template>

<script lang="ts" setup>
import CardCenter from './cardCenter/CardCenter.vue'
import { useCardSocket } from './composables/useCardSocket'
import { onMounted, watch } from 'vue'
import Menubar from 'primevue/menubar'
import { useLayoutCard } from './composables/useLayoutCard'
import { useCardCenter } from './cardCenter/Composables/useCardCenter'
import { useCardCenterValidation } from './cardCenter/Composables/useCardCenterValidation'
import { useMediaQuery } from '../../composables/useMediaQuery'

const { subscribeCardTransactionResource, subscribeBalanceCard } = useCardSocket()
const { maskCardNumber } = useCardCenterValidation()
const { fetchListCard, listCards, selectedCard, cardInfo } = useCardCenter()
const { itemsMenuLayout } = useLayoutCard()
const { isMobile } = useMediaQuery()

onMounted(async () => {
  await subscribeCardTransactionResource()
  await subscribeBalanceCard()

  if (listCards.value.length === 0) {
    await fetchListCard()
  }
})

watch(cardInfo, () => {
  console.log('cardInfo index', cardInfo.value)
  selectedCard.value = {
    ...cardInfo.value,
    cardNumber: maskCardNumber(cardInfo.value.cardNumber),
  }
})
</script>
<style lang="scss" scoped>
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: #495057;
  font-size: 1.2rem;
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link {
  padding: 0.75rem 3.5rem;
}
</style>
