const numbers = document.querySelectorAll(".number");
const resultValue = document.querySelector(".result");
const plus = document.querySelector(".plus"); 
const minus = document.querySelector(".minus");
const reset = document.querySelector(".reset");

let inputNumberArray = [];
let elementNumberArray = [];
let totalNumberArray = [];

function resetAll(){
  elementNumberArray = [];
  totalNumberArray = [];
  resultValue.innerText = "0";
}

function showInputNumber(number){
  resultValue.innerText = `${number}`;
}

function plusCalc(){
  const elementNumber= inputNumber();
  if(elementNumber === undefined || isNaN(elementNumber) || elementNumber === 0){
    return;
  }else{
    makeElementNumberArray();
    totalNumberArray.push(elementNumber);
    const accumul= totalNumberArray.reduce((result,current) => { return result + current ;});
    showInputNumber(accumul);
    inputNumberArray = [];
  }
  elementNumberArray = [];
}

function makeElementNumberArray(){
  const elementNumber = inputNumber();

  elementNumberArray.push(elementNumber);
}

function inputNumber(number){
  inputNumberArray.push(number);
  if(inputNumberArray[0] === "0"){
    inputNumberArray.shift();
  }
  const str_pressNumber = inputNumberArray.join('');
  const num_pressNumber = parseInt(str_pressNumber);

  if(!isNaN(num_pressNumber)){
    showInputNumber(num_pressNumber);
  }
  return num_pressNumber;
}

function pressNumber(event){
  const pressNumberBtn = event.target.value;
 
  inputNumber(pressNumberBtn);
}


numbers.forEach(number => {number.addEventListener("click",pressNumber)});
plus.addEventListener("click",plusCalc);
reset.addEventListener("click",resetAll);