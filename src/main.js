import '@babel/polyfill'
import 'mutationobserver-shim'
import Vue from 'vue'
import './plugins/bootstrap-vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import storeDeclaration from './store'

import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

//Filtres de formatage des dates
Vue.filter('formatDate',
  (value) => (new Date(value)).toLocaleDateString('fr-FR',
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }))
Vue.filter('formatDateCourt',
    (value) => (new Date(value)).toLocaleDateString('fr-FR',
      { year: "numeric", month: "long", day: "numeric" }))
Vue.filter('formatDateTresCourt',
      (value) => (new Date(value)).toLocaleDateString('fr-FR',
        { year: "numeric", month: "numeric", day: "numeric" }))

const store = new Vuex.Store(storeDeclaration)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
