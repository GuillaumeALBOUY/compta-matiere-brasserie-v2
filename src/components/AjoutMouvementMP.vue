<template>
  <div>
    <h3>Ajout de mouvements</h3>
    <b-container>
      <b-form @submit="ajouter" @reset="retour">
        <b-form-group id="group-date" label="Date :" label-for="date">
          <b-form-input id="date" type="date" v-model="mv.date" required />
        </b-form-group>
        <b-form-group
          id="group-quantite"
          label="Quantité :"
          label-for="quantite"
          description="Saisissez un montant négatif s'il s'agit d'une sortie"
        >
          <b-form-input
            id="quantite"
            type="number"
            v-model="mv.quantite"
            :min="mouvementMini"
            required
          />
        </b-form-group>
        <b-form-group id="group-motif" label="Motif :" label-for="motif">
          <b-form-input
            id="motif"
            placeholder="Saisissez le motif du mouvement"
            type="text"
            v-model="mv.motif"
            required
          />
        </b-form-group>

        <b-button type="submit">Ajouter</b-button>
        <b-button type="reset">Annuler</b-button>
      </b-form>
    </b-container>
    <b-modal id="confirmation-archivage" hide-footer>
      <div>
        Il ne restera plus de matière première, la matière première va être
        archivée
      </div>
      <b-button @click="ajouterConfirm">Confirmer</b-button>
      <b-button @click="$bvModal.hide('confirmation-archivage')"
        >Annuler</b-button
      >
    </b-modal>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "AjoutMouvementMP",
  props: ["mp"],

  data() {
    return {
      mv: {
        date: "",
        quantite: null,
        brassin: "",
      },
    };
  },

  computed: {
    mouvementMini() {
      return -this.$store.getters.quantiteRestante;
    },
  },

  methods: {
    retour() {
      this.$emit("termine", { message: "Action annulée" });
    },

    ajouter() {
      if (
        parseInt(this.mv.quantite) +
          parseInt(this.$store.getters.quantiteRestante) ==
        0
      ) {
        console.log("Demande confirmation archivage");
        this.$bvModal.show("confirmation-archivage");
      } else {
        this.ajouterConfirm();
      }
    },

    ajouterConfirm() {
      this.$bvModal.hide("confirmation-archivage");
      this.mp.archive =
        parseInt(this.mv.quantite) +
          parseInt(this.$store.getters.quantiteRestante) ==
        0;
      console.log("Mouvement ajouté : " + this.mv.date + " sur " + this.mp.nom);
      this.mp.mouvements.push(this.mv);
      this.$store.dispatch("setMatierePremiere", { matiere: this.mp });
      this.$emit("termine", { message: "Mouvement ajouté" });
    },
  },
};
</script>

