import { useRouter, useRoute } from "vue-router";
import { useAccountStore } from "../stores/account";
import { storeToRefs } from "pinia";
import { computed, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { WorldService } from "../shared/services/world";
import { ProfileService } from '../views/profile/services/profile';
import { useUserStore } from "../stores/user";

export const useAccount = () => {
    const router = useRouter();
    const route = useRoute();
    const accountStore = useAccountStore();
    const userStore = useUserStore();
    const account = storeToRefs(accountStore)
    const { t } = useI18n({
        useScope: 'global'
    })
    const countries = ref([]);
    const states = ref([]);
    const cities = ref([]);

    const loadingCountiesField = ref(false);
    const loadingCitiesField = ref(false);
    const loadingStatesField = ref(false);

    const submitting = ref(false);

    const editProfile = (): void => {
        router.push(`/profile/${route.params.accountId}/edit`)
    }

    const fetchAccount = async () => {
        await accountStore.getAccountByID(route.params.accountId);
    }


    const phoneNumberWithCountry = computed(() => {
        return `${account.owner.value?.phoneCountry} ${account.owner.value?.phoneNumber}`
    })

    const isNaturalAccount = computed<boolean>(() => account.natureAccount.value === 'natural_person');

    const fullName = computed(() => {
        const naturalAccount = `${account.owner.value?.firstName} ${account.owner.value?.middleName} ${account.owner.value?.lastName}`;
        const companyAccount = account.owner.value?.name;
        return isNaturalAccount ? naturalAccount : companyAccount;
    })

    const labelNameProfile = computed(() => {

    });

    const formTitle = computed (() => isNaturalAccount.value ? t('partnerTitle') : t('companyData'));

    const statesInputIsEmpty = computed(() => states.value.length === 0);
    const citiesInputIsEmpty = computed(() => cities.value.length === 0);
    const countriesInputIsEmpty = computed(() => countries.value.length === 0);

    const submitProfileForm = () => {
        submitting.value = true;
        const profileService = ProfileService.instance();
        profileService.updateContact(account.accountId.value!, userStore.getUser.contactId, accountStore.form)
            .then(() => {
                submitting.value = false;
            })
    };

    const fetchCountries = async () => {
        loadingCountiesField.value = true;
        const worldService = WorldService.instance();
        await worldService.getCountries()
            .then(resp => {
                countries.value = resp;
                loadingCountiesField.value = false;
            })
    }

    const fetchStates = async () => {
        loadingStatesField.value = true;
        const worldService = WorldService.instance();
        await worldService.getStates(account.form.value.address.country!)
            .then(resp => {
                states.value = resp;
                loadingStatesField.value = false;
            })
    }

    const fetchCities = async () => {
        loadingCitiesField.value = true;
        const worldService = WorldService.instance();
        await worldService.getCities(account.form.value.address.country!, account.form.value.address.region!)
            .then(resp => {
                cities.value = resp;
                loadingCitiesField.value = false;
            })
    }

    return {
        fetchAccount,
        fetchCountries,
        fetchStates,
        editProfile,
        submitProfileForm,
        fetchCities,
        ...account,
        fullName,
        phoneNumberWithCountry,
        formTitle,
        isNaturalAccount,
        countries,
        states,
        cities,
        loadingCountiesField,
        loadingStatesField,
        loadingCitiesField,
        statesInputIsEmpty,
        citiesInputIsEmpty,
        countriesInputIsEmpty,
        submitting,
    }
}