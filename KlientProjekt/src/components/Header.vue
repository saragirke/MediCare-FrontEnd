<template>
<div class="header">
    <div class="menu-bar">
    
    <!--Bootstrap-->
    <nav class="navbar navbar-expand-lg navbar-light">
    <RouterLink to="/"><img src="../img/testlogo.png" alt="logo"></RouterLink>
     <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
        <span class="" role="button" ><i class="fa fa-bars" aria-hidden="true" style="color:#e6e6ff"></i></span>
    </button>
    <div class="collapse navbar-collapse" id="navbarNav">
        <ul class="navbar-nav ms-auto">
            <li class="nav-item">
                <RouterLink class="nav-link" to="/">Lager</RouterLink>
            </li>
            <li class="nav-item">
                <RouterLink class="nav-link" to="/accounts">Användarkonton</RouterLink>
            </li>
      <!--logga ut-->
      <li class="nav-item">
        <a class="nav-link logout" v-on:click.prevent="logout">Logga ut</a>
      </li>
      
    </ul>
  </div>
</nav>

    </div></div>

    <!--hamburger-icon-->
    <i icon="fa-solid fa-bars" />

</template>

<script>
import { RouterLink } from 'vue-router'
export default {
    components: {
        RouterLink
    },
    methods: {
        //utloggning
        logout:function() {

        if(confirm("Är du säker på att du vill logga ut?")){
        //hämtar token 
        let token = (localStorage.getItem('token'));
        const resp = fetch("https://medicareinventory.herokuapp.com/api/logout", {
            //Postanrop
            //tar bort token från databas
            method: "POST",
            //Headers
            headers:{
                "Accept": "application json",
                "Content-Type": "application/json",
                //skickar med token
                "Authorization" : "Bearer " + token
            }
    });
            //radera token
            localStorage.removeItem('token');
            this.$router.push({ name: "login"});
        }
    }}

}
</script>

<style scoped>
.menu-bar {
    background-image: linear-gradient(-90deg, rgb(72, 186, 164), #0f5d9c); 
}

.nav-link {
    font-size: 20px;
    margin: 5px;
    color: white;
}

.navbar-nav {
    text-align: right;
    margin-right: 20px;
}

.menu-bar .navbar-toggler {
    padding-right: 20px;
    outline: none!important;
    border: none!important;
}

.navbar .fa {
    color: white!important;
    font-size: 26px;
}

.nav-link:hover {
    font-weight: 600;
    border-bottom: 1px solid white;
}

.navbar-toggler-icon {
    color: white!important;;
}

.logout {
    color: #0f5d9c;
    cursor: pointer;
}

@media only screen and (max-width: 990px) {
    .nav-link:hover {
        border-bottom: none!important;
    }
}
</style>