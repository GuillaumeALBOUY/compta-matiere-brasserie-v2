<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="4">
          <h1>Liste des Produits</h1>
          <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>Nom</b-th>
                <b-th>Stock</b-th>
                <b-th>Conditionnement</b-th>
              </b-tr>
            </b-thead>
            <b-tbody>
              <b-tr
                v-for="produit in produits"
                :key="produit.ref"
                @click="selectProduit(produit)"
              >
                <b-td> {{ produit.nom }} </b-td>
                <b-td> {{ produit.totalStock }} </b-td>
                <b-td> {{ produit.conditionnement }}cl </b-td>
              </b-tr>
            </b-tbody>
          </b-table-simple>
        </b-col>
        <b-col sm="8">
          <Produit
            v-if="detailProduit != null"
            :produit="detailProduit"
            @misajour="reload(detailProduit)"
          ></Produit>
        </b-col>
      </b-row>
    </b-container>
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