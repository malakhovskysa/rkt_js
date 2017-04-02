/** @Task 1
 *
 *  Ввести целочисленное значение в польской инверсной записи, в котором могут содержаться
 *  разделенные пробелом целые числа и 4 знака арифметики "+", "-", "*" и "/".
 *
 *  Если выражение можно вычислить, вывести результат. В противном случае вывести ERROR.
 *
 *  @author Сергей Малаховский
 */

let inputStr = ["234 345 456 + + 5 /", "2 2 +", "2 0 /", "3 3 3", "3d 3 +"];

printResult(inputStr, calc)

/**
 * Вычисление значение строки в обратной польской нотации.
 *
 * @param str
 * @return {*} результат вычисления строки или Error, если не удалось вычислить.
 */

function calc(str) {
    let strs = str.split(" ");

    let operation = ["+", "-", "*", "/"];
    let stack = [];

    for (let i in strs) {
        let accum;
        if (~operation.indexOf(strs[i])) {
            let val1 = stack.pop();
            let val2 = stack.pop();

            switch (strs[i]) {
                case "+" :
                    accum = val2 + val1;
                    break;
                case "-" :
                    accum = val2 - val1;
                    break;
                case "*" :
                    accum = val2 * val1;
                    break;
                case "/" :
                    if (val1 == 0) {
                        throw new Error("Деление на ноль.");
                    }
                    accum = val2 / val1;
                    break;
            }
        } else {
            accum = +strs[i];
            if (isNaN(accum)) {
                throw new Error("Введено не число");
            }
        }
        stack.push(accum);
    }

    if (stack.length != 1) {
        throw new Error("Неправильный формат входных данных");
    }
    return stack.pop();
}


function printResult(arr, func) {
    for (let i in arr) {
        try {
            console.log(arr[i] + ' = ' + func(arr[i]));
        } catch (er) {
            console.log(er);
        }
        console.log();
    }
}