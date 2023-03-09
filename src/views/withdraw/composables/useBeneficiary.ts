import {BeneficiaryService} from "../services/beneficiary";
import {ref} from "vue";
import {BeneficiaryType} from "../types/beneficiary.interface";

export const useBeneficiary = () => {
    const listBeneficiary = ref<any[]>([])
    const listNextPag = ref("")
    const submitting = ref(false)


    const fetchBeneficiaries = async (beneficiaryType: BeneficiaryType) => {
        submitting.value = true

        const beneficiaryService = BeneficiaryService.instance()
        await beneficiaryService.listBeneficiary(beneficiaryType, listNextPag.value).then(resp => {
            resp.results.forEach(element => {
                console.log(element)
                listBeneficiary.value.push(element)
            })
            submitting.value = false
            listNextPag.value = resp.nextPag.replace("?", "")
        })
    }

    return {
        submitting,
        listNextPag,
        listBeneficiary,
        fetchBeneficiaries
    }
}