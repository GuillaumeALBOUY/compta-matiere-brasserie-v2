<template>
  <div>
    <h1>Liste des Brassins</h1>
    <ul>
      <li
        v-for="brassin in brassins"
        :key="brassin.ref"
        @click="selectBrassin(brassin)"
      >
        {{ brassin.date }} | {{ brassin.nom }}
      </li>
    </ul>
    <button
      @click="showAjoutBrassin = !showAjoutBrassin"
      v-show="!showAjoutBrassin"
    >
      Créer un brassin
    </button>
    <AjoutBrassin v-if="showAjoutBrassin" @termine="termine"></AjoutBrassin>
    <Brassin v-if="detailBrassin!==null" :brassin="detailBrassin" :key='detailBrassin.ref'></Brassin>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url.js";
import AjoutBrassin from "../components/AjoutBrassin.vue";
import Brassin from "../components/Brassin.vue";

export default {
  data() {
    return { brassins: [], showAjoutBrassin: false,
    detailBrassin: null };
  },

  components: {
    AjoutBrassin,
    Brassin,
  },

  methods: {
    selectBrassin(brassin) {
      this.detailBrassin = brassin;
    },

    termine(payload) {
      this.showAjoutBrassin = false;
      this.brassins = payload.brassins;
    },
  },

  mounted() {
    axios
      .get(api.urlBackEnd + ":" + api.portBackEnd + "/api/histobrassin/")
      .then((response) => {
        this.brassins = response.data;
      });
  },
};
</script>
