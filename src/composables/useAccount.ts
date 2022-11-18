import { useRouter, useRoute } from "vue-router";
import { useAccountStore } from "../stores/account";
import { storeToRefs } from "pinia";
import { computed, onMounted, reactive, ref } from 'vue';
import { GeneralData } from "../views/profile/types/general-data.interface";
import { useI18n } from 'vue-i18n'

export const useAccount = () => {
    const router = useRouter();
    const route = useRoute();
    const accountStore = useAccountStore();
    const account = storeToRefs(accountStore)
    const { t } = useI18n({
        useScope: 'global'
    })

    const generalData = reactive<GeneralData>({
        email: '',
        name: undefined,
        lastName: undefined,
        middleName: undefined,
        firstName: undefined,
    })
    
    const address = reactive<{
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
    
    const phone = reactive<{
        phoneNumber: string | undefined;
        phoneCountry: string | undefined;
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
        generalData.email = account.owner.value?.email;
        generalData.firstName = account.owner.value?.firstName;
        generalData.middleName = account.owner.value?.middleName;
        generalData.lastName = account.owner.value?.lastName;
        
        phone.phoneCountry = account.owner.value?.phoneCountry;
        phone.phoneNumber = account.owner.value?.phoneNumber;

        address.streetOne = account.owner.value?.streetOne;
        address.streetTwo = account.owner.value?.streetTwo;
        address.country = account.owner.value?.country;
        address.region = account.owner.value?.region;
        address.city = account.owner.value?.city;
    });

    const submitEditForm = () => {
        console.log({
            generalData, 
            phone,
            address
        })
    };

    return {
        fetchAccount,
        editProfile,
        ...account,
        fullName,
        phoneNumberWithCountry,
        generalData,
        address,
        phone,
        formTitle,
        isNaturalAccount,
        submitEditForm
    }
}