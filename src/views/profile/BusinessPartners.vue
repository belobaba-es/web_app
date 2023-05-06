<template>
  <div class="grid">
    <div v-if="!isAprovedAsBusinessPartner" class="col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" >
      registrate como aliado de negocios
      <InputText type="text" v-model="referredBy" />

      <div class="field col-12">
        <label>Registrate como aliado de negocios</label>
        <div class="p-inputgroup">
          <InputText type="text" v-model="referredBy" />
        </div>

        <Button
          :label="t('save')" class="px-5" :loading="submitting"
          @click="signUpAsBusinesPartner()"
        />
      </div>
    </div>

    <div v-if="isAprovedAsBusinessPartner" v-for="(member, idx) in businsnessPartners" class="col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" :key="idx">
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
import { Member } from './types/account.interface'
import { useI18n } from 'vue-i18n'
import {onMounted, ref} from "vue";
import ModalNewBusinessPartner from './components/ModalNewBusinessPartner.vue'
import InputText from 'primevue/inputtext'
import {BusinessAllie} from "./services/businessAllie";
import {useUserStore} from "../../stores/user";

const businessAllieService = new BusinessAllie()
const submitting = ref(false)
const displayModal = ref(false)
const { t } = useI18n({ useScope: 'global' })
const { members, getFullName } = useAccount()
const router = useRouter()
const userStore = useUserStore()
const isAprovedAsBusinessPartner = ref(false)
const referredBy = ref("")

onMounted(()=> {
  console.log('mount')
  getBusinessAllieStatus()
})
const onCreateNewBusinessPartner = () => {
  displayModal.value = true
}
const showDetails = (member: Member) => {
  router.push(`partners/show/${member.contactId}`)
}

const getBusinessAllieStatus = () => {
  // getBusinessAllieStatus
  console.log('userStore.getUser.accountId', userStore.getUser.accountId)
  businessAllieService.getBusinessAllieStatus().then(res => {
    console.log(res)
    getBusinessOpportunities()
  }).catch(e =>{
    console.log(e)
  })
}

const getBusinessOpportunities = ()=> {
  businessAllieService.getBusinessOpportunities().then(res => {
    console.log('getBusinessOpportunities',res)
  })
}
const signUpAsBusinesPartner = () => {
  console.log('signUpAsBusinesPartner')
}
</script>
<style scoped></style>
