<!-- 

    {
    "realName": "Alejandra Altuna",
    "accountNumber": "00000100833215",
    "routingNumber": "UNCRITM1376",
    "streetOne": "Via Scultori del Legno #27",
    "streetTwo": "",
    "postalCode": "20823",
    "country": "IT",
    "city": "LENTATE SUL SEVESOI",
    "state": "Monza Brianza",
    "typeBeneficiaryBankWithdrawal": "INTERNATIONAL",
    "iban": "",
    "intermediaryBank": {
        "swiftCode": "UNCRITM1376",
        "nameBank": "UniCredit",
        "intermediaryBankBName": "",
        "intermediaryBankAccountNumber": "",
        "intermediaryNumber": "",
        "intermediaryNumberType": "",
        "intermediaryBankStreetOne": "",
        "intermediaryBankStreetTwo": "",
        "intermediaryBankPostalCode": "",
        "intermediaryBankCity": "",
        "intermediaryBankCountry": "",
        "intermediaryBankState": "",
        "bankStreetOne": "",
        "bankStreetTwo": "",
        "bankPostalCode": "",
        "bankCity": "",
        "bankCountry": "",
        "bankState": ""
    }
}
 -->

<template>
    <div class="">
        <p class="text-3xl font-medium mb-4">{{t('whitdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
        <div class="flex align-items-center">

            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
            <span class="text-xl"> Between NOBA Accounts </span> 
        </div>
        <div class="col-12">
            <span class="mt-4">{{t('Add Beneficiaries')}}</span>
            
            <Divider></Divider>
            
        </div>
        <div class="col-12 md:col-6">
            
            <div class="field">
                <label>{{ t('Full Name') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            
            <div class="field">
                <label>{{ t('Name on Bank Acount:') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            <div class="field">
                <label>{{ t('Account Number ') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>

            <div class="field">
                <label>{{ t('Name of Bank') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>

           
            <div class="field">
                <label>{{ t('Swift Code') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                </div>
            </div>
           

           
            <div class="field">
                <label>{{ t(' Intermediary Routing Number') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            <div class="flex">
                <div class="field-radiobutton col-4">
                    <RadioButton name="intermediary" value="intermediary" v-model="type"/>
                    <label for="intermediary">{{t('Intermediary Bank Name')}}</label>
                </div>
                <div class="field-radiobutton col-4">
                    <RadioButton name="city" value="swift-code" v-model="type" />
                    <label for="swich-code">{{t('Swift Code')}}</label>
                </div>

            </div>
   
            <p>INTERMEDIARY BANK ADDRES</p> 
            <Divider></Divider>
            <div class="field">
                <label>{{ t('countryLabel') }}</label>
                <div class="p-inputgroup">
                    <Dropdown
                        v-model="form.address" 
                        :options="countries" 
                        optionLabel="name" 
                        option-value="country_code"
                        :loading="loadingCountiesField"
                        :placeholder="t('countryPlaceholder')"
                        :disabled="countriesInputIsEmpty"
                        class="w-full"
                        @change="onChangeCountryHandler()"
                        required
                    />
                </div>
            </div>
            <div>
                
            </div>
            <div class="field">
                <label>{{ t('Street Address (Apt, Suite, Etc.)') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            <div class="field">
                <label>{{ t('City') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            <div class="grid">
                <div class="field col-6">
                    <label>{{ t('Region') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  />
                        
                    </div>
                </div>
                <div class="field col-6">
                    <label>{{ t('Postal Code') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  />
                        
                    </div>
                </div>

            </div>

            <div class="field">
                <label>{{ t('IBAN') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            
            <p>BENEFICIARY ADDRESS</p> 
            <Divider></Divider>

            <div class="field">
                <label>{{ t('countryLabel') }}</label>
                <div class="p-inputgroup">
                    <Dropdown
                        v-model="form.address" 
                        :options="countries" 
                        optionLabel="name" 
                        option-value="country_code"
                        :loading="loadingCountiesField"
                        :placeholder="t('countryPlaceholder')"
                        :disabled="countriesInputIsEmpty"
                        class="w-full"
                        @change="onChangeCountryHandler()"
                        required
                    />
                </div>
            </div>
            <div class="field">
                <label>{{ t(' Street Address (Apt, Suite, Etc.) ') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                </div>
            </div>
            <div class="field">
                <label>{{ t('City') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>

            <div class="grid">
                
                <div class="field col-6">
                    <label>{{ t('State') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  />
                        
                    </div>
                </div>
                <div class="field col-6">
                    <label>{{ t(' Postal Code ') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  />
                    </div>
                </div>

            </div>

            <div class="field flex justify-content-end">
                <Button 
                    :label="t('Save new payee')" 
                    class="px-5"
                    @click=""
                    
                />
            </div>
            
        </div>
       
    </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';
import { useWorld } from '../../../composables/useWorld';
import { useI18n } from 'vue-i18n';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider';

const { t } = useI18n({ useScope: 'global' })

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

const onChangeCountryHandler = async () => {
    const country = countries.value.find(country => country.country_code === form.value.address);
    if (!country) return;
    setCountry(country);
    await fetchStates();
};
const type = ref('intermediary')
const form = ref({address: ''})
</script>

<style scoped>

</style>