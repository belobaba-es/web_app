<template>
  <!--  List  -->
  <div class="input-allie-container align-right col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
<!--    <div class="grid">-->
      <div v-for="(opportunity, idx) in businessOpportunities" class="min-w-150 col-12 sm:col-4 md:col-6 lg:col-6 xl:col-4" :key="idx">
        <div
            class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer"
        >
          <div class="mb-2">
            <img src="../../../assets/icons/icon-user.svg" alt="show-beneficiary" />
          </div>
          <div>
            <p class="text-lg">{{ opportunity.name }}</p>
            <p class="text-lg">{{ opportunity.email }}</p>
            <p class="text-lg">{{ opportunity.feeSwap }} %</p>
            <p class="text-lg">{{ getBusinessOpportunityStatus(opportunity.status) }}</p>
          </div>
        </div>
      </div>
<!--    </div>-->
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {defineProps} from "vue";

const props = defineProps<{
  businessOpportunities: {name: string; email: string; feeSwap:number; status: string}[]
}>()
const { t } = useI18n({ useScope: 'global' })


const getBusinessOpportunityStatus = (status: string) => {
  if (status === "REGISTERED_OPPORTUNITY") return t('registeredOpportunity')
  if (status === "OPPORTUNITY_WITH_REGISTERED_ACCOUNT") return t('opportunityWithRegisteredAccount')
  if (status === "OPPORTUNITY_WITH_ACTIVE_ACCOUNT") return t('opportunityWithActiveAccount')
}
</script>

<style scoped>
.min-w-150{
  min-width: 150px;
}
</style>
