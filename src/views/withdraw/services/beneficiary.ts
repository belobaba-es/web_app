import { HttpService } from '../../../shared/services/http';
import {
    Beneficiary,
    BeneficiaryAsset,
    BeneficiaryAssetsResponse,
    BeneficiaryFiatDomestic,
    BeneficiaryFiatDomesticResp,
    BeneficiaryFiatInternacional,
    BeneficiaryFiatInternacionalResp, BeneficiaryType
} from '../types/beneficiary.interface';



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

    async listBeneficiaryAssets(nextPag: string = ""): Promise<BeneficiaryAssetsResponse>{
        return await this.get<BeneficiaryAssetsResponse>(`beneficiary/asset/?${nextPag}`);
    }

    async listBeneficiary(beneficiaryType: BeneficiaryType, nextPag: string = "") {
        return await this.get<BeneficiaryFiatInternacionalResp | BeneficiaryFiatInternacionalResp>(
            `beneficiary?typeBeneficiaryTransfer=${beneficiaryType}&${nextPag}`
        );
    }
    
    async saveBeneficiaryDomestic(payload: BeneficiaryFiatDomestic): Promise<any>{
        return await this.post<any>(`beneficiary/domestic`, payload)
    }
    
    async saveBeneficiaryInternational(payload: BeneficiaryFiatInternacional): Promise<any>{
        return await this.post<any>(`beneficiary/international`, payload)
    }
    
    async saveBeneficiaryAssets(payload: BeneficiaryAsset): Promise<any>{
        return await this.post<any>(`beneficiary/asset/`, payload);
    }
    
}