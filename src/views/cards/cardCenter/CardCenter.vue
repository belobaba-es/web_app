<template>
  <section class="section-main pb-8">
    <div class="flex md:align-items-center md:flex-row flex-column md:mb-0 mb-3">
      <h3 class="pr-4" style="font-size: 16px">{{ t('cardCenter') }}</h3>
      <div class="md:w-3rem">
        <SelectCard v-model="cardInfo" :listCards="listCards" />
      </div>
    </div>
    <div class="flex md:flex-row full flex-column">
      <img :src="card" :style="imgStyle" alt="" class="h-16rem md:mb-0 mb-3" />

      <div class="md:ml-4 md:w-6 md:mb-0 mb-3">
        <div
          v-if="selectedCard?.status === StatusCard.LOCKED || listCards.length === 0"
          class="md:h-16rem border-round-2xl"
          style="position: absolute; width: 38.5%; z-index: 1"
        />
        <Card :style="cardStyle" class="md:h-16rem border-round-2xl px-2">
          <template #content>
            <div class="flex justify-content-between border-bottom-1 border-gray-300 pb-1">
              <div class="w-6">
                <p class="m-0 font-semi-bold" style="color: var(--primary-color); font-size: 16px">
                  {{ t('balance') }}
                </p>
                <p class="m-0 font-semi-bold">{{ selectedCard?.balance }}</p>
              </div>
              <div class="flex w-6 justify-content-between">
                <div>
                  <p class="m-0 font-semi-bold" style="color: var(--primary-color); font-size: 16px">
                    {{ t('Cardholder') }}
                  </p>
                  <p class="m-0 font-semi-bold">{{ getUserName() }}</p>
                </div>
                <Button
                  :disabled="selectedCard?.status === StatusCard.LOCKED || loading"
                  class="btn btn-secondary p-button"
                  style="color: #495057"
                  text
                  @click="toggleVisibility()"
                >
                  <i v-if="!isCardInfoVisible" class="pi pi-eye-slash" style="font-size: 1.5rem"></i>
                  <i v-else class="pi pi-eye" style="font-size: 1.5rem"></i>
                  <div v-if="loading" class="pl-3">
                    <i class="pi pi-spin pi-spinner p-text-center"></i>
                  </div>
                </Button>
              </div>
            </div>
            <div class="flex justify-content-between pt-4">
              <div class="w-6">
                <p class="m-0 font-semi-bold" style="color: var(--primary-color); font-size: 16px">
                  {{ t('cardType') }}
                </p>
                <p class="m-0 font-semi-bold">{{ selectedCard?.isPhysical ? 'Fisica' : 'Virtual' }}</p>
              </div>
              <div class="flex w-6 justify-content-between">
                <div class="flex align-items-center">
                  <div class="pr-2">
                    <p class="m-0 font-semi-bold" style="color: var(--primary-color); font-size: 16px">
                      {{ t('cardNumber') }}
                    </p>
                    <p class="m-0 font-semi-bold">{{ selectedCard?.cardNumber }}</p>
                  </div>
                  <i
                    v-if="isCardInfoVisible"
                    class="pi pi-clone"
                    style="font-size: 1.5rem"
                    @click="copyToClipboard(selectedCard?.cardNumber)"
                  ></i>
                </div>
                <img :src="mastedCardLogo" alt="" class="w-4rem h-3rem" />
              </div>
            </div>
            <div class="flex justify-content-between pt-3">
              <div class="w-6 flex align-items-center">
                <div class="pr-2">
                  <p class="m-0 font-semi-bold" style="color: var(--primary-color); font-size: 16px">
                    {{ t('expirationDate') }}
                  </p>
                  <p class="m-0 font-semi-bold">
                    {{ formattedExpirationDate }}
                  </p>
                </div>
                <i
                  v-if="isCardInfoVisible"
                  class="pi pi-clone"
                  style="font-size: 1.5rem"
                  @click="copyToClipboard(selectedCard?.expirationDate)"
                ></i>
              </div>
              <div class="flex w-6 justify-content-between">
                <div class="flex align-items-center">
                  <div class="pr-2">
                    <p class="m-0 font-semi-bold" style="color: var(--primary-color); font-size: 16px">CVC</p>
                    <p class="m-0 font-semi-bold">{{ isCardInfoVisible ? selectedCard?.cvv : '***' }}</p>
                  </div>
                  <i
                    v-if="isCardInfoVisible"
                    class="pi pi-clone"
                    style="font-size: 1.5rem"
                    @click="copyToClipboard(selectedCard?.cvv)"
                  ></i>
                </div>
                <p
                  v-if="listCards.length !== 0"
                  :style="getStatusStyle(selectedCard?.status)"
                  class="font-medium"
                  style="padding: 0.25rem 1.25rem; border-radius: 1rem"
                >
                  {{ t(`${selectedCard?.status}`) }}
                </p>
              </div>
            </div>
          </template>
        </Card>
      </div>
      <div class="md:h-13rem md:ml-4 md:w-2">
        <p class="m-0 pb-3" style="font-size: 16px">{{ t('cardConfiguration') }}</p>
        <Button class="btn btn-primary w-full text-center" @click="routerNewCard"
          ><i class="pi pi-plus pr-2" style="font-size: 1rem"></i> {{ t('requestNewCard') }}
        </Button>
        <Button
          v-if="selectedCard?.status === StatusCard.CANCELLED"
          class="btn w-full text-center mt-3 bg-red-500 border-red-500"
          @click="handleDeleteCardModal(true)"
          ><i class="pi pi-times pr-2" style="font-size: 1rem"></i> {{ t('deleteCard') }}
        </Button>
        <Button v-else class="btn btn-primary w-full text-center mt-3" severity="secondary"
          ><i class="pi pi-ban pr-2" style="font-size: 1rem"></i> {{ t('textBlockCard') }}
        </Button>
        <div
          v-if="listCards.length !== 0 || selectedCard?.status === StatusCard.DELETE"
          class="card border-radius-0 flex p-0 mt-3 justify-content-between align-items-center"
        >
          <p class="font-normal ml-3">{{ pauseCardText }}</p>
          <div class="mt-2 mr-3">
            <InputSwitch v-model="checkedPausaCard" :disabled="checkInputLoad" @change="handlePausaCardChange" />
          </div>
        </div>
      </div>
    </div>
  </section>

  <ModalGeneric :subtitle="t('cardPausa2')" :title="t('cardPausa')" :visible="showModal" @update:display="closeModal" />
  <ModalDeleteCard :show-modal="isDeleteCardModalShow" @update:visible="handleDeleteCardModal($event)" />
