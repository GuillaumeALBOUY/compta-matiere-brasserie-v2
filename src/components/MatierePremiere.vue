<template>
  <div>
    <h2>Détail</h2>
    <div v-if="mp && mp.nom">
      <b-card>
      <b-card-title>
            Récap {{ mp.nom }}</b-card-title>
      
      <b-card-text class='left'>
        Fournisseur : {{ mp.fournisseur }}, <br/>
        lot numéro : {{ mp.lot }} <br/>
        A consomer avant le : {{ mp.dlc | formatDate }}  <br/>
        Quantité commandée : {{ mp.qCommande }}  <br/>
        Quantité restante : {{ quantiteRestante }}
      </b-card-text>
      <b-card-sub-title>Historique</b-card-sub-title>
      <b-list-group>
        <b-list-group-item v-for="mouvement in mp.mouvements" :key="mouvement._id" class="d-flex justify-content-between align-items-center">
          <span>{{ mouvement.brassin }} {{ mouvement.motif }} </span> <span>{{ mouvement.date | formatDateTresCourt }} </span> 
          <span>{{ mouvement.quantite }}</span> 
          
        </b-list-group-item>
      </b-list-group>
      <b-button @click="showAjoutMv = !showAjoutMv" v-show="!showAjoutMv">
        Ajouter un Mouvement
      </b-button>
      <AjoutMouvementMP v-if="showAjoutMv" :mp='mp' @termine='termine'></AjoutMouvementMP>
      </b-card>

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
  computed: {
    quantiteRestante() {
      return this.$store.getters.quantiteRestante;
    }

  },
  methods: {
    termine(payload) {
      this.showAjoutMv = false;
      console.log(payload.message);
    },
  },
};
</script>
<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
.left {
  text-align: left;
}

</style>