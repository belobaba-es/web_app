<template>
  <div class="grid">
    <div class="col-8 sm:col-8 md:col-8 lg:col-5 xl:col-5 mt-4 mb-4">
      <Button class="p-button w-full" :label="t('newBeneficiary')" @click="toNew" />
    </div>
  </div>

  <div class="grid col-12">
    <div class="col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <span class="p-input-icon-left flex p-fluid">
        <i class="pi pi-search" />
        <InputText type="text" class="b-gray" v-model="search" :placeholder="t('nobaBeneficiaryEmail')" />
        <Button
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          class="p-button search-btn w-25"
          :label="t('search')"
          :loading="submitting"
        />
      </span>
    </div>
  </div>

  <div class="grid">
    <span class="mt-4">{{ t('youBeneficiaries') }}</span>
    <Divider></Divider>
    <div class="col-10">
      <ListBeneficiaryPanama @select="onSelect($event)" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import Button from 'primevue/button'
import Divider from 'primevue/divider'
import InputText from 'primevue/inputtext'
import { useRoute, useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import { Beneficiary, CounterpartyStatus } from '../types/beneficiary.interface'
import ListBeneficiaryPanama from './beneficiary/components/ListBeneficiaryPanama.vue'

const submitting = ref(false)

const router = useRouter()
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })
const props = defineProps<{
  formData: any
  toNew: any
}>()

const emit = defineEmits(['nextPage', 'prevPage', 'selectBeneficiary', 'update:beneficiary'])
const search = ref('')
const route = useRoute()

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

  if (item.status === CounterpartyStatus.ACTIVE) {
    const page = 0
    const formData = {
      beneficiary: item,
    }
    emit('update:beneficiary', item)
    emit('nextPage', {
      pageIndex: page,
      formData: formData,
    })
  }
}

onMounted(async () => {
  props.formData.typeTransaction = route.params.type
})
</script>

<style scoped>
.full-width {
  width: 100% !important;
}
</style>
