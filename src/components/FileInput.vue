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
import { ProfileService } from '../views/profile/services/profile'
import { useToast } from 'primevue/usetoast'
import FileUpload from '../views/profile/components/FileUploaded.vue'
import { useAuth } from '../composables/useAuth'

const toast = useToast()
const { markDataSubmitted } = useAuth()

const { t } = useI18n({ useScope: 'global' })

const emit = defineEmits(['uploadComplete'])

const props = defineProps({
  type: {
    type: String,
    required: true,
  },
  dni: {
    type: String,
    required: true,
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
  return `${props.dni}${props.side}`
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

  await new ProfileService()
    .updateDocuments(formData)
    .then(response => {
      markDataSubmitted()
      setLoading(false)
      let side = props.side
      if (props.isProofOfAddress === true) {
        side = 'proofOfAddress'

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

      emit('uploadComplete', {
        side: side,
        dni: props.dni,
        registerNumber: props.registerNumber,
      })
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
