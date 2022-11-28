<template>
    <div class="formgrid grid ">
        <div class="col-12">
            <span class="mt-4">{{t('Confirm wire information')}}</span>
            <Divider></Divider>
        </div>
        <div>
            <p>{{formData?.beneficiary?.realName}}</p>
            <p class="font-ligth text-base">{{formData?.beneficiary?.accountNumber}}</p>
        </div>
        <Divider></Divider>
        
        <div class="col-12 field p-fluid">
            
            <div class="field col-12">
                <label for="name1">{{t('Amount')}}</label>
                <p>{{amountFee}}</p>
            </div>
            <div class="field col-12">
                <label for="name1">{{t('fee')}}</label>
                <p>{{formData.fee}}</p>
            </div>
        </div>
        
        
        <div class="col-12 mb-2">
            <p class="text-base">Your are sending to {{formData?.beneficiary?.realName}}</p>
            
        </div>
        
        <div class="col-12 mb-2">
            <span>{{t('The wire will take 24 hours.')}}</span>
            <p>
                {{formData.amount}}
            </p>
        </div>

        <Button class="p-button search-btn" :label="t('continue')" @click="emit('complete')"/>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { ref, onMounted, computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter, useRoute } from "vue-router";
import Timeline from 'primevue/timeline';
import Button from 'primevue/button';

const { t } = useI18n({ useScope: 'global' })
const route = useRoute();
const props = defineProps<{
    formData:  any
}>()

const emit = defineEmits(['complete']);

      
onMounted(async () => {

    const data = props.formData;
    console.log("confirmation", data);
});

const amountFee = computed(()=>{
    return parseFloat(props.formData.amount) - props.formData.fee
})

</script>

<style scoped>
</style>