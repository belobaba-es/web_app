import { useRouter, useRoute } from "vue-router";
import { useAccountStore } from "../stores/account";
import { storeToRefs } from "pinia";
import { computed, onMounted, onUnmounted, reactive, ref } from 'vue';
import { useI18n } from 'vue-i18n'
import { WorldService } from "../shared/services/world";

export const useAccount = () => {
    const router = useRouter();
    const route = useRoute();
    const accountStore = useAccountStore();
    const account = storeToRefs(accountStore)
    const { t } = useI18n({
        useScope: 'global'
    })
    const countries = ref([]);
    const states = ref([]);
    const cities = ref([]);

    const generalData = ref<{
        email: string | undefined;
        name: string | undefined;
        lastName: string | undefined;
        middleName: string | undefined;
        firstName: string | undefined;
    }>({
        email: '',
        name: '',
        lastName: '',
        middleName: '',
        firstName: '',
    })
    
    const address = ref<{
        streetOne: string | undefined;
        streetTwo: string | undefined;
        city: string | undefined;
        country: string | undefined;
        postalCode: string | undefined;
        region: string | undefined;
    }>({
        streetOne: "",
        streetTwo: "",
        city: "",
        country: "",
        postalCode: "",
        region: ""
    })
    
    const phone = ref<{
        phoneNumber: string | undefined;
        phoneCountry: string | undefined
    }>({
        phoneNumber: "",
        phoneCountry: ""
    })

    const editProfile = (): void => {
        router.push(`/profile/${route.params.accountId}/edit`)
    }

    const fetchAccount = async () => {
        await accountStore.getAccountByID(route.params.accountId);
    }

    const fullName = computed(() => {
        return `${account.owner.value?.firstName} ${account.owner.value?.middleName} ${account.owner.value?.lastName}`
    })

    const phoneNumberWithCountry = computed(() => {
        return `${account.owner.value?.phoneCountry} ${account.owner.value?.phoneNumber}`
    })

    const isNaturalAccount = computed<boolean>(() => account.natureAccount.value === 'natural_person');

    const formTitle = computed (() => isNaturalAccount.value ? t('partnerTitle') : t('companyData'));

    onMounted(() => {
        generalData.value.email = accountStore.owner?.email;
        generalData.value.firstName = accountStore.owner?.firstName;
        generalData.value.middleName = accountStore.owner?.middleName;
        generalData.value.lastName = accountStore.owner?.lastName;
        generalData.value.name = accountStore.owner?.name;

        phone.value.phoneCountry = accountStore.owner?.phoneCountry;
        phone.value.phoneNumber = accountStore.owner?.phoneNumber;

        address.value.city = accountStore.owner?.city;
        address.value.streetOne = accountStore.owner?.streetOne;
        address.value.streetTwo = accountStore.owner?.streetTwo;
        address.value.country = accountStore.owner?.country;
        address.value.postalCode = accountStore.owner?.postalCode;
        address.value.region = accountStore.owner?.region;
    });

    const submitEditForm = () => {
        console.log({
            generalData, 
            phone,
            address
        })
    };

    const fetchCountries = async () => {
        const worldService = WorldService.instance();
        await worldService.getCountries()
            .then(resp => {
                countries.value = resp;
            })
    }

    const fetchStates = async () => {
        const worldService = WorldService.instance();
        await worldService.getStates(address.value.country!)
            .then(resp => {
                states.value = resp;
            })
    }

    const fetchCities = async () => {
        const worldService = WorldService.instance();
        await worldService.getCities(address.value.country!, address.value.region!)
            .then(resp => {
                cities.value = resp;
            })
    }

    return {
        fetchAccount,
        fetchCountries,
        fetchStates,
        editProfile,
        submitEditForm,
        fetchCities,
        ...account,
        fullName,
        phoneNumberWithCountry,
        generalData,
        address,
        phone,
        formTitle,
        isNaturalAccount,
        countries,
        states,
        cities
    }
}