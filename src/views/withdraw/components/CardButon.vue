<template>
    <div class="card">
        <p class="text-lg font-medium">{{label}}</p>
    </div>
</template>

<script lang="ts" setup>
import { ref, defineProps } from 'vue';
defineProps({
    icon: String,
    label: String
})
</script>

<style scoped>
    .card{
        display: flex;
        justify-content: center;
        align-items: center;
        text-align: center;
        padding: 0.5rem;
        border: 1px solid #00BEB0;
        background: #F7FDFD 0% 0% no-repeat padding-box;
        min-width: 280px;
        min-height: 60px;
    }
    .card > div{
        height: 80px;
        margin-bottom: 1rem;
    }

    .card > div >img {
        margin: auto;
    }

    
</style>