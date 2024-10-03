import { TableFilter } from '../type/beneficiary.type'
import {
  BeneficiariesInternalResponse,
  BeneficiaryAsset,
  BeneficiaryAssetsResponse,
} from '../interface/beneficiary.interface'
import { HttpService } from '../../../shared/services/http'
import { FilterListBeneficiary } from '../type/filterListBeneficiary.type'
import { CounterpartyType } from '../enums/beneficiary.enum'

export class BeneficiaryCryptoService {
  async listBeneficiaryAssets(filters: TableFilter): Promise<BeneficiaryAssetsResponse> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<BeneficiaryAssetsResponse>(
      `beneficiary/asset/external`,
      { ...filters }
    )
  }

  async listBeneficiaryAssetsInternal(filters: FilterListBeneficiary): Promise<BeneficiariesInternalResponse> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v2`).get<BeneficiariesInternalResponse>(
      `beneficiary/internal/${CounterpartyType.CRYPTO}`,
      { ...filters }
    )
  }

  async saveBeneficiaryAssets(payload: BeneficiaryAsset): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(`beneficiary/asset`, payload)
  }
}
