<template>
  <div class="grid">
    <div v-for="(member, idx) in members" class="col-6 sm:col-6 md:col-6 lg:col-4 xl:col-3" :key="idx">
      <div
        class="p-3 border-1 border-gray-300 border-round-2xl flex-column cursor-pointer"
        @click="showDetails(member)"
      >
        <div class="mb-2">
          <img src="../../assets/icons/icon-user.svg" />
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
    <div class="col-5 sm:col-5 md:col-5 lg:col-3 xl:col-3">
      <div
        class="p-3 border-1 border-cyan-500 border-round-2xl flex-column bg-gray-100 cursor-pointer"
        @click="onCreateNewShareholder"
      >
        <div>
          <img src="../../assets/icons/user-add.svg" />
        </div>
        <div>
          <p class="text-lg">{{ t('addNewShareHolder') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'
import { useAccount } from '../../composables/useAccount'
import { useRouter } from 'vue-router'
import { Member } from './types/account.interface'
import { useI18n } from 'vue-i18n'

const { t } = useI18n({ useScope: 'global' })
const { members, getFullName } = useAccount()
const router = useRouter()

const onCreateNewShareholder = () => {
  router.push('partners/create')
}

const showDetails = (member: Member) => {
  router.push(`partners/show/${member.contactId}`)
}
</script>

<style scoped></style>
