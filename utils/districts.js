const axios = require('axios');
const Table = require('tty-table');

const {config, options} = require('./config');

module.exports = function(stateID){
axios.get(`https://cdn-api.co-vin.in/api/v2/admin/location/districts/${stateID}`, config)
  .then(function (response) {

   //Table

   let header = [{
    value: "district_id",
    headerColor: "cyan",
    color: "white",
    alias : "District ID",
    align: "left",
    width: 20
  },
  {
    value: "district_name",
    color: "red",
    alias : "District Name",
    width: 40,
  }]

   //Table

   const out = Table(header,response.data.districts,options).render();
   console.log(out); //prints output

  })
  .catch(function (error) {
    console.log(error);
  })
}