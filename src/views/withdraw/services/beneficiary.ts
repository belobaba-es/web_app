import { HttpService } from '../../../shared/services/http'
import {
  BeneficiariesInternalResponse,
  Beneficiary,
  BeneficiaryAsset,
  BeneficiaryAssetsResponse,
  BeneficiaryFiatDomestic,
  BeneficiaryFiatDomesticResp,
  BeneficiaryFiatInternacional,
  BeneficiaryFiatInternacionalResp,
  BeneficiaryInternal,
  BeneficiaryType,
} from '../types/beneficiary.interface'
import { TypeBeneficiaryInternal } from '../composables/useBeneficiary'

export class BeneficiaryService extends HttpService {
  private static _instance: BeneficiaryService

  constructor() {
    // @ts-ignore
    super(import.meta.env.VITE_BASE_ENDPOINT)
  }

  static instance() {
    if (this._instance) {
      return this._instance
    }

    this._instance = new BeneficiaryService()

    return this._instance
  }

  async listBeneficiaryAssets(nextPag = 1): Promise<BeneficiaryAssetsResponse> {
    return await this.get<BeneficiaryAssetsResponse>(`beneficiary/asset/${nextPag}`)
  }

  async listBeneficiary(beneficiaryType: BeneficiaryType, nextPag = 1) {
    return await this.get<any>(
      `beneficiary/${nextPag}?typeBeneficiaryTransfer=${beneficiaryType}`
    )
  }

  async listBeneficiaryInternal(type: TypeBeneficiaryInternal, nextPag = 1): Promise<BeneficiariesInternalResponse> {
    return await this.get<BeneficiariesInternalResponse>(`beneficiary/internal/${type}/${nextPag === 0 ? 1 : nextPag}`)
  }
  async saveBeneficiary(payload: any): Promise<any> {
    return await this.post<any>(`beneficiary/banking`, payload)
  }

  async saveBeneficiaryAssets(payload: BeneficiaryAsset): Promise<any> {
    return await this.post<any>(`beneficiary/asset`, payload)
  }
}
