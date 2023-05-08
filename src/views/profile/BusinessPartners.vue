<template>
  <!-- awaiting for approval -->
  <div v-if="businessAllieStatus === 'PENDING_REVISION'" class="grid">
    <div class="input-allie-container col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      {{ t('awaitingForAdminApproval') }}
    </div>
  </div>

  <!-- not yet registerd as business partner -->
  <div v-if="businessAllieStatus === ''" class="grid">
    <div class="img-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
      <img
        class="business-allie-image"
        src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630"
        alt="business-alli-image"
        height="50"
      />
      <!--      <img src="/src/assets/icons/save-money.svg" alt="" height="50" />-->
    </div>
    <div class="input-allie-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
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
        src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630"
        alt="business-alli-image"
        height="50"
      />
      <!--      <img src="/src/assets/icons/save-money.svg" alt="" height="50" />-->
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

    <!--        <div class="col-5 sm:col-5 md:col-5 lg:col-3 xl:col-3">-->
    <!--          <div-->
    <!--              class="p-3 border-1 border-cyan-500 border-round-2xl flex-column bg-gray-100 cursor-pointer"-->
    <!--              @click="onCreateNewBusinessPartner"-->
    <!--          >-->
    <!--            <div>-->
    <!--              <p class="text-lg">{{ t('addNewShareHolder') }}</p>-->
    <!--            </div>-->
    <!--          </div>-->
    <!--        </div>-->

    <!--  List  -->
    <div class="input-allie-container col-12 sm:col-12 md:col-12 lg:col-12 xl:col-12">
      <div class="grid">
        <div v-for="(opportunity, idx) in businsnessOpportunities" class="col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" :key="idx">
          list
          <div
              class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer"
              @click="showDetails(opportunity)"
          >
            <div class="mb-2">
              <img src="../../assets/icons/icon-user.svg" alt="show-beneficiary" />
            </div>
            <div>
              <p class="text-lg">{{ opportunity.name }}</p>
              <p class="text-lg">{{ getBusinessOpportunityStatus(opportunity.status) }}</p>
            </div>
            <div class="flex justify-content-between align-items-center">
              <!-- <Button label="Remove" class="p-button-text" icon="pi pi-trash" icon-pos="right" />-->
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>

  <ModalNewBusinessPartner v-model:display="displayModal"></ModalNewBusinessPartner>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useAccount } from '../../composables/useAccount'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import ModalNewBusinessPartner from './components/ModalNewBusinessPartner.vue'
import InputText from 'primevue/inputtext'
import { BusinessAllie } from './services/businessAllie'
import { useUserStore } from '../../stores/user'
import { useToast } from 'primevue/usetoast'

const businessAllieService = new BusinessAllie()
const submitting = ref(false)
const displayModal = ref(false)
const { t } = useI18n({ useScope: 'global' })
const { getFullName } = useAccount()
const router = useRouter()
const userStore = useUserStore()
const isAprovedAsBusinessPartner = ref(false)
const businessAllieStatus = ref('initialState')
const toast = useToast()
const referredBy = ref('')
const businessOpportunityPayload = ref<{ name: string; email: string; taxId: string }>({})
const businsnessOpportunities = ref([])

onMounted(() => {
  console.log('mount')
  getBusinessAllieStatus()
})
const onCreateNewBusinessPartner = () => {
  displayModal.value = true
}
const showDetails = (member: any) => {
  router.push(`partners/show/${member.contactId}`)
}

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
        getBusinessOpportunities()
      }
    })
    .catch(e => {
      console.log(e)
    })
}

const getBusinessOpportunities = () => {
  businessAllieService.getBusinessOpportunities().then(res => {
    console.log('getBusinessOpportunities', res)
    businsnessOpportunities.value = res
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
  console.log('isValidBusinessOpportunityPayload', isValidBusinessOpportunityPayload)
  if (!isValidBusinessOpportunityPayload()) {
    submitting.value = false
    return
  }
  console.log('businessOpportunityPayload', businessOpportunityPayload.value)
  businessAllieService
    .saveBusinessOpportunity(businessOpportunityPayload.value)
    .then(res => {
      console.log('-- saveBusinessOpportunity-- ', res)
      console.log('res', res.businessOpportunities)
      showSucessMessage('Business opportunity saved')
      submitting.value = false
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

const getBusinessOpportunityStatus = (status: string) => {
  if (status === "REGISTERED_OPPORTUNITY") return t('registeredOpportunity')
  if (status === "OPPORTUNITY_WITH_REGISTERED_ACCOUNT") return t('opportunityWithRegisteredAccount')
  if (status === "OPPORTUNITY_WITH_ACTIVE_ACCOUNT") return t('opportunityWithActiveAccount')

}
</script>
<style scoped>
.business-allie-image {
  width: 100%;
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
</style>
