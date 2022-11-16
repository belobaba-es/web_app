import axios, { AxiosInstance } from "axios";
import { CryptoService } from "./crypto";

export abstract class HttpService {
  private client: AxiosInstance;
  private cryptoService;

  constructor(urlAPI: string) {
    this.client = axios.create({
      baseURL: urlAPI,
    });

    this.cryptoService = new CryptoService;
  }

  private async authAPI() {
    const response = await this.post<any>("/auth", {}, false);
    sessionStorage.setItem("noba", this.cryptoService.encrypt(response.token));
    return response.token;
  }

  protected setToken(token: string) {
    sessionStorage.setItem("noba", this.cryptoService.encrypt(token));
  }

  

  public async getToken<T>(): Promise<string | undefined> {
    const token = sessionStorage.getItem("noba");
    if (!token) {
      return undefined;
    }
    return this.cryptoService.decrypt(token);
  }

  private async getHeader(method: string, isFormData: boolean = false) {
    let token = await this.getToken();
    if (!token) {
      // token = await this.authAPI();
      token = ''
    }
    const type = isFormData ? "multipart/form-data" : "application/json";
    return {
      headers: {
        "Content-Type": type,
        Authorization: "Bearer " + token,
        Origin: window.origin,
      },
    };
  }

  public async post<T>(
    url: string,
    form: any,
    isPrivate: boolean = true,
    isFormData: boolean = false
  ): Promise<T> {
    let headerRequest: any;
    if (isPrivate) {
      headerRequest = await this.getHeader("POST", isFormData);
    } else {
      headerRequest = {};
    }

    const response = await this.client.post(url, form, headerRequest);

    return response.data as T;
  }

  public async get<T>(url: string, dados = {}, isPrivate = true): Promise<T> {
    let data: any;
    if (isPrivate) {
      data = await this.client.get(url, await this.getHeader("GET"));
    } else {
      data = await this.client.get(url, dados);
    }

    return data.data.data as T;
  }
}