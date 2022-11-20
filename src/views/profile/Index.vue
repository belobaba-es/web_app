<template>
    <div class="flex justify-content-between align-items-center">
        <h1 class="text-2xl">Datos personales</h1>
        <template v-if="loading">
            <Skeleton width="6rem" height="2rem" class="px-3 mb-3"></Skeleton>
        </template>
        <template v-else>
            <Button label="Editar" icon="pi pi-pencil" iconPos="right" class="p-button-link"
            @click="editProfile()" />
        </template>
    </div>
    <div class="card">
        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">Nombre completo</h5>
            <p class="text-base font-medium">{{ fullName }}</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">Docuemnto de identidad</h5>
            <p class="text-base font-medium">123456</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">Fecha de nacimiento</h5>
            <p class="text-base font-medium">{{ owner?.dateBirth }}</p>
        </template>
    </div>

    <div class="pt-5 flex justify-content-between align-items-center">
        <h1 class="text-2xl">Informacion de contacto</h1>
    </div>
    <div class="card">
        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">Email</h5>
            <p class="text-base font-medium">{{ owner?.email }}</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">Teléfono</h5>
            <p class="text-base font-medium">{{ phoneNumberWithCountry }}</p>
        </template>
        <Divider type="solid" />

        <template v-if="loading">
            <Skeleton width="10rem" class="mb-2"></Skeleton>
            <Skeleton class="mb-2"></Skeleton>
        </template>
        <template v-else>
            <h5 class="text-base text-600">Dirección</h5>
            <p class="text-base font-medium">{{ owner?.streetOne }}</p>
        </template>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import Skeleton from 'primevue/skeleton';
import { useAccount } from '../../composables/useAccount';
const { editProfile, fullName, owner, phoneNumberWithCountry, loading } = useAccount();
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