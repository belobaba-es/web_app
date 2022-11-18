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
    loading: boolean,
    form: FormData
}

interface FormGeneralData {
    email: string | undefined;
    name: string | undefined;
    lastName: string | undefined;
    middleName: string | undefined;
    firstName: string | undefined;
}

interface FormAddressData {
    streetOne: string | undefined;
    streetTwo: string | undefined;
    city: string | undefined;
    country: string | undefined;
    postalCode: string | undefined;
    region: string | undefined;
}

interface FormPhoneData {
    phoneNumber: string | undefined;
    phoneCountry: string | undefined
}

interface FormData {
    generalData: FormGeneralData;
    address: FormAddressData;
    phone: FormPhoneData;
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
        loading:       false,
        form: {
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
                country: "",
                postalCode: "",
                region: ""
            },
            phone: {
                phoneNumber: "",
                phoneCountry: ""
            }
        }
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
            this.loading = true;
            const profileService = ProfileService.instance();
            await profileService.getAccountByID(accountId).then(data => {
                this.setAccount(data)
                this.setFormInitialInfo();
                this.loading = false;
            });
        },
        setFormInitialInfo() {
            this.form.generalData.email = this.owner?.email;
            this.form.generalData.firstName = this.owner?.firstName;
            this.form.generalData.middleName = this.owner?.middleName;
            this.form.generalData.lastName = this.owner?.lastName;
            this.form.generalData.name = this.owner?.name;
            this.form.phone.phoneCountry = this.owner?.phoneCountry;
            this.form.phone.phoneNumber = this.owner?.phoneNumber;
            this.form.address.city = this.owner?.city;
            this.form.address.streetOne = this.owner?.streetOne;
            this.form.address.streetTwo = this.owner?.streetTwo;
            this.form.address.country = this.owner?.country;
            this.form.address.postalCode = this.owner?.postalCode;
            this.form.address.region = this.owner?.region;
        }
    }
})
