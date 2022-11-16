<template>
    <div class="container">
        <div class="flex justify-content-between align-items-center asset-item" v-for="(item) in assets">
            <div class="asset-icon">
                <img :src="item.icon">
            </div>
            <span>{{item.name}}</span>
            <Button icon="pi pi-eye" class="p-button-text" label="ver direccion" @click="emit('select',item);"/>
        </div>
    </div>
</template>

<script lang="ts" setup>

import Button from 'primevue/button';
import { Asset } from '../types/asset.interface';

defineProps<{
	assets: Array<Asset>,
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