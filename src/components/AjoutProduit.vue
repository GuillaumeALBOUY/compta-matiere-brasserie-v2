<template>
  <div>
    <h3>Création d'un produit</h3>
    <b-form @submit="ajouter" @reset="retour">
      <b-form-group id="group-nom" label="Nom :" label-for="nom">
        <b-form-input
          id="nom"
          type="text"
          v-model="produit.nom"
          placeholder="Nom du produit"
          required
        />
      </b-form-group>
      <b-form-group
        id="group-conditionnement"
        label="Conditionnnement (cl) :"
        label-for="conditionnement"
      >
        <b-form-input
          id="conditionnement"
          type="number"
          v-model="produit.conditionnement"
          required
        />
      </b-form-group>
      <b-form-group id="group-abv" label="°alcool (/1000) :" label-for="abv">
        <b-form-input id="abv" type="number" v-model="produit.abv" required />
      </b-form-group>
      <b-button type="submit">Ajouter</b-button>
      <b-button type="reset">Annuler</b-button>
    </b-form>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'
import axios from "axios";
import api from "../config/url.js";

export default {
  name: "AjoutBrassin",

  props: ["brassin"],
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
    retour(event) {
      event.preventDefault()
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter(event) {
      event.preventDefault()
      console.log(
        "Produit créé : " +
          this.produit.nom +
          " " +
          this.produit.conditionnement
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