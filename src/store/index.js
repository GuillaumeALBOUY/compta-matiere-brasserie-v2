import axios from 'axios'
import api from '../config/url.js'


export default {
  state: {
    nomBrasserie: "L'embrasserie",
    matieresPremieres: [],
    
  },
  getters: {
    allMatieresPremieres: (state) => state.matieresPremieres
  },
  mutations: {
    SET_MATIERES_PREMIERES(state, matieresPremieres) {
      state.matieresPremieres = matieresPremieres
    }
  },
  actions: {
    getMatieresPremieres({ commit }) {
      console.log('Récupération des données de connexion : ' + api + ' - ' + api.urlBackEnd);
      axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/')
        .then(response => {
          commit('SET_MATIERES_PREMIERES', response.data)
        })
    },

    setMatierePremiere({ commit }, payload) {
      const body= { matiere : payload.matiere};
      console.log("Demande d'ajout de : " +   body.matiere.nom);
      axios.post( api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/', body )
        .then(axios.get(api.urlBackEnd + ':' + api.portBackEnd + '/api/stockmp/') // TODO : partie de code à factoriser avec plus haut
          .then(response => {
          commit('SET_MATIERES_PREMIERES', response.data)
        }));

    }

  },
modules: {
}
}
