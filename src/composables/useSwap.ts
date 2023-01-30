import { useSwapStore } from "../stores/swap"
import { storeToRefs } from "pinia";
import successIcon from '../assets/icons/success.svg';

export const useSwap = () => {
    const swapStore = useSwapStore();
    const swap = storeToRefs(swapStore);

    return { ...swap, successIcon }
}