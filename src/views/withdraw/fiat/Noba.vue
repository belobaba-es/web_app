<template>
    <div>
        <p class="text-3xl font-medium mb-4">{{t('whitdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
        <div class="flex align-items-center">

            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
            <span class="text-xl"> Between NOBA Accounts </span> 
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import Button from 'primevue/button';
const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>

</style>