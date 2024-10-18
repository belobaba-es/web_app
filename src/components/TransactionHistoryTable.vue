<template>
  <section class="section-main" style="height: 100%; padding-bottom: 5rem">
    <FinishRegisterWarningBar v-if="!props.isDashboard" />

    <!-- <p class="text-3xl font-medium">{{ t('transactionHistory') }}</p> -->

    <ProgressSpinner
      v-if="isLoadingTransactionDetails"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
    />

    <!--    filters-->
    <section v-if="!props.isDashboard">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6 mt-3">
        <div class="flex align-items-center">
          <router-link to="/dashboard">
            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text" />
          </router-link>
          <h1 class="text-3xl font-bold ml-3 my-0">{{ t('extracts') }}</h1>
        </div>
      </div>

      <div class="ml-3 mb-25">
        <div class="flex align-items-center">
          <p class="text-2xl">{{ t('chooseExtract') }}</p>
        </div>
      </div>

      <div class="col-12 ml-3">
        <div class="grid pt-2">
          <div :class="{ 'p-col-3 p-md-col-6': true }">
            <div class="grid">
              <div class="col-6">
                <label class="label-search line-height-4 font-semi-bold">{{ t('transactionType') }}</label>
                <Dropdown
                  class="dropdown-full"
                  v-model="selectedTypeTransaction"
                  :options="transactionTypes"
                  optionLabel="name"
                  optionValue="code"
                  :placeholder="t('allTransactions')"
                />
              </div>
              <div class="col-6">
                <label class="label-search line-height-4 font-semi-bold">{{ t('assetType') }}</label>
                <Dropdown
                  class="dropdown-full"
                  v-model="assetId"
                  :options="assets"
                  optionLabel="name"
                  optionValue="assetId"
                  :placeholder="t('selectAnAsset')"
                />
              </div>
            </div>
          </div>

          <div :class="{ 'p-col-3 p-md-col-6 lg:ml-4': true }">
            <label class="label-search line-height-4 font-semi-bold">{{ t('datePicker') }}</label>
            <div class="grid">
              <div class="col-6 m-0">
                <Calendar v-model="startDate" showTime dateFormat="dd/mm/yy" hourFormat="24" />
              </div>

              <div class="col-6 m-0">
                <Calendar v-model="endDate" showTime dateFormat="dd/mm/yy" hourFormat="24" showIcon />
              </div>
            </div>
          </div>

          <div class="3 padding-search-div">
            <div class="grid">
              <div class="col-12">
                <span class="p-input-icon-left flex p-fluid">
                  <i class="pi pi-search" />
                  <InputText type="text" class="b-gray" :placeholder="t('searchWallet')" />
                  <Button
                    class="p-button search-btn"
                    style="border-top-left-radius: 0; border-bottom-left-radius: 0"
                    :label="t('search')"
                    @click="search"
                  />
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="col-12 sm:col-12 md:col-6 lg:col-4 xl:col-3 pl-0 ml-3">
        <div class="flex align-items-center">
          <Button
            class="p-button"
            :label="t('extractGenerated')"
            @click="downloadExtract()"
            :loading="isLoadingPDF"
            icon="pi pi-download"
            iconPos="right"
          />
        </div>
      </div>
      <!--          -->
    </section>

    <div class="container-data mb-0 pb-0 ml-3">
      <div class="grid">
        <div class="col-6 flex justify-content-start align-items-center">
          <span class="font-bold text-xl">{{ t('historicTransactionsTitle') }}</span>
        </div>
        <div v-if="props.isDashboard" class="col-6 flex justify-content-end align-items-center">
          <span class="text-xl font-bold">{{ t('viewAllTransactions') }}</span>
          <router-link to="/transaction-history">
            <Button label="" icon="pi pi-angle-right" iconPos="left" class="p-button-text" />
          </router-link>
        </div>
      </div>

      <div class="grid mt-4">
        <div v-for="item in listTransaction" class="col-12 grid">
          <div class="col-12">
            <div class="grid">
              <div class="col sm:col-4 md:col-4 lg:col-2 xl:col-3">
                <div class="grid">
                  <div class="col-3 flex align-items-center data-hidden">
                    <img
                      class="icon-cripto"
                      :alt="item.assetId"
                      :src="iconAsset(item.counterparty?.informationWallet?.assetId ?? item.assetId, listAssets)"
                    />
                  </div>
                  <div class="col-8">
                    <p class="font-bold">{{ item.counterparty?.informationOwner?.name ?? '' }}</p>
                    <p class="font-bold" style="width: 90%; overflow: hidden; text-overflow: ellipsis; color: #7f7f7f">
                      {{ item.formatedDate }}
                    </p>
                  </div>
                </div>
              </div>

              <div class="col sm:col-3 md:col-3 lg:col-3 xl:col-3 data-hidden">
                <p class="font-bold" style="width: 90%; overflow: hidden; text-overflow: ellipsis; color: #7f7f7f">
                  {{ item.reference }}
                </p>
              </div>

              <div class="col sm:col-4 md:col-4 lg:col-3 xl:col-2">
                <p class="amount-x font-bold">
                  {{ item.amount }}
                  <small>{{ getAsset(item.assetId, listAssets).code }}</small> &nbsp;
                  <i
                    v-if="item.transactionType === 'withdraw-funds'"
                    class="pi pi-arrow-circle-up icon-withdraw-funds"
                  ></i>
                  <i v-if="item.transactionType === 'deposit'" class="pi pi-arrow-circle-down icon-deposit-funds"></i>
                </p>
              </div>

              <div class="col sm:col-4 md:col-3 lg:col-2 xl:col-2 data-hidden">
                <p
                  class="status"
                  :class="item.status !== 'CANCELLED' ? 'green-text' : 'red-text'"
                  style="font-weight: 700 !important"
                >
                  {{ translateTransactionStatus(item.status) }}
                </p>
              </div>

              <div class="col sm:col-4 md:col-4 lg:col-2 xl:col-2 details-mobile">
                <router-link
                  class="link-modal-data-transaction"
                  to="#"
                  exact
                  role="menuitem"
                  v-ripple
                  @click="openModalTransactionDetails($event, item)"
                >
                  <h4>
                    <i class="pi pi-eye"></i>
                    {{ t('viewDetails') }}
                  </h4>
                </router-link>
              </div>
            </div>
          </div>
        </div>

        <template v-if="isLoading">
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
          <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
        </template>
      </div>

      <div class="mt-2" v-if="nextPage.nextPage && !props.isDashboard">
        <div class="grid flex justify-content-end">
          <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
            <Button
              v-if="nextPage.nextPage"
              class="p-button load-more-btn"
              :label="t('loadMore')"
              @click="loadMoreItems"
              :loading="submitting"
            />
          </div>
        </div>
      </div>
    </div>
  </section>

  <ModalTransactionDetails
    v-model:display="displayModalTransactionDetail"
    :transaction="modalTransactionDetail as TransactionHistory ?? {} as TransactionHistory"
  ></ModalTransactionDetails>
