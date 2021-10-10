import axios from 'axios'
import Vue from 'vue'
import api from '../config/url.js'


export default {
  state: {
    nomBrasserie: "L'embrasserie",
    matieresPremieres: [],
    detailMatierePremiere: null,

  },
  getters: {
    allMatieresPremieres: (state) => state.matieresPremieres,
    quantiteRestante: (state) => state.detailMatierePremiere.mouvements.reduce((quantite, mouvement) => parseInt(quantite) + parseInt(mouvement.quantite),
      state.detailMatierePremiere.qCommande)
  },
  mutations: {
    SET_MATIERES_PREMIERES(state, matieresPremieres) {
      //state.matieresPremieres = matieresPremieres;
      Vue.set(state, 'matieresPremieres', matieresPremieres);
    },
    ADD_MATIERES_PREMIERES(state, matierePremiere) {
      matierePremiere.totalConso = 0;
      state.matieresPremieres.push(matierePremiere);
    },
    SET_DETAIL_MATIERE_PREMIERE(state, matierePremiere) {
      state.detailMatierePremiere = matierePremiere;
    }
  },
  actions: {
    getMatieresPremieres({ commit }) {
      axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/')
        .then(response => {
          commit('SET_MATIERES_PREMIERES', response.data)
        })
    },

    getMatierePremiere({ commit }, payload) {
      axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/' + payload.matierePremiere.ref)
        .then(response => {
          console.log("matiere premiere obtenue : " + response);
          commit('SET_DETAIL_MATIERE_PREMIERE', response.data)
        })

    },

    setMatierePremiere({ commit }, payload) {
      console.log("set matiere premiere ");
      const body = { matiere: payload.matiere };
      if (body.matiere.ref == undefined) {
        console.log("ajout matiere premiere ");
        body.matiere.ref = body.matiere.nom + Date.now();
        axios.post(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/', body)
          .then(() => {
            axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/') // TODO : partie de code à factoriser avec plus haut
              .then(response => {
                //console.log("Mise à jour de la liste de matieres premieres "+ JSON.stringify(response.data));
                commit('SET_MATIERES_PREMIERES', response.data)
              })
          }
          );
      } else {
        console.log("mise à jour matiere premiere ");
        axios.put(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/' + body.matiere.ref, body)
          .then(() => {
            axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/') // TODO : partie de code à factoriser avec plus haut
              .then(response => {
                //console.log("Mise à jour de la liste de matieres premieres "+ JSON.stringify(response.data));
                commit('SET_MATIERES_PREMIERES', response.data)
              })
          }
          );
      }

    },



  },
  modules: {
  }
}
