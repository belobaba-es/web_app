<template>
    <div class="completion-view">
      <div class="center-content">
        <img src="../../../assets/img/check.svg" alt="Imagen de finalización" class="completion-image" />
        <p class="title-text">Gracias por su registro</p>
        <p class="sub-title">
            Una vez aprobada tu cuenta te estaremos enviado <br> un correo con la validación de su cuenta.
        </p>
      </div>
      <div class="position">
          <Button :label="t('continuar')" icon="pi pi-angle-right" icon-pos="right" class="px-5 mt-2 btn-submit" @click="redirectToHome()" />
        </div>
    </div>
  </template>
  
  <script setup lang="ts">
    import Button from "primevue/button";
    import router from "../../../router";
    import { useI18n } from 'vue-i18n'
    const { t } = useI18n({ useScope: 'global' })

    const redirectToHome = () => {
        router.push('/')
    }
</script>

  <style lang="scss" scoped>
  .completion-view {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  
    .center-content {
      text-align: center;
  
      .completion-image {
        max-width: 300px;
        max-height: 300px;
        margin: 0 auto; // Centra horizontalmente la imagen
      }
  
      .title-text {
        font-size: 38px;
        margin-top: 20px;
      }
      .sub-title{
        font-size: 28px;
      }
    }
    .position{
        position: absolute;
        bottom: 30px;
        right: 113px;
    }
  }
  </style>