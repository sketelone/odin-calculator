//add neg and decimal functionality

//initialize variables
let result = "";
let num = "";
let oper = "";
let stored = "";
let displayValue = "";
let historyValue = "";
let newDisplay = true; //tracks whether display should be refreshed
let newHistory = true; //tracks whether history should be refreshed

const display = document.querySelector('.display');
const history = document.querySelector('.history');
const buttons = document.querySelectorAll('button');

buttons.forEach(button => {
    button.addEventListener('click', getInput)
});

function getInput(e) {
    // get input from buttons
    console.log("getting input...")
    if (e.srcElement.className == "num") {
            num += e.srcElement.id;
            displayResult(num);
    // } else if (e.srcElement.id == "-") {
    //     console.log(displayValue,result, num, oper)
    //     if (result == displayValue) {
    //         console.log("result")
    //         result = negative(e,result);
    //         displayResult(result);
    //     } else {
    //         console.log("num")
    //         num = negative(e,num);
    //         displayResult(num)
    //     }   
    } else if (e.srcElement.className == "oper") {
        if (oper != "") {
            console.log("no operator error")
            displayError(1);
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
        console.log(result, oper, num)
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
    getHistory(e);
};

function getHistory(e) {
    console.log("getting history...")
    //if button is a number, add number to history value and display
    if (e.srcElement.className == "num") {
        stored += e.srcElement.id;
        displayHistory(stored);
    //if button is an operator, add number to history value with spaces and display
    } else if (e.srcElement.className == "oper") {
        stored += " " + e.srcElement.outerText + " ";
        displayHistory(stored);
    //if button is enter, add enter to history value with spaces, display, refresh history and set history to result
    } else if (e.srcElement.id == "enter") {
        stored += " " + e.srcElement.outerText + " ";
        displayHistory(stored);
        newHistory = true;
        stored = result;
    }
}

// function negative(e, value) {
//     if (typeof value == "number") {
//         console.log("neg num");
//         return -value;
//     } else {
//         console.log("neg value");
//         return e.srcElement.id + value;
//     }
// }

function operate(result,num,oper) {
    console.log("operating...")
    //call operations on numbers input by user
    if (oper == "add") {
        result = add(result,num);
        return result;
    } else if (oper =="subtract") {
        result = subtract(result,num)
        return result;

    } else if (oper =="multiply") {
        result = multiply(result,num)
        return result;

    } else if (oper =="divide") {
        result = divide(result,num)
        return result;
    } 
};

function displayResult(value) {
    console.log("displaying result...")
    //display result 
    if (displayValue != "") {
        var v = document.querySelector('.displayed');
        display.removeChild(v);
    }
    var v = document.createElement('text');
    if (value == "divByZero") {
        displayError(2);
        return;
    } else if (value == "-") {
        v.textContent = "-";
    } else if (isNaN(value) == true) {
        console.log("NaN error")
        displayError(1);
        return;
    } else if (typeof value == "number" && value%1 !==0) {
        v.textContent = value.toFixed(4);
    } else {
        v.textContent = value;
    }
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v.textContent;
    newDisplay = false;
}

function displayHistory(value) {
    console.log("displaying history...")
    //display history 
    //if not a new display, remove existing content
    if (historyValue != "") {
        var v = document.querySelector('.historyValue');
        history.removeChild(v);
    }
    var v = document.createElement('text');
    v.textContent = value;
    v.classList.add('historyValue');
    history.appendChild(v);
    historyValue = v.textContent;
}

function displayError() {
    console.log("displaying error...")
    //display result 
    clear();
    newDisplay = false;
    var v = document.createElement('text');
    if (a == 1) {
        v.textContent="MOO! SYNTAX ERROR"
    } else if (a == 2) {
        v.textContent="MOO! YOU CAN'T DIVIDE BY ZERO"
    } else {
        v.textContent="ERROR"
    }
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v;
}

function clear() {
    console.log("clearing...")
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
    stored = "";
    result = "";
    num = "";
    oper = "";
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
    if (b == 0) {
        return "divByZero";
        } else {
        return a / b;
        }
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
