import Vue from 'vue'
import VueRouter from 'vue-router'
import Vuex from 'vuex'
import App from './App.vue'
import router from './router'
import storeDeclaration from './store'


Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(Vuex)

const store= new Vuex.Store(storeDeclaration)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
