<template>
  <div>
    <h2>Détail mp</h2>
    <div v-if="mp && mp.nom">
      <h3>Récap {{ mp.nom }}</h3>
      Fournisseur {{ mp.fournisseur }}, lot numéro : {{ mp.lot }} <br/>
      A consomer avant le {{ mp.dlc | formatDate }}
      Quantité commandée : {{ mp. qCommande }}
      <h3>Historique</h3>
      <ul>
        <li v-for="mouvement in mp.mouvements" :key="mouvement._id">
          Le {{ mouvement.date | formatDate }}, {{ mouvement.quantite }} pour
          {{ mouvement.brassin }} {{ mouvement.motif }}
        </li>
      </ul>
      <button @click="showAjoutMv = !showAjoutMv" v-show="!showAjoutMv">
        Ajouter un Mouvement
      </button>
      <AjoutMouvementMP v-if="showAjoutMv" :mp='mp' @termine='termine'></AjoutMouvementMP>

    </div>
    <span v-else> Selectionner une matiere </span>
  </div>
</template>

<script>
import AjoutMouvementMP from './AjoutMouvementMP.vue'

export default {
  name: "MatierePremiere",
  props: ["mp"],
  components: {
      AjoutMouvementMP
  },
  data() {
    return {
      showAjoutMv: false,
    };
  },
  methods: {
    termine(payload) {
      this.showAjoutMv = false;
      console.log(payload.message);
    },
  },
};
</script>
