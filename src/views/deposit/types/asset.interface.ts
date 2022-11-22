export interface Asset {
    id:                string;
    icon:              string;
    assetId:           string;
    active:            boolean;
    updatedAt:         string;
    code:              string;
    name:              string;
    createdAt:         string;
    minimumWithdrawal: number;
    fee:               number;
    qr?:               string;
    paymentAddress:    string
}


export interface CreatePaymentAddress {
    assetCode: string;
    label:     string;
    asset?:    Asset
}


export interface CreatePaymentAddressResponse {
    paymentAddress: string;
    qr:             string;
}



export interface PaymentAddressResponse extends Pagination<PaymentAddress>{}

export interface Pagination<T> {
    nextPag: string;
    prevPag: string;
    count:   number;
    results: T[];
}

export interface PaymentAddress {
    label:     string;
    accountId: string;
    address:   string;
    assetsId:  string;
    qr?:       string;
}
