<template>
  <h3 class="font-regular m-0">
    <BackButtonMobile :subtitle="t('withdrawWireListBeneficiary')" :title="t('betweenNOBA')" />
  </h3>

  <section class="p-4">
    <div class="mt-3 py-4 px-3 container-fiat-internal">
      <div class="col-12 md:col-12 lg:col-12 xl:col-6 float-left mb-3">
        <p class="font-semi-bold" style="font-size: 1.2rem; margin: 0">{{ t('yourBeneficiaries') }}</p>
      </div>

      <TableListBeneficiaryInternal v-if="!loading" />

      <TableListSkeleton v-if="loading" />
    </div>
  </section>
</template>
<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue'
import TableListBeneficiaryInternal from './component/TableListBeneficiaryInternal.vue'
import TableListSkeleton from './component/TableListSkeleton.vue'
import { useListBeneficiaryInternal } from './composable/useListBeneficiaryInternal'
import BackButtonMobile from '../../../../components/BackButtonMobile.vue'
import { useToast } from 'primevue/usetoast'

const { t } = useI18n({ useScope: 'global' })
const { loading, fetchInternalBeneficiary, listInternalBeneficiary } = useListBeneficiaryInternal()
const toast = useToast()

onMounted(() => {
  if (listInternalBeneficiary.value.length === 0) {
    fetchInternalBeneficiary(true)
  }
})
</script>
<style lang="scss" scoped>
.container-fiat-internal {
  border: 1px solid var(--primary-color);
  border-radius: 8px;
  float: left;
  width: 100%;
}
</style>
