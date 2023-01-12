<template>
<div class="flex">
<img src="../img/testlogo.png" alt="logo">
<p>Lagerhantering</p>
    <div>
        <!--submit prevent för att förhindra att sidan laddas om om inte funktion kan gå igenom-->
        <form @submit.prevent="loginUser()">
        <label for="email">Emailadress: </label>
        <input class="shadow" type="email" v-model="user.email"><img class="icon" src="../img/user.png"><br>

        <label for="password">Lösenord: </label>
        <input class="shadow" type="password" v-model="user.password" name="password"><img class="icon" src="../img/locked.png"><br>
        <div id="error2"></div>
        <button @click.prevent="loginUser" type="submit">Logga in</button>
        
</form>
</div>
</div>
</template>

<script>
import { routerKey } from 'vue-router';

export default {
    data(){
        return{
            user: {
                email: '',
                password: ''
            }
        }
    },
    methods:{
       async loginUser(){
            //postanrop till databas som kollar om inloggningen finns
            await fetch ("https://medicareinventory.herokuapp.com/api/login", {
                        method: "POST",
                        headers: {
                    
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(this.user)
                    })
                    .then(res => res.json())
                    //om användaren finns  lagras användarens token i localstorage
                    .then(user => {
                        if(user.token) {
                            //save token
                            localStorage.setItem(
                                "token",
                                user.token
                            )

                        } else {
                            document.getElementById('error2').innerHTML = "<p class='alert alert-danger'>" + "Felaktigt användarnamn eller lösenord!" + "</p>";
                        }
                    })

                    .catch(err => console.log(err));
                    //skickar användaren till startsidan
                    await this.$router.push({ name: "home"});

        }
    }
}

</script>

<style scoped>
.flex {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 500px;
}

form {
    text-align: center;
}

label {
    margin-right: 5px;
}

button {
    margin-top: 10px;
}

label {
    color: #0F5D9C;
    font-weight: bold;
    margin: 5px;
}

input {
    border-radius: 10px;
    border: 1px solid #0F5D9C;
    padding: 3px;
}

p {
    margin-bottom: 20px;
    margin-top: 10px;
    font-weight: bold;
}

#wrongInput {
    color: red;
}

.icon {
    margin-left: -28px;
    margin-bottom: 4px;
    width: 6%;
}

</style>