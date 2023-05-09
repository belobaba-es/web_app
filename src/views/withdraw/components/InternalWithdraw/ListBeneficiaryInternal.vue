<template>
  <div class="col-12">
    <div class="container">
      <div class="grid w-100% asset-item" v-for="item in listBeneficiariesInternal" @click="onSelect(item)">
        <div class="mt-2 col-4 sm:col-4" style="width: 40%">{{ item.name }}</div>
        <div class="mt-2 col-4" style="width: 50%; overflow: hidden; text-overflow: ellipsis; white-space: nowrap">
          {{ item.email }}
        </div>
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
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import { useRoute } from 'vue-router'
import { TypeBeneficiaryInternal, useBeneficiary } from '../../composables/useBeneficiary'
import { onMounted, ref } from 'vue'
import { BeneficiaryInternal } from '../../types/beneficiary.interface'
import { useI18n } from 'vue-i18n'

interface Props {
  listBeneficiaries: BeneficiaryInternal[]
}

const { t } = useI18n({ useScope: 'global' })

const type = ref(TypeBeneficiaryInternal.FIAT)

const props = defineProps<Props>()

const route = useRoute()

const emit = defineEmits(['selectedBeneficiary'])

const listBeneficiariesInternal = ref<BeneficiaryInternal[]>(props.listBeneficiaries)

const { fetchBeneficiariesInternal, submitting, nextPag } = useBeneficiary()

onMounted(async () => {
  if (route.params.type === 'crypto') {
    type.value = TypeBeneficiaryInternal.ASSET
  }

  await loadMore()
})

const onSelect = (item: BeneficiaryInternal) => {
  console.log('ITEM', item)
  emit('selectedBeneficiary', { ...item, accountId: item.accountTo })
}

const loadMore = async () => {
  listBeneficiariesInternal.value = await fetchBeneficiariesInternal(type.value)
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
