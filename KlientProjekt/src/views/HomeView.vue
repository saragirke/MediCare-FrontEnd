<script>

</script>

<template>
  <h1>Lager</h1>
  <h2>Kategorier</h2>
<div class="grid">

  <router-link to="/vitamin">
  <div class="category">
  <img src="../img/vitamins.png" alt="pillerburk" class="center">
  <h2>vitaminer</h2></div>
  </router-link>
  


  <router-link to="/superfood">
  <div class="category">
  <img src="../img/avocado.png" alt="avokado" class="center">
  <h2>superfoods</h2></div>
  </router-link>

</div>
</template>

<style scoped>
.grid {
  display: grid;
  grid-template-columns: auto auto;
  justify-content: center;
 
}

.category {
  width: 300px;
  height: 300px;
  background-color: white;
  border: 1px solid #0F5D9C;
  margin: 1em;
}

.center {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 180åx;
  height: 210px;
}

a {
  text-decoration: none;
}

img {
  margin-top: 20px;
}

@media screen and (max-width: 670px) {
  .grid {
  display: flex;
  flex-direction: column;
}
  .category {
    width: 80%;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>
