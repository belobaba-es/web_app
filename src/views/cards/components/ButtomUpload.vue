<template>
  <div :class="['card text-center upload-container p-5', { 'has-file': files.length > 0 }]">
    <div class="cursor-pointer p-4" @click="triggerFileInput">
      <input ref="fileInput" accept=".png,.jpg,.jpeg,.pdf" style="display: none" type="file" @change="uploadDocument" />
      <div class="icon mb-4">
        <img :src="img" alt="" />
      </div>
      <div class="linea">o</div>
      <div class="p-button-label mt-3">{{ label }}</div>
      <Button class="mt-3">{{ t('SearchFiles') }}</Button>
    </div>
  </div>
  <div v-if="files.length > 0" class="mt-3">
    <div v-for="(file, index) in files" :key="index" class="card flex">
      <div class="file-icon mr-3">
        <i :class="getFileIcon(file.name)" class="pi"></i>
      </div>
      <div class="flex-grow-1">
        <div class="font-normal">{{ file.name }}</div>
        <div class="file-size">{{ (file.size / 1024 / 1024).toFixed(2) }} MB</div>
      </div>
      <Button class="remove-button" @click="removeFile(index)">
        <i class="pi pi-times"></i>
      </Button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button'
import { useUploadDocument } from '../composables/useUploadDocument'
import { defineProps } from 'vue'

const { t } = useI18n({ useScope: 'global' })
const emit = defineEmits(['fileUploaded'])

const props = defineProps({
  label: {
    type: String,
    required: true,
  },
  img: {
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

const { files, fileInput, triggerFileInput, getFileIcon, removeFile, handleFileUpload } = useUploadDocument(props)

const uploadDocument = (event: Event) => {
  handleFileUpload(event).then(() => {
    emit('fileUploaded', { side: props.side, type: props.type })
  })
}
</script>

<style scoped>
.upload-container {
  border: 1px dashed #00beb0;
}

.upload-container.has-file {
  background-color: #e6f7e6;
}

.icon {
  font-size: 2em;
  color: #39a3e5;
}

.linea::after {
  content: '';
  border-bottom: 1px solid #e7e7e7;
  margin: 0 auto;
  width: 150px;
  display: block;
  margin-top: -8px;
  font-size: 1.2em;
  color: #000000;
}

.file-icon {
  font-size: 2em;
}

.remove-button {
  background-color: transparent;
  border: none;
  color: red;
  cursor: pointer;
}
</style>
