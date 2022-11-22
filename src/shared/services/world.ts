import { HttpService } from "./http";

export class WorldService extends HttpService {
    private static _instance: WorldService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new WorldService();

        return this._instance;
    }
    
    async getCountries(): Promise<any> {
        return await this.get(`world/countries`);
    }

    async getStates(countryId: string): Promise<any> {
        return await this.get(`world/states/${countryId}`);
    }
    
    async getCities(countryId: string, stateId: number): Promise<any> {
        return await this.get(`world/cities/${countryId}/${stateId}`);
    }
}