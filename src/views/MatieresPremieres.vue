<template>
  <div>
    <h1>Liste des matières premières</h1>
    <ul v-for="mp in allMatieresPremieres" :key='mp.ref'>
      <li @click='selectMP(mp)'>  
         {{mp.nom}} | {{mp.fournisseur}} | {{ mp.lot }} | {{ mp.dlc | formatDate }} | {{ mp.qCommande }} | {{ parseInt(mp.qCommande) + parseInt(mp.totalConso)}}
      </li>
    </ul>
    <button @click="showAjoutMP = !showAjoutMP" v-show="!showAjoutMP">Ajouter une Matiere Premiere</button>
    <AjoutMatierePremiere v-if="showAjoutMP" @termine='termine'></AjoutMatierePremiere>
    <MatierePremiere v-bind:mp=mpDetail>
    </MatierePremiere>

  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import AjoutMatierePremiere from '../components/AjoutMatierePremiere.vue';
import MatierePremiere from '../components/MatierePremiere.vue'

export default {

  data() {
    return {
      showAjoutMP: false,

    }
  },
  computed: {
    allMatieresPremieres() {
      return this.$store.getters.allMatieresPremieres;
    },
    mpDetail() {
      return this.$store.state.detailMatierePremiere;
    },
    
  },
  components: {
    MatierePremiere,
    AjoutMatierePremiere
  },
  methods: {
    selectMP(mp) 
    {
      this.$store.dispatch("getMatierePremiere", {matierePremiere : mp});
    },
    termine(payload) {
      this.showAjoutMP= false;
      console.log(payload.message)
//      this.$store.dispatch("getMatieresPremieres");

    }
  },
  mounted() {
    this.$store.dispatch("getMatieresPremieres");
  }

};
</script>