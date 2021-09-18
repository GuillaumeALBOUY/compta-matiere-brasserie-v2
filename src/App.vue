<template>
  <div id="app">
    <div id="nav">
      <b-link to="/matierespremieres">Matières premières</b-link> |
      <b-link to="/brassins">Brassins</b-link> |
      <b-link to="/produits">Produits</b-link>
    </div>
    <router-view/>
  </div>
</template>

<style lang="scss">
@import "~@/assets/scss/vendors/bootstrap-vue/index";
#app {
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

}
</style>
