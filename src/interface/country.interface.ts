export interface Country {
  country_code: string
  country_id: string
  calling_code: string
  name: string
}

export interface State {
  country_id: string
  id: number
  name: string
}

export interface CountryAllowed {
  countryCode: string
  name: string
  counterpartyType: string
}

export interface StateUS {
  state_code: string
  name: string
  country_id: string
}
