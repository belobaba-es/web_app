import { WorldService } from "../shared/services/world";
import { ref, computed } from 'vue';

export interface Country {
    country_code: string;
    country_id:   string;
    calling_code: string;
    name:         string;
}

export interface State {
    country_id: string;
    id:         number;
    name:       string;
}

export enum CountryID {
    Usa = "USA",
}


export const useWorld = () => {
    const countries = ref<Country[]>([]);
    const states = ref<State[]>([]);
    const cities = ref([]);

    const country = ref<Country | null>(null);
    const state = ref<State | null>(null);

    const loadingCountiesField = ref<boolean>(false);
    const loadingCitiesField = ref<boolean>(false);
    const loadingStatesField = ref<boolean>(false);

    const statesInputIsEmpty = computed<boolean>(() => states.value.length === 0);
    const citiesInputIsEmpty = computed<boolean>(() => cities.value.length === 0);
    const countriesInputIsEmpty = computed<boolean>(() => countries.value.length === 0);

    const fetchCountries = async () => {
        loadingCountiesField.value = true;
        const worldService = WorldService.instance();
        await worldService.getCountries()
            .then(resp => {
                countries.value = resp;
                loadingCountiesField.value = false;
            })
    }

    const fetchStates = async () => {
        loadingStatesField.value = true;
        const worldService = WorldService.instance();
        if(!country.value?.country_code) return;
        await worldService.getStates(country.value?.country_code)
            .then(resp => {
                states.value = resp;
                loadingStatesField.value = false;
            })
    }

    const fetchCities = async () => {
        loadingCitiesField.value = true;
        const worldService = WorldService.instance();
        if(!country.value?.country_code) return;
        if(!state.value?.id) return;
        await worldService.getCities(country.value?.country_code, state.value?.id)
            .then(resp => {
                cities.value = resp;
                loadingCitiesField.value = false;
            })
    }

    const setCountry = (payload:Country) => {
        country.value = payload;
    }

    const setState = (payload:State) => {
        state.value = payload;
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
        setState
    }
}