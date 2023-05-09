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

  async listBeneficiaryAssets(nextPag: string = ''): Promise<BeneficiaryAssetsResponse> {
    return await this.get<BeneficiaryAssetsResponse>(`beneficiary/asset/?${nextPag}`)
  }

  async listBeneficiary(beneficiaryType: BeneficiaryType, nextPag: string = '') {
    return await this.get<BeneficiaryFiatInternacionalResp | BeneficiaryFiatInternacionalResp>(
      `beneficiary?typeBeneficiaryTransfer=${beneficiaryType}&${nextPag}`
    )
  }

  async listBeneficiaryInternal(type: TypeBeneficiaryInternal, nextPag = 1): Promise<BeneficiariesInternalResponse> {
    return await this.get<BeneficiariesInternalResponse>(`beneficiary/internal/${type}/${nextPag === 0 ? 1 : nextPag}`)
  }

  async saveBeneficiaryDomestic(payload: BeneficiaryFiatDomestic): Promise<any> {
    return await this.post<any>(`beneficiary/domestic`, payload)
  }

  async saveBeneficiaryInternational(payload: BeneficiaryFiatInternacional): Promise<any> {
    return await this.post<any>(`beneficiary/international`, payload)
  }

  async saveBeneficiaryAssets(payload: BeneficiaryAsset): Promise<any> {
    return await this.post<any>(`beneficiary/asset/`, payload)
  }
}
