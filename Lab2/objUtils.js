const arrayCheck = function(array){
    if(!Array.isArray(array)){
        throw "Not an array";
    }
    if (typeof array === "undefined"){
        throw "Array is undefined";
    }
    if (array.length == 0){
        return {};
    }
}

const makeArrays = function (objects){
    arrayCheck(objects);
    var result = [];
    for (const object of objects){
    var value1 = Object.keys(object );
    var value2 = Object.values(object );
    for (var i = 0; i <  value1.length; i++) {
    result.push([ value1[i], value2[i]])
  }
};
  return result;
}


const isDeepEqual = function (obj1, obj2){
    if ( typeof obj1 !== 'object' || Array.isArray(obj1) ||
    obj1 === null){
        throw "Not a object";
    }
    if ( typeof obj2 !== 'object' || Array.isArray(obj2) ||
    obj2 === null){
        throw "Not a object";
    }
    let result = deepEqual(obj1, obj2);
    return result;
}


const deepEqual = function (obj1, obj2){
    if(obj1 === obj2)
    return true;
    if(Object.keys(obj1).length !== Object.keys(obj2).length)
    return false;
    if(isPrimitive(obj1) && isPrimitive(obj2))
    return obj1 === obj2;

    if(JSON.stringify(obj1) === JSON.stringify(obj2)){
        return true;
    }
    for(let key in obj1)
    {
        if(key in obj2 == false) {
        return false; 
        }
        if(deepEqual(obj1[key], obj2[key])==true) {
        return false;
        }
    }
    return true;
}

function isPrimitive(obj)
{
    return (obj !== Object(obj));
}


const computeObject = function (object, func){
    if (typeof object !== 'object' ||
    Array.isArray(object) ||
    object === null){
        throw "Not a object";
    }
    var array = Object.values(object).map(func);
    var index = 0;
    for ( const [key, value] of Object.entries(object)){ 
        object[key] = array[index];
        index++;
    }
    return object;
}





module.exports = {
    makeArrays,
    isDeepEqual,
    computeObject
};
