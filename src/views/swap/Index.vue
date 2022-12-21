<template>
    <PageLayout :title="t('swap')">
        <div class="grid flex justify-content-center">
            <div class="col-6">
                <div class="flex justify-content-end mb-4">
                    <Button type="button" :label="t('viewSwapHistory')"
                        class="font-light mt-lg-5 border-300 bg-white text-black-alpha-80" icon="pi pi-history"
                        icon-pos="right" @click="router.push('/swap/history')" />
                </div>
                <div class="flex-row">
                    <div>
                        <AssetInput type="fiat" v-if="transactionType === 'buy'"/>
                        <AssetInput type="crypto" v-else/>
                    </div>
                    <div class="flex justify-content-center align-items-center">
                        <div
                            class="swap-circle border-circle w-5rem h-5rem m-2 flex align-items-center justify-content-center cursor-pointer"
                            @click="switchTransactionType()">
                            <img :src="swapIcon">
                        </div>
                    </div>
                    <div>
                        <AssetInput type="crypto" v-if="transactionType === 'buy'"/>
                        <AssetInput type="fiat" v-else/>
                    </div>
                    <div class="flex-row justify-content-center align-items-center" v-if="progressBarPercent > 0">
                        <div class="grid">
                            <div class="col-8 mx-auto">
                                <ProgressBar :value="progressBarPercent" class="swap">
                                    {{ progressBarSeconds }} Seg
                                </ProgressBar>
                            </div>
                        </div>
                    </div>
                    <div class="text-center" v-if="quoteId">
                        <span class="font-medium text-primary text-2xl">Fee:</span> <span class="text-2xl font-medium">{{ feeAmount }}</span> 
                        / 
                        <span class="font-medium text-primary text-2xl">Total:</span> <span class="text-2xl font-medium">{{ totalAmount }}</span>
                    </div>
                    <div class="mb-2">
                        <Button :label="swapBtnText" class="w-full py-3 text-uppercase" :disabled="(loading || !quoteId)" @click="swapHandler" :loading="loading"/>
                    </div>
                    <div>
                        <p class="text-sm text-center">{{ t('swapExchangeServiceText') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <ModalAssetSelector :show-modal="showModalAssetSelector" @selected-asset="selectedAsset"/>
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue';
import { useI18n } from "vue-i18n";
import Button from 'primevue/button';
import AssetInput from './components/AssetInput.vue';
import swapIcon from '../../assets/icons/swap.svg';
import { Asset } from '../deposit/types/asset.interface';
import ModalAssetSelector from '../../components/ModalAssetSelector.vue';
import ProgressBar from 'primevue/progressbar';
import { useRouter } from 'vue-router';
import { useSwapStore } from '../../stores/swap';
import { storeToRefs } from 'pinia';

const { assetIcon, assetName, showModalAssetSelector, assetId, progressBarPercent, progressBarSeconds, swapBtnText,
  loading, quoteId, feeAmount, totalAmount, transactionType, assetCode } = storeToRefs(useSwapStore());
const { t } = useI18n({ useScope: 'global' });
const router = useRouter();
const { createQuote, swapHandler, switchTransactionType } = useSwapStore();

const selectedAsset = async (asset: Asset) => {
    showModalAssetSelector.value = false;
    assetIcon.value = asset.icon;
    assetName.value = asset.name;
    assetId.value = asset.assetId;
    assetCode.value = asset.code;
    await createQuote();
};

</script>

<style scoped>
.history-btn>.p-button:hover {
    background-color: #fff;
    color: #1B1B19;
}

.swap-circle {
    background-color: #BFEFEB;
}

.swap-circle>img {
    transform: rotate(90deg);
    width: 2rem;
}

</style>