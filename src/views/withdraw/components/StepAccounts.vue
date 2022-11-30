<template>

  <SearchAccountByEmail style="margin-top: 3rem" @listBeneficiaries="setListBeneficiaries"/>

  <div class="grid" style="margin-top:1rem">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>
    <div class="col-10">
      <div class="container">
        <div
            class="flex justify-content-between align-items-center asset-item"
            v-for="(item) in listBeneficiaries"
            @click="onSelect(item)"
        >
          <span class="ml-4 mt-2 mb-2">{{ item.name }}</span>
          <span class="ml-4 mt-2 mb-2">{{ item.email }}</span>
          <i class="pi pi-angle-right"></i>
        </div>
      </div>
    </div>
  </div>

</template>

<script setup lang="ts">

import {useI18n} from 'vue-i18n'
import {ref} from 'vue'
import Divider from 'primevue/divider'
import {useRouter} from "vue-router"
import {BeneficiaryInternal} from '../types/beneficiary.interface'

import {useToast} from 'primevue/usetoast'
import SearchAccountByEmail from "../../../components/SearchAccountByEmail.vue"

const router = useRouter()
const toast = useToast()
const {t} = useI18n({useScope: 'global'})
const listBeneficiaries = ref<BeneficiaryInternal[]>([])

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])

const setListBeneficiaries = (list: BeneficiaryInternal[]) => {
  listBeneficiaries.value = list
}

const onSelect = (item: BeneficiaryInternal) => {
  const page = 0
  const formData = {
    beneficiary: item
  }
  console.log(formData)
  emit('update:beneficiary', item)
  emit('nextPage', {
    pageIndex: page,
    formData: formData
  })
}

</script>

<style scoped>
.asset-item {
  cursor: pointer;
  padding: 10px;
}

.asset-item:hover {
  color: #00BEB0;
  background: #FBFBFB;
}
</style>