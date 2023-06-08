<template>
  <div class="grid col-12">
    <div class="col-12 w-100">
      <span v-if="shouldSearchUsers" class="p-input-icon-left flex p-fluid">
        <i class="pi pi-search" />
        <InputText type="text" class="b-gray" v-model="search" :placeholder="t('nobaBeneficiaryEmail')" />
        <Button
          style="border-top-left-radius: 0; border-bottom-left-radius: 0"
          class="p-button w-25"
          :label="t('search')"
          @click="onSearch"
          :loading="submitting"
        />
      </span>
    </div>
  </div>
</template>

<script setup lang="ts">
import InputText from 'primevue/inputtext'
import Button from 'primevue/button'
import { useI18n } from 'vue-i18n'
import { onMounted, ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { AccountService } from '../../../../shared/services/account'
import { useAccount } from '../../../../composables/useAccount'
import { useUserStore } from '../../../../stores/user'

const toast = useToast()
const emit = defineEmits(['listBeneficiaries'])
let accountService: AccountService
const { t } = useI18n({ useScope: 'global' })
const search = ref('')
const submitting = ref(false)
const { fetchAccount, accountId } = useAccount()
const userStore = useUserStore()
const shouldSearchUsers = ref(true)

onMounted(() => {
  accountService = AccountService.instance()
  shouldSearchUsers.value = !shouldBlockNobaUsers()
})

const onSearch = () => {
  let email = search.value
  if (email.trim() === '') {
    toast.add({
      severity: 'warn',
      summary: 'please write an email',
      life: 4000,
    })
    return
  }

  submitting.value = true
  accountService
    .getAccountByEmail(email.toLowerCase())
    .then(resp => {
      emit('listBeneficiaries', [resp])
      submitting.value = false
    })
    .catch(error => {
      submitting.value = false
      toast.add({
        severity: 'error',
        summary: t('somethingWentWrong'),
        detail: error.response.data.message,
        life: 4000,
      })
    })
}

const shouldBlockNobaUsers = () => {
  const accountId = userStore.getUser.account.accountId
  return accountId !== import.meta.env.VITE_PINTTOSOFT_ACCOUNT
}
</script>

<style scoped>
.p-button {
  border-top-left-radius: 0;
  border-bottom-left-radius: 0;
}

.full-width {
  width: 100% !important;
}
</style>
