import { Pagination } from "../../../shared/types/pagination";

// export interface Beneficiary{
//     name: string,
//     email: string
// }


export interface Beneficiary {
    id:                  string;
    assetId:             string;
    assetTransferMethod: string;
    label:               string;
    walletAddress:       string;
    accountId:           string;
}


export interface BeneficiaryAssetsResponse  extends Pagination<Beneficiary> { }