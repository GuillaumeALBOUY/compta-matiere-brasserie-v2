<template>
  <div>
    <h2>Ajout de matiere Première</h2>
    <label for="nom"> Nom : </label> <input type="text" v-model="mp.nom"/> <br />
    <label for="fournisseur"> Fournisseur : </label> <input type="text" v-model="mp.fournisseur"/><br />
    <label for="lot"> Lot : </label> <input type="text" v-model="mp.lot"/><br />
    <label for="dlc"> Date limite de consomation </label>
    <input type="date" v-model="mp.dlc"/><br />
    <label for="qCommande" > Quantité commandée </label>
    <input type="number" v-model="mp.qCommande"/><br />
    <button @click="ajouter">Ajouter</button> <button @click="retour">Annuler</button>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "AjoutMatierePremiere",
  data() {
    return {
      mp: {
        nom:"",
        fournisseur:"",
        lot:"",
        dlc:"",
        qCommande:0,
      }

    }
  },
  methods: {
    retour() {
        this.$emit('termine', {message: 'Action annulée'})
    },
    ajouter() {

        console.log("matiere premiere ajoutée : "+ this.mp.nom + " " + this.mp.dlc);

        this.$store.dispatch("setMatierePremiere", { matiere: this.mp});


        this.$emit('termine', {message: 'Matiere première ajoutée'})
    },
    
  },
};
</script>
