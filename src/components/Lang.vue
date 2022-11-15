<template>

  <p>{{ t('languageSelector') }}</p>
  <div class="container-center pt-0">
    <SelectButton v-model="languageSelected" :options="languages" aria-labelledby="custom" optionLabel="name"
                  dataKey="code" @click="changeLang"/>
  </div>


</template>
<script setup lang="ts">
import {ref} from 'vue'
import {useI18n} from 'vue-i18n'
import SelectButton from 'primevue/selectbutton';
import {useRoute, useRouter} from "vue-router";

interface LangSelect {
  name: string;
  code: string
}

const route = useRouter()
let languageSelected = ref<LangSelect>();
languageSelected.value = {name: 'EN', code: 'en'}
const languages = ref<LangSelect[]>([{name: 'ES', code: 'es'}, {name: 'EN', code: 'en'}]);

const {t, locale} = useI18n({
  useScope: 'global'
})

const changeLang = (event: any) => {

  if (languageSelected.value?.code) {
    setLang(languageSelected.value.code)
    return
  }

  let l = localStorage.getItem('noba@lang')

  if (l == 'es') {
    l = 'en'
  } else {
    l = 'es'
  }

  setLang(l)
}

function setLang(code: string) {
  locale.value = code;
  localStorage.setItem('noba@lang', code)

  route.go(0)
}

</script>
<style scoped>
p{
  font-size: 1rem;
  color: #A4A4A4;
}
</style>
