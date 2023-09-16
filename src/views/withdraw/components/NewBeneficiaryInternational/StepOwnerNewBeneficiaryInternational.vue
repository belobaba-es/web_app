<template>
  <div class="formgrid grid mt-3">
    <div class="col-6">
      <Button class="w-100 p-button" label="XD" @click="nextPage" />
    </div>
  </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button'

const props = defineProps<{
  formData: any
}>()

const emit = defineEmits(['nextPage', 'prevPage'])

const nextPage = () => {

  const page = 1

  const formData = {
    ...props.formData.value,
  }
  
  emit('nextPage', {
    pageIndex: page,
    formData: formData,
  })
}
</script>
