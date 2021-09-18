<template>
  <div id="app">
    <div id="nav">
      <router-link to="/matierespremieres">Matières premières</router-link> |
      <router-link to="/brassins">Brassins</router-link> |
      <router-link to="/produits">Produits</router-link>
    </div>
    <router-view/>
  </div>
</template>

<style>
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

}
</style>
