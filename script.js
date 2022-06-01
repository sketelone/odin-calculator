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
    if (typeof displayValue == "string" && displayValue.includes("MOO!") == true) {
        console.log("there was an error")
        clear();
    }
    // get input from buttons
    if (e.srcElement.className == "num") {
            num += e.srcElement.id;
            displayResult(num);
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
        //convert result to float
        if (result != "") {
            result = parseFloat(result);
        }
        //convert num to float
        if (num != "") {
            num = parseFloat(num);
        }
        //if no operator is present, just display the number
        if (oper=="") {
            if (result == "") {
                result = num;
            }
            num = "";
            oper="";
            displayResult(result);
            console.log("no oper")
        } else {
            result = operate(result,num,oper);
            console.log("oper")
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

function operate(result,num,oper) {
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
    //display result 
    if (displayValue != "") {
        var v = document.querySelector('.displayed');
        display.removeChild(v);
    }
    var v = document.createElement('text');
    if (value == "divByZero") {
        displayError(2);
        return;
    } else if (value == "-" || value == ".") {
        v.textContent = value;
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

function displayError(a) {
    //display result 
    // clear();
    // newDisplay = false;
    var v = document.createElement('text');
    if (a == 1) {
        v.textContent="MOO! ERROR"
    } else if (a == 2) {
        v.textContent="MOO! DIV BY 0"
    } else {
        v.textContent="ERROR"
    }
    v.classList.add('displayed');
    display.appendChild(v);
    displayValue=v.textContent;
}

function clear() {
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