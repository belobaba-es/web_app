export interface HistoricTransactionsResponse {
  nextPag: string; 
  prevPag: string;
  count: number;
  results: LisTransaction[]; 
}

export interface LisTransaction {
  _id: string;
  amount: number;
  assetId: string;
  clientId: string;
  counterparty: CounterpartyInfo;
  createdAt: string;
  isInternal: boolean;
  reference: string;
  status: WithdrawalStatusEnum;
  transactionId: string;
  transactionType: TransactionTypeEnum;
}

export interface CounterpartyInfo {
  id: string;
  clientId: string;
  counterpartyId: string;
  counterpartyType: string;
  informationOwner: {
    name: string;
    country: string;
  };
  informationWallet: {
    assetId: string;
    address: string;
    relationshipConsumer: string;
    originWallet: string;
  };
  createdAt: string;
}

export enum WithdrawalStatusEnum {
  Cancel = 'cancel',
  Pending = 'pending',
  Process = 'process',
}

export enum TransactionTypeEnum {
  DEPOSIT = 'deposit',
  WITHDRAW = 'withdraw-funds',
  REVERT = 'revert',
}


/*export interface HistoricTransactionsResponse {
  nextPag: string
  prevPag: string
  count: number
  results: LisTransaction[]
}

export interface LisTransaction {
  id: string
  createdAt: AtedAt
  status: Status
  accountId: string
  transactionType: string
  to: any
  amount: number
  assetCode: string
}

export interface AtedAt {
  _seconds: number
  _nanoseconds: number
}

export enum Status {
  Cancel = 'cancel',
  Pending = 'pending',
  Process = 'process',
}*/

// export enum Code {
//   Ada = 'ADA',
//   Btc = 'BTC',
//   Ltc = 'LTC',
//   Usdt = 'USDT',
// }

// export enum TransactionType {
//     Buy = "buy",
//     Sell = "sell",
// }
