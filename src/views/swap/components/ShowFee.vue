<template>
  <div class="mt-3 mb-3 container-fee">
    <!--    <div class="col-12 pt-0 pb-0 grid">-->
    <!--&lt;!&ndash;      <div class="col-5">&ndash;&gt;-->
    <!--&lt;!&ndash;        <span class="font-regular text-primary text-1xl">Fee trade desk:</span>&ndash;&gt;-->
    <!--&lt;!&ndash;      </div>&ndash;&gt;-->
    <!--&lt;!&ndash;      <div class="col-7">&ndash;&gt;-->
    <!--&lt;!&ndash;        <span class="text-1xl font-light text-lg-left"><small>US$</small> {{ feeTradeDesk }}</span>&ndash;&gt;-->
    <!--&lt;!&ndash;      </div>&ndash;&gt;-->
    <!--    </div>-->

    <div class="col-12 pt-0 pb-0 grid">
      <div class="col-5 pt-0 pb-0">
        <span class="font-regular text-primary text-1xl">Fee Noba:</span>
      </div>
      <div class="col-7 pt-0 pb-0">
        <span class="text-1xl font-light text-lg-right"><small>US$</small> {{ feeNoba }}</span>
      </div>
    </div>

    <div class="col-12 grid">
      <div class="col-5 pt-0 pb-0">
        <span class="font-regular text-primary text-1xl">{{ getLabelTotal() }}:</span>
      </div>
      <div class="col-7 pt-0 pb-0">
        <span class="text-1xl font-light text-lg-right"><small>US$</small> {{ totalSpend }}</span>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useSwap } from '../../../composables/useSwap'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { feeTradeDesk, feeNoba, totalSpend, transactionType } = useSwap()

const getLabelTotal = () => {
  if (transactionType.value === 'buy') {
    return t('swapSpend')
  }

  return t('swapReceive')
}
</script>

<style>
.container-fee {
  width: 270px;
  margin: 0 auto;
}

small {
  font-size: 7.5pt;
  font-weight: normal;
}
</style>