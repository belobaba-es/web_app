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
  <RegisterAsBusinessAllie v-if="businessAllieStatus === ''" @create="onUpdateAllieStatus"></RegisterAsBusinessAllie>

  <!-- awaiting for approval -->
  <AwaitingApproval v-if="businessAllieStatus === 'PENDING_REVISION'"> </AwaitingApproval>

  <!-- Business Opportunities -->
  <div v-if="businessAllieStatus === 'APPROVED'" class="grid gray-container">
    <div class="padd-4 align-right col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 text-center">
      <h1 class="partner">
        {{ t('listOf') }} <span class="span-partner">{{ t('businessPartners') }}</span>
      </h1>
    </div>

    <div class="padd-4 align-right col-4 sm:col-4 md:col-3 lg:col-3 xl:col-3 add-opportunity-container">
      <div @click="displayNewOpportunity = !displayNewOpportunity" class="add-opportunity-button">
        <div class="add-opportunity-button-icon">
          <img :src="UserAddIcon" alt="add-beneficiary" />
        </div>

        <div class="add-opportunity-button-text">
          <p>
            {{ t('addNewOpportunity') }}
          </p>
        </div>
      </div>
    </div>

    <!--  List  -->
    <div class="align-right col-8 sm:col-8 md:col-9 lg:col-9 xl:col-9">
      <ListBusinessPartners :businessOpportunities="businessOpportunities"></ListBusinessPartners>
    </div>
  </div>

  <ModalNewBusinessOpportunity v-model:display="displayNewOpportunity" @create="onCreateOpportunity">
  </ModalNewBusinessOpportunity>
</template>
<script setup lang="ts">
import { useAccount } from '../../../composables/useAccount'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { BusinessAllie } from '../services/businessAllie'
import { useUserStore } from '../../../stores/user'
import { useToast } from 'primevue/usetoast'
import ProgressSpinner from 'primevue/progressspinner'
import ListBusinessPartners from '../components/ListBusinessPartners.vue'
import ModalNewBusinessOpportunity from '../components/ModalNewBusinessOpportunity.vue'
import UserAddIcon from '../../../assets/icons/user-add.svg'
import RegisterAsBusinessAllie from '../components/RegisterAsBusinessAllie.vue'
import AwaitingApproval from '../components/AwaitingApproval.vue'
import { BusinessOpportunity } from '../types/businessOpportunity'

const businessAllieService = new BusinessAllie()
const submitting = ref(false)
const { t } = useI18n({ useScope: 'global' })
const { getFullName } = useAccount()
const router = useRouter()
const userStore = useUserStore()
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
    .catch(e => {
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

.add-opportunity-container {
  display: flex;
  justify-content: center;
  padding-top: 20px;
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

.add-opportunity-button-icon {
  display: flex;
  justify-content: flex-start;
  padding: 15px;
}

.add-opportunity-button-text {
  font-weight: 900;
  height: 100px;
  padding: 12px;
  text-align: center;
}

.add-opportunity-button-text p {
  font-weight: 900;
}

.p-progress-spinner {
  position: fixed;
  margin-left: 33%;
  z-index: 999;
  margin-top: 10%;
}
</style>
