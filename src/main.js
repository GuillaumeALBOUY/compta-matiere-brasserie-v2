import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import storeDeclaration from './store'


Vue.config.productionTip = false;
Vue.use(VueRouter);
Vue.use(Vuex);

//Filtre de formatage des dates
Vue.filter('formatDate',
  (value) => (new Date(value)).toLocaleDateString('fr-FR',
    { weekday: "long", year: "numeric", month: "long", day: "numeric" }))


const store = new Vuex.Store(storeDeclaration)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