</template>

<script lang="ts" setup>
import card from '../../../assets/img/card.png'
import mastedCardLogo from '../../../assets/img/mastercard_logo.png'
import Card from 'primevue/card'
import Button from 'primevue/button'
import { useCardCenterValidation } from './Composables/useCardCenterValidation'
import { useCardCenter } from './Composables/useCardCenter'
import { useAuth } from '../../../composables/useAuth'
import { useI18n } from 'vue-i18n'
import SelectCard from '../components/selectCard/SelectCard.vue'
import InputSwitch from 'primevue/inputswitch'
import ModalGeneric from '../../../components/ModalGeneric.vue'
import { computed } from 'vue'
import { StatusCard } from '../enums/statusCard.enum'
import ModalDeleteCard from './Components/ModalDeleteCard.vue'
import router from '../../../router/router'

const { getStatusStyle, copyToClipboard, formatExpirationDate } = useCardCenterValidation()
const {
  listCards,
  selectedCard,
  loading,
  toggleVisibility,
  isCardInfoVisible,
  cardInfo,
  checkedPausaCard,
  showModal,
  pauseCardRequest,
  checkInputLoad,
  pauseCardText,
  handleDeleteCardModal,
  isDeleteCardModalShow,
} = useCardCenter()

const { getUserName } = useAuth()
const { t } = useI18n({ useScope: 'global' })

const routerNewCard = () => {
  router.push('/cards/onboarding')
}

const formattedExpirationDate = computed(() => {
  if (isCardInfoVisible.value && selectedCard.value?.expirationDate && selectedCard.value?.expirationDate !== '**/**') {
    return formatExpirationDate(selectedCard.value?.expirationDate)
  }
  return '**/**'
})

const cardStyle = computed(() => {
  if (
    selectedCard.value?.status === StatusCard.LOCKED ||
    selectedCard.value?.status === StatusCard.DELETE ||
    loading.value ||
    listCards.value.length === 0
  ) {
    return {
      filter: 'grayscale(1)',
      color: '#EEEDEB',
    }
  }

  return {
    filter: 'none',
    color: '#495057',
  }
})

const closeModal = () => {
  showModal.value = false
}

const imgStyle = computed(() => {
  if (
    selectedCard.value?.status === StatusCard.LOCKED ||
    selectedCard.value?.status === StatusCard.DELETE ||
    listCards.value.length === 0
  ) {
    return {
      filter: 'opacity(0.3) grayscale(1)',
    }
  }

  return {
    filter: 'none',
  }
})

const handlePausaCardChange = () => {
  if (selectedCard.value) {
    pauseCardRequest()
  }
}
</script>

<style lang="scss" scoped>
//.p-dropdown-panel .p-dropdown-items .p-dropdown-item:not(.p-highlight):not(.p-disabled):hover {
//  background-color: var(--primary-color);
//  background: #00beb0;
//  color: #fff;
//}
//
//.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight {
//  background-color: #00beb0;
//  background: #00beb0;
//  color: #fff;
//}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item {
  padding: 0rem;
}

.p-dropdown-panel .p-dropdown-items .p-dropdown-item.p-highlight.p-focus {
  background-color: #00beb0;
  background: #00beb0;
  color: #fff;
}

.border-radius-0 {
  border-radius: 0;
}
</style>
