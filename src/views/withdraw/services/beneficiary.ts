import { HttpService } from '../../../shared/services/http'
import {
  BeneficiariesInternalResponse,
  BeneficiaryAsset,
  BeneficiaryAssetsResponse,
  BeneficiaryType,
  RegisterCounterpartyAchPanama,
} from '../types/beneficiary.interface'
import { TypeBeneficiaryInternal } from '../composables/useBeneficiary'
import { UnwrapRef } from 'vue'

export class BeneficiaryService {
  async listBeneficiaryAssets(nextPag = 1): Promise<BeneficiaryAssetsResponse> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<BeneficiaryAssetsResponse>(
      `beneficiary/asset/${nextPag}`
    )
  }

  async listBeneficiaryBankingExternal(beneficiaryType: BeneficiaryType, nextPag = 1) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<any>(
      `beneficiary/banking/external/${nextPag === 0 ? 1 : nextPag}?withdrawalType=${beneficiaryType}`
    )
  }

  async listBeneficiaryInternal(type: TypeBeneficiaryInternal, nextPag = 1): Promise<BeneficiariesInternalResponse> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<BeneficiariesInternalResponse>(
      `beneficiary/${type}/internal/${nextPag === 0 ? 1 : nextPag}`
    )
  }

  async listBeneficiaryInternalV2(type: TypeBeneficiaryInternal, nextPag = 1): Promise<BeneficiariesInternalResponse> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v2`).get<BeneficiariesInternalResponse>(
      `beneficiary/internal/${nextPag === 0 ? 1 : nextPag}`
    )
  }

  async listBeneficiaryAchPanama(nextPag = 1) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<any>(
      `beneficiary/ach/pab/?type=EXTERNAL&page=${nextPag}`
    )
  }

  async saveBeneficiary(payload: any): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `beneficiary/banking`,
      payload
    )
  }

  async saveBeneficiaryAssets(payload: BeneficiaryAsset): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(`beneficiary/asset`, payload)
  }

  async saveBeneficiaryAchPanama(payload: UnwrapRef<RegisterCounterpartyAchPanama>): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `beneficiary/ach/pab`,
      payload
    )
  }
}
