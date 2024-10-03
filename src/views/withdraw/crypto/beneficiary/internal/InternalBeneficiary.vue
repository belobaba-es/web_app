<template>
  <section class="p-4">
    <h3 class="font-regular m-0">
      <BackButtonMobile :title="t('walletNob')" :subtitle="t('withdrawWireListBeneficiary')" />
    </h3>
    <p style="font-size: 1rem">{{ t('selectBeneficiary') }}</p>
    <div class="mt-3 py-5 px-3 container-crypto">
      <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left mb-3">
        <p class="font-semi-bold" style="font-size: 1.2rem; margin: 0">{{ t('yourBeneficiaries') }}</p>
      </div>
      <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left mb-3 container-search-text">
        <InputSearch :onChange="handleChange" :onSearch="onSearch" :placeholder="t('searchBeneficiaryByEmail')" />
      </div>

      <TableInternal v-if="!loading" />

      <TableInternalListSkeleton v-if="loading" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import InputSearch from '../../../components/inputSearch/InputSearch.vue'
import TableInternal from './components/TableInternal.vue'
import TableInternalListSkeleton from './components/TableInternalListSkeleton.vue'
import { useToast } from 'primevue/usetoast'
import { useInternalBeneficiary } from '../../composable/useInternalBeneficiary'
import { validateEmail } from '../../../../../shared/helpers/validateEmail'
import BackButtonMobile from '../../../../../components/BackButtonMobile.vue'

const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const { loading, fetchInternalBeneficiary, listInternalBeneficiary, beneficiaryInternalSearch } =
  useInternalBeneficiary()

onMounted(() => {
  if (listInternalBeneficiary.value.length === 0) {
    fetchInternalBeneficiary(true)
  }
})

const onSearch = (searchText: string) => {
  if (searchText == '') updateBeneficiaryList(searchText)
  if (!validateEmail(searchText)) {
    toast.add({
      severity: 'error',
      summary: t('invalidEmail'),
      detail: '',
      life: 4000,
    })
    return
  }
  beneficiaryInternalSearch(searchText)
}
const handleChange = (searchText: string) => {
  updateBeneficiaryList(searchText)
}
const updateBeneficiaryList = (searchText: string) => {
  if (searchText == '') {
    fetchInternalBeneficiary(true)
    return
  }
}
</script>
<style lang="scss" scoped>
.container-crypto {
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  overflow-x: auto;
}

.search-text {
  height: 80px;
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
