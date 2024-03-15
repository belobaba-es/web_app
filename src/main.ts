import { createApp } from 'vue'
import 'primeflex/primeflex.css'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeicons/primeicons.css'

import './assets/styles/layout.scss'
import './style.css'

import App from './App.vue'
import Router from './router/router'
import PrimeVue from 'primevue/config'
import BadgeDirective from 'primevue/badgedirective'
import StyleClass from 'primevue/styleclass'
import Ripple from 'primevue/ripple'
import { createPinia } from 'pinia'
import Tooltip from 'primevue/tooltip'
import ConfirmationService from 'primevue/confirmationservice'
import i18n from './i18n'
import ToastService from 'primevue/toastservice'

const pinia = createPinia()

createApp(App)
  .use(pinia)
  .use(ConfirmationService)
  .use(Router)
  .use(PrimeVue)
  .use(i18n)
  .use(ToastService)
  .directive('badge', BadgeDirective)
  .directive('styleclass', StyleClass)
  .directive('ripple', Ripple)
  .directive('tooltip', Tooltip)
  .directive('tooltip', Tooltip)
  .mount('#app')
