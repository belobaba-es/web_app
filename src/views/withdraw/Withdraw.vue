<template>
    <p class="text-3xl">{{t('withdraw')}} </p>
    
    <div class="grid justify-content-center">
       
        <div class="col-5 text-center">
            
            <img src="../../assets/icons/cash-back.svg" alt="" srcset="">
            <p class="">Withdraw Fiat</p>
            <p class="text-base">{{t('withdrawFiatSelectMsg')}}</p>
            
            <CardButon class="m-4"  :label="t('betweenNOBA')" to="/withdraw/fiat/noba"/>
        
            <CardButon class="m-4" :label="t('domesticWire')" to="/withdraw/fiat/domestic"/>
    
            <CardButon class="m-4" :label="t('internationalWire')" to="/withdraw/fiat/international"/>
      
        </div>
        <div class="col-5 text-center">
            <img src="../../assets/icons/blockchain.svg" alt="" srcset="">
            <p class="">Withdraw Crypto </p>
            <p class="text-base">{{t('withdrawCryptoSelectMsg')}}</p>
            <router-link to="/deposit/crypto">
                <CardButon class="m-4" :label="t('betweenNOBACrypto')"/>
            </router-link>
    
            <router-link to="/deposit/crypto">
                <CardButon class="m-4" :label="t('otherPlatformCrypto')"/>
            </router-link>
        </div>
        
    </div>

    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useI18n } from 'vue-i18n'
import CardButon from './components/CardButon.vue'
interface tabItem {
    label: string;
    icon?: string;
    to: string;
}

const { t } = useI18n({ useScope: 'global' })
const active = ref<number>(1);

const menuItems = ref<tabItem[]>([
    {
        label: 'Deposit',
        to: '/deposit'
    },
    {
        label: 'Accionistas',
        to: '/deposit/crypto'
    },
    {
        label: 'Perfil',
        to: '/deposit/fiat'
    },
])
</script>

<style lang="css">

</style>