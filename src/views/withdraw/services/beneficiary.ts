import { HttpService } from '../../../shared/services/http'
import { RegisterCounterpartyAchPanama } from '../type/beneficiary.type'
import { FilterListBeneficiary } from '../type/filterListBeneficiary.type'
import { BeneficiariesInternalResponse } from '../interface/beneficiary.interface'
import { CounterpartyType } from '../enums/beneficiary.enum'

export class BeneficiaryService {
  async listBeneficiaryBankingUsa(filters: FilterListBeneficiary) {
    let url = `beneficiary/banking/`
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<any>(url, { ...filters })
  }

  async listBeneficiaryAchPanama(filters: FilterListBeneficiary) {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).get<any>(
      `beneficiary/ach/pab/?type=EXTERNAL`,
      { ...filters }
    )
  }

  async listBeneficiaryFiatInternal(filters: FilterListBeneficiary): Promise<BeneficiariesInternalResponse> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v2`).get<BeneficiariesInternalResponse>(
      `beneficiary/internal/${CounterpartyType.FIAT}`,
      { ...filters }
    )
  }

  async saveBeneficiary(payload: any): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `beneficiary/banking`,
      payload
    )
  }

  async saveBeneficiaryAchPanama(payload: RegisterCounterpartyAchPanama): Promise<any> {
    return await new HttpService(`${import.meta.env.VITE_BASE_ENDPOINT}/api/v1`).post<any>(
      `beneficiary/ach/pab`,
      payload
    )
  }
}
