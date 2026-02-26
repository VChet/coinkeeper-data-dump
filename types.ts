interface Transaction {
  id: string
  importedTransactionId: null
  userId: string
  dateTimestamp: number
  dateTimestampISO: Date
  defaultAmount: number
  deleted: boolean
  createdTimestamp: number
  createdTimestampISO: Date
  timestamp: number
  timestampISO: Date
  sourceId: string
  sourceType: number
  sourceAmount: number
  destinationId: string
  destinationType: number
  destinationAmount: number
  tags: unknown[]
  comment: string
  debtPaymentAmount: number
  debtorCreditor: string | null
  debtDeadLine: number
  debtDeadLineISO: Date
  debtPaymentDate: number
  debtPaymentDateISO: Date
  debtPaymentTransactionId: null | string
  duplicated: boolean
  processed: boolean
  isComplete: boolean | null
  repeatingParentId: null | string
  counter: number
}
export interface Data {
  transactions: Transaction[]
  importedTransactions: unknown[]
  hasMoreData: boolean
}
