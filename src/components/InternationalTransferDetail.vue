<template>
  <div class="col-12 content">
    <div class="col-6">
      <p class="font-medium text-sm">{{ t('bankAccountHolder') }}</p>
      <p class="font-medium text-sm">{{ t('emailLabel') }}</p>
      <p class="font-medium text-sm">{{ t('walletAddress') }}</p>
    </div>

    <div class="col-6">
      <p>{{ props.realName }}</p>
      <p>{{ props.email }}</p>
      <p>{{ props.account }}</p>
    </div>

    <Divider type="dashed"></Divider>

    <div class="col-6">
      <p class="font-medium text-sm">{{ t('emailLabel') }}</p>
      <p class="font-medium text-sm">{{ t('ourFee') }}</p>
      <p class="font-medium text-sm">{{ props.realName }} {{ t('hasReceived') }}</p>
    </div>

    <div class="col-6">
      <p>{{ props.amount }}</p>
      <p>{{ props.amountFee }} USD</p>
      <p>{{ t('Amount') }}</p>
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
import { defineProps } from 'vue';
import Divider from 'primevue/divider';

const props = defineProps({
  realName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  account: {
    type: String,
    required: true
  },
  amount: {
    type: String,
    required: true
  },
  amountFee: {
    type: String,
    required: true
  },
  transactionId: {
    type: String,
    required: true
  }
})
const { t } = useI18n({ useScope: 'global' })

console.log('my first component')
console.log('my first component props', props)
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