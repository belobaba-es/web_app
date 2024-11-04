<template>
  <div class="mb-4 mt-5">
    <h1 class="text-2xl font-bold">{{ t('changePassword') }}</h1>
  </div>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="border-1 border-green-200 p-4" style="border-radius: 10px">
        <div class="field">
          <label>{{ t('labelCurrentPassword') }}</label>
          <div class="p-inputgroup">
            <InputText :type="inputPasswordType" v-model="currentPassword" />
            <span class="p-inputgroup-addon cursor-pointer" @click="toggleShowPassword">
              <i :class="eyeIconState"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label>{{ t('labelNewPassword') }}</label>
          <div class="p-inputgroup">
            <InputText :type="inputPasswordType" v-model="newPassword" />
            <span class="p-inputgroup-addon cursor-pointer" @click="toggleShowPassword">
              <i :class="eyeIconState"></i>
            </span>
          </div>
        </div>
        <div class="field">
          <label>{{ t('labelConfirmNewPassword') }}</label>
          <div class="p-inputgroup">
            <InputText :type="inputPasswordType" v-model="confirmNewPassword" />
            <span class="p-inputgroup-addon cursor-pointer" @click="toggleShowPassword">
              <i :class="eyeIconState"></i>
            </span>
          </div>
        </div>
        <div class="field flex justify-content-end">
          <Button :label="t('save')" class="px-5" @click="submitUpdatePassword" :loading="submitting" />
        </div>
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { computed, ref } from 'vue'
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ProfileService } from '../services/profile'
import { useAuth } from '../../../composables/useAuth'
import { useToast } from 'primevue/usetoast'
import { processException } from '../../../shared/processException'

const { t } = useI18n({
  useScope: 'global',
})

const toast = useToast()
const { getUserName, getUserEmail } = useAuth()

const currentPassword = ref<string>('')
const newPassword = ref<string>('')
const confirmNewPassword = ref<string>('')
const submitting = ref<boolean>(false)
const showPassword = ref<boolean>(false)

const submitUpdatePassword = async () => {
  submitting.value = true
  new ProfileService()
    .updatePassword(getUserEmail(), newPassword.value, currentPassword.value)
    .then(() => {
      submitting.value = false
      clearUpdatePasswordForm()
      toast.add({
        severity: 'info',
        summary: t('successfulOperation'),
        detail: t('updatePasswordSuccessMessage'),
        life: 6000,
      })
    })
    .catch(error => {
      submitting.value = false
      processException(toast, t, error)
    })
}

const clearUpdatePasswordForm = () => {
  newPassword.value = ''
  confirmNewPassword.value = ''
  currentPassword.value = ''
}

const toggleShowPassword = () => {
  showPassword.value = !showPassword.value
}

const eyeIconState = computed(() => (showPassword.value ? 'pi pi-eye-slash' : 'pi pi-eye'))
const inputPasswordType = computed(() => (showPassword.value ? 'text' : 'password'))
</script>
