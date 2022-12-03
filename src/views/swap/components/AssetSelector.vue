<template>
    <div class="flex-row mb-3">
        <div class="flex justify-content-between align-items-center">
            <span>
                {{ t('iHave') }}: <span class="font-medium">{{ assetBalanceText }}</span>
            </span>
            <span class="text-primary">
                {{ fiatBalanceText }}
            </span>
        </div>
        <div class="p-3 mt-2 border-1 border-primary-100 border-solid border-round-lg bg-gray-100 flex align-items-center justify-content-between">
            <div class="input-mount">
                <InputText type="text" v-model="swapValue" class="text-4xl font-medium w-100"/>
            </div>
            <div>
                <Button type="button" class="bg-white border-none border-round-3xl" @click="openModalSelector">
                    <img v-if="asset" alt="logo" :src="asset.icon" style="width: 3.5rem" />
                    <span class="ml-2 font-medium text-black-alpha-70 mx-3">{{ asset ? asset.name : t('selectCrypto') }}</span>
                    <i class="pi pi-caret-down text-primary"></i>
                </Button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";
import { ref, computed, onMounted, defineEmits } from 'vue';
import { defineProps } from "vue";
import Button from "primevue/button";
import InputText from "primevue/inputtext";
import { SwapAsset } from "../types/swap-asset.interface";

interface Props {
    asset: SwapAsset,
    fiatBalance: string,
    assetBalance: string,
    direction: string,
}

const props = defineProps<Props>()
const emit = defineEmits(['openModalSelector'])
const { t } = useI18n({ useScope: 'global' });
const swapValue = ref('0.0000000');

const fiatBalanceText = computed(() => {
    return props.asset ? `${props.fiatBalance} USD` : '';
});

const assetBalanceText = computed(() => {
    return  props.asset ? `${props.assetBalance} ${props.asset.name}` : '';
});

onMounted(() => {
    if (props.fiatBalance.length > 0) {
        swapValue.value = props.fiatBalance
    }
})

const openModalSelector = () => {
    emit('openModalSelector', props.direction);
}

</script>

<style scoped>
.border-round-3xl {
    border-radius: 2.5rem !important;
}
.input-mount > .p-inputtext.p-component.p-filled, .input-mount > .p-inputtext.p-component {
    background: transparent;
    border: none;
}
</style>