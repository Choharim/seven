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

function isItMinus(element){
  return element === "-";
}

function isItMultiDivi(element){
  return (element === "*" || element === "/");
}

function minusCalc(){
  plusEqualCalc();
  elementNumberArray.push("-");
}

function plusEqualCalc(){
  const number = inputNumber();
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else {
    makeElementNumberArray();
    if(elementNumberArray.some(isItMinus)){
      const str = elementNumberArray.join('');
      const num = parseInt(str);
      elementNumberArray.splice(0,elementNumberArray.length,num);
    }
    if(elementNumberArray.some(isItMultiDivi)){
      let numberOfDivi=0;
      elementNumberArray.forEach(function(element){if(element === "/"){numberOfDivi++;} return numberOfDivi;}); // "/"개수찾기
      for(let i=1; i <= numberOfDivi; i++){
      const index = elementNumberArray.indexOf("/");
      elementNumberArray.splice(index,1,"*");
      elementNumberArray.splice(index+1,1,1/elementNumberArray[index+1]);
      }// 앞에"/"있는 값은 역수로 바꾸기
      const newElementNumberArray = elementNumberArray.filter(element => typeof element === "number"); // "*"모두 제거
      const calcValue = newElementNumberArray.reduce((result,current) => { return result * current ;});
      elementNumberArray.splice(0,elementNumberArray.length,calcValue);
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
    if(elementNumberArray.some(isItMinus)){
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
    if(elementNumberArray.some(isItMinus)){
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

///////////////
let a = [-5 ,"*",2,"*",4,"/",5,"*",6,"/",7,"/",8];

console.log(a);
let n=0;
a.forEach(function(ele){if(ele === "/"){ n++;} return n;});
for(let b=1;b <= n;b++){
  const index = a.indexOf("/");
a.splice(index,1,"*");
a.splice(index+1,1,1/a[index+1]);
}
console.log(a);
const w = a.filter(ele => typeof ele === "number");
console.log(w);
const elem = w.reduce(( result, current ) => result * current);
console.log(elem);
a.splice(0,a.length,elem);
console.log(a);