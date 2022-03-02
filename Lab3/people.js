const axios = require('axios');

async function getPeople(){
    const { data } = await axios.get('https://gist.githubusercontent.com/graffixnyc/a1196cbf008e85a8e808dc60d4db7261/raw/9fd0d1a4d7846b19e52ab3551339c5b0b37cac71/people.json')
    return data // this will be the array of people objects
  }


function check(id) {
    if (id == "") throw "String is empty";
    else if (id=== undefined) throw "String is invalid";
    else if (typeof id !== 'string') throw "Id is not a string";
  }
  function validEmail(email) {
      if (!email.match(/[a-z0-9]+\.[a-z]{2,3}/)){
          throw "Not mail format";
      }
  }


async function getPersonById(id){
var data = await getPeople();
check(id);

for (const d in data) {
    if (data[d].id === id) {
    return data[d];
    }
  }throw "person not found Error";
}

async function sameEmail(emailDomain){
var data = await getPeople();
check(emailDomain);
var emailDomain = emailDomain.toLowerCase();
validEmail(emailDomain);
array = [];
for (const d in data) {
    if (data[d].email.includes(emailDomain)) {
    array.push(data[d])
    }
  }if (array.length ==0){
  throw "Email not found";
} else if (array.length ==1) {
    throw "since there are not at least two people that have the email domain" + " " +emailDomain;
}
    return array;
}



async function manipulateIp(){
    var data = await getPeople();
    for (const d in data) {
        data[d].ip_address = data[d].ip_address.replaceAll('.','').split('').sort().join('');
    } 
    data = data.sort(function(a, b) {
        return parseFloat(b.ip_address) - parseFloat(a.ip_address);
    });
    var ave = 0
    for (var i = 0; i <  data.length; i++){
        ave+= parseInt(data[i].ip_address);
    }
    var ave   = Math.floor(ave/data.length);
    result = {};
    subresult1 = {};
    subresult1.firstName = data[0].first_name;
    subresult1.lastName = data[0].last_name;
    result.highest = subresult1;

    subresult2 = {};
    subresult2.firstName = data[data.length-1].first_name;
    subresult2.lastName = data[data.length-1].last_name;
    result.lowest= subresult2;
    result.average = ave;
    return result;
}


async function sameBirthday(month, day){
    const monthNames = ["January", "February", "March", "April", "May", "June",
  "July", "August", "September", "October", "November", "December"
    ];
    if (month=== undefined||  day=== undefined) {
        throw "Input is invalid"
    }

    month = Math.floor(month);
    day = Math.floor(day);

    if (day < 1)
    {
        throw "Wrong number in day"
    }
    if ( (month < 1) || (month > 12)) 
    {
        throw "Month > 12"
    }
    var DayMonth = new Date(2022, parseInt(month), 0).getDate();
    if (day > DayMonth) {
    throw "There are not " + day + " day in " + monthNames[month-1];
    }

    month = month.toString();
    day = day.toString();

    if (month.length == 1){
        month = "0" + month;
    }
    if (day.length ==1){
        day = "0" + day;
    }

    var monthOfDate = month +"/" + day;
    var array = [];
    var data = await getPeople();
    for (const d in data) {
        if (data[d].date_of_birth.includes(monthOfDate)){
            array.push(data[d].first_name + " " + data[d].last_name);
        }
    }
    return array;
}



module.exports = {
    getPersonById,
    sameEmail,
    manipulateIp,
    sameBirthday
  };