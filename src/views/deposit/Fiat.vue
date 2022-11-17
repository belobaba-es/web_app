<template>
    <p class="text-3xl">Depositos / Fiat</p>
    <TabMenu :model="menuItems"  v-model:activeIndex="active"/>
    <div v-if="active==0" class="mt-2">
        <p class="">Los depósitos en esta cuenta deben ser realizados en Dólares Americanos</p>
        
        <p class="font-medium text-sm">Depository Bank Name</p>
        <p class="">{{bankNational?.bankName}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Routing Number </p>
        <p class="">{{bankNational?.routingNumber}} </p>
        <Divider type="solid" />

        <p class="font-medium text-sm"> Credit To</p>
        <p class="">{{bankNational?.creditTo}} </p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Address</p>
        <p class=""> {{bankNational?.address}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Account Number </p>
        <p class="">{{bankNational?.accountNumber}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Bank Address</p>
        <p class=""> {{bankNational?.bankAddress}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Bank Phone</p>
        <p class="">{{bankNational?.bankPhone}}</p>
        <Divider type="solid" />
       
    </div>

    <div v-if="active==1" class="mt-2">
        <p>Los depósitos en esta cuenta podrán ser realizados desde otras monedas diferentes al dólar americano.</p>
        
        <p class="font-medium text-sm">Depository Bank Name</p>
        <p class="">{{bankInternational?.bankName}}</p>
        <Divider type="solid" />
        
        <p class="font-medium text-sm">Routing Number</p>
        <p class="">{{bankInternational?.routingNumber}}</p>
        <Divider type="solid" />
        
        <p class="font-medium text-sm">Swift Code</p>
        <p class="">{{bankInternational?.swiftCode}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Credit To</p>
        <p class=""> {{bankInternational?.creditTo}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Address</p>
        <p class="">{{bankInternational?.address}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Account Number</p>
        <p class="">{{bankInternational?.accountNumber}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Bank Address</p>
        <p class="">{{bankInternational?.bankAddress}}</p>
        <Divider type="solid" />

        <p class="font-medium text-sm">Bank Phone</p>
        <p class="">{{bankInternational?.bankPhone}}</p>
        <Divider type="solid" />

    </div>
</template>

<script lang="ts" setup>
import { ref, onMounted } from 'vue';
import Divider from 'primevue/divider';
import TabMenu from 'primevue/tabmenu';
import { FiatService } from './services/fiat';
import { BankData } from './types/fiat.interface';
import { useUserStore } from '../../stores/user';

interface tabItem {
    label: string;
    icon?: string;
    to?: string;
}

const fiatService = FiatService.instance();

const dataBank = ref<BankData[]>([])
const bankNational = ref()
const bankInternational = ref()
const userStore = useUserStore();

onMounted(async () => {
    userStore.getUser.accountId
    fiatService.bankData('cbbecf6b-3ede-4459-a283-c64d1276f136').then(data=> {
        dataBank.value = data
        bankNational.value = dataBank.value.find(bank=>bank.typeBankingData == "NATIONAL")
        bankInternational.value = dataBank.value.find(bank=> bank.typeBankingData == "INTERNATIONAL")
    })
    
});
const active = ref<number>(0);

const menuItems = ref<tabItem[]>([
  
    {
        label: 'Local'
    },
    {
        label: 'Internacional'
    }
])
</script>

<style lang="css">
.p-tabmenu .p-tabmenu-nav {
    background: transparent!important;
    border: 1px solid #dee2e6;
    border-width: 0 0 2px 0;
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem.p-highlight .p-menuitem-link {
    background: transparent!important;
    border-color: var(--primary-color);
    color: var(--primary-color);
}
.p-tabmenu .p-tabmenu-nav .p-tabmenuitem .p-menuitem-link {
    border: solid #dee2e6;
    border-width: 0 0 2px 0;
    border-color: transparent transparent #dee2e6 transparent;
    background: transparent!important;
    color: #6c757d;
    padding: 1rem;
    font-weight: 600;
    border-top-right-radius: 3px;
    border-top-left-radius: 3px;
    transition: box-shadow 0.2s;
    margin: 0 0 -2px 0;
}
p{
    margin: 0 0 6px 0;
}
</style>