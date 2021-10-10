<template>
  <div>
 
    <b-container fluid>
      <b-row>
      <b-col sm='8'>
    <h1>Liste des matières premières</h1>
     
    <b-button-group>
      <b-button @click="filtre=''"> tout </b-button>
      <b-button @click="filtre='malt'"> malt</b-button>
      <b-button @click="filtre='houblon'"> houblon </b-button>
      <b-button @click="filtre='autre'"> autre </b-button>
    </b-button-group>

    <b-form-checkbox v-model="showArchive" switch>
      Montrer les matières archivées
    </b-form-checkbox>
    
    
     <b-table-simple hover small caption-top responsive>
       <b-thead head-variant="dark">
         <b-tr>
         <b-th>Nom</b-th>
         <b-th>Fournisseur</b-th>
         <b-th>Lot</b-th>
         <b-th>Date limite</b-th>
         <b-th>Quantité commandée</b-th>
         <b-th>Quantité restante</b-th>
         </b-tr>
         </b-thead>
      <b-tbody>
        <b-tr v-for="mp in allMatieresPremieres"
        :key="mp.ref"
        @click="selectMP(mp)">
        <b-td>{{ mp.nom }}</b-td>
        <b-td>{{ mp.fournisseur }}</b-td>
        <b-td>{{ mp.lot }}</b-td>
        <b-td>{{ mp.dlc | formatDateCourt }}</b-td>
        <b-td>{{ mp.qCommande }}</b-td>
        <b-td>{{ parseInt(mp.qCommande) + parseInt(mp.totalConso) }}</b-td>
        </b-tr>
      </b-tbody>
     </b-table-simple>

    
    <b-button @click="showAjoutMP = !showAjoutMP" v-show="!showAjoutMP">
      Ajouter une Matiere Premiere
    </b-button>
    <AjoutMatierePremiere
      v-if="showAjoutMP"
      @termine="termine"
    ></AjoutMatierePremiere>
      
      </b-col>
     
      <b-col sm='4'>
    <MatierePremiere v-bind:mp="mpDetail"> </MatierePremiere>
      </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
//import { mapGetters } from "vuex";
import AjoutMatierePremiere from "../components/AjoutMatierePremiere.vue";
import MatierePremiere from "../components/MatierePremiere.vue";

export default {
  data() {
    return {
      showAjoutMP: false,
      filtre: "",
      showArchive: false,
    };
  },
  computed: {
    allMatieresPremieres() {
      if (this.filtre=='') {
      return this.$store.getters.allMatieresPremieres.filter((mp)=>(!mp.archive||this.showArchive))
      } else {
        return this.$store.getters.allMatieresPremieres.filter((mp)=>(mp.type==this.filtre&&(!mp.archive||this.showArchive)))
      }
    },
    mpDetail() {
      return this.$store.state.detailMatierePremiere;
    },
  },
  components: {
    MatierePremiere,
    AjoutMatierePremiere,
  },
  methods: {
    selectMP(mp) {
      this.$store.dispatch("getMatierePremiere", { matierePremiere: mp });
    },
    termine(payload) {
      this.showAjoutMP = false;
      console.log(payload.message);
      //      this.$store.dispatch("getMatieresPremieres");
    },
  },
  mounted() {
    this.$store.dispatch("getMatieresPremieres");
  },
};
</script>