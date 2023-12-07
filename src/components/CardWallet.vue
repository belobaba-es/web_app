<template>
  <h2 class="font-medium">{{ t('wallet') }}</h2>

  <Carousel
    v-if="submitting === true && carousel"
    :value="skeleton"
    :numVisible="5"
    :showIndicators="false"
    :showNavigators="true"
    :numScroll="1"
    :circular="false"
    :responsiveOptions="responsiveOptionsCarouselSkeleton"
  >
    <template #item="slotProps">
      <div class="card-border" v-bind:class="getStyle(slotProps.data.assetCode)">
        <div class="flex justify-content-between flex-wrap">
          <div class="flex align-items-center justify-content-center">
            <Skeleton width="5rem" class="mb-2"></Skeleton>
          </div>
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </div>

        <div class="grid mt-1">
          <div class="col-6">
            <Skeleton shape="circle" size="6rem" class="mr-2"></Skeleton>
          </div>
          <div class="col-6 flex justify-content-end align-content-end flex-wrap">
            <Skeleton width="80%" class="mb-2"></Skeleton>
          </div>
        </div>
      </div>
    </template>
  </Carousel>

  <Carousel
    v-if="carousel && !oneWallet"
    :value="getWallets()"
    :numVisible="5"
    :showIndicators="false"
    :showNavigators="true"
    :numScroll="1"
    :circular="false"
    :responsiveOptions="responsiveOptions"
  >
    <template #item="slotProps">
      <div
        class="card-border"
        :class="{ 'one-wallet': oneWallet }"
        @click="goToHistoricTransactions(slotProps.data.assetCode)"
        v-bind:class="getStyle(slotProps.data.assetCode)"
      >
        <div class="flex justify-content-between flex-wrap">
          <div class="flex align-items-center justify-content-center">
            <p>
              <strong class="name-cripto">{{ slotProps.data.name }}</strong>
            </p>
          </div>
          <div class="flex align-items-center justify-content-center">
            <i class="pi pi-ellipsis-v"></i>
          </div>
        </div>

        <div class="grid mt-1">
          <div class="col-6">
            <img class="icon-cripto" :src="slotProps.data.icon" :alt="slotProps.data.name" />
          </div>
          <div class="col-6 flex justify-content-end align-content-end flex-wrap">
            <p class="text-balance">
              {{
                calculateBalance(
                  slotProps.data.assetCode,
                  slotProps.data.balance,
                  slotProps.data.blockedBalance ?? 0
                )
              }}
              <br />
              <small>{{ slotProps.data.assetCode }}</small>
            </p>
          </div>
        </div>
      </div>
    </template>
  </Carousel>

  <div class="grid col-12 wallet" v-if="!carousel || oneWallet">
    <div
      class="col-12 sm:col-5 md:col-5 lg:col-3 xl:col-3 card-border"
      v-bind:class="getStyle(item.assetCode)"
      v-for="item in getWallets()"
      @click="goToHistoricTransactions(item.assetCode)"
    >
      <div class="flex justify-content-between flex-wrap">
        <div class="flex align-items-center justify-content-center">
          <p>
            <strong class="name-cripto">{{ item.name }}</strong>
          </p>
        </div>
        <div class="flex align-items-center justify-content-center">
          <i class="pi pi-ellipsis-v"></i>
        </div>
      </div>

      <div class="grid mt-1">
        <div class="col-6">
          <img class="icon-cripto" :src="item.icon" :alt="item.name" />
        </div>
        <div class="col-6 flex justify-content-end align-content-end flex-wrap">
          <p class="text-balance-wallet">
            {{ calculateBalance(item.assetCode, item.balance, item.blockedBalance ?? 0) }}
            <br />
            <small>{{ item.assetCode }}</small>
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import Carousel from 'primevue/carousel'
import { useBalanceWallet } from '../composables/useBalanceWallet'
import { defineProps, ref } from 'vue'
import { useI18n } from 'vue-i18n'

import { useRouter } from 'vue-router'

interface Props {
  carousel: boolean
}

const props = defineProps<Props>()

const router = useRouter()

