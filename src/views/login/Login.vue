<template>

  <div class="container-center">
    <img :src="logo"  alt="logo"/>
  </div>
  <div class="container-main">


    <div class="lg:bg-contain container">
      <div class="pt-5">
        <h1 class="text-center">{{t('loginTitle')}}</h1>
      </div>
      <p class="text-center">{{t('loginSubtitle')}}</p>

        <div class="field">
          <label class="font-light">{{t('email')}}</label>
          <div class="p-inputgroup">
            <InputText type="text" v-model="form.user" @input="$emit('update:user', $event.target.value)"/>
          </div>
        </div>
        <div class="field col-12 md:col-4">
          <label>{{t('password')}}</label>
          <Password  v-model="form.pass" />
        </div>

        <Button type="submit" label="Login"/>

    </div>

  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo.svg'

const { t } = useI18n({ useScope: 'global' })

const form = reactive({
  user: '',
  pass: ''
})


const handleSubmit = () => {
  alert("form submitted");
  console.log(form.user)
}
</script>

<style lang="css" scoped>
.container-main {
  max-width: 668px;
  margin: 0 auto;
  padding: 0 3rem 3rem;
}
.container {
  display: flex;
  flex-direction: column;
  margin-bottom: 2rem;
  background: white;
  border-radius: 20px;
  padding: 2.5rem;
  box-shadow: 0px 0px 60px rgb(0 0 0 / 5%);
}
</style>