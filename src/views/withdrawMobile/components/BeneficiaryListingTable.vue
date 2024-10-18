<template>
  <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left mt-3">
    <p class="p-0" style="font-size: 1.2rem; margin: 0">{{ t('yourBeneficiaries') }}</p>
  </div>

  <div class="col-12 float-left mb-3 container-search-text flex justify-content-center">
    <InputSearch
      :placeholder="propsData?.placeholder"
      :onSearch="onSearch"
      :onChange="onChangeOfSearch"
      :redirect="updateTable"
    />
  </div>
  <div class="col-12 float-left p-0 pb-5">
    <div class="skeleton-wrapper" v-if="propsData.data.loading">
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
      <Skeleton width="100%" height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" />
    </div>
    <div v-else>
      <table cellpadding="8" class="w-full" v-if="propsData.data.list.length > 0">
        <tr class="py-3" v-for="item of propsData.data.list">
          <td class="flex" style="width: 100%">
            <div
              class="img-button float-left px-1 mr-3"
              :style="getIcon(item.assetIcon)"
              v-if="propsData.data.icon"
            ></div>
            <div class="text-left float-left">
              <b class="m-0 font-medium" style="font-size: 13px">{{ item.informationOwner.name }}</b>
              <div>
                <small v-if="item.informationWallet">{{ item.informationWallet.originWallet }}</small>
                <small v-if="item.informationBank">{{ item.informationBank.networkBank }}</small>
              </div>
            </div>
          </td>
          <td>
            <div class="flex justify-content-between">
              <div
                class="text-center"
                :style="{
                  ...getBeneficiaryStatusColor(item.status),
                  width: '100%',
                  height: '25px',
                  borderRadius: '20px',
                  margin: '5px',
                  fontWeight: 'bold',
                  padding: '0.3rem',
                  fontSize: '10px',
                }"
              >
                {{ item.status }}
              </div>
              <Button text @click="editBeneficiary(item)" v-if="propsData.data.showEdit">
                <i class="pi pi-pencil p-text-secondary" style="font-size: 15px"></i>
              </Button>
              <Button text @click="makeWithdrawal(item)" v-if="propsData.data.showWithdrawal">
                <i class="pi pi-arrow-right text-primary" style="font-size: 15px"></i>
              </Button>
            </div>
          </td>
        </tr>
      </table>
      <table cellpadding="8" class="w-full" v-else>
        <tr class="py-3">
          <td class="font-semi-bold text-center" style="font-size: 16px">{{ t('thereAreNoResults') }}</td>
        </tr>
      </table>
    </div>
  </div>
  <div class="justify-content-center align-items-center flex mt-5" style="width: 100%">
    <GeneralPaginator
      :pagination="propsData.pagination"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @updateItemsPage="updateItemsPage"
    />
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import GeneralPaginator from '../../../components/GeneralPaginator.vue'
import { useI18n } from 'vue-i18n'
import Skeleton from 'primevue/skeleton'
import { useBeneficiaryListTable } from '../composables/useBeneficiaryListingTable'
import { defineEmits, defineProps } from 'vue'
import InputSearch from '../../withdraw/components/inputSearch/InputSearch.vue'

const { t } = useI18n({ useScope: 'global' })
const propsData = defineProps({
  data: {
    type: Object,
    required: true,
    list: Array,
    loading: Boolean,
    icon: Boolean,
    showEdit: Boolean,
    showWithdrawal: Boolean,
  },
  pagination: {
    type: Object,
    required: true,
    totalRecords: Number,
    nextPag: Number,
    currentPage: Number,
    itemsPage: Number,
  },
  placeholder: {
    type: String,
    required: true,
  },
})
const emit = defineEmits([
  'editBeneficiary',
  'searchNextPage',
  'searchPrevPage',
  'searchUpdatePageRange',
  'onSearch',
  'onChange',
  'makeWithdrawal',
  'ListBeneficiary',
])

const {
  getIcon,
  getBeneficiaryStatusColor,
  currentPage,
  searchNextPage,
  searchPrevPage,
  searchUpdatePageRange,
  onSearch,
  onChangeOfSearch,
  editBeneficiary,
  makeWithdrawal,
} = useBeneficiaryListTable(emit)
const nextPage = () => {
  if (currentPage.value <= propsData.pagination.totalRecords) {
    currentPage.value++
    propsData.pagination.currentPage = currentPage.value
    searchNextPage(currentPage.value)
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    propsData.pagination.currentPage = currentPage.value
    searchPrevPage(currentPage.value)
  }
}

const updateItemsPage = (itemPage: number) => {
  searchUpdatePageRange(itemPage)
}
const updateTable = () => {
  updateItemsPage(10)
}
</script>

<style scoped lang="scss">
.img-button {
  width: 23px;
  height: 23px;
  background-size: cover;
}

.img-button:hover,
.img-button:active,
.img-button:focus {
  background: url('/ir_active.png') !important;
}
</style>
