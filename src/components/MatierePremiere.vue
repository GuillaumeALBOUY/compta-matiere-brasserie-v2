<template>
    <div> <h2> Détail mp </h2>
     <ul v-if="mp!==null">   
        <li v-for='(value,name) in mpdetail' :key='name'> {{ name }} : {{ value }} </li>
     </ul>   
     <span v-else> Selectionner une matiere </span>
    </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import api from '../config/url.js'
import axios from 'axios'

export default {
    name: 'MatierePremiere',
    props: ['mp'],
    data() {
        return { mpdetail: null }

    },
    mounted() {
    console.log('composant détail monté')
    console.log(' chargement de la matiere : '+ this.mp.nom)
    axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/'+ this.mp.nom)
            .then(response => { console.log("matiere premiere obtenue : "+response);
            this.mpdetail=response.data})
  }
}
</script>
