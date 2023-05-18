<template>
  <!-- awaiting for approval -->
  <ProgressSpinner
      v-if="isLoadingData"
      style="width: 50px; height: 50px"
      strokeWidth="8"
      fill="var(--surface-ground)"
      animationDuration=".5s"
      aria-label="Custom ProgressSpinner"
  />

  <div v-if="businessAllieStatus === 'PENDING_REVISION'" class="container-center pb-5">
    <div class="grid mt-6 pt-6 w-75 sm:w-100" style="#f9f9f9">
      <div class="lg:col-6 sm:col-12">
        <div class="flex justify-content-center align-content-center w-100">
          <img class="business-allie-image" alt="business-alli-image" :src="AwaitingApprovalImg" />
        </div>
      </div>

      <div class="xs-allie-container xs:col-12 lg:col-6 sm:col-12">
        <div class="input-allie-container col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 awaiting-approval">
          <h2>
            {{ t('awaitingForAdminApproval') }}
          </h2>
        </div>
      </div>
    </div>
  </div>

  <!-- register as business allie -->
  <div class="container-center pb-5" v-if="businessAllieStatus === ''">
    <div class="grid mt-6 pt-6 w-75 sm:w-100">
      <div class="lg:col-6 sm:col-12">
        <div class="flex justify-content-center align-content-center w-100">
          <img class="business-allie-image" alt="business-alli-image" :src="BusinessPartnersImg" />
        </div>
      </div>

      <div class="xs-allie-container xs:col-12 lg:col-6 sm:col-12">
        <div class="w-100">
          <h1 class="text-center">
            {{ t('beABusinessAllie1') }} <span class="partner">{{ t('beABusinessAllie2') }}</span>
          </h1>

          <div class="field">
            <label class="required-label">{{ t('requiredInformation') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="referredBy" :placeholder="t('referringName')" />
            </div>
          </div>

          <div class="mt-6 d-flex text-center justify-content-end">
            <Button :label="t('send')" class="px-5" :loading="submitting" @click="signUpAsBusinessPartner()" />
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Business Opportunities -->
  <div v-if="businessAllieStatus === 'APPROVED'" class="grid gray-container">
    <div class="padd-4 align-right col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 text-center">
      <h1 class="partner">{{ t('listOf') }}  <span class="partner">{{ t('businessPartners') }}</span></h1>
    </div>

    <div class="padd-4 align-right col-4 sm:col-4 md:col-3 lg:col-3 xl:col-3 add-opportunity-container">
      <div
        @click="displayNewOpportunity = !displayNewOpportunity"
        class="add-opportunity-button"
      >
        <div class="add-opportunity-button-icon">
          <img src="../../../assets/icons/user-add.svg" alt="add-beneficiary"/>
        </div>

        <div class="add-opportunity-button-text">
          <p>
            {{ t('addNewOpportunity') }}
          </p>
        </div>

      </div>
    </div>

    <!--  List  -->
    <div class="input-allie-container align-right col-8 sm:col-8 md:col-9 lg:col-9 xl:col-9">
      <ListBusinessPartners :businessOpportunities="businessOpportunities"></ListBusinessPartners>
    </div>
  </div>

  <ModalNewBusinessOpportunity
    v-model:display="displayNewOpportunity"
    @create="onCreateAddress"
  >

  </ModalNewBusinessOpportunity>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useAccount } from '../../../composables/useAccount'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import InputText from 'primevue/inputtext'
import { BusinessAllie } from '../services/businessAllie'
import { useUserStore } from '../../../stores/user'
import { useToast } from 'primevue/usetoast'
import ProgressSpinner from 'primevue/progressspinner'
import ListBusinessPartners from '../components/ListBusinessPartners.vue'
import BusinessPartnersImg from '../../../assets/img/business_opportunities.png'
import AwaitingApprovalImg from '../../../assets/img/awaiting_approval.png'
import ModalNewBusinessOpportunity  from '../components/ModalNewBusinessOpportunity.vue'

const businessAllieService = new BusinessAllie()
const submitting = ref(false)
const { t } = useI18n({ useScope: 'global' })
const { getFullName } = useAccount()
const router = useRouter()
const userStore = useUserStore()
const isAprovedAsBusinessPartner = ref(false)
const businessAllieStatus = ref('initialState')
const toast = useToast()
const referredBy = ref('')
const businessOpportunityPayload = ref<{ name: string; email: string; taxId: string }>({
  name: '',
  email: '',
  taxId: '',
})
const businessOpportunities = ref<{ name: string; email: string; taxId: string;  feeSwap: number; status: string; }[]>([])
const referralLink = ref('')
const isLoadingData = ref(false)
const displayNewOpportunity = ref(false)

onMounted(() => {
  getBusinessAllieStatus()
  generateReferralLink(userStore.getUser.account.accountId)
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
          isAprovedAsBusinessPartner.value = true
          businessOpportunities.value = res.businessOpportunities ?? []
        }
      })
      .catch(e => {
        isLoadingData.value = false
      })
}

