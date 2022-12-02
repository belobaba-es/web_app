import { WorldService } from '../shared/services/world'
import { computed, ref } from 'vue'
import { DropdownChangeEvent } from 'primevue/dropdown'

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

export enum CountryID {
  Usa = 'USA',
}

export const useWorld = () => {
  const countries = ref<Country[]>([])
  const states = ref<State[]>([])
  const cities = ref([])

  const country = ref<Country | null>(null)
  const state = ref<State | null>(null)

  const loadingCountiesField = ref<boolean>(false)
  const loadingCitiesField = ref<boolean>(false)
  const loadingStatesField = ref<boolean>(false)

  const statesInputIsEmpty = computed<boolean>(() => states.value.length === 0)
  const citiesInputIsEmpty = computed<boolean>(() => cities.value.length === 0)
  const countriesInputIsEmpty = computed<boolean>(() => countries.value.length === 0)

  const fetchCountries = async () => {
    loadingCountiesField.value = true
    const worldService = WorldService.instance()
    await worldService.getCountries().then(resp => {
      countries.value = resp
      loadingCountiesField.value = false
    })
  }

  const fetchStates = async () => {
    loadingStatesField.value = true
    const worldService = WorldService.instance()
    if (!country.value?.country_id) return
    await worldService.getStates(country.value?.country_id).then(resp => {
      states.value = resp
      loadingStatesField.value = false
    })
  }

  const fetchCities = async () => {
    loadingCitiesField.value = true
    const worldService = WorldService.instance()
    if (!country.value?.country_id) return
    if (!state.value?.id) return
    await worldService.getCities(country.value?.country_id, state.value?.id).then(resp => {
      cities.value = resp
      loadingCitiesField.value = false
    })
  }

  const setCountry = (payload: Country) => {
    country.value = payload
  }

  const setState = (payload: State) => {
    state.value = payload
  }

  const onChangeCountryHandler = async (event: DropdownChangeEvent) => {
    const country = countries.value.find(country => country.country_code === event.value)
    console.log('bank', country, event, countries)
    if (!country) return
    setCountry(country)
    await fetchStates()
  }

  const onChangeStateHandler = async (event: DropdownChangeEvent) => {
    const state = states.value.find(state => state.name === event.value)
    if (!state) return
    setState(state)
    await fetchCities()
  }

  return {
    countries,
    states,
    cities,
    statesInputIsEmpty,
    citiesInputIsEmpty,
    countriesInputIsEmpty,
    loadingCountiesField,
    loadingCitiesField,
    loadingStatesField,
    country,
    state,
    fetchCountries,
    fetchStates,
    fetchCities,
    setCountry,
    setState,
    onChangeCountryHandler,
    onChangeStateHandler,
  }
}
