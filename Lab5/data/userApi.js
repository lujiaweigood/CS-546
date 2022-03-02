const axios = require('axios');


  async function getPeople() {
    const url = "https://gist.githubusercontent.com/graffixnyc/31e9ef8b7d7caa742f56dc5f5649a57f/raw/43356c676c2cdc81f81ca77b2b7f7c5105b53d7f/people.json";
    let response = await axios.get(url);
    return response;
  }
  
  async function getWork() {
    const url = "https://gist.githubusercontent.com/graffixnyc/febcdd2ca91ddc685c163158ee126b4f/raw/c9494f59261f655a24019d3b94dab4db9346da6e/work.json";
    let response = await axios.get(url);
    return response.data;
  }



  async function getPersonById(id){
    var data = await getPeople();
    
    for (const d in data) {
        if (data[d].id === id) {
        return data[d];
        }
      }throw "person not found Error";
    }

    async function getWorkById(id){
      var data = await getWork();
      
      for (const d in data) {
          if (data[d].id === id) {
          return data[d];
          }
        }throw "person not found Error";
      }


  module.exports = {
    getPeople,
    getWork,
    getPersonById,
    getWorkById
  };