import { ref } from 'vue'
import { useToast } from 'primevue/usetoast'
import { useI18n } from 'vue-i18n'
import { useAuth } from '../../../composables/useAuth'
import { ProfileService } from '../../profile/services/profile'
import { processException } from '../../../shared/processException'

const disabled = ref<boolean>(true)

export const useUploadDocument = (props: any) => {
  const files = ref<File[]>([])
  const fileInput = ref<HTMLInputElement | null>(null)
  const loading = ref(false)

  const allowedDocumentExtensions = ['jpg', 'jpeg', 'png', 'pdf']
  const toast = useToast()
  const { t } = useI18n({ useScope: 'global' })
  const { markDataSubmitted } = useAuth()
  const { getClientId } = useAuth()

  const triggerFileInput = () => {
    fileInput.value?.click()
  }

  const handleFileUpload = async (event: Event) => {
    const target = event.target as HTMLInputElement
    if (target.files && target.files.length > 0) {
      const file = target.files[0]

      if (!validateFile(file)) {
        throw new Error('Invalid file')
      }

      files.value = [file] // Solo permitir un archivo
      await uploadFile(file) // Llamar a la función uploadFile con los props necesarios
    }
  }

  const validateFile = (file: File) => {
    const fileExtension = file.name.split('.').pop()?.toLowerCase()
    const fileSizeInMegabytes = file.size / (1024 * 1024)
    let validate = true

    if (!validateFileType(fileExtension)) {
      validate = false
      toast.add({
        severity: 'warn',
        summary: t('textValidateDocument'),
        detail: t('typeDocumentAdmitted'),
        life: 4000,
      })
    }

    if (!validateFileAgainstType(fileExtension)) {
      validate = false
      toast.add({
        severity: 'warn',
        summary: t('textValidateDocument'),
        detail: t('typeImageAdmitted'),
        life: 4000,
      })
    }

    if (fileSizeInMegabytes > 5) {
      validate = false
      toast.add({
        severity: 'warn',
        summary: t('somethingWentWrong'),
        detail: t('fileSizeError'),
        life: 4000,
      })
    }
    return validate
  }

  const validateFileType = (fileExtension: string | undefined): boolean => {
    const allowedExtensions = ['png', 'jpg', 'jpeg', 'pdf']
    return fileExtension ? allowedExtensions.includes(fileExtension) : false
  }

  const validateFileAgainstType = (fileExtension: string | undefined): boolean => {
    if (!fileExtension) return false
    return allowedDocumentExtensions.includes(fileExtension)
  }

  const getFileIcon = (fileName: string): string => {
    const fileExtension = fileName.split('.').pop()?.toLowerCase()
    switch (fileExtension) {
      case 'png':
      case 'jpg':
      case 'jpeg':
        return 'pi-image'
      case 'pdf':
        return 'pi-file-pdf'
      default:
        return 'pi-file'
    }
  }

  const removeFile = (index: number) => {
    files.value.splice(index, 1)
    disabled.value = true
  }

  const uploadFile = async (file: File) => {
    const formData = new FormData()
    formData.append('clientId', getClientId())
    formData.append('file', file)
    formData.append('isPartner', props.isPartner ? 'true' : 'false')
    formData.append('documentSide', props.side)
    formData.append('documentType', props.type)
    formData.append('isOnboardingCard', 'true')

    if (props.registerNumber) {
      formData.append('dni', props.registerNumber)
    } else {
      formData.append('dni', props.dni ? props.dni : '')
    }

    loading.value = true

    await new ProfileService()
      .updateDocuments(formData)
      .then(response => {
        markDataSubmitted()
        loading.value = false

        toast.add({
          severity: 'success',
          summary: t('successfulOperation'),
          detail: t('userDataSuccessSend'),
          life: 6000,
        })
      })
      .catch(error => {
        loading.value = false
        processException(toast, t, error)
      })
  }

  return {
    files,
    fileInput,
    triggerFileInput,
    handleFileUpload,
    getFileIcon,
    removeFile,
    disabled
  }
}
