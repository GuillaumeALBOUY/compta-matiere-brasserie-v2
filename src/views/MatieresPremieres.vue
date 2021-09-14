<template>
  <div>
    <h1>Liste des matières premières</h1>
    Filtre <span @click="filtre=''"> [tout] </span>
     <span @click="filtre='malt'"> [malt] </span> 
     <span @click="filtre='houblon'"> [houblon] </span>
    <span @click="filtre='autre'"> [autre] </span>
     <span @click="showArchive=!showArchive"> [Montrer les matières archivées] </span>
    <ul>
      <li
        v-for="mp in allMatieresPremieres"
        :key="mp.ref"
        @click="selectMP(mp)"
      >
        {{ mp.nom }} | {{ mp.fournisseur }} | {{ mp.lot }} |
        {{ mp.dlc | formatDate }} | {{ mp.qCommande }} |
        {{ parseInt(mp.qCommande) + parseInt(mp.totalConso) }}
      </li>
    </ul>
    <button @click="showAjoutMP = !showAjoutMP" v-show="!showAjoutMP">
      Ajouter une Matiere Premiere
    </button>
    <AjoutMatierePremiere
      v-if="showAjoutMP"
      @termine="termine"
    ></AjoutMatierePremiere>
    <MatierePremiere v-bind:mp="mpDetail"> </MatierePremiere>
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
      return this.$store.getters.allMatieresPremieres
      } else {
        return this.$store.getters.allMatieresPremieres.filter((mp)=>mp.type==this.filtre)
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