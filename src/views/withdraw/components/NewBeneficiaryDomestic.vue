<!-- {
    "realName": "Angel Bajarano",
    "accountNumber": "345345", Account Number
    "routingNumber": "345345345", Routing Number
    "streetOne": "Calle numero 22", Street Address (Apt, Suite, Etc.)
    "streetTwo": "",
    "postalCode": "06530150",  Postal Code
    "country": "BR",  Country
    "city": "SP",    City
    "state": "SP",   State
    "typeBeneficiaryBankWithdrawal": "DOMESTIC"
} -->

<template>
    <div class="">
        <p class="text-3xl font-medium mb-4">{{t('whitdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
        <div class="flex align-items-center">

            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
            <span class="text-xl"> Between NOBA Accounts </span> 
        </div>
        <div class="col-12">
            <span class="mt-4">{{t('addBeneficiaries')}}</span>
            
            <Divider></Divider>
            
        </div>
        <div class="col-12 md:col-6">
            
            <div class="field">
                <label>{{ t('fullName') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  
                        v-model="form.realName"/>
                    
                </div>
            </div>
            <div class="field">
                <label>{{ t('accountNumber') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  
                        v-model="form.accountNumber"/>
                    
                </div>
            </div>
            <div class="field">
                <label>{{ t('routingNumber') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  
                        v-model="form.routingNumber"/>
                </div>
            </div>
            <div class="field">
                <label>{{ t('countryLabel') }}</label>
                <div class="p-inputgroup">
                    <Dropdown
                        v-model="form.country" 
                        :options="countries" 
                        optionLabel="name" 
                        option-value="country_code"
                        :loading="loadingCountiesField"
                        :placeholder="t('countryPlaceholder')"
                        :disabled="countriesInputIsEmpty"
                        class="w-full"
                        required
                    />
                </div>
            </div>
            <div class="field">
                <label>{{ t('streetAddress') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  
                        v-model="form.streetOne"/>
                </div>
            </div>
            <div class="field">
                <label>{{ t('cityLabel') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  
                        v-model="form.city"/>
                    
                </div>
            </div>

            <div class="grid">
                
                <div class="field col-6">
                    <label>{{ t('stateLabel') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  
                            v-model="form.state"/>
                        
                    </div>
                </div>
                <div class="field col-6">
                    <label>{{ t('postalCodeLabel') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  
                            v-model="form.postalCode"/>
                    </div>
                </div>

            </div>


            
            <div class="field flex justify-content-end">
                <Button 
                    :label="t('saveNewPayee')" 
                    class="px-5"
                    @click="saveBeneficiary"
                    
                />
            </div>
            
        </div>
       
    </div>
</template>

<script setup lang="ts">
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputText from 'primevue/inputtext';
import { useToast } from 'primevue/usetoast';
import { onMounted, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import { useRouter } from 'vue-router';
import { useWorld } from '../../../composables/useWorld';
import { BeneficiaryService } from '../services/beneficiary';
import { BeneficiaryFiatDomestic } from '../types/beneficiary.interface';

const router = useRouter();
const { t } = useI18n({ useScope: 'global' })
const toast = useToast();

const {
    countries,
    fetchCountries,
    fetchStates,
    loadingCountiesField,
    countriesInputIsEmpty,
    setCountry

} = useWorld();

onMounted(async () => {
    await fetchCountries();
})

const form = ref<BeneficiaryFiatDomestic>({
    realName: "",
    accountNumber: "",
    routingNumber: "",
    streetOne: "",
    streetTwo: "",
    postalCode: "",  
    country: "",
    city: "",
    state: "",
    typeBeneficiaryBankWithdrawal: "DOMESTIC",
})



const saveBeneficiary = () =>{
    
    const beneficiaryService = BeneficiaryService.instance();
    beneficiaryService.saveBeneficiaryDomestic(form.value).then(resp=>{
        
        router.push('/withdraw/fiat/domestic')
        toast.add({
          severity: 'success',
          detail: resp.message,
          life: 4000,
        })
    })
}
</script>

<style scoped>

</style>