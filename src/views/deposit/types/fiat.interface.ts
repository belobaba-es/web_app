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

export interface BankData {
  domestic: bankInstructionDetail
  international: bankInstructionDetail
  achInstructions?: InstructionsAchPabType
}


/*
export interface BankData {
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
 */