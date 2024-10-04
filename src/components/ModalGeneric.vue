<template>
  <Dialog
    :breakpoints="{ '1199px': '75vw', '575px': '90vw' }"
    :style="{ width: '25rem' }"
    :visible="props.visible"
    modal
    @update:visible="emit('update:display', $event)"
  >
    <div class="flex justify-content-end text-2xl cursor-pointer" @click="closeModal()">x</div>
    <h2 class="text-center font-medium" style="color: #00beb0">{{ title }}</h2>
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