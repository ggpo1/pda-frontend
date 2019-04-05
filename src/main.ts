import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import EventBus from './EventBus'

import './assets/global.css'

import { Datetime } from 'vue-datetime'
import 'vue-datetime/dist/vue-datetime.css'

import { library } from '@fortawesome/fontawesome-svg-core'
import { faSync, faSearch, faCalculator } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faSearch, faSync, faCalculator)
Vue.component('fa-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(Datetime)

new Vue({
  router,
  store,
  render: (h) => h(App)
}).$mount('#app')

window.onscroll = () => EventBus.$emit('global-scroll', window.pageYOffset)
