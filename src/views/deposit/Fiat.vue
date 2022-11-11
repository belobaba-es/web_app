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
import { ref } from 'vue';
import Divider from 'primevue/divider';

interface tabItem {
    label: string;
    icon?: string;
    to?: string;
}
interface EventTab{
    index: number
}

interface BankData {
    id:              string;
    swiftCode:       string;
    reference:       string;
    accountNumber:   string;
    bankName:        string;
    routingNumber:   string;
    creditTo:        string;
    bankAddress:     string;
    address:         string;
    typeBankingData: string;
    bankPhone:       string;
    accountId?:      string
}

const active = ref<number>(0);

const menuItems = ref<tabItem[]>([
  
    {
        label: 'Local'
    },
    {
        label: 'Internacional'
    }
])

const dataBank = [
    {
            "id": "IRzTNCVq6cAJ9ovuoono",
            "swiftCode": "RBBCUS6L",
            "reference": "QNCUSZXYE6M",
            "accountNumber": "2030136050",
            "bankName": "ROYAL BUSINESS BANK",
            "routingNumber": "122045037",
            "creditTo": "Prime Trust, LLC",
            "bankAddress": "1055 Wilshire Blvd. Suite 1200, LOS ANGELES, CA 90017",
            "address": "330 S Rampart Blvd, Suite 260, Las Vegas, NV 89145",
            "typeBankingData": "INTERNATIONAL",
            "bankPhone": "+1 (888) 616-8188"
        },
        {
            "id": "UnGvO6rOWzeq8xuEckZI",
            "typeBankingData": "NATIONAL",
            "bankName": "SIGNATURE BANK",
            "swiftCode": "",
            "bankAddress": "565 Fifth Avenue, NEW YORK, NY 10017",
            "routingNumber": "026013576",
            "accountNumber": "1503666126",
            "address": "330 S Rampart Blvd, Suite 260, Las Vegas, NV 89145",
            "accountId": "cbbecf6b-3ede-4459-a283-c64d1276f136",
            "creditTo": "Prime Trust, LLC",
            "bankPhone": "+1 (646) 822-1500",
            "reference": "QNCUSZXYE6M"
        }
]
const bankNational = dataBank.find(bank=>bank.typeBankingData == "NATIONAL")
const bankInternational = dataBank.find(bank=> bank.typeBankingData == "INTERNATIONAL")
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