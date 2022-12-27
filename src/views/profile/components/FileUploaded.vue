<template>
  <div class="flex justify-content-between align-items-center p-3 border-round surface-200">
        <span>
            <i class="pi pi-check"></i>
        </span>
    <span>
            {{ props.label }}
        </span>
    <span class="cursor-pointer" @click="editDocumentHandler(
            props.label
        )">
            <i class="pi pi-pencil"></i>
        </span>
  </div>
</template>

<script lang="ts" setup>

const props = defineProps<{label: string}>();


const editDocumentHandler = (taxId: string, ) => {
  console.log(props.label);

}
</script>

