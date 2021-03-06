/** @Task
 * Необходимо создать функцию, которая на вход принимает строковое представление двоичного числа (пример - ‘1001011’).
 * Как результат функция должна вернуть число в десятичной системе исчисления либо undefined,
 * в случае если в качестве параметра передали что-то плохое.
 *
 * @author Сергей Малаховский
 */

const inputs = ['1001011', '110', '01', '13'];

let getDecimal = function (binaryNum) {
    let result = 0;
    for (let i in binaryNum) {
        result = result << 1;
        switch (binaryNum[i]) {
            case '1' :
                result++;
                break;
            case '0' :
                //NOF
                break;
            default :
                return;
        }
    }
    return result;
};

let printResult = function (arr) {
    for (let i in arr) {
        console.log(arr[i] + ' = ' + getDecimal(arr[i]));
    }
};

printResult(inputs);