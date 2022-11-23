import { HttpService } from '../../../shared/services/http';
import { BeneficiaryAssetsResponse } from '../types/beneficiary.interface';



export class BeneficiaryService extends HttpService {
    private static _instance: BeneficiaryService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new BeneficiaryService();

        return this._instance;
    }

    async listBeneficiaryAssets(): Promise<BeneficiaryAssetsResponse>{
        return await this.get<BeneficiaryAssetsResponse>(`beneficiary/asset/`);
    }

    // async bankData (accountId: string): Promise<BankData[]> {
    //     return await this.get<BankData[]>(`banking/bank-data/${accountId}`);
    // }
    
    
}