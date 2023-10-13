import {ref} from "vue";
import {OnboardingPersonal, useOnboardingPersonalStore} from "../store/onboardingPersonal";




export const useOnboardingPersonal = () => {
    const onboardingPersonal = ref<OnboardingPersonal>({
        id: ''
    })

    const setOnboardingPersonal = () => {
        // validaciones del payload


        // llamo al store
        const store = useOnboardingPersonalStore()
        store.setOnboardingPersonal(onboardingPersonal.value)

        onboardingPersonal.value = store.onboardingPersonal
    }

    const getOnboardingPersonal = () => {
        const store = useOnboardingPersonalStore()
        onboardingPersonal.value = store.onboardingPersonal

        return onboardingPersonal.value
    }


    const fetchOnboardingPersonal = async (email: string) => {
        // llamo al API para buscar los datos del usuario
        // const response = await fetch(`https://api.github.com/users/${email}`)
        // const data = await response.json()
        // onboardingPersonal.value = data
        // useOnboardingPersonalStore().setOnboardingPersonal(onboardingPersonal.value)
    }


    return {
        onboardingPersonal,
        fetchOnboardingPersonal,
        setOnboardingPersonal,
        getOnboardingPersonal
    }
}
