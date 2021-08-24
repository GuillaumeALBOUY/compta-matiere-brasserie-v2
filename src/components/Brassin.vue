<template>
  <div>
    <div v-if="brassin != null">
      <h2>{{ brassin.nom }} du {{ brassin.date }}</h2>

      <h3>Matières Premières</h3>
      <ul v-if="matieres.length > 0">
        <li v-for="matiere in matieres" :key="matiere.ref">
          {{ matiere.nom }} - {{ matiere.lot }} : {{ -matiere.quantite }}
        </li>
      </ul>
      <button @click="showModifieMP = !showModifieMP" v-show="!showModifieMP">
        Modifier les matieres premieres
      </button>
      <AjoutMPBrassin v-if="showModifieMP" @termine="termine"></AjoutMPBrassin>

      <h3>Produits</h3>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url";

export default {
  props: ["brassin"],

  data() {
    return {
      matieres: [],
      showModifieMP: false,
    };
  },

  mounted() {
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
          console.log(
            "recherche du brassin : " +
              JSON.stringify(
                matiere.mouvements.find(
                  (mouvement) => (mouvement.brassin = this.brassin.ref)
                )
              )
          );
          return {
            nom: matiere.nom,
            lot: matiere.lot,
            ref: matiere.ref,
            quantite: matiere.mouvements.find(
              (mouvement) => (mouvement.brassin = this.brassin.ref)
            ).quantite,
          };
        });
      });
  },
};
</script>
