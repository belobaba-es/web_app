<template>
  <div class="my-3 p-3">
    <SearchAccount />
  </div>

  <div class="grid" style="margin-top: 1rem; margin-left: 1rem">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>
    <div class="col-10">
      <div class="container">
        <div
          class="flex justify-content-between align-items-center asset-item"
          v-for="item in listBeneficiary"
          @click="onSelect(item)"
        >
          <img :src="getIcon(item.assetCode)" alt="" style="height: 56px" />
          <span class="ml-4 mt-2 mb-2">{{ item.informationOwner.name }}</span>
          <span class="ml-4 mt-2 mb-2" :style="{ color: getBeneficiaryStatusColor(item.status) }">{{
            item.status
          }}</span>
          <div class="flex align-items-center">
            {{ t('withdraw') }}
            <i class="pi pi-angle-right"></i>
          </div>
        </div>
      </div>

      <div class="mt-4" v-if="listNextPag > 1">
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

  <div class="grid p-fluid p-3">
    <div class="grid col-12 mt-4 mb-2">
      <div class="col-12 sm:col-12 md:col-12 lg:col-6 xl:col-6">
        <RouterLink to="/withdraw/crypto/other/add-beneficiary">
          <Button class="w-100" :label="t('addNewBeneficiary')" />
        </RouterLink>
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
import { useBeneficiary } from '../../composables/useBeneficiary'
import { onMounted } from 'vue'
import Button from 'primevue/button'
import { Beneficiary, CounterpartyStatus } from '../../types/beneficiary.interface'

const router = useRouter()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const { submitting, listNextPag, listBeneficiary, fetchBeneficiariesAssets, getBeneficiaryStatusColor } =
  useBeneficiary()

const props = defineProps<{
  formData: any
  toNew: any
}>()

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])

const onSelect = (item: Beneficiary) => {
  if (item.status === CounterpartyStatus.PENDING) {
    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: t('beneficiaryPending'),
      life: 8000,
    })

    return
  }

  if (item.status === CounterpartyStatus.REJECTED) {
    toast.add({
      severity: 'error',
      summary: t('somethingWentWrong'),
      detail: t('beneficiaryRejected'),
      life: 8000,
    })

    return
  }

  if (item.status === CounterpartyStatus.ACTIVE || item.status === undefined) {
    const page = 0
    const formData = {
      beneficiary: item,
    }
    emit('nextPage', {
      pageIndex: page,
      formData: formData,
    })
  }
}

const getIcon = (assetCode: string) => {
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