<template>
  <div>
    <h2>Création d'un produit</h2>
    <label for="nom"> Nom : </label>
    <input type="text" v-model="produit.nom" /> <br />
    <label for="contionnement"> Conditionnnement (cl) : </label>
    <input type="number" v-model="produit.conditionnement" /><br />
    <label for="contionnement"> °aclool (/1000) : </label>
    <input type="number" v-model="produit.abv" /><br />
    <button @click="ajouter">Ajouter</button>
    <button @click="retour">Annuler</button>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";
import api from "../config/url.js";

export default {
  name: "AjoutBrassin",

  props: ['brassin'],
  data() {
    return {
      produit: {
        nom: "",
        conditionnement: 0,
        abv: 0,
      },
    };
  },
  methods: {
    retour() {
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter() {
      console.log(
        "Produit créé : " + this.produit.nom + " " + this.produit.conditionnement
      );
      this.produit.ref = this.produit.nom + Date.now();
      this.produit.brassin = this.brassin.ref;
      axios
        .post(api.urlBackEnd + ":" + api.portBackEnd + "/api/stockproduit/", {
          produit: this.produit,
        })
        .then(() => {
          console.log("Produit créé");
          this.$emit("termine", { message: "Produit créé" });
        });
    },
  },
};
</script>