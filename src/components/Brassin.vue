<template>
  <div>
    <div v-if="brassin != null">
      <h2>{{ brassin.nom }} du {{ brassin.date | formatDate }}</h2>

      <h3>Matières Premières</h3>
      <b-container>
        <b-table-simple hover small caption-top responsive v-if="matieres.length > 0">
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>
                  Nom
                </b-th>
                <b-th>
                  Lot
                </b-th>
                <b-th>
                  Quantité
                </b-th>
              </b-tr>
            </b-thead>
      <b-tbody >
        <b-tr v-for="matiere in matieres" :key="matiere.ref">
          <b-td> {{ matiere.nom }} </b-td>
          <b-td> {{ matiere.lot }} </b-td>
          <b-td> {{ matiere.quantite }} </b-td>
        </b-tr>
      </b-tbody>
        </b-table-simple>
      </b-container>

      <b-button @click="showAjoutMP = !showAjoutMP">
        Modifier les matieres premieres
      </b-button>
      <AjoutMPBrassin
        v-if="showAjoutMP"
        @termine="termineMP"
        :brassin="brassin"
      ></AjoutMPBrassin>

      <h3>Produits</h3>
      
      <b-list-group v-if="produits.length > 0">
        <b-list-group-item v-for="produit in produits" :key="produit.ref">
          {{ produit.nom }} - {{ produit.conditionnement }}cl :
          {{ produit.quantite }} unités
          <b-button
            @click="produit.showModif = !produit.showModif"
            v-if="!produit.showModif"
          >
            Produire
          </b-button>
          <span v-if="produit.showModif" @submit.stop.prevent="modifProduit(produit)" @reset="produit.showModif = !produit.showModif">
            <b-form inline>
            <b-form-input type="date" v-model="produit.modifDate" class="mr-sm-2 mb-sm-0" required/>
            <b-form-input type="number" v-model="produit.quantiteProduite" class="mb-2 mr-sm-2 mb-sm-0" required/>
            <b-button type="submit" >
              ajouter
            </b-button>
            <b-button type="reset" >
              annuler
            </b-button>
            </b-form>
          </span>
        </b-list-group-item>
      </b-list-group>
      <b-button @click="showCreerProduit = !showCreerProduit">
        Ajouter un conditionnement
      </b-button>
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

/*  watch: {
    temoinMajMP: {
      handler: function () {
        console.log("watch brassin");
        this.loadMPBrassin();
      },
      deep: true,
    },
  },*/

  mounted() {
    this.loadMPBrassin();
    this.loadProduitBrassin();
  },
};
</script>
