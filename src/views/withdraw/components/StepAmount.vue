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
            <Timeline :value="events">
                <template #content="slotProps">
                    {{slotProps.item.label}}
                    <p>
                        {{slotProps.item.amount}}
                    </p>
                </template>
            </Timeline>
            
        </div>
        <div class="col-12 field p-fluid">
            <div class="col-6">
                <label for="">{{t('Reference')}}</label>
                <InputText type="text" class="p-inputtext p-component  b-gray" v-model="amount" :placeholder="t('reference')" />
                
            </div>
        </div>
        <div class="col-12">
            <span>{{t('The wire will take 24 hours.')}}</span>
        </div>

        <Button class="p-button search-btn" :label="t('continue')" @click="$emit('nextPage', {pageIndex: 1})"/>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import InputText from 'primevue/inputtext';
import { ref, onMounted } from 'vue';
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
const amount = ref('')
const events = ref([
    {amount: '3,5', label: 'Fee'},
    {amount: '2,5', label: `You send to ${props.formData.beneficiary?.realName}`,},
]);
       
onMounted(async () => {
    console.log(props.formData, 'amount')
});

</script>

<style scoped>
</style>