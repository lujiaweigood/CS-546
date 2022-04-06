function main (){
  function isPrime(number) {
    if (typeof number !== "number" || isNaN(number)) throw "Please provide a number";
    if (number < 0) throw "Please provide a positive number";
    if (number < 2) return false;
    for (let i = 2; i < Math.floor(Math.sqrt(number))+ 1; i++) {
      if (number % i == 0) {
        return false;
      }
    }
    return true;
  }

  const primeForm = document.getElementById("check-prime");

  if (primeForm) {
    const number = document.getElementById("number");
    primeForm.addEventListener("submit", (event) => {
      event.preventDefault();
      try {
        const numberValue = number.value;
        const parsedNumberValue = parseInt(numberValue);
        const prime = isPrime(parsedNumberValue);
        const li = document.createElement("li");
        if (prime) {
          li.appendChild(document.createTextNode(`${parsedNumberValue} is a prime number`));
          li.setAttribute("class", "is-prime");
        }
        else {
          li.appendChild(document.createTextNode(`${parsedNumberValue} is NOT a prime number`));
          li.setAttribute("class", "not-prime");
        }
        const ol = document.getElementById("attempts");
        ol.appendChild(li);
        number.value = "";
      } catch (e) {
        alert(`${e}`);
      }
    });
  }
};
main();