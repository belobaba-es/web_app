<template>
  <SearchAccountByEmail style="margin-top: 3rem" @listBeneficiaries="setListBeneficiaries" />

  <div class="grid" style="margin-top: 1rem">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>

    <ListBeneficiaryInternal :list-beneficiaries="listBeneficiaries" @selected-beneficiary="nextStep" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { ref } from 'vue'
import Divider from 'primevue/divider'
import { useRouter } from 'vue-router'

import { useToast } from 'primevue/usetoast'
import SearchAccountByEmail from './SearchAccountByEmail.vue'
import { BeneficiaryInternal } from '../../types/beneficiary.interface'
import ListBeneficiaryInternal from './ListBeneficiaryInternal.vue'

const router = useRouter()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const listBeneficiaries = ref<BeneficiaryInternal[]>([])

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])

const setListBeneficiaries = (list: BeneficiaryInternal[]) => {
  listBeneficiaries.value = list
}

const nextStep = (item: BeneficiaryInternal) => {
  const page = 0
  const formData = {
    beneficiary: item,
  }

  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}
</script>
