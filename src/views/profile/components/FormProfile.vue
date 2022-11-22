<template>
    <div class="formgrid grid">
        <div v-if="!isNaturalAccount" class="field col-4">
            <label>{{ t('nameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.generalData.name" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>{{ t('nameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.generalData.firstName" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>{{ t('secondNameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.generalData.middleName" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div v-if="isNaturalAccount" class="field col-4">
            <label>{{ t('surnameLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.generalData.lastName" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div class="field col-4" :class="{ 'col-6': isNaturalAccount }">
            <label>{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.generalData.email" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div class="field col-4" :class="{ 'col-6': isNaturalAccount }">
            <label>{{ t('phoneLabel') }}</label>
            <div class="p-inputgroup">
                <span class="p-inputgroup-addon">
                    {{ form.phone.phoneCountry }}
                </span>
                <div class="p-inputgroup">
                    <InputText 
                        id="phoneNumber" 
                        type="text" 
                        class="w-full" 
                        v-model="form.phone.phoneNumber"
                        required
                    />
                </div>
            </div>
        </div>
        <div class="field col-4">
            <label>{{ t('countryLabel') }}</label>
            <div class="p-inputgroup">
                <Dropdown
                    v-model="form.address.country" 
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
        <div class="field col-4">
            <label>{{ t('stateLabel') }}</label>
            <div class="p-inputgroup">
                <Dropdown 
                    v-model="form.address.region" 
                    :options="states" 
                    optionLabel="name" 
                    option-value="name"
                    :loading="loadingStatesField"
                    :placeholder="t('statePlaceHolder')"
                    :disabled="statesInputIsEmpty"
                    class="w-full"
                    @change="onChangeStateHandler()"
                    required
                />
            </div>
        </div>
        <div class="field col-4">
            <label>{{ t('cityLabel') }}</label>
            <div class="p-inputgroup">
                <Dropdown 
                    v-model="form.address.city"
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
            <label>{{ t('addressLabel1') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.address.streetOne" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div class="field col-6">
            <label>{{ t('addressLabel2') }}</label>
            <div class="p-inputgroup">
                <InputText 
                    type="text" 
                    v-model="form.address.streetTwo" 
                    class="w-full"
                    required
                />
            </div>
        </div>
        <div class="field col-12 flex align-items-center">
            <Button 
                :label="t('save')" 
                class="px-5" 
                @click="submitProfileForm"
                :loading="submitting"
            />
        </div>
    </div>
</template>

<script lang="ts" setup>
import Dropdown from 'primevue/dropdown';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import { useAccount } from '../../../composables/useAccount';
import { useI18n } from 'vue-i18n'
import { onMounted } from 'vue';
import { useWorld } from '../../../composables/useWorld';

const {
    isNaturalAccount,
    submitProfileForm,
    form,
    submitting
} = useAccount();


const {
    countries,
    states,
    fetchStates,
    fetchCountries,
    fetchCities,
    cities,
    loadingCitiesField,
    loadingCountiesField,
    loadingStatesField,
    statesInputIsEmpty,
    countriesInputIsEmpty,
    citiesInputIsEmpty,
    setCountry,
    setState,
} = useWorld();

const { t } = useI18n({
  useScope: 'global'
})

onMounted(async () =>  {
    await fetchCountries();
});

const props = defineProps({
    formMode: {
        type: String,
        default: () => 'edit-own-profile'
    }
})

const onChangeCountryHandler = () => {
    const country = countries.value.find(country => country.country_code === form.value.address.country);
    if (!country) return;
    setCountry(country);
    fetchStates();
};

const onChangeStateHandler = () => {
    const state = states.value.find(state => state.name === form.value.address.region);
    if (!state) return;
    setState(state);
    fetchCities();
};

</script>