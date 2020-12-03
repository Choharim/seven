const numbers = document.querySelectorAll(".number");
const inputNumberArray = [];


function inputNumber(event){
  const pressNumber = event.target.value;

  inputNumberArray.push(pressNumber);
  console.log(inputNumberArray);
}

numbers.forEach(number => {number.addEventListener('click',inputNumber)});
