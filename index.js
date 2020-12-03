const numbers = document.querySelectorAll(".number");
const resultValue = document.querySelector(".result");
const plus = document.querySelector(".plus"); 
const minus = document.querySelector(".minus");
const reset = document.querySelector(".reset");
const equal = document.querySelector(".equal");
const multi = document.querySelector(".multiply");
const divi = document.querySelector(".division");

let makeNumberArray = [];
let elementNumberArray = [];
let totalNumberArray = [];

function resetAll(){
  makeNumberArray = [];
  elementNumberArray = [];
  totalNumberArray = [];
  resultValue.innerText = "0";
}

function minusCalc(){
  plusEqualCalc();
  elementNumberArray.push("-");
}

function makeMinus(element){
  return element === "-";
}


function plusEqualCalc(){
  const number = inputNumber();
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else {
    makeElementNumberArray();
    if(elementNumberArray.some(makeMinus)){
      const str = elementNumberArray.join('');
      const num = parseInt(str);
      elementNumberArray.splice(0,elementNumberArray.length,num);
    }
    totalNumberArray.push(elementNumberArray[0]);
    makeNumberArray = [];
    elementNumberArray = [];
    const accumul= totalNumberArray.reduce((result,current) => { return result + current ;});
    showInputNumber(accumul);
  }
}

function mutiCalc(){
  const number = inputNumber();
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else{
    makeElementNumberArray();
    if(elementNumberArray.some(makeMinus)){
      const str = elementNumberArray.join('');
      const num = parseInt(str);
      elementNumberArray.splice(0,elementNumberArray.length,num);
    }
    elementNumberArray.push("*");
    makeNumberArray = [];
  }
}

function diviCalc(){
  const number = inputNumber();
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else{
    makeElementNumberArray();
    if(elementNumberArray.some(makeMinus)){
      const str = elementNumberArray.join('');
      const num = parseInt(str);
      elementNumberArray.splice(0,elementNumberArray.length,num);
    }
    elementNumberArray.push("/");
    makeNumberArray = [];
  }
}

function makeElementNumberArray(){
  const number = inputNumber();
  elementNumberArray.push(number);
}

function showInputNumber(number){
  resultValue.innerText = `${number}`;
}

function inputNumber(number){
  makeNumberArray.push(number);
  if(makeNumberArray[0] === "0"){
    makeNumberArray.shift();
  }
  const str_pressNumber = makeNumberArray.join('');
  const num_pressNumber = parseInt(str_pressNumber);

  if(Number.isInteger(num_pressNumber)){
    showInputNumber(num_pressNumber); //makeNumberArray에 첫 숫자 0들어가면 없애서 display에 NaN뜸.
    return num_pressNumber
  }
}

function pressNumber(event){
  const pressNumberBtn = event.target.value;

  inputNumber(pressNumberBtn);
}


numbers.forEach(number => {number.addEventListener("click",pressNumber)});
plus.addEventListener("click",plusEqualCalc);
equal.addEventListener("click",plusEqualCalc);
reset.addEventListener("click",resetAll);
minus.addEventListener("click",minusCalc);
multi.addEventListener("click",mutiCalc);
divi.addEventListener("click",diviCalc);

const a = [5 ,"*",2];

