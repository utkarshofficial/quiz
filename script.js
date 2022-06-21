var GlobalAnswer = 0;
var currentScore = 0;
var Streak = 0;
var Hint = -1;
var isHintUsed = 0;
// difficulty is the option near to answer
// lowest number is Higher Difficulty
var difficulty = 20;
// what operation is going to perform
// +,-,*,/ respectivly to add, sub, mul, div
var op = operator.innerHTML;

function operationChooser(operator) {
    switch (operator) {
        case '+':
            qAddition();
            break;
        case '-':
            qSubstraction();
            break;
        case '*':
            qMultiply();
            break;
        case '/':
            qDivide();
            break;
    }
}
operationChooser(op);


// this will find the element in array is present or not
function find(arr, target) {
    for (let i = 0; i < 4; i++) {
        if (arr[i] == target) {
            return 1;
        }
    }
    return 0;
}

// negative for generating negative answer for substraction
// range is maximum digit calculation
// negative = 2 for divide
function optionGenerator(answer, range, negative) {
    GlobalAnswer = answer;
    var ansOptionNumber = (Math.floor(Math.random() * 4));
    Hint = ansOptionNumber;
    // for storing all options answer 
    var options = [];
    options.push(answer);
    for (let i = 0; i < 4; i++) {
        var option = document.getElementById("option" + i);
        if (i == ansOptionNumber) {
            option.innerHTML = answer;
        } else {
            let temp = 0;
            // generating random values that near to answer
            while (1) {
                if (negative == 1)
                    temp = -(Math.floor(Math.random() * range));
                // 2 is for function called by divide
                else if (negative == 2) {
                    let t = Math.random();
                    temp = parseFloat(parseInt(answer)) + parseFloat(t.toFixed(2));
                    temp = temp.toFixed(2);
                } else
                    temp = (Math.floor(Math.random() * range));

                let lower = 0;
                let upper = 0;
                if (negative == 2) {
                    // setting lower upper range 
                    let k = parseFloat(answer);
                    k = k % 1;
                    k = k.toFixed(2);
                    let setLowerUpper = (u) => {
                        lower = parseInt(answer) + parseFloat(u) - 0.20;
                        lower = lower.toFixed(2);
                        upper = parseInt(answer) + parseFloat(u);
                        upper = upper.toFixed(2);
                    };
                    if (k <= 0.20)
                        setLowerUpper(0.20);
                    else if (k <= 0.40)
                        setLowerUpper(0.40);
                    else if (k <= 0.60)
                        setLowerUpper(0.60);
                    else if (k <= 0.80)
                        setLowerUpper(0.80);
                    else if (k <= 0.99)
                        setLowerUpper(0.99);
                } else {
                    lower = answer - difficulty;
                    upper = answer + difficulty;
                }
                if ((lower < temp) && (temp < upper) && find(options, temp) == 0) {
                    options.push(temp);
                    option.innerHTML = temp;
                    break;
                }
            }
        }
    }
}

// addition function
function qAddition() {
    let a = (Math.floor(Math.random() * 98) + 1);
    let b = (Math.floor(Math.random() * 98) + 1);
    varA.innerHTML = a;
    oprator.innerHTML = '+';
    varB.innerHTML = b;
    optionGenerator((a + b), (99 + 99 + 1));
}

// substraction function
function qSubstraction() {
    let a = (Math.floor(Math.random() * 98) + 1);
    let b = (Math.floor(Math.random() * 98) + 1);
    varA.innerHTML = a;
    oprator.innerHTML = '-';
    varB.innerHTML = b;
    let negative = ((a - b) < 0 ? 1 : 0);
    optionGenerator((a - b), (99 + 99 + 1), negative);
}

// multiply function
function qMultiply() {
    let a = (Math.floor(Math.random() * 98) + 1);
    let b = (Math.floor(Math.random() * 98) + 1);
    varA.innerHTML = a;
    oprator.innerHTML = 'x';
    varB.innerHTML = b;
    optionGenerator((a * b), ((99 * 99) + 1));
}

// divide function
function qDivide() {
    let a = (Math.floor(Math.random() * 98) + 1);
    let b = (Math.floor(Math.random() * 98) + 1);
    varA.innerHTML = a;
    oprator.innerHTML = '÷';
    varB.innerHTML = b;
    let ans = (a / b);
    if (ans > 9) {
        ans = ans.toFixed(2);
    } else {
        ans = ans.toFixed(2);
    }
    difficulty = 0.20;
    optionGenerator(ans, 100, 2);
}

function check(click) {
    var clicked = document.getElementById(click);
    if (clicked.innerHTML == GlobalAnswer) {
        clicked.style.transistionDuration = "1s!important";
        clicked.style.backgroundColor = "green";
        if (!isHintUsed) {
            currentScore += 10;
            Streak += 1;
        }
        score.innerHTML = currentScore;
        if (Streak > 9) {
            streak.innerHTML = Streak + "🔥";
        } else {
            streak.innerHTML = Streak;
        }
        var btns = document.getElementsByClassName("btn");
        for (let i = 0; i < 4; i++) {
            btns[i].style.backgroundColor = "black";
        }
        isHintUsed = 0;
        operationChooser(op);
    } else {
        isHintUsed = 1;
        clicked.style.transistionDuration = "1s";
        clicked.style.backgroundColor = "red";
        Streak = 0;
        currentScore = 0;
        streak.innerHTML = Streak;
        score.innerHTML = currentScore;
    }
}

function showHint() {
    document.getElementById("option" + Hint).style.backgroundColor = "green";
    isHintUsed = 1;
    Streak = 0;
    streak.innerHTML = '0';
}

function openUrl() {
    open("https://www.instagram.com/utkarshencoder/");
}