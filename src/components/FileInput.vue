<template>
  <FileUpload v-if="doc" :label="doc?.name" @click="editEnable" />

  <div
    v-if="!doc"
    class="flex justify-content-between align-items-center p-3 border-round bg-primary cursor-pointer"
    @click="handleClick"
  >
    <span>
      {{ t('filePlaceholder') }}
    </span>
    <span>
      <i :class="icon" class="pi"></i>
      <input :id="getIdInput()" hidden type="file" @change="handleUpload($event)" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { computed, defineProps, ref } from 'vue'
import { ProfileService } from '../views/profile/services/profile'
import { useToast } from 'primevue/usetoast'
import FileUpload from '../views/profile/components/FileUploaded.vue'
import { useAuth } from '../composables/useAuth'
import { processException } from '../shared/processException'

const toast = useToast()
const { markDataSubmitted, getClientId } = useAuth()
const { t } = useI18n({ useScope: 'global' })

const emit = defineEmits(['uploadComplete'])

const allowedImageExtensions = ['jpg', 'jpeg', 'png']
const allowedDocumentExtensions = ['jpg', 'jpeg', 'png', 'pdf']

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: false,
  },
  registerNumber: {
    type: String,
    required: false,
  },
  side: {
    type: String,
    required: false,
    default: () => 'front',
  },

  isPartner: {
    type: Boolean,
    default: () => false,
  },
  isProofOfAddress: {
    type: Boolean,
    default: () => false,
  },
})

const loading = ref(false)
const doc = ref<File>()

const setLoading = (value: boolean) => {
  loading.value = value
}

const handleClick = () => {
  const input = document.getElementById(getIdInput())
  input?.click()
}

const getIdInput = () => {
  return `${props.dni}${props.side}${props.type}`
}

const icon = computed(() => {
  return loading.value ? 'pi-spin pi-spinner' : 'pi-upload'
})

const handleUpload = async (event: any) => {
  const file = event.target.files[0]

  // Validar la extensión del archivo
  const fileExtension = file.name.split('.').pop()?.toLowerCase()

  if (
    !props.isProofOfAddress &&
    !allowedImageExtensions.includes(fileExtension) &&
    (props.type === 'passport' || props.type === 'drivers_license' || props.type === 'government_id')
  ) {
    toast.add({
      severity: 'warn',
      summary: t('textValidateDocument'),
      detail: t('typeImageAdmitted'),
      life: 4000,
    })
    return
  }

  if (!props.isProofOfAddress && !allowedDocumentExtensions.includes(fileExtension)) {
    toast.add({
      severity: 'warn',
      summary: t('textValidateDocument'),
      detail: t('typeDocumentAdmitted'),
      life: 4000,
    })
    return
  }

  const fileSizeInMegabytes = file.size / (1024 * 1024)
  if (props.type === '') {
    toast.add({
      severity: 'warn',
      summary: t('somethingWentWrong'),
      detail: t('typeFileNotSelected'),
      life: 4000,
    })
    return
  }

  if (fileSizeInMegabytes > 5) {
    toast.add({
      severity: 'warn',
      summary: t('somethingWentWrong'),
      detail: t('fileSizeError'),
      life: 4000,
    })
    return
  }

  doc.value = file
  setLoading(true)

  let formData = new FormData()

  formData.append('clientId', getClientId())
  formData.append('file', file)
  formData.append('isPartner', props.isPartner ? 'true' : 'false')
  formData.append('documentSide', props.side)
  formData.append('documentType', props.type)

  if (props.registerNumber) {
    formData.append('dni', props.registerNumber)
  } else {
    formData.append('dni', props.dni ? props.dni : '')
  }

  await new ProfileService()
    .updateDocuments(formData)
    .then(response => {
      markDataSubmitted()
      setLoading(false)

      toast.add({
        severity: 'success',
        summary: t('successfulOperation'),
        detail: t('shareholderDataSuccessSend'),
        life: 6000,
      })

      emit('uploadComplete', {
        side: props.side,
        dni: props.dni,
        registerNumber: props.registerNumber,
        type: props.type,
      })
    })
    .catch(e => {
      setLoading(false)

      processException(toast, t, e)
    })
}

const editEnable = () => {
  doc.value = undefined
}
</script>
