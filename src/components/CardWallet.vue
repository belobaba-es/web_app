<template>

    <h2 class="font-medium">{{t('wallet')}}</h2>
    <section class="grid mt-5">
      <div v-if="submitting === true" class="field card col-3 mr-2 ml-2" v-for="(x) in ['','','']">
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

      <div class="col-3 card mr-2 ml-2" v-bind:class="getStyle(item.assetCode)" v-for="(item) in getWallets()">
        <p class="font-bold text-uppercase mb-3" style="font-size: 9pt">{{ item.name }}</p>
        <div class="grid">
          <div class="col-4">
            <img :src="item.icon" style="width: 100%"/>
          </div>
          <div class="col-8">
            <div class="w-100 h-100 text-right" style="position: relative">
              <p class="font-semi-bold text-right balance">
                {{ calc(item.assetCode, item.balance, item.blockedBalance ?? 0) }} <small>{{item.assetCode}}</small>
              </p>
            </div>
          </div>
        </div>

      </div>

    </section>
</template>
<script setup lang="ts">
import Skeleton from 'primevue/skeleton';
import {useBalanceWallet} from "../composables/useBalanceWallet";
import {ref} from "vue";
import {useI18n} from "vue-i18n"

const { t } = useI18n({ useScope: 'global' })

const {getAllWallets} = useBalanceWallet()

const submitting = ref(true);

const getWallets = () => {
  const wallets = getAllWallets()
  submitting.value = false
  return wallets
}

const calc = (assetCode: string, balance: number, blocked: number) => {
  const total = isNaN(balance - blocked) ? 0 : balance - blocked
  if (assetCode === 'USD' || assetCode === 'USDC') {
    return total.toFixed(2)
  }

  return total.toFixed(8)
}


const getStyle = (assetCode: string) => {

}
</script>

<style lang="scss">
.balance {
  position: absolute;
  bottom: 0;
  right: 1.7rem;
}
</style>