<template>
    <div class="flex justify-content-between align-items-center">
        <h1 class="text-2xl">Datos personales</h1>
        <Button label="Editar" icon="pi pi-pencil" iconPos="right" class="p-button-link"
            @click="editProfile()" />
    </div>
    <div class="card">
        <h5 class="text-base text-600">Nombre completo</h5>
        <p class="text-base font-medium">{{ fullName }}</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Docuemnto de identidad</h5>
        <p class="text-base font-medium">123456</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Fecha de nacimiento</h5>
        <p class="text-base font-medium">{{ owner?.dateBirth }}</p>
    </div>

    <div class="pt-5 flex justify-content-between align-items-center">
        <h1 class="text-2xl">Informacion de contacto</h1>
    </div>
    <div class="card">
        <h5 class="text-base text-600">Email</h5>
        <p class="text-base font-medium">{{ owner?.email }}</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Teléfono</h5>
        <p class="text-base font-medium">{{ phoneNumberWithCountry }}</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Dirección</h5>
        <p class="text-base font-medium">{{ owner?.streetOne }}</p>
    </div>
</template>

<script setup lang="ts">
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import { useAccount } from '../../composables/useAccount';
const { editProfile, fullName, owner, phoneNumberWithCountry } = useAccount();
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