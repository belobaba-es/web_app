<template>
    <div class="flex-row mb-3">
        <div class="flex justify-content-between align-items-center">
            <template v-if="type === 'fiat'">
                <span>
                    {{ t('iHave') }}: <span class="font-medium">{{ balance }}</span>
                </span>
            </template>
            <template v-else>
                <span>
                    {{ t('iWant') }}: <span class="font-medium"></span>
                </span>
            </template>
        </div>
        <div class="p-3 mt-2 border-1 border-primary-100 border-solid border-round-lg bg-gray-100 flex align-items-center justify-content-between">
            <div class="input-mount">
                <template v-if="type === 'fiat'">
                    <InputNumber v-model="amount" mode="decimal" :max-fraction-digits="2" :min-fraction-digits="2" />
                </template>
                <template v-else>
                    <InputNumber v-model="unitCount" mode="decimal" :max-fraction-digits="8" :min-fraction-digits="8" readonly />
                </template>
            </div>
            <div>
                <template v-if="type === 'crypto'">
                    <Button type="button" class="bg-white border-none border-round-3xl" @click="openModalSelector" :disabled="amount === 0.00">
                        <img v-if="assetIcon" alt="logo" :src="assetIcon" style="width: 3.5rem" />
                        <span class="ml-2 font-medium text-black-alpha-70 mx-3">{{ assetName ? assetName : t('selectCrypto') }}</span>
                        <i class="pi pi-caret-down text-primary"></i>
                    </Button>
                </template>
                <template v-else>
                    <img alt="logo" :src="wallet?.icon" style="width: 3.5rem" />
                </template>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, watch } from 'vue';
import { defineProps } from "vue";
import Button from "primevue/button";
import { useSwapStore } from "../../../stores/swap";
import { useBalanceWallet } from '../../../composables/useBalanceWallet';
import InputNumber from 'primevue/inputnumber';
import { storeToRefs } from "pinia";

interface Props {
    type: string,
}

const { getWalletByAssetCode, getBalanceByCode } = useBalanceWallet()

const { amount, assetName, assetIcon, unitCount, showModalAssetSelector } = storeToRefs(useSwapStore())

const { t } = useI18n({ useScope: 'global' });

const props = defineProps<Props>();
const balance = getBalanceByCode("USD");
const wallet = getWalletByAssetCode("USD");

const openModalSelector = () => {
    showModalAssetSelector.value = true;
};

watch(amount, (newValue) => {
    if(!balance) return;
    if (newValue > balance) {
        amount.value = balance
    }

    if (!newValue) {
        amount.value = 0.00
    }
})

</script>

<style scoped>
.border-round-3xl {
    border-radius: 2.5rem !important;
}
</style>