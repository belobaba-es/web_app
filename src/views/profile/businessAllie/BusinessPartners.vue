<template>
  <ProgressSpinner
    v-if="isLoadingData"
    style="width: 50px; height: 50px"
    strokeWidth="8"
    fill="var(--surface-ground)"
    animationDuration=".5s"
    aria-label="Custom ProgressSpinner"
  />

  <!-- register as business allie -->
  <RegisterAsBusinessAllie v-if="businessAllieStatus === ''" @create="onUpdateAllieStatus" />

  <!-- awaiting for approval -->
  <AwaitingApproval v-if="businessAllieStatus === 'PENDING_REVISION'" />

  <!--List of Business Opportunities -->
  <div v-if="businessAllieStatus === 'APPROVED'" class="grid gray-container">
    <div class="padd-4 align-right col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 text-center">
      <h1 class="partner">
        {{ t('listOf') }} <span class="text-primary">{{ t('businessPartners') }}</span>
      </h1>
    </div>

    <div class="flex justify-content-center pt-10 align-right col-4 sm:col-4 md:col-3 lg:col-3 xl:col-3">
      <div @click="displayNewOpportunity = !displayNewOpportunity" class="add-opportunity-button">
        <div class="flex justify-content-start p-3">
          <img :src="UserAddIcon" alt="add-beneficiary" />
        </div>

        <div class="add-opportunity-button-footer font-semibold text-center p-2">
          <p class="font-semibold">
            {{ t('addNewOpportunity') }}
          </p>
        </div>
      </div>
    </div>

    <!--  List  -->
    <div class="align-right col-8 sm:col-8 md:col-9 lg:col-9 xl:col-9">
      <ListBusinessPartners :businessOpportunities="businessOpportunities" />
    </div>
  </div>

  <ModalNewBusinessOpportunity v-model:display="displayNewOpportunity" @create="onCreateOpportunity" />
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { BusinessAllieService } from '../services/businessAllieService'
import { useToast } from 'primevue/usetoast'
import ProgressSpinner from 'primevue/progressspinner'
import ListBusinessPartners from './components/ListBusinessPartners.vue'
import ModalNewBusinessOpportunity from './components/ModalNewBusinessOpportunity.vue'
import UserAddIcon from '../../../assets/icons/user-add.svg'
import RegisterAsBusinessAllie from './components/RegisterAsBusinessAllie.vue'
import AwaitingApproval from '../components/AwaitingApproval.vue'
import { BusinessOpportunity } from '../types/businessOpportunity'

const businessAllieService = new BusinessAllieService()
const submitting = ref(false)
const { t } = useI18n({ useScope: 'global' })
const router = useRouter()
const isApprovedAsBusinessPartner = ref(false)
const businessAllieStatus = ref('initialState')
const toast = useToast()
const businessOpportunities = ref<BusinessOpportunity[]>([])
const isLoadingData = ref(false)
const displayNewOpportunity = ref(false)

onMounted(() => {
  getBusinessAllieStatus()
})

const getBusinessAllieStatus = async () => {
  isLoadingData.value = true
  businessAllieService
    .getBusinessAllieStatus()
    .then(res => {
      isLoadingData.value = false
      if (!res) {
        businessAllieStatus.value = ''
        return
      }

      businessAllieStatus.value = res.status ?? ''
      if (res.status === 'APPROVED') {
        isApprovedAsBusinessPartner.value = true
        businessOpportunities.value = res.businessOpportunities ?? []
      }
    })
    .catch(() => {
      isLoadingData.value = false
    })
}

const onUpdateAllieStatus = (event: any) => {
  businessAllieStatus.value = 'PENDING_REVISION'
}

const onCreateOpportunity = (event: any) => {
  businessOpportunities.value = event
  displayNewOpportunity.value = false
}
</script>

<style scoped>
.gray-container {
  margin: 4px;
  padding: 10px;
  border-radius: 8px;
  background-color: #ededed;
}
.add-opportunity-button {
  border: 1px solid var(--primary-color);
  background-color: var(--surface-overlay);
  width: 126px;
  cursor: pointer;
  border-radius: 1rem;
  height: 150px;
  display: flex;
  flex-direction: column;
}
.add-opportunity-button-footer {
  height: 100px;
}
.p-progress-spinner {
  position: fixed;
  margin-left: 33%;
  z-index: 999;
  margin-top: 10%;
}
</style>
