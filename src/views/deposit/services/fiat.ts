import { HttpService } from '../../../shared/services/http';
import {  Asset } from '../types/asset.interface';
import { BankData } from '../types/fiat.interface';


export class FiatService extends HttpService {
    private static _instance: FiatService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new FiatService();

        return this._instance;
    }
    async bankData (accountId: string): Promise<BankData[]> {
        return await this.get<BankData[]>(`banking/bank-data/${accountId}`);
    }
    
    
}