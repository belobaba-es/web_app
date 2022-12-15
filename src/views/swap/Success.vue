<template>
    <PageLayout :title="t('swap')">
        <div class="grid flex justify-content-center align-items-center">
            <div class="col-6">
                <div class="flex justify-content-center mb-4">
                    <img :src="successIcon">
                </div>
                <h1 class="text-center">{{ t('swapSuccessfulTitle') }}</h1>
                <p class="text-center">{{ t('swapSuccessfulText') }}</p>
                <div class="my-5 flex justify-content-between">
                    <div>
                        <span class="mb-1">{{ t('swapFrom') }}</span>
                        <div class="flex">
                            <div class="flex-shrink-0 flex align-items-center mr-2">
                                <img alt="logo" :src="usdIcon" style="width: 4rem" />
                            </div>
                            <div class="flex-grow-1 flex-row align-items-center">
                                <div class="font-medium">{{ usdName }}</div>
                                <div class="font-medium">{{ totalAmount }} {{ usdName }}</div>
                            </div>
                        </div>
                    </div>
                    <div class="flex align-items-center">
                        <div class="swap-circle border-circle w-3rem h-3rem m-2 flex align-items-center justify-content-center">
                            <img :src="swapOneArrowIcon">
                        </div>
                    </div>
                    <div>
                        <span class="mb-1">{{ t('swapTo') }}</span>
                        <div class="flex">
                            <div class="flex-shrink-0 flex align-items-center mr-2">
                                <img alt="logo" :src="assetIcon" style="width: 4rem" />
                            </div>
                            <div class="flex-grow-1 flex-row align-items-center">
                                <div class="font-medium">{{ assetName }}</div>
                                <div class="font-medium">{{ unitCount }} {{ assetName }}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Divider :align="'bottom'" />
                <p class="text-sm text-center">
                    {{ t('swapPriceQuote') }}
                </p>
                <div class="text-center" v-if="quoteId">
                    <span class="font-medium text-primary text-2xl">Fee:</span> <span class="text-2xl font-medium">{{ feeAmount }}</span> 
                    / 
                    <span class="font-medium text-primary text-2xl">Total:</span> <span class="text-2xl font-medium">{{ totalAmount }}</span>
                </div>
                <div class="flex justify-content-center mt-lg-2">
                    <div class="mr-4">
                        <Button type="button" icon="pi pi-angle-left" :label="t('swapBackButtonTitle')"
                            class="font-light w-100" @click="router.push('/swap')" />
                    </div>
                    <div class="">
                        <Button type="button" icon="pi pi-history" iconPos="right" :label="t('viewSwapHistory')"
                            class="font-light w-100 border-300 p-button-outlined" @click="router.push('/swap/history')"/>
                    </div>
                </div>
            </div>
        </div>
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue';
import { useSwap } from '../../composables/useSwap';
import { useI18n } from "vue-i18n";
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import { useRouter } from 'vue-router';
import { useBalanceWallet } from '../../composables/useBalanceWallet';
const { t } = useI18n({ useScope: 'global' });
const { successIcon, swapOneArrowIcon, assetIcon, unitCount, assetName, totalAmount, quoteId, feeAmount } = useSwap();
const router = useRouter();
const { getWalletByAssetCode } = useBalanceWallet();
const usdIcon = getWalletByAssetCode("USD")?.icon;
const usdName = getWalletByAssetCode("USD")?.name;
</script>

<style scoped>
.swap-circle {
    background-color: #BFEFEB;
}

</style>