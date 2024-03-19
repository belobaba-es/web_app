import { HttpService } from './http'

export class WorldService {
  async getCountries(): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get(`world/countries`, {}, false)
  }

  async getStates(countryId: string): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get(`world/states/${countryId}`)
  }

  async getCountryAllowedForUsa(): Promise<any> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get(`banking/countries-allowed-for-usa`)
  }
}
