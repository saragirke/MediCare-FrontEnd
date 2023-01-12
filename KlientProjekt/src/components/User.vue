<template>
<div>
    <h1>Ändra lösenord</h1>
    <div class="updatePassword">
    <p>Härifrån kan du ändra ditt eget lösenord. När lösenordet blivit ändrat kommer du bli tvungen att logga in på nytt.</p>
    <form @submit.prevent="updateUser()">
    <label for="new_password">Nytt lösenord:</label><br>
    <input type="password" placeholder="Minst 6 tecken" v-model="update.password" name="new_password"><br>

    <label for="new_confirm_password">Bekräfta nytt lösenord:</label><br>
    <input type="password" placeholder="Bekräfta nytt lösenord" v-model="update.password_confirmation" name="new_password_confirmation"><br>
    <br>
    <div id="error3"></div>
    <button @click.prevent="updateUser()" type="submit">Byt lösenord</button>
</form>
</div>
</div>
</template>

<script>
export default {
    data() {
        return {
            update:{
                password: '',
                password_confirmation: ''
            }
        }
    },

    methods: {
        async updateUser() {
            
            //kontrollerar att fält är korrekt ifyllda
            if(this.update.password === this.update.password_confirmation && this.update.password.length >= 6)
            {
                //confirm att man vill ändra lösenord
                if(confirm("Är du säker på att du vill ändra lösenord? Du kommer bli omdirrigerad till att logga in på nytt.")){
                let token = (localStorage.getItem('token'));
                await fetch ("https://medicareinventory.herokuapp.com/api/update", {
                        method: "PUT",
                        headers: {
                            "Content-type": "application/json",
                            "Authorization" : "Bearer " + token
                        },
                        body: JSON.stringify(this.update)
                    }) 
                    .then(res => res.json())
                    .then(data => {console.log('lösenord ändrat'); })
                    .catch(err => console.log(err));

                    //tar användare till login om lösenords-byte är confirmed
                    
                    //radera token
                    localStorage.removeItem('token');
                    this.$router.push({ name: "login"});
                    }
            } else {
                
                document.getElementById("error3").innerHTML = "<p class='alert alert-danger'>" + "Något gick tokigt! Lösenorden måste överenstämma och vara minst 6 tecken. Försök igen!" + "</p>";
                
            }}  
    }
}
</script>

<style scoped>
.updatePassword {
    background-color: white;
    width: 60%;
    margin-left: auto;
    margin-right: auto;
    border: 1px solid #0F5D9C;
    box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
    border-radius: 15px;
    padding: 20px;
}

p {

    font-size: 20px;
    text-align: center;
}

label {
color: #0F5D9C;
font-weight: bold;
}

 input[type=password] {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;
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
    .updatePassword {width:90%;
    }

    button {
        width: 80%;
    }
}


</style>