export enum ReasonRejectingTransaction {
  INVALID_CARD_NUMBER = 'INVALID_CARD_NUMBER',
  FORMAT_ERROR = 'FORMAT_ERROR',
  MAX_AMOUNT_EXCEEDED = 'MAX_AMOUNT_EXCEEDED',
  EXPIRED_CARD = 'EXPIRED_CARD',
  PIN_AUTHORIZATION_FAILED = 'PIN_AUTHORIZATION_FAILED',
  TRANSACTION_NOT_PERMITTED = 'TRANSACTION_NOT_PERMITTED',
  WITHDRAWL_AMOUNT_EXCEEDED = 'WITHDRAWL_AMOUNT_EXCEEDED',
  RESTRICTED_CARD = 'RESTRICTED_CARD',
  WITHDRAWL_COUNT_EXCEEDED = 'WITHDRAWL_COUNT_EXCEEDED',
  PIN_TRIES_NUMBER_EXCEEDED = 'PIN_TRIES_NUMBER_EXCEEDED',
  INCORRECT_PIN = 'INCORRECT_PIN',
  DUPLICATE_TRANSMISSION = 'DUPLICATE_TRANSMISSION',
  STATUS_BAD = 'STATUS_BAD',
  EXPIRY_MATCH_FAIL = 'EXPIRY_MATCH_FAIL',
  AVV_MATCH_FAIL = 'AVV_MATCH_FAIL',
  VALID_PERIOD_FAIL = 'VALID_PERIOD_FAIL',
  CUMULATIVE_LIMIT_FAIL = 'CUMULATIVE_LIMIT_FAIL',
  NUMBER_OF_USAGES_FAIL = 'NUMBER_OF_USAGES_FAIL',
  MCC_LIMIT_FAIL = 'MCC_LIMIT_FAIL',
  ISSUER_OR_NETWORK_DECLINE = 'ISSUER_OR_NETWORK_DECLINE',
  CRITICAL_FIELD_MISSING = 'CRITICAL_FIELD_MISSING',
  NO_AUTHORIZATION_FOR_REVERSAL = 'NO_AUTHORIZATION_FOR_REVERSAL',
  UNMATCHED_RESPONSE = 'UNMATCHED_RESPONSE',
  REVERSAL_OF_UNSUCCESSFUL_AUTHORIZATION = 'REVERSAL_OF_UNSUCCESSFUL_AUTHORIZATION',
  EXP_DATE_OF_CPN_USED_IS_EXPIRED = 'EXP_DATE_OF_CPN_USED_IS_EXPIRED',
  REPEAT_MESSAGE = 'REPEAT_MESSAGE',
  SYSTEM_ERROR = 'SYSTEM_ERROR',
  APPROVE_CONTROL_FAIL = 'APPROVE_CONTROL_FAIL',
  NO_RULES_FAIL = 'NO_RULES_FAIL',
  NO_CONTROLS_FAIL = 'NO_CONTROLS_FAIL',
  UNKNOWN_CONTROL_TYPE_FAIL = 'UNKNOWN_CONTROL_TYPE_FAIL',
  SVC_NOT_ENABLED = 'SVC_NOT_ENABLED',
}
