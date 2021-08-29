<template>
  <div>
    <h2>Historique du produit</h2>
    {{ produit.nom }} en {{ produit.conditionnement }}cl <span v-if='brassin!=null'> issu du brassin  
    {{ brassin.nom }} du {{ brassin.date | formatDate }} </span>

    <ul v-for="mouvement in produit.mouvements" :key="mouvement._id">
      <li>
        {{ mouvement.date | formatDate }} | {{ mouvement.quantite }} | {{ mouvement.motif }}
      </li>
    </ul>

    <button @click="showAjoutMouvement = !showAjoutMouvement">
      Ajouter entrée/sortie
    </button>
    <ajout-mouvement-produit
      v-if="showAjoutMouvement"
      @termine="termine"
      :produit="produit"
    ></ajout-mouvement-produit>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url.js";
import AjoutMouvementProduit from "../components/AjoutMouvementProduit.vue"

export default {
  props: ["produit"],

  data() {
    return {
      brassin: null,
      showAjoutMouvement: false,
    };
  },

  components: {
      AjoutMouvementProduit
  },

  methods: {
    termine() {
      this.showAjoutMouvement = false;
      this.$emit("misajour", { message: "ajout d'un mouvement" });
    },
  },

  mounted() {
    axios
      .get(
        api.urlBackEnd +
          ":" +
          api.portBackEnd +
          "/api/histobrassin/" +
          this.produit.brassin
      )
      .then((response) => {
        this.brassin = response.data;
      });
  },
};
</script>
