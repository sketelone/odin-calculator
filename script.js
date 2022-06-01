//add neg and decimal functionality

//initialize variables
let result = "";
let num = "";
let oper = "";
let displayValue = "";
let historyValue = "";
let newDisplay = true; //tracks whether display should be refreshed

const display = document.querySelector('.display');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', getInput)
});

function getInput(e) {
    showHistory(e);
    // get input from buttons
    if (e.srcElement.className == "num") {
            num += e.srcElement.id;
            displayResult(num);
        // if (result == "") {
        //     num += e.srcElement.id;
        //     displayResult(result);
        //     // console.log(result)
        // } else {
        //     num += e.srcElement.id;
        //     displayResult(num);
        //     // console.log(num)
        // }
    } else if (e.srcElement.id == "-") {
        console.log(displayValue,result, num, oper)
        if (result == displayValue) {
            console.log("result")
            result = negative(e,result);
            displayResult(result);
        } else {
            console.log("num")
            num = negative(e,num);
            displayResult(num)
        }   
    } else if (e.srcElement.className == "oper") {
        if (oper != "") {
            console.log("no operator error")
            displayError();
        } else if (result == "") {
            result = num;
            num = "";
            oper = e.srcElement.id;
        } else if (newDisplay == true) {
            return;
        } else {
            oper = e.srcElement.id;
        }
    } else if (e.srcElement.id == "enter") {
        result = parseFloat(result);
        num = parseFloat(num);
        if (oper=="") {
            displayResult(result);
        } else {
            result = operate(result,num,oper);
            num = "";
            oper="";
            displayResult(result);
        }
        console.log(result, num, oper)
    } else if (e.srcElement.id == "clear") {
        clear();
    }
};

function showHistory(e) {
    if (e.srcElement.className == "num") {
        historyValue += e.srcElement.outerText;
        displayHistory(historyValue);
    } else if (e.srcElement.id != "clear") {
        historyValue += " " + e.srcElement.outerText + " ";
        displayHistory(historyValue);
    }
}

function negative(e, value) {
    if (typeof value == "number") {
        console.log("neg num");
        return -value;
    } else {
        console.log("neg string");
        return e.srcElement.id + value;
    }
}

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
};

function displayResult(string) {
    //display result 
    if (displayValue != "") {
        var v = document.querySelector('.displayed');
        display.removeChild(v);
        console.log(v)
        console.log(displayValue, "display")
    }
    var v = document.createElement('text');
    if (isNaN(string) == true) {
        console.log("NaN error")
        displayError();
        return;
    } else if (typeof string == "number" && string%1 !==0) {
        v.textContent = string.toFixed(4);
    } else {
        v.textContent = string;
    }
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v.textContent;
    console.log(v)
    newDisplay = false;
}

function displayHistory(string) {
    //display history 
    if (newDisplay == false) {
        var v = document.querySelector('.historyValue');
        history.removeChild(v);
        // console.log(v)
        // console.log(displayValue, "display")
    }
    var v = document.createElement('text');
    v.textContent = string;
    v.classList.add('historyValue');
    history.appendChild(v);
    historyValue = v.textContent;
    console.log(v)
    // newDisplay = false;
}

function displayError() {
    //display result 
    clear();
    var v = document.createElement('text');
    v.textContent = "ERROR"
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v;
    // newDisplay = true; //is this right?
}

function clear() {
    console.log(displayValue);
    //reset values and clear display
    if (newDisplay == false) {
        var v = document.querySelector('.displayed');
        display.removeChild(v);
        var w = document.querySelector('.historyValue');
        history.removeChild(w);
        newDisplay = true;
    }
    displayValue = "";
    historyValue = "";
    result = "";
    num = "";
    oper = "";
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
