<template>
    <div class="pt-5">
        <h1>Datos personales</h1>
    </div>
    <div class="card">
        <h5 class="profile-card-title">Nombre completo</h5>
        <p class="profile-card-text">Ángel José Salazar Gómez</p>
        <Divider type="solid" />

        <h5 class="profile-card-title">Docuemnto de identidad</h5>
        <p class="profile-card-text">123456</p>
        <Divider type="solid" />

        <h5 class="profile-card-title">Fecha de nacimiento</h5>
        <p class="profile-card-text">28/04/2022</p>
    </div>

    <div class="pt-5 flex justify-content-between align-items-center">
        <h1>Informacion de contacto</h1>
        <Button label="Editar" icon="pi pi-pencil" iconPos="right" class="p-button-link" @click="onClickEditProfile()" />
    </div>
    <div class="card">
        <h5 class="profile-card-title">Email</h5>
        <p class="profile-card-text">angeljsg@email.com</p>
        <Divider type="solid" />

        <h5 class="profile-card-title">Teléfono</h5>
        <p class="profile-card-text">424 921 652 625</p>
        <Divider type="solid" />

        <h5 class="profile-card-title">Dirección</h5>
        <p class="profile-card-text">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod tempor invidunt</p>
    </div>
</template>

<script setup lang="ts">
import { useRouter } from 'vue-router'
const router = useRouter()

const onClickEditProfile = (): void => {
    router.push(`/profile/edit/1`)
}

</script>

<style scoped>
.profile-card-title {
    color: #1B1B19;
    font-size: 14px;
}
.profile-card-text {
    color: #1B1B19;
    font-size: 18px;
    font-weight: 600;
}
.page-title {
    color: #182C28;
    font-size: 20px;
    font-weight: 600;
}
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