<template>
    <h1>Hantera användarkonton</h1>

    <Register />
    <User />

    </template>

<script>


import Register from "../components/Register.vue";
import User from "../components/User.vue";



//hämta users att läsa ut i tabell sen
export default {

        // Reaktiv data
        data() {
        return {
            users: []
        }
    },
    components: {
        Register,
        User
    },

    methods: {
        
    }
}

</script>
