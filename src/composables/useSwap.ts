import { useSwapStore } from "../stores/swap"
import { storeToRefs } from "pinia";
import successIcon from '../assets/icons/success.svg';
import swapOneArrowIcon from '../assets/icons/swap-one-arrow.svg';

export const useSwap = () => {
    const swapStore = useSwapStore();
    const swap = storeToRefs(swapStore);

    return { ...swap, successIcon, swapOneArrowIcon }
}