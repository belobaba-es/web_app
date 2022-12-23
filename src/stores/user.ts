import { defineStore } from 'pinia'
import { computed, ref } from 'vue';
import { CryptoService } from '../shared/services/crypto';

interface User {
    active:       boolean;
    accountId:    string;
    country:      string;
    email:        string;
    token:        string;
    taxId:        string;
    firstName:    string;
    label:        string;
    phoneCountry: string;
    phoneSMS:     boolean;
    contactId:    string;
    contactType:  string;
    phoneNumber:  string;
    lastName:     string;
    postalCode:   string;
    middleName:   string;
    dateBirth:    string;
    streetTwo:    string;
    taxCountry:   string;
    streetOne:    string;
    city:         string;
    region:       string;
    account:      Account;
}

interface Account {
    accountId: string;
    kyc: any[];
    status:    string;
}

export const useUserStore = defineStore('user', () => {
    const setUser = (payload: User) => {
        const cryptoService = new CryptoService;
        sessionStorage.setItem('user', cryptoService.encrypt(JSON.stringify({ ...payload })))
    }

    const isAccountActive = (): boolean => {
        const storageUser = sessionStorage.getItem('user');

        if (!storageUser) return true;

        const user = JSON.parse(new CryptoService().decrypt(storageUser))

        return user.account.status === 'opened'
    }

    const getWarningKYC = () =>{
        const storageUser = sessionStorage.getItem('user');

        if (!storageUser) return;

        return JSON.parse(new CryptoService().decrypt(storageUser)).account.kyc
    }

    const getUser = computed(() => {
        const cryptoService = new CryptoService;
        const storageUser = sessionStorage.getItem('user');

        if (!storageUser) return;

        return JSON.parse(
            cryptoService.decrypt(storageUser)
        );
    })

    return { setUser, getUser, isAccountActive, getWarningKYC }
});