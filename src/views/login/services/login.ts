import { HttpService } from '../../../shared/services/http';
import { LoginResponse } from '../types/login.interface';



export class LoginService extends HttpService {
    private static _instance: LoginService;

    constructor() {
        // @ts-ignore
        super(import.meta.env.VITE_BASE_ENDPOINT);
    }

    static instance() {
        if (this._instance) {
            return this._instance;
        }

        this._instance = new LoginService();

        return this._instance;
    }
    async login (email: string, password: string): Promise<LoginResponse> {
        
        const resp = await this.post<LoginResponse>(`user/login/`, {email, password});
        this.setToken(resp.data.token)
        return resp
    }
    
    async logout (): Promise<void> {
        this.removeTokens();
    }
}