<template>
  <div class="container">
    <div
      class="flex justify-content-between align-items-center asset-item"
      v-for="item in listBeneficiary"
      @click="emit('select', item)"
    >
      <!--<span class="ml-4 mt-2 mb-2">{{ item.realName }}</span>
       <span class="ml-4 mt-2 mb-2">{{item.assetId}}</span> -->
      <Button icon="pi pi-angle-right" class="p-button-text p-button-primary" label="" />
    </div>

    <div class="mt-4" v-if="listNextPag.toString() !== ''">
      <div class="grid flex justify-content-end">
        <div class="col-12 sm:col-12 md:col-12 lg:col-3 xl:col-3">
          <Button
            icon="pi pi-angle-right"
            iconPos="right"
            class="p-button load-more-btn w-100"
            :label="t('loadMore')"
            @click="loadMore"
            :loading="submitting"
          />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { BeneficiaryType } from '../../types/beneficiary.interface'
import { onMounted } from 'vue'
import { useI18n } from 'vue-i18n'
import { useRoute } from 'vue-router'
import { useBeneficiary } from '../../composables/useBeneficiary'

const route = useRoute()
const { t } = useI18n({ useScope: 'global' })
const { submitting, listNextPag, listBeneficiary, fetchBeneficiaries } = useBeneficiary()

const emit = defineEmits(['select'])

const loadMore = async () => {
  if (route.params.type === 'domestic') {
    await fetchBeneficiaries(BeneficiaryType.DOMESTIC)
  } else {
    await fetchBeneficiaries(BeneficiaryType.INTERNATIONAL)
  }
}

onMounted(async () => {
  await loadMore()
})
</script>

<style lang="css" scoped>
.asset-item {
  cursor: pointer;
  border-top: 1px solid var(--surface-overlay);
  border-bottom: 1px solid var(--surface-overlay);
}

.asset-item:hover {
  background-color: var(--surface-overlay);
}
</style>
