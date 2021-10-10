<template>
  <div>
    <b-container fluid>
      <b-row>
        <b-col sm="4">
          <h1>Liste des Brassins</h1>
          <b-table-simple hover small caption-top responsive>
            <b-thead head-variant="dark">
              <b-tr>
                <b-th>
                  Date
                </b-th>
                <b-th>
                  Brassin
                </b-th>
              </b-tr>
            </b-thead>
          <b-tbody>
            <b-tr
              v-for="brassin in brassins"
              :key="brassin.ref"
              @click="selectBrassin(brassin)"
            >
              <b-td> {{ brassin.date | formatDate }} </b-td> 
              <b-td>   {{ brassin.nom }} </b-td>
            </b-tr>
          </b-tbody>
          </b-table-simple>
          <b-button
            @click="showAjoutBrassin = !showAjoutBrassin"
            v-show="!showAjoutBrassin"
          >
            Créer un brassin
          </b-button>
          <AjoutBrassin
            v-if="showAjoutBrassin"
            @termine="termine"
          ></AjoutBrassin>
        </b-col>
        <b-col sm="8">
          <Brassin
            v-if="detailBrassin !== null"
            :brassin="detailBrassin"
            :key="detailBrassin.ref"
          ></Brassin>
        </b-col>
      </b-row>
    </b-container>
  </div>
</template>

<script>
import axios from "axios";
import api from "../config/url.js";
import AjoutBrassin from "../components/AjoutBrassin.vue";
import Brassin from "../components/Brassin.vue";

export default {
  data() {
    return { brassins: [], showAjoutBrassin: false, detailBrassin: null };
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
      if (payload.brassins) this.brassins = payload.brassins;
      
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
