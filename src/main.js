import 'core-js/stable'
import Vue from 'vue'
import CoreuiVue from '@coreui/vue'
import App from './App'
import router from './router/index'
import store from './store'
// eslint-disable-next-line no-unused-vars
import babelPolyfill from 'babel-polyfill'
// eslint-disable-next-line no-unused-vars
import regeneratorRuntime from "regenerator-runtime";
import { cilUser, cilLockLocked } from '@coreui/icons';

Vue.use(CoreuiVue)
Vue.prototype.$log = console.log.bind(console)

new Vue({
  el: '#app',
  router,
  store,
  template: '<App/>',
  icons: { cilUser, cilLockLocked},
  components: {
    App
  }
})
