import { ref } from 'vue'
import { useI18n } from 'vue-i18n'

export const useInvestment = () => {
  const { t } = useI18n({ useScope: 'global' })

  const investmentData = ref({
    primary_source_of_funds: {
      values: [
        { name: t('employment'), value: 'EMPLOYMENT' },
        { name: t('saving'), value: 'SAVINGS' },
        { name: t('winning'), value: 'WINNINGS' },
        { name: t('marital'), value: 'MARITAL' },
        { name: t('realEstate'), value: 'REAL_ESTATE' },
        { name: t('trust'), value: 'TRUST' },
        { name: t('investment'), value: 'INVESTMENT' },
        { name: t('other'), value: 'OTHER' },
        { name: t('company'), value: 'COMPANY' },
        { name: t('companyCapital'), value: 'COMPANY_CAPITAL' },
        { name: t('loan'), value: 'LOAN' },
        { name: t('privateCapital'), value: 'PRIVATE_CAPITAL' },
        { name: t('grant'), value: 'GRANT' },
      ],
      label: t('primarySourceOfFunds'),
    },
    usd_value_of_fiat: {
      values: [
        { name: t('upto10k'), value: 'UPTO_10K' },
        { name: t('10kto100k'), value: 'TEN_TO_100K' },
        { name: t('100kto1m'), value: 'ONEHUNDREDK_TO_1M' },
        { name: t('1mto10m'), value: 'ONE_TO_10M' },
        { name: t('10mto50m'), value: 'TEN_TO_50M' },
        { name: t('50mto250m'), value: 'FIFTY_TO_250M' },
        { name: t('moreThan250m'), value: 'MORE_THAN_250M' },
      ],
      label: t('usdValueOfFiat'),
    },
    usd_value_of_crypto: {
      values: [
        { name: t('upto10k'), value: 'UPTO_10K' },
        { name: t('10kto100k'), value: 'TEN_TO_100K' },
        { name: t('100kto1m'), value: 'ONEHUNDREDK_TO_1M' },
        { name: t('1mto10m'), value: 'ONE_TO_10M' },
        { name: t('10mto50m'), value: 'TEN_TO_50M' },
        { name: t('50mto250m'), value: 'FIFTY_TO_250M' },
        { name: t('moreThan250m'), value: 'MORE_THAN_250M' },
      ],
      label: t('usdValueOfCrypto'),
    },
    monthly_deposits: {
      values: [
        { name: t('upto5'), value: 'UPTO_5' },
        { name: t('5to50'), value: 'FIVE_TO_10' },
        { name: t('10to25'), value: 'TEN_TO_25' },
        { name: t('moreThan25'), value: 'MORE_THAN_25' },
      ],
      label: t('monthlyDeposits'),
    },
    monthly_crypto_deposits: {
      values: [
        { name: t('upto5'), value: 'UPTO_5' },
        { name: t('5to50'), value: 'FIVE_TO_10' },
        { name: t('10to25'), value: 'TEN_TO_25' },
        { name: t('moreThan25'), value: 'MORE_THAN_25' },
      ],
      label: t('monthlyCryptoDeposits'),
    },
    monthly_investment_deposit: {
      values: [
        { name: t('upto1k'), value: 'UPTO_1K' },
        { name: t('1kto100k'), value: 'ONE_TO_100K' },
        { name: t('100kto1m'), value: 'ONEHUNDREDK_TO_1M' },
        { name: t('1mto5m'), value: 'MILLION_TO_5M' },
        { name: t('moreThan5m'), value: 'MORE_THAN_5M' },
      ],
      label: t('monthlyInvestmentDeposit'),
    },
    monthly_crypto_investment_deposit: {
      values: [
        { name: t('upto1k'), value: 'UPTO_1K' },
        { name: t('1kto100k'), value: 'ONE_TO_100K' },
        { name: t('100kto1m'), value: 'ONEHUNDREDK_TO_1M' },
        { name: t('1mto5m'), value: 'MILLION_TO_5M' },
        { name: t('moreThan5m'), value: 'MORE_THAN_5M' },
      ],
      label: t('monthlyCryptoInvestmentDeposit'),
    },
    monthly_withdrawals: {
      values: [
        { name: t('upto5'), value: 'UPTO_5' },
        { name: t('5to50'), value: 'FIVE_TO_10' },
        { name: t('10to25'), value: 'TEN_TO_25' },
        { name: t('moreThan25'), value: 'MORE_THAN_25' },
      ],
      label: t('monthlyWithdrawals'),
    },
    monthly_crypto_withdrawals: {
      values: [
        { name: t('upto5'), value: 'UPTO_5' },
        { name: t('5to50'), value: 'FIVE_TO_10' },
        { name: t('10to25'), value: 'TEN_TO_25' },
        { name: t('moreThan25'), value: 'MORE_THAN_25' },
      ],
      label: t('monthlyCryptoWithdrawals'),
    },
    monthly_investment_withdrawal: {
      values: [
        { name: t('upto1k'), value: 'UPTO_1K' },
        { name: t('1kto100k'), value: 'ONE_TO_100K' },
        { name: t('100kto1m'), value: 'ONEHUNDREDK_TO_1M' },
        { name: t('1mto5m'), value: 'MILLION_TO_5M' },
        { name: t('moreThan5m'), value: 'MORE_THAN_5M' },
      ],
      label: t('monthlyInvestmentWithdrawal'),
    },
    monthly_crypto_investment_withdrawal: {
      values: [
        { name: t('upto1k'), value: 'UPTO_1K' },
        { name: t('1kto100k'), value: 'ONE_TO_100K' },
        { name: t('100kto1m'), value: 'ONEHUNDREDK_TO_1M' },
        { name: t('1mto5m'), value: 'MILLION_TO_5M' },
        { name: t('moreThan5m'), value: 'MORE_THAN_5M' },
      ],
      label: t('monthlyCryptoInvestmentWithdrawal'),
    },
  })

  const engageInActivities = ref([
    { value: 'NONE', name: t('none') },
    { value: 'ADULT_ENTERTAINMENT', name: t('adultEntertainment') },
    { value: 'DRUGS', name: t('drugs') },
    { value: 'FIREARMS', name: t('firearms') },
    { value: 'GAMBLING', name: t('gambling') },
    { value: 'MARIJUANA', name: t('marijuana') },
    { value: 'TUMBLING', name: t('tumbling') },
  ])

  return {
    investmentData,
    engageInActivities,
  }
}
