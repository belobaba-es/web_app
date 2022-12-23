
export interface LoginResponse {
    message: string;
    data:    LoginData;
}

export interface LoginData {
    active:       boolean;
    accountId:    string;
    email:        string;
    token:        string;
    country:      string;
    postalCode:   string;
    region:       string;
    middleName:   string;
    firstName:    string;
    contactId:    string;
    phoneCountry: string;
    city:         string;
    taxId:        string;
    label:        string;
    streetOne:    string;
    phoneNumber:  string;
    phoneSMS:     boolean;
    contactType:  string;
    lastName:     string;
    dateBirth:    string;
    taxCountry:   string;
    streetTwo:    string;
    account:      Account;

}

export interface Account {
    kyc: any[];
    accountId: string;
    status:    string;
}
