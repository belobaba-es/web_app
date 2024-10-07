<template>
  <div class="flex w-full">
    <InputText
      v-model="searchText"
      :placeholder="placeholder"
      @change="handleChange"
      class="border"
      style="width: 100%; border-radius: 10px 0 0 10px"
    />
    <Button
      icon="pi pi-search"
      severity="warn"
      style="width: 44px; height: 39px; padding: 7px 12px 6px 12px; border-radius: 0 10px 10px 0"
      @click="handleSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import Button from 'primevue/button'
import InputText from 'primevue/inputtext'
import { ref } from 'vue'

const props = defineProps({
  placeholder: String,
  onSearch: Function,
  redirect: Function,
  onChange: Function,
})

const searchText = ref('')

const handleSearch = () => {
  if (!props.onSearch) return
  props.onSearch(searchText.value)
}
const handleChange = () => {
  if (searchText.value == '' && props.onChange) {
    props.onChange(searchText.value)
  }
}
</script>

<style>
.border {
  border: 1px solid var(--primary-color);
}
</style>
