
let result = 0;
let num = 0;
let oper = "";
let newCalc = true;

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', getInput)
});

function getInput(e) {
    if (e.srcElement.className == "num") {
        if (newCalc==true) {
            result = parseFloat(e.srcElement.id);
            console.log(result)
            newCalc = false;
        } else {
            num = parseFloat(e.srcElement.id);
            console.log(num)
        }
    } else if (e.srcElement.className == "oper") {
        oper = e.srcElement.id;
    } else if (e.srcElement.id == "enter") {
        operate(result,num,oper);
        displayResult(result);
        console.log(result, num, oper)
    } else if (e.srcElement.id == "clear") {
        clear();
    }
};

function operate(result,num,oper) {
    if (oper == "add") {
        var added = add(result,num);
        result = added;
        console.log(result)
    } else if (oper =="subtract") {
        result = subtract(result,num)
        console.log(result)
    } 
};

function displayResult(result) {
    var v = document.createElement('h1');
    v.textContent = result;
    display.appendChild(v);
}

function clear() {
    newCalc = true;
    result = 0;
    num = 0;
    oper = "";
    console.log(result, num, oper)
};

const add = function(a,b) {
    if (typeof a === "number" && typeof b === "number") {
      return a + b;
    }
  };
  
  const subtract = function(a,b) {
    if (typeof a === "number" && typeof b === "number") {
      return a - b;
    }
  };
  
//   const sum = function(array) {
//     let result = 0;
//     for (a in array) {
//       if (typeof array[a] === "number") {
//         result += array[a];
//         // console.log(result)
//       }
//     }
//     return result;
//   };
  
//   const multiply = function(array) {
//     let result = 1;
//     for (a in array) {
//       if (typeof array[a] === "number") {
//         result = result*array[a];
//         // console.log(result)
//       }
//     }
//     return result;
//   };
  
//   const power = function(a,b) {
//     if (typeof a === "number" && typeof b === "number") {
//       return a ** b;
//     }
//   };
  
//   const factorial = function(a) {
//     let result = 1;
//     if (typeof a === "number") {
//       for (i=1;i<=a;i++) {
//         result = result*i;
//       }
//     }
//     return result;
//   };
