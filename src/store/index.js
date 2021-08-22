import axios from 'axios'
import Vue from 'vue'
import api from '../config/url.js'


export default {
  state: {
    nomBrasserie: "L'embrasserie",
    matieresPremieres: [],
    detailMatierePremiere: null

  },
  getters: {
    allMatieresPremieres: (state) => state.matieresPremieres
  },
  mutations: {
    SET_MATIERES_PREMIERES(state, matieresPremieres) {
      //state.matieresPremieres = matieresPremieres;
      Vue.set(state, 'matieresPremieres', matieresPremieres);
    },
    ADD_MATIERES_PREMIERES(state, matierePremiere) {
      state.matieresPremieres.push(matierePremiere);
    },
    SET_DETAIL_MATIERE_PREMIERE (state, matierePremiere) {
      state.detailMatierePremiere=matierePremiere;
    }
  },
  actions: {
    getMatieresPremieres({ commit }) {
      axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/')
        .then(response => {
          commit('SET_MATIERES_PREMIERES', response.data)
        })
    },

    getMatierePremiere({ commit }, payload ) {
      axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/'+ payload.matierePremiere.nom)
            .then(response => { console.log("matiere premiere obtenue : "+response);
            commit('SET_DETAIL_MATIERE_PREMIERE',response.data)})

    },

    setMatierePremiere({ commit }, payload) {
      const body = { matiere: payload.matiere };
      axios.post(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/', body)
        .then(
          /*axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/') // TODO : partie de code à factoriser avec plus haut
          .then(response => {
          commit('SET_MATIERES_PREMIERES', response.data)})*/
          commit('ADD_MATIERES_PREMIERES', body.matiere)
        );

    }

  },
  modules: {
  }
}
