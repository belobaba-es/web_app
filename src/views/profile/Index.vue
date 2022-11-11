<template>
    <div class="pt-5 flex justify-content-between align-items-center">
        <h1 class="text-2xl">Datos personales</h1>
        <Button label="Editar" icon="pi pi-pencil" iconPos="right" class="p-button-link" @click="onClickEditProfile()" />
    </div>
    <div class="card">
        <h5 class="text-base text-600">Nombre completo</h5>
        <p class="text-base font-medium">Ángel José Salazar Gómez</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Docuemnto de identidad</h5>
        <p class="text-base font-medium">123456</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Fecha de nacimiento</h5>
        <p class="text-base font-medium">28/04/2022</p>
    </div>

    <div class="pt-5 flex justify-content-between align-items-center">
        <h1 class="text-2xl">Informacion de contacto</h1>
    </div>
    <div class="card">
        <h5 class="text-base text-600">Email</h5>
        <p class="text-base font-medium">angeljsg@email.com</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Teléfono</h5>
        <p class="text-base font-medium">424 921 652 625</p>
        <Divider type="solid" />

        <h5 class="text-base text-600">Dirección</h5>
        <p class="text-base font-medium">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
import Divider from 'primevue/divider';
import Button from 'primevue/button';

const router = useRouter()

const onClickEditProfile = (): void => {
    router.push(`/profile/edit/8ffb9e5c-0f39-4f3d-96ad-1579f514ff05`)
}

</script>

<style scoped>
.card {
    background-color: #F9F9F9;
    border: solid 1px #E7E6E7;
}
.p-button.p-button-link, .p-button.p-button-link:hover {
    color: #A4A4A4;
    background: transparent;
    border: transparent;
}
</style>