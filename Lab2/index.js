const arrayUtils = require("./arrayUtils");
const stringUtils = require("./stringUtils");
const objUtils = require("./objUtils");

// Mean Tests
try {
    // Should Pass
    const meanOne = arrayUtils.mean([2, 3, 4]);
    console.log('mean passed successfully');
 } catch (e) {
    console.error('mean failed test case');
 }
 try {
    // Should Fail
    const meanTwo = arrayUtils.mean(1234);
    console.error('mean did not error');
 } catch (e) {
    console.log('mean failed successfully');
 }





 // MedianSquared Tests
try {
    // Should Pass
    const medianSquaredOne = arrayUtils.medianSquared([2, 3, 4]);
    console.log('medianSquared Passed successfully');
 } catch (e) {
    console.error('medianSquared Failed test case');
 }
 try {
    // Should Fail
    const medianSquaredTwo = arrayUtils.medianSquared(1234);
    console.error('medianSquared Did not error');
 } catch (e) {
    console.log('medianSquared Failed successfully');
 }




  //MaxElement Tests
try {
    // Should Pass
    const maxElementOne = arrayUtils.maxElement([2, 3, 4]);
    console.log('maxElemen Passed successfully');
 } catch (e) {
    console.error('maxElemen Failed test case');
 }
 try {
    // Should Fail
    const maxElementTwo = arrayUtils.maxElement(1,2,3);
    console.error('maxElement Did not error');
 } catch (e) {
    console.log('maxElement Failed successfully');
 }







   //Fill Tests
try {
    // Should Pass
    const fillOne = arrayUtils.fill(3, 'Welcome');
    console.log('fill Passed successfully');
 } catch (e) {
    console.error('fill Failed test case');
 }
 try {
    // Should Fail
    const fillTwo = arrayUtils.fill("test");
    console.error('fill Did not error');
 } catch (e) {
    console.log('fill Failed successfully');
 }




//countRepeating Tests
try {
    // Should Pass
    const countRepeatingOne = arrayUtils.countRepeating([7, '7', 13, true, true, true, "Hello","Hello", "hello"]);
    console.log('countRepeating Passed successfully');
 } catch (e) {
    console.error('countRepeating Failed test case');
 }
 try {
    // Should Fail
    const countRepeatingTwo = arrayUtils.countRepeating("foobar")
    console.error('countRepeating Did not error');
 } catch (e) {
    console.log('countRepeating Failed successfully');
 }




 //isEqualTests
try {
    // Should Pass
    const isEqualOne = arrayUtils.isEqual([1, 2, 3], [3, 1, 2]);
    console.log('isEqual Passed successfully');
 } catch (e) {
    console.error('isEqual Failed test case');
 }
 try {
    // Should Fail
    const isEqualTwo = arrayUtils.isEqual(1,2,3);
    console.error('isEqual Did not error');
 } catch (e) {
    console.log('isEqual Failed successfully');
 }



  //camelCase
try {
    // Should Pass
    const camelCaseOne =  stringUtils.camelCase('my function rocks');
    console.log('camelCase Passed successfully');
 } catch (e) {
    console.error('camelCase Failed test case');
 }
 try {
    // Should Fail
    const camelCaseTwo =  stringUtils.camelCase(123);
    console.error('camelCase Did not error');
 } catch (e) {
    console.log('camelCase Failed successfully');
 }




   //replaceChar
try {
    // Should Pass
    const replaceCharOne =  stringUtils.replaceChar("Daddy");
    console.log('replaceChar Passed successfully');
 } catch (e) {
    console.error('replaceChar Failed test case');
 }
 try {
    // Should Fail
    const replaceCharTwo =  stringUtils.replaceChar(123);
    console.error('replaceChar Did not error');
 } catch (e) {
    console.log('replaceChar Failed successfully');
 }


    //mashUp
try {
    // Should Pass
    const mashUpOne =  stringUtils.mashUp("Patrick", "Hill");
    console.log('mashUp Passed successfully');
 } catch (e) {
    console.error('mashUp Failed test case');
 }
 try {
    // Should Fail
    const mashUpTwo =  stringUtils.mashUp();
    console.error('mashUp Did not error');
 } catch (e) {
    console.log('mashUp Failed successfully');
 }



     //makeArrays
try {
    // Should Pass
    const makeArraysOne = objUtils.makeArrays([{ x: 2, y: 3}, { a: 70, x: 4, z: 5 }, { x: 0, y: 9, q: 10 }]);
    console.log('makeArrays Passed successfully');
 } catch (e) {
    console.error('makeArrays Failed test case');
 }
 try {
    // Should Fail
    const makeArraysTwo = objUtils.makeArrays();
    console.error('makeArrays Did not error');
 } catch (e) {
    console.log('makeArrays Failed successfully');
 }



//isDeepEqual
try {
    // Should Pass
    const isDeepEqualOne = objUtils.isDeepEqual({a: {sA: "Hello", sB: "There", sC: "Class"}, b: 7, c: true, d: "Test"}, {c: true, b: 7, d: "Test", a: {sB: "There", sC: "Class", sA: "Hello"}})
    console.log('isDeepEqual Passed successfully');
 } catch (e) {
    console.error('isDeepEqual Failed test case');
 }
 try {
    // Should Fail
    const isDeepEqualTwo = objUtils.isDeepEqual([1,2,3], [1,2,3]);
    console.error('isDeepEqual Did not error');
 } catch (e) {
    console.log('isDeepEqual Failed successfully');
 }


      //computeObject
try {
    // Should Pass
    const computeObjectOne = objUtils.computeObject({ a: 3, b: 7, c: 5 }, n => n * 2);
    console.log('computeObject Passed successfully');
 } catch (e) {
    console.error('computeObject Failed test case');
 }
 try {
    // Should Fail
    const computeObjectTwo = objUtils.computeObject();
    console.error('computeObject Did not error');
 } catch (e) {
    console.log('computeObject Failed successfully');
 }