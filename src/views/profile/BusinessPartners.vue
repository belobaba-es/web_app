<template>
  <!-- awaiting for approval -->
  <div v-if="businessAllieStatus === 'PENDING_REVISION'" class="grid">
    <div class="input-allie-container col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12 awaiting-approval">
      {{ t('awaitingForAdminApproval') }}
    </div>
  </div>

  <!-- register as business partner -->
  <div v-if="businessAllieStatus === ''" class="grid j-c-c">
    <div class="img-container 6 sm:col-6 md:col-6 lg:col-6 xl:col-6">
      <img
        class="business-allie-image"
        alt="business-alli-image"
        height="50"
        src="/src/assets/img/be_business_partner.png"
      />
    </div>

    <div class="input-allie-container col-6 sm:col-6 md:col-6 lg:col-6 xl:col-6 padd-4 ">
      <h3 class="business-allie">
        {{ t('beABusinessAllie1') }} <span class="partner">{{ t('beABusinessAllie2') }}</span>
      </h3>
      <label class="required-label">{{ t('requiredInformation') }}</label>
      <div class="p-inputgroup input-allie">
        <InputText type="text" v-model="referredBy" :placeholder="t('referringName')" />
      </div>

      <Button :label="t('send')" class="px-5" :loading="submitting" @click="signUpAsBusinessPartner()" />
    </div>
  </div>

  <!-- Business partners -->
  <div v-if="businessAllieStatus === 'APPROVED'" class="grid">
    <div class="img-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
      <img
          class="business-allie-image"
          src="/src/assets/img/business_opportunities.png"
          alt="business-alli-image"
          height="50"
      />
    </div>

    <div class="input-allie-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
      <h3 class="business-allie">
        {{ t('beABusinessAllie1') }} <span class="partner">{{ t('beABusinessAllie2') }}</span>
      </h3>
      <label class="required-label">{{ t('requiredInformation') }}</label>
      <div class="p-inputgroup input-allie">
        <label>{{ t('fullName') }}</label>
        <InputText type="text" v-model="businessOpportunityPayload.name" :placeholder="t('fullName')" />
      </div>

      <div class="p-inputgroup input-allie">
        <label>{{ t('emailLabel') }}</label>
        <InputText type="text" v-model="businessOpportunityPayload.email" :placeholder="t('emailLabel')" />
      </div>

      <div class="p-inputgroup input-allie">
        <label>{{ t('id') }}</label>
        <InputText type="text" v-model="businessOpportunityPayload.taxId" :placeholder="t('id')" />
      </div>

      <Button :label="t('send')" class="px-5" :loading="submitting" @click="saveBusinessOpportunity()" />
    </div>

    <!-- Referral link -->
    <div class="padd-4 input-allie-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
      <label class="required-label">{{ t('affiliateLink') }}</label>
      <div class="p-inputgroup">
        <InputText readonly="true" :placeholder="t('walletAddress')" :value="referralLink" />
        <span
            @click="copyToClipboardReferralLink()"
            class="p-inputgroup-addon btn-copy-to-clipboard"
        >
            <i class="pi pi-copy"></i>
          </span>
      </div>
    </div>

    <!--  List  -->
    <ListBusinessPartners :businessOpportunities="businessOpportunities"></ListBusinessPartners>
  </div>

</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useAccount } from '../../composables/useAccount'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import InputText from 'primevue/inputtext'
import { BusinessAllie } from './services/businessAllie'
import { useUserStore } from '../../stores/user'
import { useToast } from 'primevue/usetoast'
import ListBusinessPartners from "./components/ListBusinessPartners.vue";

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
const businessOpportunityPayload = ref<{ name: string; email: string; taxId: string }>({})
const businessOpportunities = ref([])
const referralLink = ref("")

onMounted(() => {
  getBusinessAllieStatus()
  generateReferralLink(userStore.getUser.account.accountId)
})

const getBusinessAllieStatus = async () => {
  businessAllieService
    .getBusinessAllieStatus()
    .then(res => {
      if (!res) {
        businessAllieStatus.value = ''
        return
      }

      businessAllieStatus.value = res.status ?? ''
      if (res.status === 'APPROVED') {
        isAprovedAsBusinessPartner.value = true
        console.log('res',res.businessOpportunities)
        businessOpportunities.value = res.businessOpportunities
      }
    })
    .catch(e => {
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
      console.log(e)
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
      businessOpportunities.value = res.businessOpportunities
      submitting.value = false
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
      severity: 'warning',
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

const generateReferralLink = (accountId: string) => {
  referralLink.value = `${import.meta.env.VITE_NOBA_SIGNIN}register/${btoa(accountId)}`
}
const copyToClipboardReferralLink = () =>{
  if (referralLink.value) {
    navigator.clipboard.writeText(referralLink.value)
    toast.add({
      severity: 'success',
      summary: t('successfulOperation'),
      detail: t('textCopySuccessful'),
      life: 3000,
    })
  }
}
</script>

<style scoped>
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

h3.business-allie {
  font-size: 21px;
  margin-bottom: 1px;
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

.input-allie {
  margin: 10px;
  display: flex;
  flex-direction: column;
}

.input-allie input {
  width: 100%;
}

.padd-4 {
  padding: 4%
}

.j-c-c {
 justify-content: center;
}

.awaiting-approval {
  display: flex;
  align-items: center;
  height: 200px;
  border: 1px solid var(--primary-color);
}
</style>
