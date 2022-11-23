
import { HttpService } from '../../../shared/services/http';

export class AccountService extends HttpService {
    private static _instance: AccountService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new AccountService();

        return this._instance;
    }
    
    async getAccountByEmail (email: string | string[]): Promise<any> {
        return await this.get<any>(`/account/owner-email/${email}`);
    }
    
    
}