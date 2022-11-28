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
        <p class="text-3xl font-medium mb-4">{{t('withdraw')}} / <span class="text-primary">{{t('fiat')}} </span></p>
        <div class="flex align-items-center">

            <Button label="" icon="pi pi-angle-left" iconPos="left" class="p-button-text"/>
            <span class="text-xl"> Between NOBA Accounts </span> 
        </div>
        <div class="col-12">
            <span class="mt-4">{{t('Add Beneficiaries')}}</span>
            
            <Divider></Divider>
            
        </div>
        <div class="col-12 md:col-8">
            
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
                    <InputText type="text"  v-model="form.intermediaryBank.swiftCode"/>
                </div>
            </div>
           

           
            <div class="field">
                <label>{{ t(' Intermediary Routing Number') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  v-model="form.routingNumber"/>
                    
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
                        v-model="form.intermediaryBank.intermediaryBankCountry" 
                        :options="countries" 
                        optionLabel="name" 
                        option-value="country_code"
                        :loading="loadingCountiesField"
                        :placeholder="t('countryPlaceholder')"
                        :disabled="countriesInputIsEmpty"
                        class="w-full"
                        @change="onBankChangeCountryHandler"
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
                <label>{{ t('stateLabel') }}</label>
                <div class="p-inputgroup">
                    <Dropdown 
                        v-model="form.intermediaryBank.intermediaryBankState" 
                        :options="bankStates" 
                        optionLabel="name" 
                        option-value="name"
                        :loading="bankLoadingStatesField"
                        :placeholder="t('statePlaceHolder')"
                        :disabled="bankStatesInputIsEmpty"
                        class="w-full"
                        @change="onBankChangeStateHandler"
                        required
                    />
                </div>
            </div>
            <div class="grid">
                <label>{{ t('cityLabel') }}</label>
                    <div class="p-inputgroup">
                        <Dropdown 
                            v-model="form.intermediaryBank.intermediaryBankCity"
                            :options="bankCities" 
                            optionLabel="name" 
                            option-value="name"
                            :placeholder="t('cityPlaceHolder')"
                            class="w-full"
                            :loading="bankLoadingCitiesField"
                            :disabled="bankCitiesInputIsEmpty"
                            required
                        />
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
                        v-model="form.country" 
                        :options="countries" 
                        optionLabel="name" 
                        option-value="country_code"
                        :loading="loadingCountiesField"
                        :placeholder="t('countryPlaceholder')"
                        :disabled="countriesInputIsEmpty"
                        class="w-full"
                        @change="onChangeCountryHandler"
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
                <label>{{ t('stateLabel') }}</label>
                <div class="p-inputgroup">
                    <Dropdown 
                        v-model="form.state" 
                        :options="states" 
                        optionLabel="name" 
                        option-value="name"
                        :loading="loadingStatesField"
                        :placeholder="t('statePlaceHolder')"
                        :disabled="statesInputIsEmpty"
                        class="w-full"
                        @change="onChangeStateHandler"
                        required
                    />
                </div>
            </div>

            <div class="grid">
                
                <div class="field col-6">
                    <label>{{ t('cityLabel') }}</label>
                    <div class="p-inputgroup">
                        <Dropdown 
                            v-model="form.city"
                            :options="cities" 
                            optionLabel="name" 
                            option-value="name"
                            :placeholder="t('cityPlaceHolder')"
                            class="w-full"
                            :loading="loadingCitiesField"
                            :disabled="citiesInputIsEmpty"
                            required
                        />
                    </div>
                </div>
                <div class="field col-6">
                    <label>{{ t(' Postal Code ') }}</label>
                    <div class="p-inputgroup">
                        <InputText type="text"  v-model="form.postalCode"/>
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
import Dropdown, { DropdownChangeEvent } from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import RadioButton from 'primevue/radiobutton'
import Divider from 'primevue/divider';
import { BeneficiaryFiatInternacional } from '../types/beneficiary.interface';

const { t } = useI18n({ useScope: 'global' })

const {
    countries,
    fetchCountries,
    loadingCountiesField,
    countriesInputIsEmpty,
    statesInputIsEmpty,
    loadingStatesField,
    states,
    cities,
    citiesInputIsEmpty,
    loadingCitiesField,
    onChangeCountryHandler,
    onChangeStateHandler
} = useWorld();

const {
    countries: bankCountries,
    statesInputIsEmpty: bankStatesInputIsEmpty,
    loadingStatesField: bankLoadingStatesField,
    states:bankStates,
    cities: bankCities,
    citiesInputIsEmpty: bankCitiesInputIsEmpty,
    loadingCitiesField: bankLoadingCitiesField,
    onChangeCountryHandler: onBankChangeCountryHandler,
    onChangeStateHandler:onBankChangeStateHandler
} = useWorld();

const form = ref<BeneficiaryFiatInternacional>({
    realName: "",
    accountNumber: "",
    routingNumber: "",
    streetOne: "",
    streetTwo: "",
    postalCode: "",  
    country: "",
    city: "",
    state: "",
    iban: "",
    intermediaryBank: {
        bankCity:                      "",
        intermediaryBankCountry:       "",
        intermediaryBankCity:          "",
        bankPostalCode:                "",
        intermediaryBankPostalCode:    "",
        nameBank:                      "",
        intermediaryBankState:         "",
        swiftCode:                     "",
        intermediaryBankBName:         "",
        intermediaryBankStreetTwo:     "",
        intermediaryBankAccountNumber: "",
        intermediaryBankStreetOne:     "",
        bankCountry:                   "",
        intermediaryNumber:            "",
        bankState:                     "",
        bankStreetTwo:                 "",
        bankStreetOne:                 "",
        intermediaryNumberType:        "",
    },
    typeBeneficiaryBankWithdrawal: "INTERNATIONAL",
})

onMounted(async () => {
    
    await fetchCountries().then(()=>{
        bankCountries.value = countries.value
    });
})



const type = ref('intermediary')

</script>

<style scoped>
</style>