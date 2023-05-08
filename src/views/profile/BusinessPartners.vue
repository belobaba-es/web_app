<template>
  <div v-if="businessAllieStatus === ''" class="grid">
    <div  class="img-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
      <img class="business-allie-image" src="https://online.hbs.edu/Style%20Library/api/resize.aspx?imgpath=/PublishingImages/overhead-view-of-business-strategy-meeting.jpg&w=1200&h=630" alt="business-alli-image" height="50" />
<!--      <img src="/src/assets/icons/save-money.svg" alt="" height="50" />-->
    </div>
    <div class="input-allie-container col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3">
      <h3 class="business-allie">{{ t('beABusinessAllie1') }} <span class="partner">{{ t('beABusinessAllie2') }}</span></h3>
      <label class="required-label">{{ t('requiredInformation')}}</label>
      <div class="p-inputgroup input-allie">
        <InputText type="text" v-model="referredBy" :placeholder="t('referringName')" />
      </div>

      <Button
        :label="t('send')" class="px-5" :loading="submitting"
        @click="signUpAsBusinessPartner()"
      />
    </div>
  </div>

  <!-- Business partners -->
  <div v-if="isAprovedAsBusinessPartner" class="grid">
    listado de oportunidades

    <div class="col-5 sm:col-5 md:col-5 lg:col-3 xl:col-3">
      <div
          class="p-3 border-1 border-cyan-500 border-round-2xl flex-column bg-gray-100 cursor-pointer"
          @click="onCreateNewBusinessPartner"
      >
        <div>
          <p class="text-lg">{{ t('addNewShareHolder') }}</p>
        </div>
      </div>
    </div>

    <div v-if="isAprovedAsBusinessPartner" v-for="(member, idx) in businsnessPartners" class="col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" :key="idx">
      <div
          class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer"
          @click="showDetails(member)"
      >
        <div class="mb-2">
          <img src="../../assets/icons/icon-user.svg" alt="show-beneficiary" />
        </div>
        <div>
          <p class="text-lg">{{ getFullName(member) }}</p>
        </div>
        <div class="flex justify-content-between align-items-center">
          <span class="text-base">{{ member.label }}</span>
          <Button label="Remove" class="p-button-text" icon="pi pi-trash" icon-pos="right" />
        </div>
      </div>
    </div>
  </div>

  <ModalNewBusinessPartner  v-model:display="displayModal"></ModalNewBusinessPartner>
</template>
<script setup lang="ts">
import Button from 'primevue/button'
import { useAccount } from '../../composables/useAccount'
import { useRouter } from 'vue-router'
import { useI18n } from 'vue-i18n'
import {onMounted, ref} from "vue";
import ModalNewBusinessPartner from './components/ModalNewBusinessPartner.vue'
import InputText from 'primevue/inputtext'
import {BusinessAllie} from "./services/businessAllie";
import {useUserStore} from "../../stores/user";
import {useToast} from "primevue/usetoast";

const businessAllieService = new BusinessAllie()
const submitting = ref(false)
const displayModal = ref(false)
const { t } = useI18n({ useScope: 'global' })
const { getFullName } = useAccount()
const router = useRouter()
const userStore = useUserStore()
const isAprovedAsBusinessPartner = ref(false)
const referredBy = ref("")
const businessAllieStatus = ref("")
const toast = useToast()

onMounted(()=> {
  console.log('mount')
  getBusinessAllieStatus()
})
const onCreateNewBusinessPartner = () => {
  displayModal.value = true
}
const showDetails = (member: any) => {
  router.push(`partners/show/${member.contactId}`)
}

const getBusinessAllieStatus = async() => {
  businessAllieService.getBusinessAllieStatus().then(res => {
    if (!res) return
    console.log('--getBusinessAllieStatus', res)
    console.log('--getBusinessAllieStatus', res.status)
    businessAllieStatus.value = res.status ?? ''
    if (res.status === "APPROVED") {
      isAprovedAsBusinessPartner.value = true
      getBusinessOpportunities()
    }
  }).catch(e =>{
    console.log(e)
  })
}

const getBusinessOpportunities = ()=> {
  businessAllieService.getBusinessOpportunities().then(res => {
    console.log('getBusinessOpportunities',res)
  })
}
const signUpAsBusinessPartner = () => {
  submitting.value = true;

  businessAllieService.registerAsBusinessPartner({referredBy: referredBy.value}).then(() => {
    submitting.value = false;
    businessAllieStatus.value = "PENDING_REVISION"
  }).catch(e =>{
    console.log(e)
    submitting.value = false;
    toast.add({
      severity: 'warning',
      summary: 'Something went wrong',
      detail: 'Try again.',
      life: 4000,
    })

  })
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
    height: 300px; /* Set a fixed height for the container */
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
    height: 300px;
    flex-direction: column;
  }

  .input-allie {
    margin: 15px;
  }
</style>
