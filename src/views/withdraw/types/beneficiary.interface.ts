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


interface IntermediaryBank {
    bankCity:                      string;
    intermediaryBankCountry:       string;
    intermediaryBankCity:          string;
    bankPostalCode:                string;
    intermediaryBankPostalCode:    string;
    nameBank:                      string;
    intermediaryBankState:         string;
    swiftCode:                     string;
    intermediaryBankBName:         string;
    intermediaryBankStreetTwo:     string;
    intermediaryBankAccountNumber: string;
    intermediaryBankStreetOne:     string;
    bankCountry:                   string;
    intermediaryNumber:            string;
    bankState:                     string;
    bankStreetTwo:                 string;
    bankStreetOne:                 string;
    intermediaryNumberType:        string;
    
}

export interface BeneficiaryFiat {
    id:                            string;
    city:                          string;
    routingNumber:                 string;
    country:                       string;
    streetTwo:                     string;
    realName:                      string;
    accountNumber:                 string;
    streetOne:                     string;
    postalCode:                    string;
    accountId:                     string;
    state:                         string;
    typeBeneficiaryBankWithdrawal: string;
}

export interface BeneficiaryFiatInternacional extends BeneficiaryFiat {
    intermediaryBank:              IntermediaryBank;
    iban:                          string;
    typeBeneficiaryBankWithdrawal: string;
}

export interface BeneficiaryFiatDomestic extends BeneficiaryFiat{
    fundsTransferMethods:         string
}

export interface BeneficiaryFiatInternacionalResp  extends Pagination<BeneficiaryFiatInternacional> { }

export interface BeneficiaryFiatDomesticResp  extends Pagination<BeneficiaryFiatDomestic> { }