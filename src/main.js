// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import vueBemCn from 'vue-bem-cn'
import Vuex from 'vuex'
import {store} from './store'
import PrettyCheckbox from 'pretty-checkbox-vue'

Vue.use(PrettyCheckbox)
// default delimiters settings
const bemConfig = {
  delimiters: {
    el: '__', // element delimeter
    mod: '_', // modifier delimeter
    modVal: '_' // value delimeter for modifier
  }
}

Vue.use(Vuex)
Vue.use(vueBemCn, bemConfig)
Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  store,
  router,
  components: { App },
  template: '<App/>'
})
