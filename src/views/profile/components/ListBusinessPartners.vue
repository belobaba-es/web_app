<template>
  <div class="align-right col-9 sm:col- md:col-9 lg:col-9 xl:col-9">
    <div class="grid">
      <div
        v-for="(opportunity, idx) in businessOpportunities"
        class="min-w-150 col-6 sm:col-6 md:col-6 lg:col-6 xl:col-4"
        :key="idx"
      >
        <div
          class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer bg-white"
          :class="getStatusClass(opportunity.status)"
        >
          <div class="flex justify-content-between">
            <img :src="UserIconImg" alt="show-beneficiary" />
            <div class="text-primary" @click="editOpportunity(opportunity)">
              <span class="pi pi-file-edit"></span>
              {{ t('edit') }}
            </div>
          </div>
          <div class="opportunity-footer">
            <p>{{ opportunity.name }}</p>
            <p>{{ opportunity.feeSwap }} %</p>
            <small>{{ getBusinessOpportunityStatus(opportunity?.status) }}</small>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalEditBusinessOpportunity
    v-model:display="displayEditOpportunity"
    v-model:businessOpportunityEdit="businessOpportunityEdit"
    @update="onUpdateOpportunity"
  >
  </ModalEditBusinessOpportunity>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { defineProps, ref } from 'vue'
import ModalEditBusinessOpportunity from './ModalEditBusinessOpportunity.vue'
import UserIconImg from '../../../assets/icons/icon-user.svg'
import { BusinessOpportunity } from '../types/businessOpportunity'

const props = defineProps<{
  businessOpportunities: BusinessOpportunity[]
}>()
const { t } = useI18n({ useScope: 'global' })
const displayEditOpportunity = ref(false)
const businessOpportunityEdit = ref()

const getBusinessOpportunityStatus = (status: string) => {
  let opportunityStatus = t('registeredOpportunity')
  if (status === 'REGISTERED_OPPORTUNITY') opportunityStatus = t('registeredOpportunity')
  if (status === 'OPPORTUNITY_WITH_REGISTERED_ACCOUNT') opportunityStatus = t('opportunityWithRegisteredAccount')
  if (status === 'OPPORTUNITY_WITH_ACTIVE_ACCOUNT') opportunityStatus = t('opportunityWithActiveAccount')

  return opportunityStatus
}

const getStatusClass = (status: any) => {
  let cssClass
  if (status === 'REGISTERED_OPPORTUNITY') cssClass = 'registered-opportunity'
  if (status === 'OPPORTUNITY_WITH_REGISTERED_ACCOUNT') cssClass = 'opportunity-with-account'
  if (status === 'OPPORTUNITY_WITH_ACTIVE_ACCOUNT') cssClass = 'opportunity-active-account'

  return cssClass
}

const editOpportunity = (opportunity: any) => {
  displayEditOpportunity.value = true
  businessOpportunityEdit.value = opportunity
}

const onUpdateOpportunity = (event: any) => {
  for (let i = 0; i < props.businessOpportunities.length; i++) {
    if (props.businessOpportunities[i].taxId === event.taxId) {
      props.businessOpportunities[i] = { ...props.businessOpportunities[i], ...event }
    }
  }
  displayEditOpportunity.value = false
}
</script>

<style scoped>
.min-w-150 {
  min-width: 150px;
}
.opportunity-footer {
  margin-top: 10px;
  height: 50px;
  padding-top: 10px;
}
.opportunity-footer p {
  margin-top: -5px;
  margin-bottom: 0;
  font-size: 0.9rem;
}
.opportunity-footer small {
  margin-bottom: 0;
  font-size: 0.7rem;
}
/* se usan mediante la funcion getClass */
.registered-opportunity {
  border: 1px solid #8d8891 !important;
}
.opportunity-with-account {
  border: 1px solid #ffc400 !important;
}
.opportunity-active-account {
  border: 1px solid var(--primary-color) !important;
}
</style>