const signUpAsBusinessPartner = () => {
  submitting.value = true

  businessAllieService
      .registerAsBusinessPartner({ referredBy: referredBy.value })
      .then(() => {
        submitting.value = false
        businessAllieStatus.value = 'PENDING_REVISION'
        showSucessMessage('You have registered successfully, now wait fo an admin to approve you')
      })
      .catch(e => {
        submitting.value = false
        toast.add({
          severity: 'warning',
          summary: 'Something went wrong',
          detail: 'Try again.',
          life: 4000,
        })
      })
}

const saveBusinessOpportunity = () => {
  submitting.value = true
  if (!isValidBusinessOpportunityPayload()) {
    submitting.value = false
    return
  }
  businessAllieService
      .saveBusinessOpportunity(businessOpportunityPayload.value)
      .then(res => {
        showSucessMessage('Business opportunity saved')
        businessOpportunities.value = res.businessOpportunities ?? []
        submitting.value = false
        cleanPartnerForm()
      })
      .catch(e => {
        submitting.value = false
        toast.add({
          severity: 'error',
          summary: 'Something went wrong',
          detail: e.response.data.message,
          life: 4000,
        })
      })
}

const isValidBusinessOpportunityPayload = (): boolean => {
  const { name, email, taxId } = businessOpportunityPayload.value
  if (!name || !email || !taxId || name.length < 1 || email.length < 1 || taxId.length < 1) {
    toast.add({
      severity: 'error',
      summary: 'Something went wrong',
      detail: 'All fields are required.',
      life: 4000,
    })

    return false
  }

  return true
}

const showSucessMessage = (msg: string) => {
  toast.add({
    severity: 'success',
    summary: 'Success',
    detail: msg,
    life: 4000,
  })
}

const cleanPartnerForm = () => {
  businessOpportunityPayload.value.name = ''
  businessOpportunityPayload.value.email = ''
  businessOpportunityPayload.value.taxId = ''
}

const generateReferralLink = (accountId: string) => {
  referralLink.value = `${import.meta.env.VITE_NOBA_SIGNIN}${btoa(accountId)}`
}

const onCreateAddress = (event: any) => {
  console.log('-- event', event)
  businessOpportunities.value = event
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
  border-radius: 1rem; height: 150px;
  display: flex;
  flex-direction: column
}

.add-opportunity-button-icon {

  display: flex;
  justify-content: flex-start;
  padding: 15px;
}
.add-opportunity-button-icon img {
  height: 50px
}

.add-opportunity-button-text {
  font-weight: 900;
  height: 100px;
  padding: 12px;
  text-align: center
}

.add-opportunity-button-text p {
  font-weight: 900
}

.business-allie-image {
  max-width: 100%;
  height: 55%;
  vertical-align: middle;
}

.img-container {
  display: flex;
  align-items: center;
  justify-content: center; /* Optional: horizontally center the image */
  max-height: 300px; /* Set a fixed height for the container */
}

span.partner {
  color: turquoise;
}

.required-label {
  font-size: 1rem;
}

.input-allie-container {
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
}

.input-allie input {
  width: 100%;
}

.awaiting-approval {
  display: flex;
  align-items: center;
  height: 200px;
  border: 1px solid var(--primary-color);
}

.p-progress-spinner {
  position: fixed;
  margin-left: 33%;
  z-index: 999;
  margin-top: 10%;
}

.align-right {
  align-items: start;
}

@media only screen and (max-width: 600px) {
  .xs-allie-container {
    padding: 10px;
    width: 100%;
  }
  .d-flex {
    display: flex;
  }
}
</style>
