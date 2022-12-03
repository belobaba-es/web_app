<template>
    <PageLayout :title="t('swap')">
        <div class="grid flex justify-content-center">
            <div class="col-6">
                <div class="flex justify-content-end mb-4">
                    <Button type="button" :label="t('viewSwapHistory')"
                        class="font-light mt-lg-5 border-300 bg-white text-black-alpha-80" icon="pi pi-history"
                        icon-pos="right" />
                </div>
                <div class="flex-row">
                    <div>
                        <AssetSelector
                            :asset="fromSwap!"
                            :asset-balance="fromAssetBalance"
                            :fiat-balance="fromFiatBalance"
                            :direction="'from'"
                            @open-modal-selector="onAssetSelectorClick"
                        />
                    </div>
                    <div class="flex justify-content-center align-items-center">
                        <div
                            class="swap-circle border-circle w-5rem h-5rem m-2 flex align-items-center justify-content-center">
                            <img :src="swapIcon">
                        </div>
                    </div>
                    <div>
                        <AssetSelector
                            :asset="toSwap!"
                            :asset-balance="toAssetBalance"
                            :fiat-balance="toFiatBalance"
                            :direction="'to'"
                            @open-modal-selector="onAssetSelectorClick"
                        />
                    </div>
                    <div class="flex-row justify-content-center align-items-center">
                        <p class="text-center">
                            1 ETH = 20.0003201 EOS
                        </p>
                        <div class="grid">
                            <div class="col-8 mx-auto">
                                <ProgressBar :value="percent" class="my-3 py-3">
                                    {{ showSegs }} Seg
                                </ProgressBar>
                            </div>
                        </div>
                    </div>
                    <div class="mb-2">
                        <Button label="Asset SWAP" class="w-full py-3 text-uppercase"/>
                    </div>
                    <div>
                        <p class="text-sm text-center">{{ t('swapExchangeServiceText') }}</p>
                    </div>
                </div>
            </div>
        </div>
        <ModalAssetSelector v-if="showModalAsset" :show-modal="showModalAsset" @selected-asset="selectedAsset"/>
    </PageLayout>
</template>

<script setup lang="ts">
import PageLayout from '../../components/PageLayout.vue';
import { useI18n } from "vue-i18n";
import Button from 'primevue/button';
import { ref, onMounted, onBeforeUnmount } from 'vue';
import AssetSelector from './components/AssetSelector.vue';
import swapIcon from '../../assets/icons/swap.svg';
import { Asset } from '../deposit/types/asset.interface';
import { SwapAsset } from './types/swap-asset.interface';
import ModalAssetSelector from '../../components/ModalAssetSelector.vue';
import ProgressBar from 'primevue/progressbar';

const { t } = useI18n({ useScope: 'global' });

const showModalAsset = ref(false);
const showModalAssetDirection = ref();

const onAssetSelectorClick = (direction: string) => {
    showModalAsset.value = true;
    showModalAssetDirection.value = direction;
}

const selectedAsset = (asset: Asset) => {
    showModalAsset.value = false;
    const assetObject: SwapAsset = {
            id: asset.id,
            minimumWithdrawal: asset.minimumWithdrawal,
            code: asset.code,
            updatedAt: asset.updatedAt,
            createdAt: asset.createdAt,
            fee: asset.fee,
            assetId: asset.assetId,
            active: asset.active,
            icon: asset.icon,
            name: asset.name,
            network: showModalAssetDirection.value === 'from' ? fromSwap.value?.network! : toSwap.value?.network!,
            value: '0.0000000'
        };
    if (showModalAssetDirection.value === 'from') {
        fromSwap.value = assetObject;
    } else {
        toSwap.value = assetObject;
    }
};

const fromAssetBalance = ref('0.0000000');
const fromFiatBalance = ref('0.0000000');

const toAssetBalance = ref('0.0000000');
const toFiatBalance = ref('0.0000000');

const fromSwap = ref<SwapAsset | null>();
const toSwap = ref<SwapAsset | null>();

const interval = ref(0);
const showSegs = ref(0);
const percent = ref(0);

const startProgress = () => {
    interval.value = setInterval(() => {
        
    }, 1000);
};

const endProgress = () => {
    clearInterval(interval.value);
    interval.value = 0;
};

onMounted(() => {
    startProgress();
})

onBeforeUnmount(() => {
    endProgress();
})
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