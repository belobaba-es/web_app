<template>
    <div class="container">
        <div class="flex justify-content-between align-items-center asset-item" v-for="(item) in list">
            
            <span class="ml-4 mt-2 mb-2">{{item.name}}</span>
            <Button icon="pi pi-angle-right" class="p-button-text p-button-primary" label="" @click="emit('select',item);"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

import Button from 'primevue/button';
import { Beneficiary } from '../types/beneficiaries.interface';


defineProps<{
	list: Array<Beneficiary>,
}>()

const emit = defineEmits(['select']);

</script>

<style lang="css" scoped>

.asset-item{
    border-top: 1px solid var(--surface-overlay);
    border-bottom: 1px solid var(--surface-overlay);
}
.asset-item:hover{
    background-color: var(--surface-overlay);
    
}

.asset-icon{
    height: 56px;
    width: 56px;
    margin: 0.5rem;
    display: flex;
    justify-content: center;
    position: relative;
}

</style>