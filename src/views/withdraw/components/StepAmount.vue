<template>
    <div class="formgrid grid mt-3">
        <div class="col-12 m-2">
            <span class="mt-4">{{t('youBeneficiaries')}}</span>
            <Divider></Divider>
        </div>
        <div class="col-12 mb-4">
            <p class="title-beneficiary">{{beneficiary.name}}</p>
            <p class="text-base">{{beneficiary.email}}</p>
        </div>
        <div class="col-12 field p-fluid mt-3">
            <div class="flex col-6 justify-content-end">

            </div>
            <div class="field col-6 relative" >
                <span class="text-left absolute" style="right: 0px;">Current balance: 524.95 USD</span>
                <label for="amount">{{t('Amount')}}</label>
                
                <div class="flex">
                    <InputText id="amount" type="number" class="p-inputtext p-component b-gray" v-model="amount" :placeholder="t('amount')" />
                    <span class="p-inputgroup-addon bg-primary">$</span>
                </div>
                
            
                <div class="grid">
            <!-- <div class="col-12">
                <div class="p-inputgroup">
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-clock"></i>
                    </span>
                    <span class="p-inputgroup-addon">
                        <i class="pi pi-star-fill"></i>
                    </span>
                    <InputText placeholder="Price" />
                    <span class="p-inputgroup-addon">.00</span>
                </div>
            </div> -->
        </div>
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
import {computed, onMounted, ref} from 'vue';
import {useI18n} from 'vue-i18n';
import {useRoute} from "vue-router";
import Timeline from 'primevue/timeline';
import Button from 'primevue/button';
import {BeneficiaryInternal} from "../types/beneficiary.interface";

const { t } = useI18n({ useScope: 'global' })
const route = useRoute();
const props = defineProps<{
    formData:  any
}>()

const beneficiary = props.formData.beneficiary as BeneficiaryInternal

const emit = defineEmits(['nextPage']);
const amount = ref('')
const fee = ref(0)
const reference = ref('')

const events = ref<any>([
    {amount: '2,5', label: 'Fee', name: false},
    {amount: '2,5', label: `You send to `, name: true},

]);
       
onMounted(async () => {
    console.log(props.formData.beneficiary, 'amount')
});
const amountFee = computed(()=>{
    console.log(parseFloat(amount.value) - fee.value, 'undefined')
    return isNaN(parseFloat(amount.value) - fee.value) ? 0  : parseFloat(amount.value) - fee.value
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
.title-beneficiary {
  color: #14443F;
}
</style>