<template>
 <Header v-if="!$route.meta.hideHeader" />

 <main>
    <!-- Importerar views -->
<RouterView />
 </main>

 <Footer v-if="!$route.meta.hideFooter"/>
</template>

<script>
import { RouterView } from 'vue-router'
import Header from "./components/Header.vue";
import Footer from "./components/Footer.vue";

export default {
components: {
    Header,
    RouterView,
    Footer
} 
}

</script>

<style>
</style>