<template>
  <div class="my-3">
    <SearchAccount />
  </div>

  <div class="grid" style="margin-top: 1rem">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>
    <div class="col-10">
      <div class="container">
        <div
          class="flex justify-content-between align-items-center asset-item"
          v-for="item in listBeneficiary"
          @click="onSelect(item)"
        >
          <img :src="getIcon(item.assetCode)" alt="" />
          <span class="ml-4 mt-2 mb-2">{{ item.label }}</span>
          <div class="flex align-items-center">
            {{ t('withdraw') }}
            <i class="pi pi-angle-right"></i>
          </div>
        </div>
      </div>

      <div class="mt-4" v-if="listNextPag !== ''">
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
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'
import SearchAccount from './SearchAccount.vue'
import { useToast } from 'primevue/usetoast'
import { BeneficiaryInternal } from '../../types/beneficiary.interface'
import { useBeneficiary } from '../../composables/useBeneficiary'
import { onMounted } from 'vue'
import Button from 'primevue/button'

const router = useRouter()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const { submitting, listNextPag, listBeneficiary, fetchBeneficiariesAssets } = useBeneficiary()

const props = defineProps<{
  formData: any
  toNew: any
}>()

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])

const onSelect = (item: BeneficiaryInternal) => {
  const page = 0
  const formData = {
    beneficiary: item,
  }
  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}

const getIcon = (assetCode: string) => {
  console.log(assetCode)
  return `https://storage.googleapis.com/noba-dev/${assetCode}.svg`
}

onMounted(async () => {
  await loadMore()
})

const loadMore = async () => {
  await fetchBeneficiariesAssets()
}
</script>

<style scoped>
.asset-item {
  cursor: pointer;
  padding: 10px;
}

.asset-item:hover {
  color: #00beb0;
  background: #fbfbfb;
}
</style>
