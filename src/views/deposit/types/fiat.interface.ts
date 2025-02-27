export type bankInstructionDetail = {
  id: string
  swiftCode: string
  reference: string
  accountNumber: string
  bankName: string
  routingNumber: string
  creditTo: string
  bankAddress: string
  address: string
  typeBankingData: string
  bankPhone: string
  accountId?: string
}

export type InstructionsAchPabType = {
  id?: string
  label: string
  holderName: string
  holderEmail: string
  holderId: string
  bankName: string
  accountDestinationNumber: string
  productType: string
  concept: string
}

export type AchUsdBankInstructionDetail = {
  holderName: string
  accountNumber: string
  accountRoutingNumber: string
  memo: string
}

export interface BankData {
  domestic: bankInstructionDetail
  international?: bankInstructionDetail
  achUsd: AchUsdBankInstructionDetail
  achPab?: InstructionsAchPabType
}
