const axios = require('axios');

async function getStocks(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/8c363d85e61863ac044097c0d199dbcc/raw/7d79752a9342ac97e4953bce23db0388a39642bf/stocks.json')
    return data // this will be the array of people objects
  }

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }

  async function getPersonById(id){
    var data2 = await getPeople();
    var array = [];
    for (const d in data2) {
        if (data2[d].id == id) {
        array.push([data2[d].first_name, data2[d].last_name]);
        }
      }return array;
    }
  async function listShareholders(stockName){
    var data = await getStocks();
    if (stockName === undefined){
        throw "Invalid input"
    }

    if (typeof stockName !== "string"){
        throw "Not string";
    }
    if (stockName.length ===0 || Math.floor(stockName) ===0){
        throw "The length is zero or empty"
    }
    var array2 = [];
    for (const d in data) {
        if (data[d].stock_name == stockName) {
            for (var i=0; i < data[d].shareholders.length; i++){
                array2.push(data[d].shareholders[i].userId);
            }
            }
      }
      if (array2.length === 0){
          throw "Can't find company."
      }

      var array3 = [];
      for (const i of array2){
        array3.push(await  getPersonById(i));
      }
      for (const d in data) {
        if (data[d].stock_name == stockName) {
            for (var i=0; i < data[d].shareholders.length; i++){
                data[d].shareholders[i].first_name = array3[i][0][0];
                data[d].shareholders[i].last_name = array3[i][0][1];
                delete data[d].shareholders[i].userId;
            }
            return data[d];
        }
  }
}

  async function totalShares(stockName){
    var data = await getStocks();
    var sum = 0;
    var count = 0;
    if (stockName === undefined){
        throw "Invalid input"
    }

    if (typeof stockName !== "string"){
        throw "Not string";
    }
    if (stockName.length ===0 || Math.floor(stockName) ===0){
        throw "The length is zero or empty"
    }
    for (const d in data) {
        if (data[d].stock_name == stockName) {
            if (data[d].shareholders.length ==0){
                return data[d].stock_name + " currently has no shareholders."
            }
            for (var i=0; i < data[d].shareholders.length; i++){
            sum += data[d].shareholders[i].number_of_shares;
            count += 1;
            }
            if (count == 1){
              return data[d].stock_name + ", has " + count + " shareholder that own a total of " + sum +  " shares. ";
            }
            if (sum == 1){
              return data[d].stock_name + ", has " + count + " shareholders that own a total of " + sum +  " share. ";
            }
            else{
            return data[d].stock_name + ", has " + count + " shareholders that own a total of " + sum +  " shares. ";
            }
      }
    }
    throw "No stock with that name";
  }
  async function getPersonByName(firstName, lastName){
    var data2 = await getPeople();
    for (const d in data2) {
        if (data2[d].first_name == firstName && data2[d].last_name ==lastName ) {
            return data2[d].id;
        }
      }throw "Not in people.json";
    }

  async function listStocks(firstName, lastName){
    if (firstName === undefined || lastName === undefined){
        throw "Invalid input"
    }

    if (typeof firstName !== "string" || typeof lastName !== "string"){
        throw "Not string";
    }
    if (firstName.length ===0 || lastName.length === 0 || Math.floor(firstName) ===0 || Math.floor(lastName) ===0 ){
        throw "The length is zero or empty"
    }
    var id = await getPersonByName(firstName, lastName)
    var data = await getStocks();

    var array = [];
    for (const d in data) {
        for (var i=0; i < data[d].shareholders.length; i++){
        var object = {};
        if (data[d].shareholders[i].userId == id) {
                object.stock_name = data[d].stock_name;
                object.number_of_shares= data[d].shareholders[i].number_of_shares;
                array.push(object);
        }
            }
      }
      return array;
}

  async function getStockById(id){
    if (id === undefined){
        throw "Invalid input"
    }

    if (typeof id !== "string"){
        throw "Not string";
    }
    if (id.length ===0 || Math.floor(id) ===0){
        throw "The length is zero or empty"
    }
    var data = await getStocks();

    for (const d in data) {
        for (var i=0; i < data[d].shareholders.length; i++){
        if (data[d].id== id) {
                return data[d];
        }
            }
      }
      throw ("Stock not found Error");
  }




  module.exports = {
    listShareholders,
    totalShares,
    listStocks,
    getStockById
  };

