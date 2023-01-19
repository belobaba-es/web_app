export interface HistoricTransactionsResponse {
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
}

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
