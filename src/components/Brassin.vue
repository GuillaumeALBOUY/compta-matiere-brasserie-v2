<template>
  <div>
    <div v-if="brassin != null">
      <h2>{{ brassin.nom }} du {{ brassin.date }}</h2>

      <h3>Matières Premières</h3>
      <ul v-if="matieres.length > 0">
        <li v-for="matiere in matieres" :key="matiere.ref">
          {{ matiere.nom }} - {{ matiere.lot }} : {{ matiere.quantite }}
        </li>
      </ul>

      <button @click="showAjoutMP = !showAjoutMP">
        Modifier les matieres premieres
      </button>
      <AjoutMPBrassin
        v-if="showAjoutMP"
        @termine="termine"
        :brassin="brassin"
      ></AjoutMPBrassin>

      <h3>Produits</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url";
import AjoutMPBrassin from "./AjoutMPBrassin.vue";

export default {
  props: ["brassin"],

  data() {
    return {
      matieres: [],
      showAjoutMP: false,
    };
  },
  
  computed: {

    temoinMajMP() {
      return this.$store.state.matieresPremieres;
    }

  },

  components: {
    AjoutMPBrassin,
  },

  methods: {
    termine() {
      //console.log('ajout terminé');
      this.showAjoutMP = false;
    },

    loadMPBrassin() {
      axios
        .get(
          api.urlBackEnd +
            ":" +
            api.portBackEnd +
            "/api/stockmp/brassin/" +
            this.brassin.ref
        )
        .then((response) => {
          this.matieres = response.data.map((matiere) => {
            return {
              nom: matiere.nom,
              lot: matiere.lot,
              ref: matiere.ref,
              quantite: matiere.mouvements.find(
                (mouvement) => mouvement.brassin == this.brassin.ref
              ).quantite,
            };
          });
        });
    },
  },

  watch: {
    temoinMajMP: {
      handler: function () {
        console.log("watch brassin");
        this.loadMPBrassin();
      },
      deep: true,
    },
  },

  mounted() {
    this.loadMPBrassin();
  },
};
</script>
