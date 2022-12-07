<template>

  <SearchAccountByEmail style="margin-top: 3rem" />

  <div class="grid" style="margin-top:1rem">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>
    <div class="col-10">
      <div class="container">
        <div
            class="flex justify-content-between align-items-center asset-item"
            v-for="(item) in list"
            @click="onSelect(item)"
        >
          <img :src="getIcon(item.assetId)" alt="">
          <span class="ml-4 mt-2 mb-2">{{ item.label }}</span>
          <div class="flex align-items-center">
            {{ t('withdraw') }}
            <i class="pi pi-angle-right"></i>
          </div>
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

import {useToast} from 'primevue/usetoast'
import SearchAccountByEmail from "./SearchAccountByEmail.vue"
import {BeneficiaryInternal} from "../../types/beneficiary.interface";

const router = useRouter()
const toast = useToast()
const {t} = useI18n({useScope: 'global'})

const props = defineProps<{
  list: Array<any>,
  formData: any,
  toNew: any
}>()

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])

const onSelect = (item: BeneficiaryInternal) => {
  const page = 0
  const formData = {
    beneficiary: item
  }
  emit('nextPage', {
    pageIndex: page,
    formData: formData
  })
}

const getIcon = (assetId: string) => {
  return `https://storage.googleapis.com/noba-dev/${assetId}.svg`
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