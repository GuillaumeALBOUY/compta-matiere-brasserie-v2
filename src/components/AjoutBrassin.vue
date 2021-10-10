<template>
  <div>
    <h2>Nouveau Brassin</h2>
    <b-form class="form-add" @submit="ajouter" @reset="retour">
      <b-form-group id="group-nom" label="Nom :" label-for="nom">
        <b-form-input
          id="nom"
          type="text"
          v-model="brassin.nom"
          placeholder="Nom du brassin"
          required
        />
      </b-form-group>
      <b-form-group id="group-date" label="Date :" label-for="date">
        <b-form-input id="date" type="date" v-model="brassin.date" required />
      </b-form-group>
      <b-button type='submit'>Ajouter</b-button>
      <b-button type='reset'>Annuler</b-button>
    </b-form>
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
    retour(event) {
      event.preventDefault()
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter(event) {
      event.preventDefault()
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