const axios = require('axios');
const Table = require('tty-table');
const notifier = require('node-notifier');

const {config, options} = require('./config');

module.exports = function(pincode){

var today = new Date();
var dd = String(today.getDate()).padStart(2, '0');
var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
var yyyy = today.getFullYear();
today = dd + '-' + mm + '-' + yyyy;

axios.get(`https://cdn-api.co-vin.in/api/v2/appointment/sessions/public/findByPin?pincode=${pincode}&date=${today}`, config)
  .then(function (response) {

   //Table

   let header = [{
    value: "center",
    headerColor: "cyan",
    color: "white",
    alias : "Center name",
    align: "left",
    width: 80
  },
  {
    value: "address",
    color: "red",
    alias : "Center Address" ,
    width: 80,
  },
  {
    value: "available",
    color: "red",
    alias : "Available slots" ,
    width: 80,
  }, 
  {
    value: "age",
    color: "red",
    alias : "Age" ,
    width: 40,
  }, 
  {
    value: "date",
    color: "red",
    alias : "Date" ,
    width: 60,
  }, 
]

   //Table

   var finalData = [];
   var districtName;
  response.data.sessions.forEach((item) => {
    districtName = item.district_name;
    finalData.push({
      center : item.name,
          address : item.address,
          available :  item.available_capacity,
          age : item.min_age_limit,
          date : item.date
        })
      })
      
   const out = Table(header,finalData,options).render();
   console.log(`Date : ${today}`);
   console.log(`District : ${districtName}`);
   console.log(out);
   notifier.notify({
     title : "Cowin slots executed",
     subtitle : "Cowin slots fetched successfully!",
     message : "Cowin slots executed!",
     wait : true
   })
  })
  .catch(function (error) {
    console.log(error);
  })
}