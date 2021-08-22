import VueRouter from 'vue-router'
import Brassins from '../views/Brassins.vue'
import MatieresPremieres from '../views/MatieresPremieres.vue'
import Produits from '../views/Produits.vue'


const routes = [
  
    {
    path: '/matierespremieres',
    name: 'MatierePremiere',
    component: MatieresPremieres
  },
  {
    path: '/brassins',
    name: 'Brassins',
    component: Brassins
  },
  {
    path: '/produits',
    name: 'Produits',
    component: Produits
  }


]


console.log('URL de base : '+process.env.BASE_URL)

const router = new VueRouter({
  mode: 'history',
  routes
})


export default router