const { t } = useI18n({ useScope: 'global' })

const { getAllWallets, calculateBalance } = useBalanceWallet()

const submitting = ref(true)

const skeleton = ['', '', '', '', '']

const oneWallet = ref(false)

const getWallets = () => {
  const wallets = getAllWallets()
  oneWallet.value = wallets.length === 1
  submitting.value = false
  return wallets
}

const getStyle = (assetCode: string) => {
  if (assetCode === 'USD') {
    return 'card-blue'
  }
}

const goToHistoricTransactions = (assetCode: string) => {
  router.push(`/wallet/transactions/${assetCode}`)
}

const responsiveOptionsCarouselSkeleton = ref([
  {
    breakpoint: '1456px',
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: '1280px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '899px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '600px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '480px',
    numVisible: 1,
    numScroll: 1,
  },
])

const responsiveOptions = ref([
  {
    breakpoint: '1456px',
    numVisible: 4,
    numScroll: 1,
  },
  {
    breakpoint: '1280px',
    numVisible: 3,
    numScroll: 1,
  },
  {
    breakpoint: '899px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '600px',
    numVisible: 2,
    numScroll: 1,
  },
  {
    breakpoint: '480px',
    numVisible: 1,
    numScroll: 1,
  },
])
</script>

<style lang="scss">
* {
  --responsive: calc((var(--min-font) * 1px) + (var(--max-font) - var(--min-font)) * ((100vw - 420px) / (1200 - 420)));
}

.balance {
  position: absolute;
  bottom: 0;
  right: 1.7rem;
}

.carrousel {
  margin-top: 1rem;
  margin-bottom: 1rem;
  background-color: transparent;
}

.card-border {
  border: 1px solid #ebebeb;
  border-radius: 12px;
  padding: 1rem;
  margin: 0.5rem;
  text-align: center;
  background-color: #fff;
  cursor: pointer;
  box-shadow: 0px 3px 5px rgb(0 0 0 / 2%), 0px 0px 2px rgb(0 0 0 / 5%), 0px 1px 4px rgb(0 0 0 / 8%) !important;
  transition: box-shadow 0.2s ease-in-out;

  &:hover {
    box-shadow: 0 0 0 0.2rem rgba(0, 123, 255, 0.25);
  }
}

.card-blue {
  background: #134591;

  .name-cripto,
  .text-balance,
  .text-balance-wallet {
    color: white;
  }

  img {
    filter: invert(100%) sepia(90%) brightness(200%) contrast(100%);
  }
}

.name-cripto {
  font-family: KanitMedium !important;
  font-weight: bold !important;
  margin: auto;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (min-width: 992px) {
    --max-font: 13;
    --min-font: 12;
    font-size: var(--responsive);
  }

  --max-font: 10;
  --min-font: 20;
  font-size: var(--responsive);
}

.icon-cripto {
  width: 70%;
}

.text-balance {
  font-family: KanitMedium !important;
  margin: auto;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (max-width: 480px) {
    --max-font: 100;
    --min-font: 20;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 481px) {
    --max-font: 24;
    --min-font: 12;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 991px) {
    //991

    /* Set max and min font sizes */
    --max-font: 15;
    --min-font: 12;
    font-size: var(--responsive);
  }

  font-size: var(--responsive);
}

.text-balance-wallet {
  font-family: KanitMedium !important;
  margin: auto;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (max-width: 575px) {
    --max-font: 100;
    --min-font: 20;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 576px) {
    --max-font: 24;
    --min-font: 12;
    font-size: var(--responsive);
  }

  @media only screen and (min-width: 991px) {
    //991

    /* Set max and min font sizes */
    --max-font: 15;
    --min-font: 8;
    font-size: var(--responsive);
  }

  font-size: var(--responsive);
}

.wallet {
  @media only screen and (min-width: 576px) {
    display: flex;
    justify-content: center;
  }

  @media only screen and (min-width: 992px) {
    display: flex;
    justify-content: start;
  }

  .one-wallet {
    max-width: 350px;
  }

  @media only screen and (max-width: 991px) {
    margin-bottom: 50%;
  }
}
</style>