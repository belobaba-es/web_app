<template>
    <p>Depositos</p>
    
    
    <div class="grid">
        <div class="col-12">
            <p class="text-center">  Elije el tipo de moneda</p>
        </div>
        <div class="col">
            <router-link to="/deposit/fiat">
                <div>
                    <img alt="logo" src="/src/assets/icons/save-money.svg" style="width: 2.5rem"/>
                    Billetera Fiat
                </div>

            </router-link>
            
        </div>
        <div class="col">
            <router-link to="/deposit/crypto">
                <div>
                    <img alt="logo" src="/src/assets/icons/ewallet.svg" style="width: 2.5rem"/>
                    Billetera Crypto
                </div>

            </router-link>

        </div>
    </div>

    <router-view />
</template>

<script lang="ts" setup>
import { ref } from 'vue';

interface tabItem {
    label: string;
    icon?: string;
    to: string;
}

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