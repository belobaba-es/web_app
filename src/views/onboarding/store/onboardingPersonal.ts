import {defineStore} from "pinia";

export type OnboardingPersonal = {
    id: string
}

export const useOnboardingPersonalStore = defineStore('onboardingPersonal', {
    state: (): { onboardingPersonal: OnboardingPersonal } => ({
        onboardingPersonal: {
            id: ''
        },
    }),
    actions: {
        setOnboardingPersonal(payload: OnboardingPersonal) {
            this.onboardingPersonal = payload
        }
    }
})