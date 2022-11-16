import { HttpService } from '../../../shared/services/http';
import { AssetResponse } from '../types/asset.interface';


export class AssetsService extends HttpService {
    private static _instance: AssetsService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new AssetsService();

        return this._instance;
    }
    async list (): Promise<AssetResponse> {
        return await this.get<AssetResponse>(`assets/`);
    }
    
    
}