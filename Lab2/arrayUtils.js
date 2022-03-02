const arrayCheck = function(array){
    if(!Array.isArray(array)){
        throw "Not an array";
    }
    if (typeof array === "undefined"){
        throw "Array is undefined";
    }
    if (array.length == 0){
        throw "Array is empty";
    }
    for (i = 0; i< array.length; i++){
        if (typeof array[i] !== "number"){
            throw "Array is not a number";
        }
    }
}

const mean = function (array){
    const reducer = (previousValue, currentValue) => previousValue + currentValue;
    arrayCheck(array);
    return array.reduce(reducer)/array.length;
}



const medianSquared = function (array){
    arrayCheck(array);
    var median = 0, length = array.length;
    array.sort();
    if (
        length % 2 === 0 
    ) {
        median = (array[length / 2 - 1] + array[length / 2]) / 2;
    } else { 
        median = array[(length - 1) / 2];
    }
    return median * median;
}

const maxElement = function (array){
    arrayCheck(array);
    maxValue = Math.max.apply(null, array);
    var myObj = {};
    let keyName = maxValue;
    myObj[keyName] = array.indexOf(maxValue);
    return myObj;
}

const fill = function(end, value){
    if (typeof end === NaN){
        throw "Param is undefined";
    }
    if (typeof end !== "number"){
        throw "Param is not a number";
    }
    if ( end <= 0){
        throw "Lower than 0";
    }
    if (value === undefined){
    return Array.from(Array(end).keys());
    }
    else {
        return Array(end).fill(value);
    }
}


const arrayCheck2 = function(array){
    if(!Array.isArray(array)){
        throw "Not array";
    }
    if (typeof array === "undefined"){
        throw "Array is undefined";
    }
    if (array.length == 0){
        return {};
    }
}

const countRepeating = function(array){
arrayCheck2(array);
const counts = {};
array.forEach(function (x) { counts[x] = (counts[x]  || 0) + 1; });
const val = 1;
function deleteByValue(val) {
    for(var f in counts) {
        if(counts[f] == val) {
            delete counts[f];
        }
    }
}
deleteByValue(val);
return counts;
}


const isEqual = function(array1, array2){
    if(array1[0].constructor === Array){
        for (i = 0; i < array1.length; i++){
            array1[i].sort();
    }
}

    if(array2[0].constructor === Array){
        for (i = 0; i < array2.length; i++){
            array2[i].sort();
    }
}
    const arrayA = array1.slice().sort();
    const arrayB = array2.slice().sort();
    return JSON.stringify(arrayA) === JSON.stringify(arrayB);
}

module.exports = {
    mean,
    medianSquared,
    maxElement,
    fill,
    countRepeating,
    isEqual
  };