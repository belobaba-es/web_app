<template>
    <p class="text-3xl">{{t('deposit')}} </p>
    
    <div class="grid justify-content-center">
        <div class="col-12 text-center">
            <span class="text-center border text-2xl ">{{t('selectCurrency')}} <b> {{t('currency')}}</b></span>
        </div>
        <div class="flex justify-content-evenly" >
            <router-link to="/deposit/fiat">
                <CardButon class="m-4" icon="/src/assets/icons/save-money.svg" :label="t('fiatWallet')"/>
            </router-link>
       
            <router-link to="/deposit/crypto">
                <CardButon class="m-4" icon="/src/assets/icons/ewallet.svg" :label="t('cryptoWallet')"/>
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
.border{
    border-bottom: 1px solid #BFEFEB;
    padding: 0.4rem 1rem;
}
</style>