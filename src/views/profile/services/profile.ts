import { HttpService } from '../../../shared/services/http';
import { AccountByIDResponse } from '../types/account-by-id-response.interface';

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
    
    async getAccountByID (accountID: string | string[]): Promise<AccountByIDResponse> {
        return await this.get<AccountByIDResponse>(`account/${accountID}`);
    }
    
}