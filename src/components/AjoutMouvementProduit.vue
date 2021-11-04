<template>
  <div>
    <h3>Ajout de mouvements</h3>
    <b-form class="form-add" @submit="ajouter" @reset="retour">
      <b-form-group id="group-date" label="Date :" label-for="date">
        <b-form-input id="date" type="date" v-model="mv.date" required />
      </b-form-group>
      <b-form-group id="group-quantite" label="Quantité :" label-for="quantite">
        <b-form-input
          id="quantite"
          type="number"
          v-model="mv.quantite"
          required
        />
      </b-form-group>
      <b-form-group id="group-motif" label="Motif :" label-for="motif">
        <b-form-input id="motif" type="text" v-model="mv.motif" placeholder="Motif du mouvement" required />
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
    retour(event) {
      event.preventDefault()
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter(event) {
      event.preventDefault()
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
<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
.form-add {
  text-align: left;
}

</style>