import { WorldService } from '../shared/services/world'
import { computed, Ref, ref } from 'vue'
import { DropdownChangeEvent } from 'primevue/dropdown'
import state_data from '../assets/cities/cities_us.json'
import { Country, CountryAllowed, State, StateUS } from '../interface/country.interface'

const countries = ref<Country[]>([])
const state_us = ref<StateUS[]>(state_data)
const countryAllowedForUSA = ref<CountryAllowed[]>([])

export const useWorld = () => {
  const calling_code = ref<string[]>([''])

  const states = ref<State[]>([])
  const statesTwo = ref<State[]>([])

  const country = ref<Country | null>(null)
  const state = ref<State | null>(null)

  const loadingCountriesField = ref<boolean>(false)
  const loadingStatesField = ref<boolean>(false)
  const loadingStatesFieldTwo = ref<boolean>(false)

  const statesInputIsEmpty = computed<boolean>(() => states.value.length === 0)
  const countriesInputIsEmpty = computed<boolean>(() => countryAllowedForUSA.value.length === 0)

  const findCountryByCodeCountry = (codeCountry: string) => {
    return countryAllowedForUSA.value.find(c => c.countryCode == codeCountry)
  }

  const fetchCountries = async () => {
    loadingCountriesField.value = true

    new WorldService().getCountries().then((resp: Country[]) => {
      countries.value = resp
      countries.value = countries.value.sort((a, b) => a.name.localeCompare(b.name))

      const arrayCallingCode = resp.map(c => c.calling_code).sort()
      calling_code.value = [...new Set(arrayCallingCode)]

      loadingCountriesField.value = false
    })
  }

  const fetchCountryAllowUsa = async () => {
    // Fetch countries layer
    loadingCountriesField.value = true
    new WorldService().getCountryAllowedForUsa().then((resp: any) => {
      countryAllowedForUSA.value = resp
      countryAllowedForUSA.value = countryAllowedForUSA.value.sort((a, b) => a.name.localeCompare(b.name))
      loadingCountriesField.value = false
    })
  }

  const fetchStatesUS = async () => {
    return state_us
  }

  const fetchStates = async () => {
    loadingStatesField.value = true
    if (!country.value?.country_id) return
    await new WorldService().getStates(country.value?.country_id).then(resp => {
      states.value = resp
      loadingStatesField.value = false
    })
  }

  const setCountry = (payload: Country) => {
    country.value = payload
  }

  const setState = (payload: State) => {
    state.value = payload
  }

  const onChangeCountryHandler = (event: DropdownChangeEvent, showCombo: Ref) => {
    if (event.value == 'US') {
      showCombo.value = true
      return
    }

    showCombo.value = false
  }

  const onChangeStateHandler = async (event: DropdownChangeEvent) => {
    const state = states.value.find(state => state.name === event.value)
    if (!state) return
    setState(state)
  }

  return {
    countries,
    state_us,
    states,
    statesTwo,
    statesInputIsEmpty,
    countriesInputIsEmpty,
    loadingCountriesField,
    loadingStatesField,
    loadingStatesFieldTwo,
    country,
    state,
    calling_code,
    fetchStatesUS,
    fetchCountries,
    fetchStates,
    setCountry,
    setState,
    fetchCountryAllowUsa,
    onChangeCountryHandler,
    onChangeStateHandler,
    countryAllowedForUSA,
    findCountryByCodeCountry,
  }
}
