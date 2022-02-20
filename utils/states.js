const axios = require('axios');
const Table = require('tty-table');

const {config, options} = require('./config');

module.exports = function(){
axios.get('https://cdn-api.co-vin.in/api/v2/admin/location/states', config)
  .then(function (response) {

   //Table

   let header = [{
    value: "state_id",
    headerColor: "cyan",
    color: "white",
    alias : "State ID",
    align: "left",
    width: 20
  },
  {
    value: "state_name",
    color: "red",
    alias : "State Name",
    width: 40,
  }]

   //Table

   const out = Table(header,response.data.states,options).render();
   console.log(out); //prints output

  })
  .catch(function (error) {
    console.log(error);
  })
}