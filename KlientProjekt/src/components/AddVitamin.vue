<template>
    <div>
    <form @submit.prevent="addVitamin()">
        <h2>Lägg till vitamin</h2>
        <label for="productno">Produktnummer:</label><br>
        <input v-model="productno" type="text" id="productno" name="productno"><br>

        <label for="name">Namn:</label><br>
        <input  v-model="name" type="text" id="name" name="name">

        <label for="category">Kategori:</label><br>
        <input v-model="category" type="text" id="category" name="category">

        <label for="amount">Antal i lager:</label><br>
        <input v-model="amount" type="number" min="0" id="amount" name="amount"><br>

        <label for="price">Pris:</label><br>
        <input v-model="price" type="number" min="0" id="price" name="price"><br>

        <div id="error2"></div>
        <input type="submit" value="Lägg till">
    </form>
   <br><br>
</div>
</template>

<script>
    //Komponent
    export default {
        data() {
            return {
                productno: "",
                name: "",
                category: "Vitamin",
                amount: "",
                price: ""
            }
        },
        emits: ["vitaminAdded"],
        methods: {
            async addVitamin() {
               //Kontrollerar att fälten är ifyllda
               if(this.productno != 0 & this.name != 0 & this.category != 0 & this.amount != 0 & this.price != 0) { 

                    //Javascript objekt
                    let VitBody = {
                        productno: this.productno,
                        name: this.name,
                        category: this.category,
                        amount: this.amount,
                        price: this.price
                    };
 
                    //FETCH
                    let token = (localStorage.getItem('token'));
                    const resp = await fetch ("https://medicareinventory.herokuapp.com/api/vitamins", {
                        method: "POST",
                        headers: {
                            "Accept": "application/json",
                            "Content-type": "application/json",
                            "Authorization" : "Bearer " + token
                        },
                        body: JSON.stringify(VitBody)
                    });

                    const data = await resp.json();

                    /*Töm fälten efter lagring*/
                    this.productno = "";
                    this.name = "";
                    this.category = "Vitamin";
                    this.amount = "";
                    this.price = ""; 
                    
                    //Emit för att ladda om sidan
                    this.$emit("vitaminAdded");
                
                    document.getElementById("error2").innerHTML = "<p class='alert alert-success alert-dismissible fade show'>" + "Vitamin tillagd till listan!" + "</p>";
                    
                }else {
                    document.getElementById("error2").innerHTML = "<p class='alert alert-danger'>" + "Vänligen fyll i all information om varan!" + "</p>";
                }
            }
        }
    }
</script>











<style scoped>
    form {
        font-family: 'Nunito', sans-serif;
font-size:18px;  
min-height: 380px;
background-color: white;
background-position: center;
background-repeat: no-repeat;
background-size: cover;
  position: relative;  padding: 50px;
  margin-top: 15%;
  margin-left:5%;
  margin-right:5%;  
  margin: 0 auto;
  box-shadow: rgba(0, 0, 0, 0.1) 0px 4px 12px;
  border: 1px solid #0F5D9C;
  width:60%;
  border-radius: 15px;
  font-weight: bolder;
    }


    input[type=text], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

}
input[type=number], select {
  width: 100%;
  padding: 12px 20px;
  margin: 8px 0;
  display: inline-block;
  border: 1px solid #ccc;
  border-radius: 4px;
  box-sizing: border-box;

}

input[type=submit] {
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

h2 {
    font-weight: bold;
}

input[type=submit]:hover {
  background-color: #0F5D9C;
  font-weight: bolder;
}



#error {
    
    font-weight: bolder;

}

h2 {
    text-align: center;
}

@media screen and (max-width: 700px) {
    form {width:90%;
    }

    input[type=submit] {
        width: 60%;
    }
}
</style>