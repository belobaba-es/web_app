<template>
  <h2 class="font-medium">{{ t('wallet') }}</h2>
  <section class="grid mt-5 hidden sm:hidden md:hidden lg:flex xl:flex">
    <div v-if="submitting === true" class="field card col-3 mr-2 ml-2" v-for="x in ['', '', '']">
      <div class="grid">
        <div class="col-4">
          <Skeleton width="5rem" class="mb-2"></Skeleton>
          <Skeleton shape="circle" size="6rem" class="mr-2"></Skeleton>
        </div>

        <div class="col-8">
          <div class="w-100 h-100" style="position: relative">
            <p class="font-semi-bold text-right balance">
              <Skeleton width="10rem" class="mb-2"></Skeleton>
            </p>
          </div>
        </div>
      </div>
    </div>

    <div class="col-3 card mr-2 ml-2" v-bind:class="getStyle(item.assetCode)" v-for="item in getWallets()">
      <p class="font-bold text-uppercase mb-3" style="font-size: 9pt">{{ item.name }}</p>
      <div class="grid">
        <div class="col-4">
          <img :src="item.icon" style="width: 100%" />
        </div>
        <div class="col-8">
          <div class="w-100 h-100 text-right" style="position: relative">
            <p class="text-balance-lg font-semi-bold text-right">
              {{ calc(item.assetCode, item.balance, item.blockedBalance ?? 0) }} <small>{{ item.assetCode }}</small>
            </p>
          </div>
        </div>
      </div>
    </div>
  </section>

  <section class="block sm:block md:block lg:hidden xl:hidden">
    <div>
      <div class="carrousel">
        <Carousel
          :value="getAllWallets()"
          :numVisible="1"
          :numScroll="1"
          :responsiveOptions="responsiveOptions"
          :showNavigators="false"
          :showIndicators="false"
          class="custom-carousel"
          :circular="true"
          :autoplayInterval="2000"
          
        >
          <template #item="slotProps">
            <!-- card responsive -->
            <div class="card-border" v-bind:class="getStyle(slotProps.data.assetCode)">
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
                    {{ calc(slotProps.data.assetCode, slotProps.data.balance, slotProps.data.blockedBalance ?? 0) }}
                    <small>{{ slotProps.data.assetCode }}</small>
                  </p>
                </div>
              </div>
            </div>
          </template>
        </Carousel>
      </div>
    </div>
  </section>
</template>
<script setup lang="ts">
import Skeleton from 'primevue/skeleton'
import Carousel from 'primevue/carousel'
import Button from 'primevue/button'
import { useBalanceWallet } from '../composables/useBalanceWallet'
import { ref, onMounted } from 'vue'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })

const { getAllWallets } = useBalanceWallet()

const submitting = ref(true)

const getWallets = () => {
  const wallets = getAllWallets()
  submitting.value = false
  return wallets
  console.log(wallets)
}

const calc = (assetCode: string, balance: number, blocked: number) => {
  const total = isNaN(balance - blocked) ? 0 : balance - blocked
  if (assetCode === 'USD' || assetCode === 'USDC') {
    return total.toFixed(2)
  }

  return total.toFixed(8)
}

const getStyle = (assetCode: string) => {}

const responsiveOptions = ref([
  {
    breakpoint: '1024px',
    numVisible: 2,
    numScroll: 2,
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

.name-cripto {
  font-family: KanitMedium !important;
  font-weight: bold !important;
  margin: auto;
  width: fit-content;

  --max-font: 60;
  --min-font: 20;
  font-size: var(--responsive);
}

.icon-cripto {
  width: 100%;
}

.text-balance {
  font-family: KanitMedium !important;
  margin: auto;
  width: fit-content;

  @media only screen and (max-width: 480px) {
    --max-font: 100;
    --min-font: 25;
    font-size: var(--responsive);
  }

  /* Set max and min font sizes */
  --max-font: 40;
  --min-font: 12;
  font-size: var(--responsive);
}
.text-balance-lg {
  font-family: KanitMedium !important;
  margin: auto;
  width: fit-content;

  /* Set max and min font sizes */
  --max-font: 15;
  --min-font: 5;
  font-size: var(--responsive);
}
</style>
