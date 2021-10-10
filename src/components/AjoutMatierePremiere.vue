<template>
  <div>
    <h2>Ajout de matiere Première</h2>
    <b-form class="form-add" @submit="ajouter" @reset="retour">
      <b-form-group id='group-type' label='Type :' label-for='type'>
            <b-form-select id='type' v-model="mp.type" required >
              <option disabled value="">Choisissez</option>
              <option>malt</option>
              <option>houblon</option>
              <option>autre</option>
            </b-form-select>
      </b-form-group>
      <b-form-group id='group-nom' label='Nom :' label-for='nom'>
        <b-form-input id='nom' type="text" placeholder="Désignation de la matière" v-model="mp.nom" required/>
      </b-form-group>
      <b-form-group id='group-fournisseur' label='Fournisseur :' label-for='fournisseur'>
        <b-form-input id='fournisseur' type="text" placeholder="Nom du frounisseur" 
        v-model="mp.fournisseur" required/>
      </b-form-group>
      <b-form-group id='group-lot' label='Lot :' label-for='lot'>
        <b-form-input id='lot' type="text" placeholder="Référence du lot" 
         v-model="mp.lot" required/>
      </b-form-group>
      <b-form-group id='group-dlc' label='Date limite :' label-for='dlc'>
        <b-form-input id='dlc' type="date" v-model="mp.dlc" required />
      </b-form-group>
      <b-form-group id='group-qCommande' label='Quantité commandée :' label-for='qCommande'>
        <b-form-input id='qCommande' type="number" placeholder='Saisir la quantitée' v-model="mp.qCommande" min=1 />
      </b-form-group>
      
      <b-alert show variant='danger' v-show="message!=''"> {{ message }} </b-alert>
      <b-button type='submit' >Ajouter</b-button>
      <b-button type="reset" >Annuler</b-button>
    </b-form>
  </div>
</template>

<script>
//import { defineComponent } from '@vue/composition-api'

export default {
  name: "AjoutMatierePremiere",
  data() {
    return {
      mp: {
        type: "",
        nom: "",
        fournisseur: "",
        lot: "",
        dlc: "",
        qCommande: 0,
        archive: false,
      },
      message: "",
    };
  },
  methods: {
    retour(event) {
      event.preventDefault()
      this.$emit("termine", { message: "Action annulée" });
    },
    ajouter(event) {
      event.preventDefault()
      if (
        this.mp.type == "" ||
        this.mp.nom == "" ||
        this.mp.fournisseur == "" ||
        this.mp.lot == "" ||
        this.mp.dlc == "" ||
        this.mp.qCommande == 0
      ) {
        this.message = "Toutes les données sont obligatoires";
      } else {
        console.log(
          "matiere premiere ajoutée : " + this.mp.nom + " " + this.mp.dlc
        );
        this.$store.dispatch("setMatierePremiere", { matiere: this.mp });
        this.$emit("termine", { message: "Matiere première ajoutée" });
      }
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

