<template>

  <section class="flex justify-content-center mt-5">
    <div class="col-3 card mr-2 ml-2" v-for="(item) in getWallets()">
      <div class="grid">
        <div class="col-4">
          <p class="font-medium" style="font-size: 9pt">{{item.name}}</p>
          <img :src="item.icon" width="120" />
        </div>
        <div class="col-8 ">
          <p class="font-bold text-right">
            {{calc(item.assetCode, item.balance, item.blockedBalance ?? 0)}}
          </p>

        </div>
      </div>

    </div>

  </section>
</template>
<script setup lang="ts">

import {useBalanceWallet} from "../composables/useBalanceWallet";

const {getAllWallets} = useBalanceWallet()

// const wallets = ref<BalanceWallet[]>()


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

</style>