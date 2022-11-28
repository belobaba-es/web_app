
import { useToast } from 'primevue/usetoast';
import { ref, computed } from 'vue';
import { useRouter } from 'vue-router';
import { BeneficiaryService } from '../services/beneficiary';
import { WithdrawForm } from '../types/withdraw';



export const useWithdraw = (items: any) => {
    const listBeneficiary = ref<any[]>([])
    const formObject = ref<WithdrawForm | any>({});
    const router = useRouter();
    const toast = useToast();
    
    const nextStepPage = (event: any)  => {
        for (let field in event.formData) {
            formObject.value[field] = event.formData[field];
        }
        console.log(formObject, 'nextpage')
        router.push(items.value[event.pageIndex + 1].to);
    };
    const prevStepPage = (event:any) => {
        router.push(items.value[event.pageIndex - 1].to);
    };

    const stepComplete = () => {
        toast.add({severity:'success', summary:'Order submitted', detail: 'Dear, ' + formObject.value.firstname + ' ' + formObject.value.lastname + ' your order completed.'});
    };

    const beneficiaryService = BeneficiaryService.instance();
    beneficiaryService.listBeneficiaryDomestic().then(resp=>{
        listBeneficiary.value = resp.results
    })

    const fetchBeneficiaries = async () => {
        const beneficiaryService = BeneficiaryService.instance()
        await beneficiaryService.listBeneficiaryDomestic()
        .then(resp=>{
            listBeneficiary.value = resp.results
        })
    }


   

    return {
        formObject,
        listBeneficiary,
        fetchBeneficiaries,
        nextStepPage,
        prevStepPage,
        stepComplete
    }
}