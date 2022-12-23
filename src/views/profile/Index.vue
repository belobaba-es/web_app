<template>
   <WarningKYC />
    <div class="flex justify-content-between align-items-center">
        <h1 class="text-2xl">{{ t('personalData') }}</h1>
        <template v-if="loading">
            <Skeleton width="6rem" height="2rem" class="px-3 mb-3"></Skeleton>
        </template>
        <template v-else>
            <Button :label="t('edit')" icon="pi pi-pencil" iconPos="right" class="p-button-link"
            @click="editProfile()" />
        </template>
    </div>
    <div class="card">
        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">{{ labelNameProfile }}</h5>
            <p class="text-base font-medium">{{ fullName }}</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">{{ t('dni') }}</h5>
            <p class="text-base font-medium">{{ taxId }}</p>
        </template>
        <Divider type="solid" />
        
        <template v-if="isNaturalAccount || isShowView">
            <template v-if="loading">
                <Skeleton width="10rem" class="mb-2"></Skeleton>
                <Skeleton class="mb-2"></Skeleton>
            </template>
            <template v-else>
                <h5 class="text-base text-600">{{ t('birthdateLabel') }}</h5>
                <p class="text-base font-medium">{{ dateBirth }}</p>
            </template>
        </template>
        <template v-else>
            <h5 class="text-base text-600">{{ t('countryLabel') }}</h5>
            <p class="text-base font-medium">{{ owner?.country }}</p>
        </template>
    </div>

    <div class="pt-5 flex justify-content-between align-items-center">
        <h1 class="text-2xl">{{ t('contactInfo') }}</h1>
    </div>
    <div class="card">
        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">{{ t('emailLabel') }}</h5>
            <p class="text-base font-medium">{{ email }}</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">{{ t('phoneLabel') }}</h5>
            <p class="text-base font-medium">{{ phoneNumberWithCountry }}</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">{{ t('address') }}</h5>
            <p class="text-base font-medium">{{ address }}</p>
        </template>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';
import { useAccount } from '../../composables/useAccount';
import { useI18n } from 'vue-i18n';
import WarningKYC from "./components/WarningKYC.vue";

const { t } = useI18n({ useScope: 'global' });

const {
    editProfile,
    fullName,
    owner,
    phoneNumberWithCountry,
    loading,
    labelNameProfile,
    isNaturalAccount,
    dateBirth,
    taxId,
    isShowView,
    email,
    address
} = useAccount();
</script>

<style scoped>
.card {
    background-color: #F9F9F9;
    border: solid 1px #E7E6E7;
}

.p-button.p-button-link,
.p-button.p-button-link:hover {
    color: #A4A4A4;
    background: transparent;
    border: transparent;
}
</style>