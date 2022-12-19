<template>
    <div class="formgrid grid">
        <div v-if="!isNaturalAccount && isUpdateProfileView && !isEditPartnerAccount" class="field col-4">
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
        <div v-if="isNaturalAccount || isCreateView || isEditPartnerAccount" class="field col-4">
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
        <div v-if="isNaturalAccount || isCreateView || isEditPartnerAccount" class="field col-4">
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
        <div v-if="isNaturalAccount || isCreateView || isEditPartnerAccount" class="field col-4">
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
        <div class="field col-4" :class="{ 'col-6': (isNaturalAccount || isCreateView || isEditPartnerAccount) }">
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
        <div class="field col-4" :class="{ 'col-6': (isNaturalAccount || isCreateView || isEditPartnerAccount) }">
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
        <div class="field col-2">
          <label>{{ t('postalCodeLabel') }}</label>
          <div class="p-inputgroup">
            <InputText
                id="phoneNumber"
                type="text"
                class="w-full"
                v-model="form.address.postalCode"
                required
            />
          </div>
        </div>
        <div class="field col-4">
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
        <div class="field col-4">
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
import { onMounted, onUnmounted } from 'vue';
import { useWorld } from '../../../composables/useWorld';
import { useRoute } from 'vue-router';

const {
    isNaturalAccount,
    submitProfileForm,
    form,
    submitting,
    isEditView,
    isCreateView,
    isUpdateProfileView,
    clearAccountFormData,
    setAccountForm,
    setFormInitialInfo,
    isEditPartnerAccount,
    getPartnerToEdit,
    isAccountBusinessComputed,
    setIsAccountBusiness
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

const { t } = useI18n({ useScope: 'global' });

const route = useRoute();

onMounted(async () => {
    await fetchCountries();

    if (isEditView.value || isUpdateProfileView.value) {
        setFormInitialInfo();
        await onChangeCountryHandler();
        await onChangeStateHandler();
        setIsAccountBusiness(isAccountBusinessComputed.value);
    }

    if (isEditPartnerAccount.value) {
        const data = {
            generalData: {
                email: getPartnerToEdit.value?.email,
                name: '',
                lastName: getPartnerToEdit.value?.lastName,
                middleName: getPartnerToEdit.value?.middleName,
                firstName: getPartnerToEdit.value?.firstName,
            },
            address: {
                streetOne: getPartnerToEdit.value?.streetOne,
                streetTwo: getPartnerToEdit.value?.streetTwo,
                city: getPartnerToEdit.value?.city,
                country: getPartnerToEdit.value?.country,
                postalCode: getPartnerToEdit.value?.postalCode,
                region: getPartnerToEdit.value?.region
            },
            phone: {
                phoneNumber: getPartnerToEdit.value?.phoneNumber,
                phoneCountry: getPartnerToEdit.value?.phoneCountry
            },
            documentId: "",
            isAccountBusiness: isAccountBusinessComputed.value
        }
        setAccountForm(data);

        await onChangeCountryHandler();
        await onChangeStateHandler();
    }

    if (isCreateView.value) {
        const data = {
            generalData: {
                email: '',
                name: '',
                lastName: '',
                middleName: '',
                firstName: '',
            },
            address: {
                streetOne: "",
                streetTwo: "",
                city: "",
                country: "US",
                postalCode: "",
                region: ""
            },
            phone: {
                phoneNumber: "",
                phoneCountry: "+1"
            },
            documentId: "",
            isAccountBusiness: isAccountBusinessComputed.value
        }

        setAccountForm(data);
        await onChangeCountryHandler();
    }
});

onUnmounted(() => {
    clearAccountFormData();
});

const onChangeCountryHandler = async () => {
    const country = countries.value.find(country => country.country_code === form.value.address.country);
    if (!country) return;
    setCountry(country);
    await fetchStates();
};

const onChangeStateHandler = async () => {
    const state = states.value.find(state => state.name === form.value.address.region);
    if (!state) return;
    setState(state);
    await fetchCities();
};

</script>