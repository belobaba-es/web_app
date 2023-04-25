<template>
  <div class="container-center">
    <img class="logo-noba" :src="logo" alt="logo" />
  </div>

  <div class="container-main">
    <VeryCodeTwoFactorAuth :account-id="props.loginData.accountId" @code-is-valid="isTwoFactorAuthCodeIsValid" />

    <Lang />
  </div>


</template>
<script setup lang="ts">
import logo from '../../assets/img/logo.svg'
import VeryCodeTwoFactorAuth from "../../components/VeryCodeTwoFactorAuth.vue";
import Lang from "../../components/Lang.vue";
import {LoginData} from "./types/login.interface";
import {useUserStore} from "../../stores/user";

const userStore = useUserStore()

interface Props {
  loginData: LoginData
}

const props = defineProps<Props>()

const isTwoFactorAuthCodeIsValid = (isValid: boolean) =>{
  if(isValid) {
    userStore.setUser(props.loginData)

    if (props.loginData.account.status !== 'pending') {
      window.location.href = '/dashboard'
    } else {
      window.location.href = `/profile/${props.loginData.accountId}`
    }
  }
}

</script>


<style lang="css" scoped>
.container-main {
  max-width: 668px;
  margin: 0 auto;
  padding: 0 1rem 1rem;
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

.with-buttons {
  width: 100% !important;
}

.logo-noba {
  width: 142px;
  height: 64px;
}

.help-text {
  color: rgb(135, 135, 135);
  font-size: 0.7rem;
}
</style>