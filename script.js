

//initialize variables
let result = "";
let num = "";
let oper = "";
let newCalc = true;
let newDisplay = true;

const display = document.querySelector('.display');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', getInput)
});

function getInput(e) {
    // get input from buttons
    if (e.srcElement.className == "num") {
        if (newCalc==true) {
            result += e.srcElement.id;
            displayResult(result);
            newDisplay = false;
            // console.log(result)
            // newCalc = false;
        } else {
            num += e.srcElement.id;
            displayResult(num);
            newDisplay = false;
            // console.log(num)
        }
    } else if (e.srcElement.className == "oper") {
        oper = e.srcElement.id;
        newCalc = false;
    } else if (e.srcElement.id == "enter") {
        result = parseFloat(result);
        num = parseFloat(num);
        if (oper=="") {
            displayResult(result);
            newDisplay = false;
        } else {
            result = operate(result,num,oper);
            displayResult(result);
            num = "";
            newDisplay = false;
        }
        // console.log(result, num, oper)
    } else if (e.srcElement.id == "clear") {
        clear();
    }
};

function operate(result,num,oper) {
    //call operations on numbers input by user
    if (oper == "add") {
        result = add(result,num);
        return result;
    } else if (oper =="subtract") {
        result = subtract(result,num)
        return result;
        // console.log(result)
    } else if (oper =="multiply") {
        result = multiply(result,num)
        return result;
        // console.log(result)
    } else if (oper =="divide") {
        result = divide(result,num)
        return result;
        // console.log(result)
    } 
    // num = toString(num);
};

function displayResult(result) {
    //display result 
    if (newDisplay == false) {
        var v = document.querySelector('.result');
        display.removeChild(v);
    }
    var v = document.createElement('text');
    v.textContent = result;
    v.classList.add('result');
    display.appendChild(v);
}

function clear() {
    //reset values and clear display
    newCalc = true;
    result = "";
    num = "";
    oper = "";
    if (newDisplay == false) {
        var v = document.querySelector('.result');
        display.removeChild(v);
        newDisplay = true;
    }
    // console.log(result, num, oper)
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

const multiply = function(a,b) {
if (typeof a === "number" && typeof b === "number") {
    return a * b;
    }
};

const divide = function(a,b) {
if (typeof a === "number" && typeof b === "number") {
    return a / b;
    }
};
  

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
