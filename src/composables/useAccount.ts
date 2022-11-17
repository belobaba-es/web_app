import { useRouter, useRoute } from "vue-router";
import { useAccountStore } from "../stores/account";
import { storeToRefs } from "pinia";
import { computed } from 'vue';
export const useAccount = () => {
    const router = useRouter();
    const route = useRoute();
    const accountStore = useAccountStore();
    const account = storeToRefs(accountStore)
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

    return {
        fetchAccount,
        editProfile,
        ...account,
        fullName,
        phoneNumberWithCountry
    }
}