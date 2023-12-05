<template>
  <SearchAccountByEmail style="margin-top: 3rem" @listBeneficiaries="setListBeneficiaries" />

  <div class="grid" style="margin-top: 1rem">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>

    <div class="col-12">
      <div class="container">
        <div class="grid w-100% asset-item" v-for="item in listBeneficiariesInternal" @click="nextStep(item)">
          <div class="mt-2 col-4 sm:col-4" style="width: 40%">{{ item.name }}</div>

          <div class="mt-2 col-4" style="width: 6%">
            <div class="pi pi-angle-right float-right"></div>
          </div>
        </div>

        <div class="mt-4" v-if="nextPag !== 0">
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
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import Divider from 'primevue/divider'
import { useRoute, useRouter } from 'vue-router'

import { useToast } from 'primevue/usetoast'
import SearchAccountByEmail from './SearchAccountByEmail.vue'
import Button from 'primevue/button'
import { TypeBeneficiaryInternal, useBeneficiary } from '../../composables/useBeneficiary'
import { UserAccount } from '../../types/account'

const router = useRouter()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const type = ref(TypeBeneficiaryInternal.FIAT)

const route = useRoute()

const { fetchBeneficiariesInternal, listBeneficiariesInternal, submitting, nextPag } = useBeneficiary()

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])

const setListBeneficiaries = (list: UserAccount[]) => {
  listBeneficiariesInternal.value = list
}

onMounted(async () => {
  if (route.params.type === 'crypto') {
    type.value = TypeBeneficiaryInternal.ASSET
  }
  await loadMore()
})

const nextStep = (item: UserAccount) => {
  const page = 0

  const formData = {
    beneficiary: { ...item },
  }

  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}
const loadMore = async () => {
  await fetchBeneficiariesInternal(type.value)
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
