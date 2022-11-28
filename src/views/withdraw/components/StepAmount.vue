<template>
    <div class="formgrid grid ">
        <div class="col-12">
            <span class="mt-4">{{t('youBeneficiaries')}}</span>
            
            <Divider></Divider>
        </div>
        <div class="col-12 mb-4">
            <p>{{formData?.beneficiary?.realName}}</p>
            <p class="text-base">{{formData?.beneficiary?.accountNumber}}</p>
        </div>
        <div class="col-12 field p-fluid">
            <div class="flex col-6 justify-content-end">

            </div>
            <div class="field col-6 relative" >
                <span class="text-left absolute" style="right: 0px;">Current balance: 524.95 USD</span>
                <label for="amount">{{t('Amount')}}</label>
                <InputText id="amount" type="text" class="p-inputtext p-component b-gray" v-model="amount" :placeholder="t('amount')" />
            </div>
        </div>
        
        <div class="col-4">
            <Timeline :value="events" >
                
                <template #content="slotProps">
                    {{slotProps.item.label}}
                       <span v-if="slotProps.item.name">{{formData.beneficiary?.realName}}</span>
                       
                   <p v-if="slotProps.item.name">
                        {{amountFee}} 
                    </p>
                    <p v-else> {{fee}}</p>
                </template>
            </Timeline>
            
        </div>
        <div class="col-12 field p-fluid">
            <div class="col-6">
                <label for="">{{t('Reference')}}</label>
                <InputText type="text" class="p-inputtext p-component  b-gray" v-model="reference" :placeholder="t('reference')" />
                
            </div>
        </div>
        <div class="col-12 m-2">
            <span>{{t('The wire will take 24 hours.')}}</span>
        </div>
        <div class="col-6">

            <Button class="p-button " :label="t('continue')" @click="nextPage"/>
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
import { BeneficiaryFiatDomestic, BeneficiaryFiatInternacional } from '../types/beneficiary.interface';

const { t } = useI18n({ useScope: 'global' })
const route = useRoute();
const props = defineProps<{
    formData:  any
}>()
const emit = defineEmits(['nextPage']);
const amount = ref(0)
const fee = ref(2.5)
const reference = ref('')

const events = ref<any>([
    {amount: '2,5', label: 'Fee', name: false},
    {amount: '2,5', label: `You send to `, name: true},

]);
       
onMounted(async () => {
    console.log(props.formData, 'amount')
});
const amountFee = computed(()=>{
    return amount.value - fee.value
})
const nextPage = () => {
    const page = 1
    const formData = {
        ...props.formData.value,
        amount: amount.value,
        fee: 2.5,
        reference: reference.value
    };
    emit('nextPage', {
        pageIndex: page, 
        formData: formData
    })
} 

</script>

<style scoped>
</style>