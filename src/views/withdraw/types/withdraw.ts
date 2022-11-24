export interface WithdrawForm {
    name: string
    email: string,
    amount: string,
    reference: string,
    accountId: string,
    [key:string]: string
}