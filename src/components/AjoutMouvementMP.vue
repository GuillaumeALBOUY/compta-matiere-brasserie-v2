<template>
  <div>
    <h3>Ajout de mouvements</h3>
    <label for="date"> Date </label>
    <input type="date" v-model="mv.date"/><br />
    <label for="quantite" > Quantité </label>
    <input type="number" v-model="mv.quantite"/><br />
    <label for="motif"> Motif : </label> <input type="text" v-model="mv.motif"/> <br />
    <button @click="ajouter">Ajouter</button> <button @click="retour">Annuler</button>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "AjoutMouvementMP",
  props: ['mp'],

  data() {
    return {
      mv: {
        date:'',
        quantite:0,
        brassin:'',
      },

    }
  },
  methods: {
    retour() {
        this.$emit('termine', {message: 'Action annulée'})
    },
    ajouter() {

        console.log("Mouvement ajouté : "+ this.mv.date + " sur " + this.mp.nom);
        this.mp.mouvements.push(this.mv);
        this.$store.dispatch("setMatierePremiere", { matiere: this.mp});
        this.$emit('termine', {message: 'Mouvement ajouté'})
    },
    
  },
};
</script>
