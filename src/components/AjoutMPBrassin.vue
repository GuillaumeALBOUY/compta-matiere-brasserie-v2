<template>
  <div>
    <div>
      <b-modal id="selectMatierePremiere" hide-footer hide-header>
        <h3>Choix de la matiere premiere</h3>
        <b-list-group>
          <b-list-group-item
            v-for="mp in allMatieresPremieres"
            :key="mp.ref"
            @click="selectMP(mp)"
          >
            {{ mp.nom }} : {{ mp.lot }} (reste
            {{ parseInt(mp.qCommande) + parseInt(mp.totalConso) }})
          </b-list-group-item>
        </b-list-group>
      </b-modal>
    </div>
    <div v-if="matiere != null">
      <h3>{{ matiere.nom }}</h3>
      <b-form @submit="ajouter" @reset="retour">
        <b-form-group
          id="group-quantite"
          label="Quantité :"
          label-for="quantite"
        >
          <b-form-input
            id="quantite"
            type="number"
            v-model="mouvement.quantite"
            required
          />
        </b-form-group>
        <b-button type='submit'>Ajouter</b-button>
        <b-button type='reset'>Annuler</b-button>
      </b-form>
    </div>
  </div>
</template>

<script>
export default {
  props: ["brassin"],

  data() {
    return {};
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
    retour(event) {
      event.preventDefault()
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter(event) {
      event.preventDefault()
      this.$store.dispatch("setMatierePremiere", { matiere: this.matiere });
      this.$emit("termine", { message: "Mouvement ajouté" });
    },
    selectMP(mp) {
      this.$bvModal.hide("selectMatierePremiere");
      this.$store.dispatch("getMatierePremiere", { matierePremiere: mp });
    },
  },

  mounted() {
    this.$store.dispatch("getMatieresPremieres");
    this.$bvModal.show("selectMatierePremiere");
  },
};
</script>