<template>
  <div class="m-3">
    <CardWallet :carousel="getAllWallets().length >= 3" />
    <div class="card p-5">
      <div class="flex">
        <div class="col-3 line-vertical">
          <h1 class="m-0 font-medium">{{ t('withdraw') }}</h1>
          <p class="m-0 font-light" style="font-size: 16px">{{ t('typeWithdraw') }}</p>
          <div class="line-divisor mt-1"></div>
          <div class="justify-content-center mt-3 pr-4">
            <div class="line-button p-1 mt-4">
              <Button
                :class="[{ selected: selectedOption === 'fiat' }, 'col-6 button-fiat']"
                :label="t('fiat')"
                icon="pi pi-dollar"
                @click="selectOption('fiat')"
              />
              <Button
                :class="[{ selected: selectedOption === 'crypto' }, 'col-6 button-crypto']"
                :label="t('crypto')"
                icon="pi pi-bitcoin"
                @click="selectOption('crypto')"
              />
            </div>
          </div>
          <div class="justify-content-center mt-3 pr-4">
            <div v-for="item in optionButtonsFiat" v-if="selectedOption === 'fiat'" class="retiros-options">
              <Button
                :icon="item.icon"
                class="w-full retiros-button flex justify-content-between align-items-center"
                iconPos="right"
                @click="clickAction(item.to)"
              >
                <div class="flex align-items-center">
                  <img v-if="item.img" :src="item.img" alt="" class="pr-3" />
                  <span class="text-left font-medium"> {{ item.label }} </span>
                </div>

                <i :class="item.icon"></i>
              </Button>
            </div>
            <div v-for="item in optionButtonsCrypto" v-if="selectedOption === 'crypto'" class="retiros-options">
              <Button
                :icon="item.icon"
                class="w-full retiros-button flex justify-content-between align-items-center"
                iconPos="right"
                @click="clickAction(item.to)"
              >
                <div class="flex align-items-center">
                  <img v-if="item.img" :src="item.img" alt="" class="pr-3" />
                  <span class="text-left"> {{ item.label }} </span>
                </div>

                <i :class="item.icon"></i>
              </Button>
            </div>
          </div>
        </div>

        <div class="col pl-4">
          <div>
            <router-view />
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { useLayout } from './composables/useLayout'
import CardWallet from '../../components/CardWallet.vue'
import { useBalanceWallet } from '../../composables/useBalanceWallet'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'

const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const { optionButtonsFiat, optionButtonsCrypto, selectOption, selectedOption, routerCrypto } = useLayout()
const { getAllWallets } = useBalanceWallet()
const showMenuCrypto = () => {
  return routerCrypto.includes(String(router.currentRoute.value.name))
}
onMounted(() => {
  if (showMenuCrypto()) {
    selectedOption.value = 'crypto'
  }
})

const clickAction = (to: string) => {
  router.push(to)
}
</script>

<style lang="scss" scoped>
.pi-panama {
  background-image: url('../../assets/icons/panama.svg');
}

.line-vertical {
  border-right: 2px solid var(--primary-color);
}

.line-divisor {
  border-bottom: 2px solid #eeedeb;
}

.line-button {
  display: flex;
  border: 2px solid var(--primary-color);
  border-radius: 10px;
}

.button-fiat,
.button-crypto {
  flex: 1;
  margin: 0;
  border: none;
  border-radius: 0;
}

.button-fiat {
  border-top-left-radius: 10px;
  border-bottom-left-radius: 10px;
  color: #1b1b19;
}

.button-crypto {
  border-top-right-radius: 10px;
  border-bottom-right-radius: 10px;
  color: #1b1b19;
}

.p-button {
  background-color: white;

  border: none;
  border-radius: 0;
  flex: 1;
  display: flex;
  justify-content: center;
}

.p-button.selected {
  background-color: var(--primary-color);
  border-radius: 10px;
  color: white;
}

.p-button:not(.selected):hover {
  background-color: var(--primary-color);
  border-radius: 10px;
  color: white;
}

.retiros-button {
  background: white;
  color: #1b1b19;
  border: 1px solid var(--primary-color);
  border-radius: 10px;
  padding: 1.5rem;
  width: 100% !important;
  margin: 0.5rem 0;
}

.retiros-options {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
}

.retiros-button:hover {
  background: #f7fdfd !important;
  color: #1b1b19 !important;
  font-weight: bold !important;
}
</style>
