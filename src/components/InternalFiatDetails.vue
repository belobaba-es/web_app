<template>
  <div class="col-12 content">
    <div class="col-6">
      <p class="font-medium text-sm">{{ t('bankAccountHolder') }}</p>
      <p class="font-medium text-sm">{{ t('email') }}</p>
    </div>

    <div class="col-6">
      <p>{{ props.realName }}</p>
      <p>{{ props.email }}</p>
    </div>

    <Divider type="dashed"></Divider>

    <div class="col-6">
      <p class="font-medium text-sm">{{ t('amount') }}</p>
      <p class="font-medium text-sm">{{ t('ourFee') }}</p>
      <p class="font-medium text-sm">{{ props.realName }} {{ t('willReceive') }}</p>
    </div>

    <div class="col-6">
      <p>{{ props.amountFee }} {{ props.assetCode }}</p>
      <p>{{ props.fee }} {{ props.assetCode }}</p>
      <p>{{ props.amount }} {{ props.assetCode }}</p>
    </div>

    <Divider type="dashed"></Divider>

    <div class="col-6">
      <p class="font-medium text-sm">{{ t('transactionNumber') }}</p>
    </div>

    <div class="col-6">
      <p>{{ transactionId }}</p>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { defineProps } from 'vue'
import Divider from 'primevue/divider'

const props = defineProps({
  realName: {
    type: String,
    required: true,
  },
  account: {
    type: String,
    required: true,
  },
  amountFee: {
    type: String,
    required: true,
  },
  fee: {
    type: String,
    required: true,
  },
  transactionId: {
    type: String,
    required: true,
  },
  assetCode: {
    type: String,
  },
  amount: {
    type: String,
  },
})
const { t } = useI18n({ useScope: 'global' })
</script>

<style lang="scss">
.content {
  display: contents;
}

.green-color {
  color: var(--primary-color);
}

.p-divider-dashed.p-divider-horizontal:before {
  border-color: var(--primary-color);
}
</style>
