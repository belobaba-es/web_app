<template>
    <div class="grid ">
      
            <div class="col-12 mt-4">
                <p>Your transfer has been successful</p>
                <p class="font-ligth text-base">The transfer is made within 24 hours.</p>
            </div>
            <div class="col-12">
                <p class="text-md">Transaction Summary</p>

            </div>
            <Divider></Divider>
   
                
                
            <div class="col-6">
                <p class="text-base font-semi-bold">Bank account holder</p>

            </div>
            <div class="col-6">

                <p>{{'name'}}</p>
            </div>

        
    
            <div class="col-6">
                <p class="text-base font-semi-bold">IBAN</p>

            </div>
            <div class="col-6">

                <p>{{'IBAN'}}</p>
            </div>

           
            <Divider></Divider>
        
            <div class="col-6">
                <p class="text-base font-semi-bold">{{t('You sent')}}</p>

            </div>
            <div class="col-6">

                <p>{{'amount'}}</p>
            </div>

        
            <div class="col-6">
                <p class="text-base font-semi-bold">{{t('Our commission')}}</p>

            </div>
            <div class="col-6">

                <p>{{'2,5'}}</p>
            </div>

        
            <div class="col-6">
                <p class="text-base font-semi-bold">{{t('Alberto Rodriguez has received')}}</p>

            </div>
            <div class="col-6">

                <p>{{'231 $'}}</p>
            </div>
    
              
    
            <Divider></Divider>
           
            <div class="col-6">
                <p class="text-base font-semi-bold">{{t('Transaction number')}}</p>

            </div>
            <div class="col-6">

                <p>{{'55165416546'}}</p>
            </div>

                
            <div class="col-12 flex justify-content-end">
                <Button class="p-button" :label="t('New transfer')" @click="emit('complete')"/>
                
            </div>
            <div class="col-12 flex justify-content-end">
               <Button class="p-button" :label="t('Repeat transfer')" @click="emit('complete')"/>
    
    
           </div>
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