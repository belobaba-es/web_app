<template>
  <section class="section-main">
    <CardCenter />
  </section>

  <section class="bg-gray-100">
    <Menubar :model="itemsMenuLayout" />
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
import { StatusCard } from './enums/statusCard.enum'
import router from '../../router/router'

const { subscribeCardTransactionResource, subscribeBalanceCard } = useCardSocket()
const { maskCardNumber } = useCardCenterValidation()
const { fetchListCard, listCards, selectedCard, cardInfo } = useCardCenter()
const { itemsMenuLayout } = useLayoutCard()

onMounted(async () => {
  await subscribeCardTransactionResource()
  await subscribeBalanceCard()
  await fetchListCard()
})

watch(cardInfo, () => {
  selectedCard.value = {
    ...cardInfo.value,
    cardNumber: maskCardNumber(cardInfo.value.cardNumber),
  }

  if (cardInfo.value.status !== StatusCard.ACTIVE) {
    itemsMenuLayout.value.forEach(item => {
      item.disabled = true
    })
    router.push('/cards/new-card')
    return
  }
  router.push('/cards/transactions-card')
})
</script>
<style lang="scss" scoped>
.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link .p-menuitem-text {
  color: #495057;
  font-size: 1.2rem;
  font-family: 'KanitRegular';
}

.p-menubar .p-menubar-root-list > .p-menuitem > .p-menuitem-content .p-menuitem-link {
  padding: 0.75rem 3.5rem;
}
</style>