<template>
  <div class="grid">
    <div class="col-12 md:col-6">
      <div class="border-1 border-gray-300 p-4 border-round">
        <p>{{ t('languageSelector') }}</p>
        <SelectButton v-model="languageSelected" :options="languages" aria-labelledby="custom" optionLabel="name"
                      dataKey="code" @click="changeLang"/>
      </div>
    </div>
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

interface ChangeEvent<T> {
  value: T
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
