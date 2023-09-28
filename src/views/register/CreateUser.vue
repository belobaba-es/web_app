<template>
  <div class="container-center">
    <img class="logo-noba" :src="logo" alt="logo" />
  </div>
  <div class="container-main">
    <div class="lg:bg-contain container">
      <h1 class="font-extra-light text-center">{{ t('createAccount') }}</h1>
      <h2 class="font-extra-light text-center">{{ t('subtitleCreateAccount') }}</h2>
      <div class="pt-5">
        <form @submit.prevent="handleSubmit" class="checkout-form">
          <div class="field">
            <label class="font-light">{{ t('emailLabel') }}</label>
            <div class="p-inputgroup">
              <InputText type="text" v-model="form.email" required :placeholder="t('emailPlaceholder')" />
            </div>
          </div>
          <div class="field">
            <label>{{ t('passwordLabel') }}</label>
            <div class="p-inputgroup">
              <Password v-model="form.password" toggleMask required :feedback="false" placeholder="**********" />
            </div>
            <div>
              <span class="help-text">{{ t('registerHelpTextPassword') }}</span>
            </div>
          </div>
          <div class="field">
            <label>{{ t('passwordConfirmLabel') }}</label>
            <div class="p-inputgroup">
              <Password
                v-model="form.passwordConfirmation"
                toggleMask
                required
                :feedback="false"
                placeholder="**********"
              />
            </div>
            <div>
              <span class="help-text">{{ t('registerHelpTextPassword') }}</span>
            </div>
          </div>
          <div class="flex justify-content-between align-items-center">
            <div class="field-checkbox mt-2">
              <Checkbox inputId="binary" v-model="form.terms" :binary="true" />
              <label for="binary">
                <span>
                  {{ t('iAcceptConditions') }}
                  <strong>
                    <a :href="getTheLinkToTermsAndConditions()" target="_blank">{{
                      t('termsAndConditions')
                    }}</a></strong
                  >
                  {{ t('andThe') }}
                  <strong>
                    <a :href="getTheLinkToPoliticsAndPrivacy()">{{ t('privacyPolicy') }}</a>
                  </strong>
                </span>
              </label>
            </div>

            <!-- <div class="text-right">
              <RouterLink to="/forgot-password">
                {{ t('recoveryPassword') }}
              </RouterLink>
            </div> -->
          </div>

          <div class="flex justify-content-between align-items-center">
            <div class="field-checkbox mt-2">
              <Checkbox inputId="patriot" v-model="form.patriot" :binary="true" />
              <label for="patriot"> I accept the Patriot Act </label>
            </div>
          </div>

          <Button label="Show" icon="pi pi-external-link" @click="visible = true" />

          <Dialog v-model:visible="visible" modal header="Header" :style="{ width: '50vw' }">
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p class="mb-5">
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
              dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
            <p class="mb-5">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
              et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
              delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
              repellat.
            </p>
            <p class="mb-5">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
            </p>
            <p class="mb-5">
              "Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam
              rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt
              explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia
              consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui
              dolorem ipsum quia dolor sit amet, consectetur, adipisci velit, sed quia non numquam eius modi tempora
              incidunt ut labore et dolore magnam aliquam quaerat voluptatem. Ut enim ad minima veniam, quis nostrum
              exercitationem ullam corporis suscipit laboriosam, nisi ut aliquid ex ea commodi consequatur? Quis autem
              vel eum iure reprehenderit qui in ea voluptate velit esse quam nihil molestiae consequatur, vel illum qui
              dolorem eum fugiat quo voluptas nulla pariatur?
            </p>
            <p class="mb-5">
              At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti
              atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique
              sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum
              facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil
              impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor
              repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut
              et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente
              delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores
              repellat.
            </p>
          </Dialog>

          <div class="container-flex mt-lg-2">
            <div class="float-left w-25">
              <Button
                type="button"
                icon="pi pi-angle-left"
                :label="t('backButtonTitle')"
                class="font-light w-100 border-300 p-button-outlined"
              />
            </div>
            <div class="float-right w-25">
              <Button
                type="submit"
                icon="pi pi-angle-right"
                iconPos="right"
                label="Login"
                class="font-light w-100"
                :loading="submitting"
              />
            </div>
          </div>

          <Button
            type="button"
            :label="t('noAccount')"
            class="font-light mt-lg-5 with-buttons p-button-outlined border-300 sm: mt-5"
            @click="redirectLogin()"
          />
        </form>
      </div>
    </div>

    <div class="container-center">
      <div>
        <Lang />
      </div>
    </div>
  </div>
</template>
<script setup lang="ts">
import { reactive, ref } from 'vue'
import InputText from 'primevue/inputtext'
import Password from 'primevue/password'
import Button from 'primevue/button'

import Dialog from 'primevue/dialog'
import { useI18n } from 'vue-i18n'
import logo from '../../assets/img/logo.svg'
import Lang from '../../components/Lang.vue'
import { LoginService } from '../login/services/login'
import { useRouter } from 'vue-router'
import { useToast } from 'primevue/usetoast'
import Checkbox from 'primevue/checkbox'

const submitting = ref(false)
const visible = ref(false);
const toast = useToast()
const { t } = useI18n({ useScope: 'global' })

const didLoginEmit = defineEmits(['didLogin'])

const loginService = LoginService.instance()

const form = reactive({
  email: '',
  password: '',
  passwordConfirmation: '',
  terms: false,
  patriot: false,
})

const router = useRouter()

const lang = localStorage.getItem('noba@lang')

const redirectLogin = () => {
  router.push('/')
}

const getTheLinkToTermsAndConditions = () => {
  let linkSpanish = 'https://noba.cash/es/termino-de-uso/'

  let linkEnglish = 'https://noba.cash/en/termino-de-uso/'

  if (lang === 'es') {
    return linkSpanish
  }

  if (lang === 'en') {
    return linkEnglish
  }

  return linkEnglish
}

const getTheLinkToPoliticsAndPrivacy = () => {
  let linkSpanish = 'https://noba.cash/es/politicas-de-privacidad/'

  let linkEnglish = 'https://noba.cash/en/politicas-de-privacidad/'

  if (lang === 'es') {
    return linkSpanish
  }

  if (lang === 'en') {
    return linkEnglish
  }

  return linkEnglish
}

const handleSubmit = () => {
  submitting.value = true
  loginService
    .login(form.email.toLowerCase(), form.password)
    .then(data => {
      const { data: userPayload } = data

      submitting.value = false

      didLoginEmit('didLogin', userPayload)
    })
    .catch(e => {
      submitting.value = false
      toast.add({
        severity: 'info',
        summary: t('somethingWentWrong'),
        detail: e.response.data.message,
        life: 4000,
      })
    })
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
</style>
