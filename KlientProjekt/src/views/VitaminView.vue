
<template>

    <h1>Vitaminer</h1>
    <div class="changeview">
    <router-link to="/">
    <button>Tillbaka</button>
    </router-link>
    <router-link to="/superfood">
    <button>Byt kategori</button>
    </router-link>
</div>
<br>

<!-- Knappar för sortering, anrop vid klick till funktioner-->
<p>Sortera efter:</p>
<div class="box">
<button class="sortbutt" @click="sortName()"> Namn A-Ö </button>
<button class="sortbutt" @click="sortAmount()"> Lagersaldo </button>
<button class="sortbutt" @click="sortPrice()"> Pris </button>
<br><br>

</div>
<!-- Felmeddelande-->
<div id="error3" class="col-lg-5 col-md-12 mx-auto text-center font-weight-bold"></div>
<!-- Responsiv tabell-->
<div class="table-responsive">
<table class="table table-hover">
    <tr>
        <th>#</th>
        <th>Namn</th>
        <th>Kategori</th>
        <th></th>
        <th>Antal</th>
        <th></th>
        <th>Pris</th>
        <th>Uppdatera</th>
        <th>Radera</th>
    </tr>
    <!-- Loop -->
    <Vitamin @deleteVitamin="deleteVitamin(vitamin.id)" @updateVitamin="updateVitamin(vitamin.id)" v-for="vitamin in vitamins" :vitamin="vitamin" :key="vitamin.id" />


</table>
</div><br>
<br><br>

<AddVitamin @vitaminAdded="getVitamins()" /> 

</template>

<script>
import Vitamin from "../components/Vitamin.vue";
import AddVitamin from "../components/AddVitamin.vue";

export default {

    // Reaktiv data
    data() {
        return {
            vitamins: []
        }
    },

    components: {
        Vitamin,
        AddVitamin
    },

    //Funktioner
    methods: {
    //GET 
    async getVitamins() { 
        let token = (localStorage.getItem('token'));
        //Fetch till restwebbtjänst
        const resp = await fetch("https://medicareinventory.herokuapp.com/api/vitamins", {
            method: "GET",
            headers: {
                            "Content-type": "application/json",
                            "Authorization" : "Bearer " + token
                        }
        }); 

        // När vi fått svar från webbtjänsten ska data lagras
        const data = await resp.json();
        this.vitamins = data;

},

//Sorta efter lagerstatus
async sortAmount() {
    let token = (localStorage.getItem('token'));
        //Fetch till restwebbtjänst
        const resp = await fetch("https://medicareinventory.herokuapp.com/api/vitamins", {
            method: "GET",
            headers: {
                            "Content-type": "application/json",
                            "Authorization" : "Bearer " + token
                        }
        }); 

        // När vi fått svar från webbtjänsten ska data lagras
        const data = await resp.json();

        // Sortera efter antal, lägsta först
        data.sort(function(a, b){return a.amount-b.amount});
        this.vitamins = data;


},

//Sortera efter pris
async sortPrice() {
    let token = (localStorage.getItem('token'));
        //Fetch till restwebbtjänst
        const resp = await fetch("https://medicareinventory.herokuapp.com/api/vitamins", {
            method: "GET",
            headers: {
                            "Content-type": "application/json",
                            "Authorization" : "Bearer " + token
                        }
        }); 

        // När vi fått svar från webbtjänsten ska data lagras
        const data = await resp.json();

        // Sortera efter antal, lägsta först
        data.sort(function(a, b){return a.price-b.price});
        this.vitamins = data;

},

// Sortera efter namn
async sortName() {
    let token = (localStorage.getItem('token'));
        //Fetch till restwebbtjänst
        const resp = await fetch("https://medicareinventory.herokuapp.com/api/vitamins", {
            method: "GET",
            headers: {
                            "Content-type": "application/json",
                            "Authorization" : "Bearer " + token
                        }
        }); 

        // När vi fått svar från webbtjänsten ska data lagras
        const data = await resp.json();

        // Sortera i alfabetisk ordning
        data.sort((a, b) => a.name.localeCompare(b.name))
        this.vitamins = data;



},

    //Radera
   async deleteVitamin(id){
    if(confirm("Är du säker på att produkten ska raderas?")){
        let token = (localStorage.getItem('token'));
        const resp = await fetch("https://medicareinventory.herokuapp.com/api/vitamins/" + id, {
            //Deleteanrop
            method: "DELETE",
            //Headers
            headers:{
                "Accept": "application json",
                "Content-Type": "application/json",
                "Authorization" : "Bearer " + token
            }
    });
    
        const data = await resp.json();

        //Läs in vitaminer på nytt
        this.getVitamins();
   } },

async updateVitamin(id) {



// Hämtar innehåll i td-element 
let vitproductno= document.getElementById("productno" + id).innerHTML;
let vitname= document.getElementById("name"+ id).innerHTML;
let vitcategory= document.getElementById("category" + id).innerHTML;
let vitamount= document.getElementById("amount" + id).innerHTML;
let vitprice= document.getElementById("price" + id).innerHTML; 

//Kontrollera input
if(vitproductno != 0 & vitname != 0 & vitcategory != 0 & vitprice !=0) { 

        //Javascript objekt
        let vitBody = {
        productno: vitproductno,
        name: vitname,
        category: vitcategory,
        amount: vitamount,
        price: vitprice
    }; 

let token = (localStorage.getItem('token'));
const resp = await fetch("https://medicareinventory.herokuapp.com/api/vitamins/" + id, {

method: "PUT",
        headers: {
            "Accept": "application/json",
            "Content-type": "application/json",
            "Authorization" : "Bearer " + token
        },
        body: JSON.stringify(vitBody)


});
const data = await resp.json();

alert("Produkten " + vitname + " har uppdaterats");

}else {
    document.getElementById("error3").innerHTML = "<p class='alert alert-danger'>" + "Vänligen fyll i all information om varan!" + "</p>";
} 
}

    }, 
    mounted() {
        this.getVitamins();
    }
}


</script>

<style scoped>

    p {
        text-align: center;
    }
    div {
    overflow-x:auto;}

    .box {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 100%;
padding:1%;
}


.table{
    background-color: white;
    margin: 0 auto;
    width: 80% !important; 
    border-radius: 5px;
    box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
    
}

th {
    padding : 10px;
    border-bottom: 0.5px solid #dddddd;
}

.sortbutt {
  width: 120px;
  height: 35px;
  font-family: 'Nunito', sans-serif;
  font-size: 11px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }

  .sortbutt:hover {
  background-color: rgb(72, 186, 164);
  box-shadow: 0px 15px 20px rgba(46, 229, 157, 0.4);
  color: #fff;
  transform: translateY(-7px);
}

@media screen and (max-width: 700px) {

td, th {
  font-family: 'poppins', sans-serif;
  padding: 5px;
  text-align: center;
  border-bottom: 1px solid #ddd;
  font-size:13px;
  overflow-x:auto;
}
.table {
    width: 100% !important; 
}

.sortbutt {
  width: 95px;
  height: 35px;
  font-family: 'Nunito', sans-serif;
  font-size: 9px;
  text-transform: uppercase;
  letter-spacing: 2.5px;
  font-weight: 500;
  color: #000;
  background-color: #fff;
  border: none;
  border-radius: 45px;
  box-shadow: 0px 8px 15px rgba(0, 0, 0, 0.1);
  transition: all 0.3s ease 0s;
  cursor: pointer;
  outline: none;
  }
}

      


</style>
