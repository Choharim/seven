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

function makeMinusNumber(){
  if(elementNumberArray.some(function(element){return element === "-";})){
    const str = elementNumberArray.join('');
    const num = parseInt(str);
    elementNumberArray.splice(0,elementNumberArray.length,num);
  }
}

function calcMutiDiviNumber(){
  if(elementNumberArray.some(function(element){return (element === "*" || element === "/");})){
    let numberOfDivi=0;
    elementNumberArray.forEach(function(element){if(element === "/"){numberOfDivi++;} return numberOfDivi;}); // "/"개수찾기
    for(let i=1; i <= numberOfDivi; i++){
    const index = elementNumberArray.indexOf("/");
    elementNumberArray.splice(index,1,"*");
    elementNumberArray.splice(index+1,1,1/elementNumberArray[index+1]);
    }// 앞에"/"있는 값은 역수로 바꾸기
    const newElementNumberArray = elementNumberArray.filter(element => typeof element === "number"); // "*"모두 제거
    const calcValue = newElementNumberArray.reduce((result,current) => { return result * current ;}); // 연속해서 나누고 곱한 수 하나의 수로 계산
    elementNumberArray.splice(0,elementNumberArray.length,calcValue); 
  }
}

function equalCalc(){
  const number = inputNumber();
  
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else {
    makeElementNumberArray(number);
    makeMinusNumber();
    calcMutiDiviNumber();
    totalNumberArray.push(elementNumberArray[0]);
    makeNumberArray = [];
    elementNumberArray = [];
    const copyTotalNumberArray = [...totalNumberArray]; //new array
    const accumul= copyTotalNumberArray.reduce((result,current) => { return result + current ;});
    showInputNumber(accumul);
    totalNumberArray = []; //reset
  }
}

function minusCalc(){
  plusCalc();
  elementNumberArray.push("-");
}

function plusCalc(){
  const number = inputNumber();

  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else {
    makeElementNumberArray(number);
    makeMinusNumber();
    calcMutiDiviNumber();
    totalNumberArray.push(elementNumberArray[0]);
    makeNumberArray = [];
    elementNumberArray = [];
    const accumul= totalNumberArray.reduce((result,current) => { return result + current ;});
    showInputNumber(accumul);
    console.log(elementNumberArray);
    console.log(totalNumberArray);
  }
}

function mutiCalc(){
  const number = inputNumber();
  
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else{
    makeElementNumberArray(number);
    makeMinusNumber();
    calcMutiDiviNumber();
    resultValue.innerText = `${Math.abs(elementNumberArray[0])}`;
    elementNumberArray.push("*");
    makeNumberArray = [];
    console.log(elementNumberArray);
    console.log(totalNumberArray);
  }
}

function diviCalc(){
  const number = inputNumber();
  
  if(number === undefined || isNaN(number) || number === 0){ //0누르고 equ눌렀거나 그냥 equ눌렀을 때 대비해서
    return;
  }else{
    makeElementNumberArray(number);
    makeMinusNumber();
    calcMutiDiviNumber();
    resultValue.innerText = `${Math.abs(elementNumberArray[0])}`;
    elementNumberArray.push("/");
    makeNumberArray = [];
    console.log(elementNumberArray);
    console.log(totalNumberArray);
  }
}

function makeElementNumberArray(number){
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
plus.addEventListener("click",plusCalc);
equal.addEventListener("click",equalCalc);
reset.addEventListener("click",resetAll);
minus.addEventListener("click",minusCalc);
multi.addEventListener("click",mutiCalc);
divi.addEventListener("click",diviCalc);
