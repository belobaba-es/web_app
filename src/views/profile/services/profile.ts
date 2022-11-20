import { HttpService } from '../../../shared/services/http';
import { Account } from '../types/account.interface';
import { FormData } from '../../../stores/account';

export class ProfileService extends HttpService {
    private static _instance: ProfileService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new ProfileService();

        return this._instance;
    }
    
    async getAccountByID (accountID: string | string[]): Promise<Account> {
        return await this.get<Account>(`account/${accountID}`);
    }
    
    async updateContact(accountID: string, contactId: string, form: FormData): Promise<any> {
        return await this.patch(`account/${accountID}/contact/${contactId}`, form);
    }

    async updatePassword(email: string, password: string): Promise<any> {
        return await this.patch(`user/${email}`, password);
    }
}