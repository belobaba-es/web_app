<template>



    <section class="flex justify-content-center mt-5">
      <div v-if="getWallets().length === 0" class="field card col-3 mr-2 ml-2" v-for="(x) in ['','','']">
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

      <div class="col-3 card mr-2 ml-2" v-for="(item) in getWallets()">
        <div class="grid">
          <div class="col-4">
            <p class="font-bold text-uppercase" style="font-size: 9pt">{{ item.name }}</p>
            <img :src="item.icon" width="120"/>
          </div>
          <div class="col-8">
            <div class="w-100 h-100" style="position: relative">
              <p class="font-semi-bold text-right balance">
                {{ calc(item.assetCode, item.balance, item.blockedBalance ?? 0) }}
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

const {getAllWallets} = useBalanceWallet()

const getWallets = () => {
  return getAllWallets()
}

const calc = (assetCode: string, balance: number, blocked: number) => {
  const total = isNaN(balance - blocked) ? 0 : balance - blocked
  if (assetCode === 'USD') {
    return total.toFixed(2)
  }

  return total.toFixed(8)
}
</script>

<style lang="scss">
.balance {
  position: absolute;
  bottom: 0;
  right: 2rem;
}
</style>