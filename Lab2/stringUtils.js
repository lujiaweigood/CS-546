const stringCheck = function(string){
    if(typeof string !== 'string'){
        throw "Not a string";
    }
    if (typeof string === "undefined"){
        throw "String is undefined";
    }
    if (string.length == 0){
        throw "String is empty";
    }
}

const camelCase = function (string) {
    stringCheck(string);

    var string = string.toLowerCase();
    for (i = 0; i < string.length ; i++){
        if (string[i] == " " && typeof string[i+1] !== "undefined"){
            index = i+1;
            string= string.substring(0, index) + string[index].toUpperCase() + string.substring(index + 1);
        }
    }
    string = string.replaceAll(' ','')
    return string;
  }
  



const replaceChar = function(string) {
    stringCheck(string);
    var counts = {};
    for (i = 0; i < string.length ; i++){
            var value = string[i];
            counts[value.toLowerCase()] = counts[value.toLowerCase()] ? counts[value.toLowerCase()] + 1 : 1;
            if (counts[value] % 2 == 0 ) {
                string= string.substring(0, i) + "*" + string.substring(i + 1);
            } else if ( counts[value] != 1 && counts[value] % 2 == 1){
                string= string.substring(0, i) + "$" + string.substring(i + 1);
            }
          }
        return string;
    }


const mashUp = function (string1, string2){
    stringCheck(string1);
    stringCheck(string2);
    string1 = string1.replace(/\s/g, '');
    string2 = string2.replace(/\s/g, '');
    if (string1.length >=2 && string2.length >=2){
    var string = string1 + " "+ string2;
    return string;
    } else {
        throw "At least 2 characters";
    }
}


module.exports = {
    camelCase,
    replaceChar ,
    mashUp
  };

