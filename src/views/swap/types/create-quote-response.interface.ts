// Generated by https://quicktype.io

export interface CreateQuoteResponse {
    message: string;
    data:    Data;
}

export interface Data {
    quoteId:           string;
    amount:            string;
    amountIsUnitCount: boolean;
    transactionType:   string;
    assetId:           string;
    accountId:         string;
    status:            string;
    baseAmount:        number;
    feeAmount:         number;
    totalAmount:       number;
    unitCount:         number;
}