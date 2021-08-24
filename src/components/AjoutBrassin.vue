<template>
  <div>
    <h2>Nouveau Brassin</h2>
    <label for="nom"> Nom : </label>
    <input type="text" v-model="brassin.nom" /> <br />
    <label for="date"> Date : </label>
    <input type="date" v-model="brassin.date" /><br />
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
  data() {
    return {
      brassin: {
        nom: "",
        date: "",
      },
    };
  },
  methods: {
    retour() {
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter() {
      console.log(
        "Brassin créé : " + this.brassin.nom + " " + this.brassin.date
      );
      this.brassin.ref = this.brassin.nom + Date.now();
      axios
        .post(api.urlBackEnd + ":" + api.portBackEnd + "/api/histobrassin/", {
          brassin: this.brassin,
        })
        .then(() => {
          console.log("Brassin créé rechargement de la liste");
          axios
            .get(api.urlBackEnd + ":" + api.portBackEnd + "/api/histobrassin/")
            .then((response) => {
              this.$emit("termine", {
                message: "Brassin créé",
                brassins: response.data,
              });
            });
        });
    },
  },
};
</script>