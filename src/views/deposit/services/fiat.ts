import { HttpService } from '../../../shared/services/http'
import { Asset } from '../types/asset.interface'
import { BankData } from '../types/fiat.interface'

export class FiatService {
  async bankData(): Promise<BankData[]> {
    return await new HttpService(import.meta.env.VITE_BASE_ENDPOINT).get<BankData[]>(`banking/instruction-for-deposit/`)
  }
}
