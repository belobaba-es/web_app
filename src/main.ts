import { createApp } from 'vue'
import 'primevue/resources/themes/saga-blue/theme.css';
import 'primevue/resources/primevue.min.css';
import 'primeflex/primeflex.css';
import 'primeicons/primeicons.css';

import './assets/styles/layout.scss';
import './assets/demo/flags/flags.css';
import './style.css'

import App from './App.vue'
import Router from './router'
import PrimeVue from 'primevue/config';
import BadgeDirective from 'primevue/badgedirective';
import StyleClass from 'primevue/styleclass';
import Ripple from 'primevue/ripple';
import TabMenu from 'primevue/tabmenu';
import Divider from 'primevue/divider';
import Button from 'primevue/button';
import InputText from 'primevue/inputtext';
import Dropdown from 'primevue/dropdown';
import Checkbox from 'primevue/checkbox';
import Password from 'primevue/password';
import SelectButton from 'primevue/selectbutton';
import { createI18n } from 'vue-i18n';
import messages from '@intlify/vite-plugin-vue-i18n/messages'

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  messages
});

createApp(App)
.use(Router)
.use(PrimeVue)
.use(i18n)
.component('TabMenu', TabMenu)
.component('Divider', Divider)
.component('Button', Button)
.component('InputText', InputText)
.component('Dropdown', Dropdown)
.component('Checkbox', Checkbox)
.component('Password', Password)
.component('SelectButton', SelectButton)
.directive('badge', BadgeDirective)
.directive('styleclass', StyleClass)
.directive('ripple', Ripple)
.mount('#app');
