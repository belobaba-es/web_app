import { createApp } from 'vue'
import 'primevue/resources/themes/saga-blue/theme.css'
import 'primevue/resources/primevue.min.css'
import 'primeflex/primeflex.css'
import 'primeicons/primeicons.css'

import './assets/styles/layout.scss'
import './style.css'

import App from './App.vue'
import Router from './router'
import PrimeVue from 'primevue/config'
import BadgeDirective from 'primevue/badgedirective'
import StyleClass from 'primevue/styleclass'
import Ripple from 'primevue/ripple'

import Tooltip from 'primevue/tooltip'
import i18n from './i18n'

createApp(App)
  .use(Router)
  .use(PrimeVue)
  .use(i18n)
  .directive('badge', BadgeDirective)
  .directive('styleclass', StyleClass)
  .directive('ripple', Ripple)
  .directive('tooltip', Tooltip)
  .mount('#app')
