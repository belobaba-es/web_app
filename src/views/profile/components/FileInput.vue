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
      <i class="pi" :class="icon"></i>
      <input :id="getIdInput()" type="file" hidden @change="handleUpload($event)" />
    </span>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import { defineProps, ref, computed } from 'vue'
import { ProfileService } from '../services/profile'
import { useToast } from 'primevue/usetoast'
import FileUpload from './FileUploaded.vue'

const toast = useToast()

const { t } = useI18n({ useScope: 'global' })

const props = defineProps({
  label: {
    type: String,
    required: false,
  },
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
  return `${props.label}${props.side}`
}

const icon = computed(() => {
  return loading.value ? 'pi-spin pi-spinner' : 'pi-upload'
})

const handleUpload = async (event: any) => {
  const file = event.target.files[0]
  doc.value = file
  setLoading(true)

  let formData = new FormData()

  formData.append('file', file)
  formData.append('isPartner', props.isPartner ? 'true' : 'false')
  formData.append('documentSide', props.side)
  formData.append('documentType', props.type)

  if (props.registerNumber) {
    formData.append('registerNumber', props.registerNumber)
  } else {
    formData.append('dni', props.dni ? props.dni : '')
  }

  const newDocumentObject = {
    dni: '',

    documentSide: props.side,
    label: props.label,
    documentType: props.type,
    file: '',
    isPartner: Boolean,
    description: props.label,
  }

  await new ProfileService()
    .updateDocuments(formData)
    .then(response => {
      setLoading(false)
      if (props.isProofOfAddress === true) {
        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: t('userDataSuccessSend'),
          life: 6000,
        })
      } else {
        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: t('shareholderDataSuccessSend'),
          life: 6000,
        })
      }
    })
    .catch(error => {
      setLoading(false)
      formData.forEach((value, key) => {
        if (error.response.data[key]) {
          toast.add({
            severity: 'error',
            summary: t('somethingWentWrong'),
            detail: error.response.data[key].message,
            life: 4000,
          })
        }
      })
    })
}

const editEnable = () => {
  doc.value = undefined
}
</script>
