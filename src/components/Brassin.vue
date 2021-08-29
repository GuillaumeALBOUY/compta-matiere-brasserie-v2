<template>
  <div>
    <div v-if="brassin != null">
      <h2>{{ brassin.nom }} du {{ brassin.date | formatDate }}</h2>

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
        @termine="termineMP"
        :brassin="brassin"
      ></AjoutMPBrassin>

      <h3>Produits</h3>
      <ul v-if="produits.length > 0">
        <li v-for="produit in produits" :key="produit.ref">
          {{ produit.nom }} - {{ produit.conditionnement }}cl :
          {{ produit.quantite }} unités
          <button
            @click="produit.showModif = !produit.showModif"
            v-if="!produit.showModif"
          >
            Produire
          </button>
          <span v-if="produit.showModif">
            <input type="date" v-model="produit.modifDate" />
            <input type="number" v-model="produit.quantiteProduite" />
            <button @click="modifProduit(produit)">
              ajouter
            </button>
            <button @click="produit.showModif = !produit.showModif">
              annuler
            </button>
          </span>
        </li>
      </ul>
      <button @click="showCreerProduit = !showCreerProduit">
        Ajouter un conditionnement
      </button>
      <ajout-produit
        v-if="showCreerProduit"
        @termine="termineProduit"
        :brassin="brassin"
      ></ajout-produit>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url";
import AjoutMPBrassin from "./AjoutMPBrassin.vue";
import AjoutProduit from "./AjoutProduit.vue";
export default {
  props: ["brassin"],

  data() {
    return {
      matieres: [],
      showAjoutMP: false,
      produits: [],
      showCreerProduit: false,
    };
  },

  computed: {
    temoinMajMP() {
      return this.$store.state.matieresPremieres;
    },
  },

  components: {
    AjoutMPBrassin,
    AjoutProduit,
  },

  methods: {
    termineMP() {
      //console.log('ajout terminé');
      this.showAjoutMP = false;
    },

    termineProduit() {
      this.showCreerProduit = false;
      this.loadProduitBrassin();
    },

    modifProduit(produit) {
      this.showCreerProduit = false;
      // récupération du produit en base
      axios
        .get(
          api.urlBackEnd +
            ":" +
            api.portBackEnd +
            "/api/stockproduit/" +
            produit.ref
        )
        .then(
          // ajout de la quantite produite
          (response) => {
            const newProduit = response.data;
            newProduit.mouvements.push({
              date: produit.modifDate,
              quantite: produit.quantiteProduite,
              motif: "mise en bouteille",
            });
            axios
              .put(
                api.urlBackEnd +
                  ":" +
                  api.portBackEnd +
                  "/api/stockproduit/" +
                  produit.ref,
                { produit: newProduit }
              )
              .then(() => {
                produit.showModif = false;
                this.loadProduitBrassin();
              });
          }
        );
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

    loadProduitBrassin() {
      axios
        .get(
          api.urlBackEnd +
            ":" +
            api.portBackEnd +
            "/api/stockproduit/brassin/" +
            this.brassin.ref
        )
        .then((response) => {
          this.produits = response.data.map((produit) => {
            const reducer = (accumulator, mouvement) =>
              mouvement.quantite > 0
                ? accumulator + mouvement.quantite
                : accumulator;
            return {
              nom: produit.nom,
              conditionnement: produit.conditionnement,
              ref: produit.ref,
              quantite: produit.mouvements.reduce(reducer, 0),
              showModif: false,
              modifDate: "",
              quantiteProduite: 0,
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
    this.loadProduitBrassin();
  },
};
</script>
