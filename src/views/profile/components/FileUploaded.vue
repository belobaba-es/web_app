<template>
    <div class="flex justify-content-between align-items-center p-3 border-round surface-200">
        <span>
            <i class="pi pi-check"></i>
        </span>
        <span>
            {{ props.identityDocument.label }}
        </span>
        <span class="cursor-pointer">
            <i class="pi pi-trash"></i>
        </span>
    </div>
</template>

<script lang="ts" setup>

import { defineProps } from 'vue';

const props = defineProps({
    identityDocument: {
        type: Object,
        required: true,
    }
});

</script>