</template>

<script lang="ts" setup>
import { defineProps } from 'vue'
import ProgressSpinner from 'primevue/progressspinner'
import Button from 'primevue/button'
import Calendar from 'primevue/calendar'
import Skeleton from 'primevue/skeleton'
import ModalTransactionDetails from '../components/ModalTransactionDetails.vue'
import Dropdown from 'primevue/dropdown'
import { TransactionHistory } from '../views/transaction-history/types/transaction-history-response.interface'
import { iconAsset } from '../shared/iconAsset'
import { getAsset } from '../shared/getAsset'
import FinishRegisterWarningBar from './FinishRegisterWarningBar.vue'
import { useTransactionHistoryTable } from '../views/transaction-history/composables/useTransactionHistoryTable'
import { useI18n } from 'vue-i18n'
import { useTranslateTransactionStatuses } from '../shared/composables/useTranslateTransactionStatuses.helper'

const { t } = useI18n({ useScope: 'global' })
const { translateTransactionStatus } = useTranslateTransactionStatuses()
const props = defineProps({
  isDashboard: {
    type: Boolean,
    required: true,
  },
})
const {
  assetId,
  assets,
  selectedTypeTransaction,
  startDate,
  listAssets,
  endDate,
  isLoading,
  isLoadingPDF,
  transactionTypes,
  listTransaction,
  submitting,
  displayModalTransactionDetail,
  isLoadingTransactionDetails,
  modalTransactionDetail,
  nextPage,
  downloadExtract,
  search,
  openModalTransactionDetails,
  loadMoreItems,
} = useTransactionHistoryTable()
console.log('listTransaction', listTransaction.value)
</script>

<style lang="scss" scoped>
@media screen and (max-width: 600px) {
  .details-mobile {
    display: flex;
    justify-content: center;
    align-items: center;
  }
}

.dropdown-full {
  width: 100% !important;
}

.container-data {
  margin-top: 30px;
}

.padding-search-div {
  padding-top: 2.2rem !important;
  padding-left: 0.5rem;
}

.mb-15 {
  margin-bottom: 1.5rem;
}

.label-search {
  margin-left: 0.5rem !important;
}

.p-button {
  width: 100%;
}

.mb-25 {
  margin-bottom: 2.5rem;
}

.icon-cripto {
  width: 60%;
}

.amount-x {
  font-size: 12pt;
}

.pi-chevron-right {
  color: var(--primary-color);
}

.pl-0 {
  padding-left: 0;
}

.search-btn {
  border-radius: 5px !important;
}

.reference {
  width: 90%;
  overflow: hidden;
  text-overflow: ellipsis;
  color: var(--bluegray-300);
}

.p-progress-spinner {
  position: fixed;
  margin-left: 33%;
  z-index: 999;
  margin-top: 30%;
}

.details-mobile {
  display: flex;
  justify-content: center;
  align-items: center;

  h4 {
    margin: 0;
  }
}
</style>
