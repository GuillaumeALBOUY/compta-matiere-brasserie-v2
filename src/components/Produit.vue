<template>
  <div>
    <h2>Historique du produit</h2>
    {{ produit.nom }} en {{ produit.conditionnement }}cl
    <span v-if="brassin != null">
      issu du brassin {{ brassin.nom }} du {{ brassin.date | formatDate }}
    </span>

    <b-table-simple hover small caption-top responsive>
      <b-thead head-variant="dark">
        <b-tr>
          <b-th>Date</b-th>
          <b-th>Quantité</b-th>
          <b-th>Motif</b-th>
        </b-tr>
      </b-thead>
      <b-tbody>
        <b-tr v-for="mouvement in produit.mouvements" :key="mouvement._id">
          <b-td> {{ mouvement.date | formatDateCourt }} </b-td>
          <b-td> {{ mouvement.quantite }} </b-td>
          <b-td> {{ mouvement.motif }}</b-td>
        </b-tr>
      </b-tbody>
    </b-table-simple>

    <b-button @click="showAjoutMouvement = !showAjoutMouvement">
      Ajouter entrée/sortie
    </b-button>
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
import AjoutMouvementProduit from "../components/AjoutMouvementProduit.vue";

export default {
  props: ["produit"],

  data() {
    return {
      brassin: null,
      showAjoutMouvement: false,
    };
  },

  components: {
    AjoutMouvementProduit,
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
