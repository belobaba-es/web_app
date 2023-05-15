<template>
  <!--  List  -->
  <div class="input-allie-container align-right col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
<!--    <div class="grid">-->
      <div v-for="(opportunity, idx) in businessOpportunities" class="min-w-150 col-12 sm:col-4 md:col-6 lg:col-6 xl:col-4" :key="idx">
        <div
            class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer"
            :class="getClass(opportunity.status)"
            @click="editOpportunity(opportunity)"
        >
          <div class="mb-2">
            <img src="../../../assets/icons/icon-user.svg" alt="show-beneficiary" />
          </div>
          <div>
            <p class="text-lg">{{ opportunity.name }}</p>
            <p class="text-lg">{{ opportunity.email }}</p>
            <p class="text-lg">{{ opportunity.feeSwap }} %</p>
            <p class="text-lg" >{{ opportunity?.status }}</p>
<!--            <p class="text-lg">{{  getBusinessOpportunityStatus(opportunity?.status) ?? 'pending' }}</p>-->
          </div>
        </div>
      </div>
<!--    </div>-->
  </div>

  <ModalEditBusinessOpportunity
    v-model:display="displayEditOpportunity"
    v-model:businessOpportunityEdit="businessOpportunityEdit"
  >
  </ModalEditBusinessOpportunity>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {defineProps, ref} from "vue";
import ModalEditBusinessOpportunity from "./ModalEditBusinessOpportunity.vue";

const props = defineProps<{
  businessOpportunities: {name?: string; email?: string; taxId?: string; feeSwap:number; status?: string}[]
}>()
const { t } = useI18n({ useScope: 'global' })
const displayEditOpportunity = ref(false)
const businessOpportunityEdit = ref()

const getBusinessOpportunityStatus = (status: string) => {
  let opportunityStatus = t('registeredOpportunity')
  if (status === "REGISTERED_OPPORTUNITY") opportunityStatus = t('registeredOpportunity')
  if (status === "OPPORTUNITY_WITH_REGISTERED_ACCOUNT") opportunityStatus = t('opportunityWithRegisteredAccount')
  if (status === "OPPORTUNITY_WITH_ACTIVE_ACCOUNT") opportunityStatus = t('opportunityWithActiveAccount')

  return opportunityStatus
}

 const getClass = (status: any) => {
  let cssClass;
   if (status === "REGISTERED_OPPORTUNITY") cssClass = 'registered-opportunity'
   if (status === "OPPORTUNITY_WITH_REGISTERED_ACCOUNT") cssClass = 'opportunity-with-account'
   if (status === "OPPORTUNITY_WITH_ACTIVE_ACCOUNT") cssClass = "opportunity-active-account"

   return cssClass
 }

 const editOpportunity = (opportunity: any) => {
   displayEditOpportunity.value = true
   businessOpportunityEdit.value = opportunity
 }
</script>

<style scoped>
.min-w-150{
  min-width: 150px;
}

.registered-opportunity {
  border: 1px solid #8d8891!important;
}

.opportunity-with-account
{
  border: 1px solid #ffc400 !important;
}

.opportunity-active-account
{
  border: 1px solid var(--primary-color)!important;

}

.bold {
  font-weight: bold;
}

</style>
