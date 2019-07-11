import Vue from 'vue'
import Router from 'vue-router'
import AppSearch from '@/components/AppSearch'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'AppSearch',
      component: AppSearch
    }
  ]
})
