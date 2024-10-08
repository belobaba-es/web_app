<template>
  <div class="col-12 md:col-12 lg:col-12 xl:col-6">
    <div class="mt-4 ml-3">
      <BackButtonMobile :subtitle="t('withdraw')" :title="t('withdrawWireListBeneficiary')" />
    </div>
  </div>

  <div class="col-12 pl-4 pr-4">
    <div>
      <h3 class="text-center">{{ t('labelTopButtonAddBeneficiary') }}</h3>
      <Button :label="t('newBeneficiary')" class="col-12" icon="pi pi-plus" @click="newBeneficiary" />
    </div>
  </div>
  <h3 class="m-0 mt-5 ml-5 font-normal">{{ t('withdrawWireLocalText2') }}</h3>
  <div class="col-12 pl-4 pr-4 container-search-text flex justify-content-center">
    <InputSearch :onSearch="handleSearch" :placeholder="t('searchBeneficiary')" />
  </div>
  <div class="col-12 p-3 pb-5">
    <div v-if="submitting" class="skeleton-wrapper">
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
      <Skeleton height="1.3rem" style="margin-top: 15px; margin-bottom: 5px" width="100%" />
    </div>
    <table v-else class="w-full">
      <tr v-for="item of listBeneficiaryAchPanama" class="py-3">
        <td style="width: 60%">
          <div class="text-left float-left">
            <b class="m-0" style="font-size: 13px">{{ item.holderName }}</b>
          </div>
        </td>
        <td>
          <div class="flex justify-content-between">
            <div
              :style="getBeneficiaryStatusColor(item.status)"
              class="text-center"
              style="
                width: 100%;
                height: 25px;
                border-radius: 20px;
                margin: 5px;
                font-weight: bold;
                padding: 0.3rem;
                font-size: 10px;
              "
            >
              {{ item.status }}
            </div>
            <Button text @click="editBeneficiary(item)">
              <i class="pi pi-pencil p-text-secondary" style="font-size: 15px"></i>
            </Button>
            <Button text @click="makeWithdrawal(item)">
              <i class="pi pi-arrow-right text-primary" style="font-size: 15px"></i>
            </Button>
          </div>
        </td>
      </tr>
    </table>
  </div>
  <div class="justify-content-center align-items-center flex mt-5" style="width: 100%">
    <GeneralPaginator
      :pagination="pagination"
      @nextPage="nextPage"
      @prevPage="prevPage"
      @updateItemsPage="updateItemsPage"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import Skeleton from 'primevue/skeleton'
import GeneralPaginator from '../../../../components/GeneralPaginator.vue'
import { useBeneficiaryPanama } from '../../../withdraw/fiat/panama/composable/useBeneficiaryPanama'
import router from '../../../../router/router'
import InputSearch from '../../../withdraw/components/inputSearch/InputSearch.vue'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import { useNewBeneficiaryPanama } from '../../../withdraw/fiat/panama/composable/useNewBeneficiaryPanama'
import { useWithdraw } from '../../../withdraw/composable/useWithdraw'
import { BeneficiaryAchPanama } from '../../../withdraw/type/beneficiary.type'
import { onMounted } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const {
  submitting,
  listBeneficiaryAchPanama,
  nextPage,
  prevPage,
  pagination,
  updateItemsPage,
  getBeneficiaryStatusColor,
  fetchBeneficiariesAchPanama,
} = useBeneficiaryPanama()

const { beneficiaryPanamaSearch } = useBeneficiaryPanama()
const { setDataBeneficiary } = useNewBeneficiaryPanama()
const { prepareFormDataPanama, resetFormWithdrawal } = useWithdraw()

const { resetFormPanama } = useNewBeneficiaryPanama()

const editBeneficiary = (item: any) => {
  setDataBeneficiary(item)
}
onMounted(() => {
  fetchBeneficiariesAchPanama()
})
const newBeneficiary = () => {
  resetFormPanama()
  router.push(`panama/wire-local`)
}

const makeWithdrawal = (data: BeneficiaryAchPanama) => {
  resetFormWithdrawal()
  prepareFormDataPanama(data)
  router.push('/withdraw/fiat/panama/withdraw')
}

const handleSearch = (searchText: string) => {
  beneficiaryPanamaSearch(searchText)
}
</script>

<style lang="scss" scoped>
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
