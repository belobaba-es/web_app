<template>
  <section class="section-main pb-5" style="margin: 0 -1rem">
    <SelectCardHeader title="card" />
    <div class="flex md:flex-row full flex-column align-items-center">
      <div
        :class="selectedCard?.isPhysical ? 'card-img-physical' : 'card-img-virtual'"
        :style="imgStyle"
        class="card-container"
      >
        <div class="flex flex-row justify-content-between align-items-center">
          <div>
            <p class="font-bold" style="font-size: 16px; margin: 0; opacity: 54%">{{ t('balance') }}</p>
            <p class="m-0 pt-3" style="font-size: 28px">${{ selectedCard?.balance ?? 0.0 }}</p>
          </div>
          <div class="flex flex-column justify-content-end">
            <img :src="mastercard" alt="" />
            <div v-if="listCards.length !== 0" class="flex justify-content-end pt-3">
              <Button
                class="btn btn-secondary p-button"
                style="color: #495057"
                text
                @click="router.push('/details-card')"
              >
                <img :src="nextArrow" alt="" style="width: 25px; height: 16px" />
              </Button>
            </div>
          </div>
        </div>

        <div class="flex flex-row justify-content-between pt-3">
          <p>{{ selectedCard?.cardNumber ?? '**** **** **** **** ' }}</p>
          <p>{{ t('Card') }} . {{ selectedCard?.isPhysical ? t('physical') : t('virtual') }}</p>
        </div>
      </div>
    </div>
    <div class="mt-2 flex justify-content-around align-items-center">
      <div v-if="listCards.length !== 0" class="flex p-0 align-items-center">
        <p class="font-normal">{{ pauseCardText }}</p>
        <div class="mt-2 ml-3">
          <InputSwitch v-model="checkedPausaCard" :disabled="checkInputLoad" @change="handleDisplayUpdate" />
        </div>
      </div>
      <div v-if="listCards.length !== 0" class="flex align-items-center">
        <span>{{ t('viewDetails') }}</span>
        <Button
          :disabled="selectedCard?.status === StatusCard.LOCKED || loading"
          class="btn btn-secondary p-button"
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
    <div class="mt-3">
      <Button class="btn btn-primary w-full text-center"
        ><i class="pi pi-plus pr-2" style="font-size: 1rem" @click="routerNewCard"></i> {{ t('requestNewCard') }}
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
    </div>
  </section>

  <DialogPauseCard :visible="visible" @update:display="handleDisplayUpdate($event)" />
  <SuccessPauseCardDialog :visibleSuccess="visibleSuccess" @update:close="handleClose($event)" />
  <ModalDeleteCard :show-modal="isDeleteCardModalShow" @update:visible="handleDeleteCardModal($event)" />
</template>

<script lang="ts" setup>
import { useCardCenter } from '../../cards/cardCenter/Composables/useCardCenter'
import { useI18n } from 'vue-i18n'
import { computed, ref } from 'vue'
import { StatusCard } from '../../cards/enums/statusCard.enum'
import mastercard from '../../../assets/img/mastercard_logo_mobile.png'
import nextArrow from '../../../assets/icons/next-arrow.svg'
import Button from 'primevue/button'
import InputSwitch from 'primevue/inputswitch'
import { useRouter } from 'vue-router'
import SelectCardHeader from '../components/SelectCardHeader.vue'
import DialogPauseCard from './DialogPauseCard.vue'
import SuccessPauseCardDialog from './SuccessPauseCardDialog.vue'
import ModalDeleteCard from '../../cards/cardCenter/Components/ModalDeleteCard.vue'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()

const {
  listCards,
  selectedCard,
  loading,
  toggleVisibility,
  isCardInfoVisible,
  cardInfo,
  checkedPausaCard,
  pauseCardRequest,
  checkInputLoad,
  pauseCardText,
  handleDeleteCardModal,
  showPauseModal,
  isDeleteCardModalShow,
} = useCardCenter()

const visible = ref(false)
const visibleSuccess = ref(false)

const routerNewCard = () => {
  router.push(listCards.value.length !== 0 ? '/cards/onboarding/reposition' : '/cards/onboarding')
}

const imgStyle = computed(() => {
  if (selectedCard.value?.status === StatusCard.LOCKED || listCards.value.length === 0) {
    return {
      filter: 'opacity(0.3) grayscale(1)',
    }
  }

  return {
    filter: 'none',
  }
})

const handleClose = (e: boolean) => {
  visibleSuccess.value = e
}

const handleDisplayUpdate = async (event: Event) => {
  const e = (event.target as HTMLInputElement).checked
  if (cardInfo.value?.status === StatusCard.LOCKED) {
    await pauseCardRequest()
    if (showPauseModal.value) {
      visible.value = false
      handleClose(true)
    }
    return
  }

  visible.value = e
}
</script>

<style lang="scss">
.card-container {
  background-image: url(/src/assets/img/card-mobile.png);
  background-repeat: no-repeat;
  background-position: center;
  width: 315px;
  height: 186px;
  border-radius: 28px;
  background-size: cover;
  padding: 1rem 2rem;
  color: white;
}

.card-img-physical {
  background-image: url(/src/assets/img/card-mobile-dark.png);
}

.card-img-virtual {
  background-image: url(/src/assets/img/card-mobile-dark.png);
}

.p-inputswitch.p-inputswitch-checked .p-inputswitch-slider {
  background-color: #34c759;
}
</style>
