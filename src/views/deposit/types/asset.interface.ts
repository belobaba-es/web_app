export interface Asset {
    id:                string;
    assetId:           string;
    active:            boolean;
    updatedAt:         string;
    code:              string;
    name:              string;
    createdAt:         string;
    minimumWithdrawal: number;
    fee:               number;
}