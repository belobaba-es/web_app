import { defineStore } from 'pinia'
import { Account, CreatedAt, TypeAccount, Owner, Agreement, Member, Questionnaire } from '../views/profile/types/account.interface';
import { ProfileService } from "../views/profile/services/profile";

interface AccountState {
    members: Member[] | null;
    questionnaire: Questionnaire | null;
    createdAt: CreatedAt | null;
    natureAccount: TypeAccount;
    accountId: string | null;
    owner: Owner | null;
    agreement: Agreement | null;
    id: string | null;
    status: string | null;
}

export const useAccountStore = defineStore('account', {
    state: (): AccountState => ({
        members:       [],
        questionnaire: null,
        createdAt:     null,
        natureAccount: TypeAccount.natural,
        accountId:     null,
        owner:         null,
        agreement:     null,
        id:            '',
        status:        '',
    }),
    actions: {
        setAccount(payload: Account) {
            this.members = payload.members || null;
            this.owner = payload.owner || null;
            this.accountId = payload.accountId || null;
            this.status = payload.status || null;
            this.questionnaire = payload.questionnaire || null;
            this.id = payload.id || null;
            this.createdAt = payload.createdAt || null;
            this.agreement = payload.agreement || null;
        },
        async getAccountByID(accountId: string | string[]) {
            const profileService = ProfileService.instance();
            await profileService.getAccountByID(accountId).then(data => {
                this.setAccount(data)
            });
        },
    }
})
