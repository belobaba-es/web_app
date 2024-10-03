import { ref } from 'vue'

const showsStepTwoFirstPart = ref(true)
const isShowRestFormBankData = ref(false)
const isShowRestFormIntermediary = ref(false)
export const useBeneficiary = () => {
  return {
    showsStepTwoFirstPart,
    isShowRestFormBankData,
    isShowRestFormIntermediary,
  }
}
