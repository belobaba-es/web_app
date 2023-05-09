<template>
  <!--  List  -->
  <div class="input-allie-container col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
    <div class="grid">
      <div v-for="(opportunity, idx) in businessOpportunities" class="min-w-150 col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" :key="idx">
        <div
            class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer"
        >
          <div class="mb-2">
            <img src="../../../assets/icons/icon-user.svg" alt="show-beneficiary" />
          </div>
          <div>
            <p class="text-lg">{{ opportunity.name }}</p>
            <p class="text-lg">{{ getBusinessOpportunityStatus(opportunity.status) }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import {useI18n} from "vue-i18n";
import {defineProps} from "vue";

const props = defineProps<{
  businessOpportunities: []
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
