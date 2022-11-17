import { defineStore } from 'pinia'
import { Account } from '../views/profile/types/account.interface';
import { ProfileService } from "../views/profile/services/profile";

export const useAccountStore = defineStore('account', {
    state: (): Account => ({
        members:        [],
        questionnaire: null,
        createdAt:     null,
        natureAccount: null,
        accountId:     null,
        owner:         null,
        agreement:     null,
        id:            null,
        status:        null,
    }),
    actions: {
        setAccount(payload: Account) {
            this.members = payload.members || [];
            this.questionnaire = payload.questionnaire || null;
            this.createdAt = payload.createdAt || null;
            this.natureAccount = payload.natureAccount || null;
            this.accountId = payload.accountId || null;
            this.agreement = payload.agreement || null;
            this.id = payload.id || null;
            this.owner = payload.owner || null;
            this.status = payload.status || null;
        },
        async getAccountByID(accountId: string | string[]) {
            const profileService = ProfileService.instance();
            await profileService.getAccountByID(accountId).then(data => {
                this.setAccount(data)
            });
        },
    }
})
