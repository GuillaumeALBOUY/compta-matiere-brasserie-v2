<template>
  <div>
    <h3>Ajout de mouvements</h3>
    <label for="date"> Date </label>
    <input type="date" v-model="mv.date" /><br />
    <label for="quantite"> Quantité </label>
    <input type="number" v-model="mv.quantite" /><br />
    <label for="motif"> Motif : </label>
    <input type="text" v-model="mv.motif" /> <br />
    <button @click="ajouter">Ajouter</button>
    <button @click="retour">Annuler</button>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";
import api from "../config/url.js";

export default {
  name: "AjoutMouvementBrassin",
  props: ["produit"],

  data() {
    return {
      mv: {
        date: "",
        quantite: 0,
        motif: "",
      },
    };
  },
  methods: {
    retour() {
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter() {
      console.log(
        "Mouvement ajouté : " + this.mv.date + " sur " + this.produit.nom
      );
      axios
        .get(
          api.urlBackEnd +
            ":" +
            api.portBackEnd +
            "/api/stockproduit/" +
            this.produit.ref
        )
        .then(
          // ajout de la quantite produite
          (response) => {
            const newProduit = response.data;
            newProduit.mouvements.push(this.mv);
            axios
              .put(
                api.urlBackEnd +
                  ":" +
                  api.portBackEnd +
                  "/api/stockproduit/" +
                  this.produit.ref,
                { produit: newProduit }
              )
              .then(() => {
                this.$emit("termine", { message: "Mouvement ajouté" });
              });
          }
        );
    },
  },
};
</script>
