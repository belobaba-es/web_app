<template>
  <div class="grid">
    <div class="col-6 sm:col-6 md:col-6 lg:col-3 xl:col-3">
      <p class="name_to">{{ item.reference }}</p>
      <p class="date">
        {{ secondsToDate(item.createdAt._seconds) }}
      </p>
    </div>
    <div class="col-3 flex align-items-center data-hidden">
      <p class="reference">{{ item.reference }}</p>
    </div>
    <div class="col-3 flex align-items-center data-hidden">
      <p class="amount">
        {{ item.amount }}
        <small>{{ item.assetCode }}</small>
        &nbsp;
        <i v-if="item.transactionType === 'withdraw-funds'" class="pi pi-arrow-circle-up icon-withdraw-funds"></i>
        <i v-if="item.transactionType === 'deposit'" class="pi pi-arrow-circle-down icon-deposit-funds"></i>
      </p>
    </div>
    <div class="col-6 sm:col-6 md:col-6 lg:col-3 xl:col-3 details-mobile">
      <router-link class="link-modal-data-transaction" to="#" exact role="menuitem" v-ripple>
        <h4>
          <i class="pi pi-eye"></i>
          Ver Detalle
        </h4>
      </router-link>
    </div>
  </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue'

defineProps<{
  item: any
}>()

const secondsToDate = (seconds: number) => {
  const locale = localStorage.getItem('noba@lang')
  const date = new Date(seconds * 1000)
  return date.toLocaleString(locale!)
}
</script>

<style lang="scss">
.name_to {
  font-family: KanitLight !important;
  width: fit-content;
  color: var(--primary-color);

  /* Set max and min font sizes in mobile view */
  @media only screen and (min-width: 992px) {
    --max-font: 15;
    --min-font: 12;
    font-size: var(--responsive);
  }

  --max-font: 20;
  --min-font: 15;
  font-size: var(--responsive);
}

.date {
  font-family: KanitLight !important;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (min-width: 992px) {
    --max-font: 12;
    --min-font: 10;
    font-size: var(--responsive);
  }

  --max-font: 15;
  --min-font: 12;
  font-size: var(--responsive);
}

.reference {
  font-family: KanitLight !important;
  width: fit-content;
  word-wrap: break-word;
  overflow: hidden;

  /* Set max and min font sizes in mobile view */
  @media only screen and (min-width: 992px) {
    --max-font: 12;
    --min-font: 10;
    font-size: var(--responsive);
  }

  --max-font: 15;
  --min-font: 12;
  font-size: var(--responsive);
}

.amount {
  font-family: KanitMedium !important;
  width: fit-content;

  /* Set max and min font sizes in mobile view */
  @media only screen and (min-width: 992px) {
    --max-font: 12;
    --min-font: 10;
    font-size: var(--responsive);
  }

  --max-font: 15;
  --min-font: 12;
  font-size: var(--responsive);
}

.data-hidden {
  @media only screen and (max-width: 991px) {
    display: none !important;
  }
}

.details-mobile {
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
}
</style>
