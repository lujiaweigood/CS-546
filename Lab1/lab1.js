const questionOne = function questionOne(arr) {
    if (arr == null || arr.length == 0){
        return 0;
    }
    newArray = arr.map(x => x**2);
    return newArray.reduce((a, b) => a + b, 0);
}

const questionTwo = function questionTwo(index) { 
    if (index < 0){
        return 0;
    } else if (index == 1) {
        return 1;
    } else return questionTwo(index-1) + questionTwo(index-2)
}

const questionThree = function questionThree(text) {
    if (text == null || text.length == 0 ){
        return 0;
    }
    count = text.match(/[aeiou]/gi).length;
    return count;
}

const questionFour = function questionFour(num) {
    if (num < 0){
        return NaN;
    } else if (num == 0){
        return 1;
    } else return num * questionFour(num-1)
}

module.exports = {
    firstName: "Jiawei", 
    lastName: "Lu", 
    studentId: "20007605",
    questionOne,
    questionTwo,
    questionThree,
    questionFour
};

