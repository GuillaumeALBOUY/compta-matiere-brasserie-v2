<template>
  <div>
    <h2>Détail mp</h2>
    <div v-if="mp && mp.nom">
      <h3>Récap {{ mp.nom }}</h3>
      <ul>
        <li v-for="(value, name) in mp" :key="name">
          {{ name }} : {{ value }}
        </li>
      </ul>
      <h3>Historique</h3>
      <ul>
        <li v-for="mouvement in mp.mouvements" :key="mouvement._id">
          Le {{ mouvement.date }}, {{ mouvement.quantite }}
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
