<template>
  <div>
    <h1>Liste des Produits</h1>
    <ul>
      <li
        v-for="produit in produits"
        :key="produit.ref"
        @click="selectProduit(produit)"
      >
        {{ produit.nom }} | {{ produit.totalStock }} /
        {{ produit.conditionnement }}cl
      </li>
    </ul>
    <Produit
      v-if="detailProduit != null"
      :produit="detailProduit"
      @misajour="reload(detailProduit)"
    ></Produit>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url.js";
import Produit from "../components/Produit.vue";

export default {
  data() {
    return { produits: [], detailProduit: null };
  },

  methods: {
    selectProduit(produit) {
      axios
        .get(
          api.urlBackEnd +
            ":" +
            api.portBackEnd +
            "/api/stockproduit/" +
            produit.ref
        )
        .then((response) => {
          this.detailProduit = response.data;
        });
    },

    reload(produit) {
      // rechargement du produit selectionné et de la liste des produits
      this.selectProduit(produit);
      axios
        .get(api.urlBackEnd + ":" + api.portBackEnd + "/api/stockproduit/")
        .then((response) => {
          this.produits = response.data;
        });
    },
  },

  components: {
    Produit,
  },

  mounted() {
    axios
      .get(api.urlBackEnd + ":" + api.portBackEnd + "/api/stockproduit/")
      .then((response) => {
        this.produits = response.data;
      });
  },
};
</script>