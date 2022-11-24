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
    <div class="grid">
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
                <label>{{ t('Nombre') }}</label>
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
                <label>{{ t('Routing Number') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                </div>
            </div>
            <div class="field">
                <label>{{ t('Country') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                    
                </div>
            </div>
            <div class="field">
                <label>{{ t(' Street Address (Apt, Suite, Etc.) ') }}</label>
                <div class="p-inputgroup">
                    <InputText type="text"  />
                </div>
            </div>
            <div class="field">
                <label>{{ t(' Postal Code ') }}</label>
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
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useI18n } from 'vue-i18n';


const { t } = useI18n({ useScope: 'global' })
</script>

<style scoped>

</style>