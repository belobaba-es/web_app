<template>
<Dialog v-model:visible="display" :modal="true" closeIcon="pi pi-times-circle">
    <template #header>
        <h3>Header</h3>
    </template>

    <div class="col-12 ">
        <div class="p-inputgroup">
            <InputText :placeholder="t('walletAddress')" />
            <span class="p-inputgroup-addon">
                <i class="pi pi-copy"></i>
            </span>
        </div>
    </div>

    <template #footer>
        <Button :label="t('done')" icon="pi pi-check" autofocus />
    </template>
</Dialog>

</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import InputText from 'primevue/inputtext';
import Button from 'primevue/button';
import Dialog from 'primevue/dialog';


defineProps<{
    display: boolean,
}>()

const { t } = useI18n({ useScope: 'global' })

const value = ref('');



</script>

<style lang="css">

</style>