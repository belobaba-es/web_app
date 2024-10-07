<template>
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '25rem' }"
    :visible="props.visible"
    :show-header="false"
    modal
    @update:visible="emit('update:display', $event)"
  >
    <div class="p-dialog-header-icons w-full justify-content-end p-2 float-right" style="position: relative; top: 7px">
      <button
        aria-label="Close"
        class="p-dialog-header-icon p-dialog-header-close p-link p-2"
        type="button"
        @click="closeModal"
      >
        <span class="p-dialog-header-close-icon pi pi-times-circle"></span>
      </button>
    </div>
    <h2 class="text-center font-medium" style="color: var(--primary-color)">{{ title }}</h2>
    <p class="m-0 text-center font-normal">
      {{ subtitle }}
    </p>
    <div class="flex justify-content-center mt-4">
      <Button class="text-center col-6" label="Ok" @click="closeModal()" />
    </div>
  </Dialog>
</template>
<script lang="ts" setup>
import Button from 'primevue/button'
import Dialog from 'primevue/dialog'

interface Props {
  visible: boolean
  title: string
  subtitle: string
}

const props = defineProps<Props>()

const emit = defineEmits(['update:display'])

const closeModal = () => {
  emit('update:display', false)
}
</script>
