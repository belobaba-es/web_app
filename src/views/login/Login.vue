<template>

  <div class="container-center">
    <img :src="logo" alt="logo"/>
  </div>
  <div class="container-main">


    <div class="lg:bg-contain container">

      <h1 class="font-extra-light text-center">{{ t('loginTitle') }}</h1>
      <p class="font-extra-light text-center">{{ t('loginSubtitle') }}</p>
      <div class="pt-5">
        <form @submit.prevent="handleSubmit" class="checkout-form">
          <div class="field">
            <label class="font-light">{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.user" :placeholder = "t('emailPlaceholder')"  />
            </div>
          </div>
          <div class="field">
            <label>{{ t('passwordLabel') }}</label>
            <div class="p-inputgroup">
              <Password v-model="form.pass" placeholder="**********" />
            </div>
          </div>

          <div class="container-flex mt-lg-5">
            <div class="float-left w-25">
              <Button type="button" icon="pi pi-angle-left"  :label="t('backButtonTitle')" class="font-light w-100 border-300 p-button-outlined"/>
            </div>
            <div class="float-right w-25">
              <Button type="submit" icon="pi pi-angle-right" iconPos="right" label="Login" class="font-light w-100"/>
            </div>
          </div>
        </form>

      </div>
      <Button type="button" :label="t('noAccount')"
              class="font-light mt-lg-5 p-button-outlined border-300" />
    </div>
    <div class="container-center">
      <div>
        <Lang />
      </div>

    </div>

  </div>
</template>
<script setup lang="ts">
import {reactive} from "vue";
import InputText from 'primevue/inputtext';
import Password from 'primevue/password';
import Button from 'primevue/button';
import {useI18n} from 'vue-i18n'
import logo from '../../assets/img/logo.svg'
import Lang from "../../components/Lang.vue";
import { LoginService } from "./services/login";
import { useRouter } from "vue-router";
import { useUserStore } from '../../stores/user';

const {t} = useI18n({useScope: 'global'})
const loginService = LoginService.instance();
const form = reactive({
  user: 'angel.bejarano@jaspesoft.com',
  pass: '12345678'
})

const router = useRouter()

const userStore = useUserStore();

const handleSubmit = () => {
  
  loginService.login(form.user, form.pass).then(data =>  {
    console.log(form.user);
    const { data: userPayload } = data;
    userStore.setUser(userPayload);
    router.push('/dashboard')

  });

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