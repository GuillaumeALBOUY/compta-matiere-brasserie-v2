<template>
  <div id="app">
    <div id="nav">
      <b-nav tabs>
      <b-nav-item to="/matierespremieres">Matières premières</b-nav-item> 
      <b-nav-item to="/brassins">Brassins</b-nav-item> 
      <b-nav-item to="/produits">Produits</b-nav-item>
      </b-nav>
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
