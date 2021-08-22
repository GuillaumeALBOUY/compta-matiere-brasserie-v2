<template>
  <div>
    <h1>Liste des matières premières</h1>
    <ul v-for="mp in matieresPremieres" :key='mp.id'>
      <li @click='selectMP(mp)'>  
        {{mp.nom}} | {{mp.fournisseur}} | {{ mp.lot }} | {{ mp.dlc }} | {{ mp.qCommande }}
      </li>
    </ul>
    <button @click="showAjoutMP = !showAjoutMP" v-show="!showAjoutMP">Ajouter une Matiere Premiere</button>
    <AjoutMatierePremiere v-show="showAjoutMP" @termine='termine'></AjoutMatierePremiere>
    <MatierePremiere v-if="mpDetail" v-bind:mp=mpDetail>
    </MatierePremiere>

  </div>
</template>

<script>
import { mapState } from "vuex";
import AjoutMatierePremiere from '../components/AjoutMatierePremiere.vue';
import MatierePremiere from '../components/MatierePremiere.vue'

export default {

  data() {
    return {
      mpDetail: null,
      showAjoutMP: false,

    }
  },
  computed: {
    ...mapState(["matieresPremieres"]),
  },
  components: {
    MatierePremiere,
    AjoutMatierePremiere
  },
  methods: {
    selectMP(mp) 
    {
      this.mpDetail = mp
      console.log('la mp : '+mp.nom)
      console.log('mpDétail : '+ this.mpDetail.nom)
    },
    termine(payload) {
      this.showAjoutMP= false;
      console.log(payload.message)

    }
  },
  mounted() {
    console.log('composant monté')
    this.$store.dispatch("getMatieresPremieres");
  }

};
</script>