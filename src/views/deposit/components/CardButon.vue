<template>
    <div class="card">
        <div class="flex">
            <img :src="icon" alt="" >
        </div>
        <p class="text-2xl font-medium">{{label}}</p>
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
        text-align: center;
        padding: 2rem 3rem;
        border: 1px solid #00BEB0;
        background: #F7FDFD 0% 0% no-repeat padding-box;
        width: 288px;
        height: 180px;
    }
    .card > div{
        height: 80px;
        margin-bottom: 1rem;
    }

    .card > div >img {
        margin: auto;
    }

    
</style>