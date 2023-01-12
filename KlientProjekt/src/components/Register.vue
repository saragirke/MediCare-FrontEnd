<template>
<div>
        <h2>Registera nytt konto</h2>
        <!--submit prevent för att förhindra att sidan laddas om om inte funktion kan gå igenom-->
        <form @submit.prevent="saveForm()">
        <label for="name">Namn:</label><br>
        <input type="text" placeholder="För- och efternamn" v-model="user.name"><br>

        <label for="email">Emailadress:</label><br>
        <input type="email" placeholder="xxx@yyy.com" v-model="user.email"><br>

        <label for="password">Lösenord:</label><br>
        <input type="password" placeholder="Minst 6 tecken" v-model="user.password" name="password"><br>

        <label for="confirm_password">Bekräfta lösenord:</label><br>
        <input type="password" placeholder="Bekräfta lösenord" v-model="user.password_confirmation" name="password_confirmation"><br>
        <br>
        <div id="error2"></div>
        <button @click.prevent="saveForm" type="submit">Registrera</button>
</form>
</div>
</template>

<script>


export default {
    data(){
        return{
            //skapar objektet user som hämtar värden från v-model i varje input-fält
            user:{
                name: '',
                email: '',
                password: '',
                password_confirmation: ''
            }
        }
    },
    emits: ["AccountAdded"],
    methods:{
         async saveForm(){ //kör post genom fetch som tar svaren från DETTA formulär

            //kontrollerar att fält är korrekt ifyllda
           if(this.user.name !=0 & this.user.email !=0 & this.user.password.length > 5 & this.user.password_confirmation.length > 5 & this.user.password === this.user.password_confirmation) {
                //FETCH
            await fetch ("https://medicareinventory.herokuapp.com/api/register", {
                        method: "POST",
                        headers: {
                            "Content-type": "application/json"
                        },
                        body: JSON.stringify(this.user)
                    })
                    .then(res => res.json())
                    .catch(err => console.log(err));

                    let regName = this.user.name

                    this.user.name = "";
                    this.user.email = "";
                    this.user.password = "";
                    this.user.password_confirmation = "";
                    
                    this.$emit("AccountAdded");

                    document.getElementById("message").innerHTML = "<p class='alert alert-success alert-dismissible fade show'>" + "Nytt konto för " + regName + " registrerat!" + "</p>";       

    } else {
        document.getElementById("error2").innerHTML = "<p class='alert alert-danger'>" + "Alla fält måste vara korrekt ifyllda!" + "</p>";
}}
    }}
</script>

<style scoped>
form {
font-size:18px;  
min-height: 380px;
background-color: white;
  position: relative;  padding: 50px;
  margin-top: 15%;
  margin-left:5%;
  margin-right:5%;  
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border: 1px solid #0F5D9C;
  width:60%;
  border-radius: 15px;
  color: #0F5D9C;
  font-weight: bolder;
    }


input[type=text], input[type=email], input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
}

p {
    text-align: center;
}

button {
  width: 40%;
  background-color: rgba(150, 210, 194, 0.931);
  color: white;
  padding: 14px 20px;
  margin: 8px 0;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size:18px;  
}

button:hover {
  background-color: #0F5D9C;
  font-weight: bolder;
}

@media screen and (max-width: 700px) {
    form {width:90%;
    }

    button {
        width: 80%;
    }
}

</style>