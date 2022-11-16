<template>
    <div>
        <h1 class="text-2xl">
            {{ props.title }}
        </h1>
        <div v-if="$slots.contentHeader">
            <slot name="contentHeader"/>
        </div>
        <div>
            <slot />
        </div>
    </div>
</template>

<script setup lang="ts">
import { defineProps } from 'vue';

const props = defineProps({
    title: {
        type: String,
        required: true
    }
})

</script>

<style scoped>

</style>