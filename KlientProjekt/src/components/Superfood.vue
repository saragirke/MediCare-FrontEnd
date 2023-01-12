<template>        
    <!-- mustascher för att hämta superfoods-->
    <!-- Eventlyssnare @-->
    <tbody>
      <tr>
        <td v-bind:id="'productno' + superfood.id" contenteditable>{{superfood.productno}}</td>
        <td v-bind:id="'name' +superfood.id" contenteditable>{{superfood.name}}</td>
        <td v-bind:id="'category' +superfood.id" contenteditable>{{superfood.category}}</td> 
        
        <td class="tdamount1"><img class="icon" src="./minus.png" @click="minusBtn">
        </td><td class="tdamount" v-bind:id="'amount' +superfood.id" contenteditable>{{superfood.amount}}</td> 
        <td class="tdamount2"><img class="icon" src="./add2.png" @click="plusBtn"></td>

        <td v-bind:id="'price' +superfood.id" contenteditable> {{superfood.price}}</td>
        <td class="remove" @click="$emit('updateSuperfood')"><img class="icon" src="./updated.png"></td>
        <td class="remove" @click="$emit('deleteSuperfood')"><img class="icon" src="./delete.png"></td>
  
      </tr> 
    </tbody>
    </template>
    
    <!-- Tar emot superfoods som objekt-->
    <script> 
    export default {
        props: {
            superfood: Object
        },
        
        emits: ["deleteSuperfood", "updateSuperfood"],

        methods: {
          plusBtn() {
          this.superfood.amount++;
        },

        minusBtn() {
          this.superfood.amount =Math.max(0, this.superfood.amount - 1);
        }

        }
    }
    </script>
    
      
  <style scoped>
  .icon:hover {
    box-shadow: rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px;
  
  }

  td {
    padding : 10px;
    border-bottom: 0.5px solid #dddddd;
  }

  .changeBtn {
border-radius: 25px;
width:40px;

  }

  .tdamount {
    width:5px;
  }
  .tdamount2 {
    width:100px;
  }
  .tdamount1 {
    text-align: left;
    width:10px;
  }

  @media screen and (max-width: 700px) {

    td, th {
  font-family: 'Nunito', sans-serif;
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
  font-size:13px;
  overflow-x:auto;
}
.updateBtn {
  text-align: center;
}
}
  </style>