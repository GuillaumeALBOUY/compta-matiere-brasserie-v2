<template>
  <div>
    <div v-if="!isSelect">
      Choix de la matiere premiere

      <ul>
        <li
          v-for="mp in allMatieresPremieres"
          :key="mp.ref"
          @click="selectMP(mp)"
        >
          {{ mp.nom }} : {{ mp.lot }} (reste
          {{ parseInt(mp.qCommande) + parseInt(mp.totalConso) }})
        </li>
      </ul>
    </div>
    <div v-else-if="matiere != null">
      {{ matiere.nom }}
      <label for="quantite"> Quantité </label>
      <input type="number" v-model="mouvement.quantite" /><br />
      <button @click="ajouter">Ajouter</button>
      <button @click="retour">Annuler</button>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brassin"],

  data() {
    return {
      isSelect: false,
    };
  },

  computed: {
    allMatieresPremieres() {
      return this.$store.getters.allMatieresPremieres;
    },

    matiere() {
      return this.$store.state.detailMatierePremiere;
    },

    mouvement() {
      var mouvement = this.matiere.mouvements.find(
        (mouvement) => mouvement.brassin == this.brassin.ref
      );
      if (mouvement == null) {
        mouvement = {
          date: this.brassin.date,
          quantite: 0,
          brassin: this.brassin.ref,
        };
        this.matiere.mouvements.push(mouvement); // eslint-disable-line
      }
      return mouvement;
    },
  },

  methods: {
    retour() {
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter() {
      this.$store.dispatch("setMatierePremiere", { matiere: this.matiere });
      this.$emit("termine", { message: "Mouvement ajouté" });
    },
    selectMP(mp) {
      this.isSelect = true;
      this.$store.dispatch("getMatierePremiere", { matierePremiere: mp });
    },
  },

  mounted() {
    this.$store.dispatch("getMatieresPremieres");
  },
};
</script>