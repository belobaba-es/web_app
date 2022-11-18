<template>
    <div class="mb-4">
        <h1 class="text-2xl">
            {{ formTitle }}
        </h1>
    </div>
    
    <div class="formgrid grid">
        <div v-if="!isNaturalAccount" class="field col-4">
            <label>{{ t('nameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="generalData.name" 
                    class="w-full" 
                />
            </div>
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>{{ t('nameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="generalData.firstName" 
                    class="w-full" 
                />
            </div>
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>{{ t('secondNameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="generalData.middleName" 
                    class="w-full" 
                />
            </div>
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>{{ t('surnameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="generalData.lastName" 
                    class="w-full"
                />
            </div>
        </div>
        <div class="field col-4" :class="{ 'col-6': isNaturalAccount }">
            <label>{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="generalData.email" 
                    class="w-full" 
                />
            </div>
        </div>
        <div class="field col-4" :class="{ 'col-6': isNaturalAccount }">
            <label>{{ t('phoneLabel') }}</label>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    {{ phone.phoneCountry }}
                </span>
                <div class="p-inputgroup">
                    <InputText 
                    id="phoneNumber" 
                        type="text" 
                        class="w-full" 
                        v-model="phone.phoneNumber"
                    />
                </div>
            </div>
        </div>
        <div class="field col-4">
            <label>{{ t('countryLabel') }}</label>
            <div class="p-inputgroup">
                <Dropdown 
                    v-model="address.country" 
                    :options="countries" 
                    optionLabel="name" 
                    option-value="code"
                    :placeholder="t('countryPlaceholder')"
                    class="w-full"
                />
            </div>
        </div>
        <div class="field col-4">
            <label>{{ t('stateLabel') }}</label>
            <div class="p-inputgroup">
                <Dropdown 
                    v-model="address.region" 
                    :options="states" 
                    optionLabel="name" 
                    option-value="code"
                    :placeholder="t('statePlaceHolder')"
                    class="w-full"
                />
            </div>
        </div>
        <div class="field col-4">
            <label>{{ t('cityLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="address.city" 
                    class="w-full" 
                />
            </div>
        </div>
        <div class="field col-6">
            <label>{{ t('addressLabel1') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="address.streetOne" 
                    class="w-full" 
                />
            </div>
        </div>
        <div class="field col-6">
            <label>{{ t('addressLabel2') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="address.streetTwo" 
                    class="w-full" 
                />
            </div>
        </div>
        <div class="field col-12 flex align-items-center">
            <Button :label="t('save')" class="px-5" @click="submitEditForm"/>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useAccount } from '../../composables/useAccount';
import { useI18n } from 'vue-i18n'

const countries = ref([]);
const states = ref([])
const { address, generalData, phone, isNaturalAccount, formTitle, submitEditForm } = useAccount();
const { t } = useI18n({
  useScope: 'global'
})
</script>

<style scoped>
.p-button, .p-button:hover {
    background: var(--primary-color);
    border: 1px solid var(--primary-color);
}
.p-checkbox .p-checkbox-box.p-highlight {
    border-color: var(--primary-color);
    background: var(--primary-color);
}
</style>