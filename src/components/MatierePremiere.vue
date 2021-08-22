<template>
    <div> <h2> Détail mp </h2>
    <div v-if="mp.nom">
    <h3> Récap {{ mp.nom }} </h3>
     <ul>   
        <li v-for='(value,name) in mp' :key='name'> {{ name }} : {{ value }} </li>
     </ul>   
     <h3> Historique </h3>
     <ul>   
        <li v-for='mouvement in mp.mouvements' :key='mouvement._id'> Le {{ mouvement.date }}, {{ mouvement.quantite }} {{ mouvement.brassin }} </li>
     </ul>
     </div>
     <span v-else> Selectionner une matiere </span>
    </div>
</template>

<script>

export default {
    name: 'MatierePremiere',
    props: ['mp'],
    

}
</script>
