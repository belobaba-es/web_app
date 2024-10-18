<template>
  <section class="p-4">
    <h3 class="font-regular m-0">
      <BackButtonMobile :title="t('otherPlatforms')" :subtitle="t('withdrawWireListBeneficiary')" />
    </h3>
    <div class="flex justify-content-between w-full">
      <p style="font-size: 1rem">{{ t('selectBeneficiary') }}</p>
      <Button class="btn btn-primary text-center" style="font-size: 1rem; height: 35px" @click="goToCreateBeneficiary()"
        ><i class="pi pi-plus pr-2" style="font-size: 1rem"></i> {{ t('addNewBeneficiaryText') }}
      </Button>
    </div>

    <div class="mt-3 py-5 px-3 container-crypto">
      <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left mb-3">
        <p class="font-semi-bold" style="font-size: 1.2rem; margin: 0">{{ t('yourBeneficiaries') }}</p>
      </div>
      <div class="col-12 md:col-12 lg:col-12 xl:col-6 container-search-text float-left mb-3">
        <InputSearch :onChange="handleChange" :onSearch="handleSearch" :placeholder="t('searchBeneficiary')" />
      </div>

      <TableOtherPlatforms v-if="!submitting" />

      <TableOtherPlatformsListSkeleton v-if="submitting" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import { useRouter } from 'vue-router'
import TableOtherPlatforms from './components/TableOtherPlatforms.vue'
import TableOtherPlatformsListSkeleton from './components/TableOtherPlatformsListSkeleton.vue'
import { useBeneficiaryCrypto } from '../../../composable/useBeneficiaryCrypto'
import InputSearch from '../../../../components/inputSearch/InputSearch.vue'
import BackButtonMobile from '../../../../../../components/BackButtonMobile.vue'

const { t } = useI18n({ useScope: 'global' })
const {
  submitting,
  fetchBeneficiariesAssets,
  listBeneficiary,
  beneficiaryAssetSearch,
  search,
  resetFormOtherPlatform,
} = useBeneficiaryCrypto()

const router = useRouter()
onMounted(() => {
  if (listBeneficiary.value.length === 0 || search.value) {
    fetchBeneficiariesAssets(true)
  }
})

const handleSearch = (searchText: string) => {
  beneficiaryAssetSearch(searchText)
}
const handleChange = (searchText: string) => {
  if (searchText == '') {
    fetchBeneficiariesAssets(true)
    return
  }
}
const goToCreateBeneficiary = () => {
  resetFormOtherPlatform()
  router.push('/withdraw/crypto/other-platforms/beneficiary/new')
}
</script>
<style lang="scss" scoped>
.container-crypto {
  float: left;
  border: 1px solid var(--primary-color);
  border-radius: 8px;
}

.container-search-text div {
  justify-content: end !important;
}

@media (max-width: 1200px) {
  .container-search-text div {
    justify-content: start !important;
  }
}
</style>
